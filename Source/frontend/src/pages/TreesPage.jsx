import { useMemo, useState } from 'react';

import { usePark } from '../context/ParkContext';
import { getTreePhoto } from '../data/treePhotos';

function TreesPage() {
  const {
    canDeleteTrees,
    canManageTrees,
    createTree,
    deleteTree,
    role,
    setTreeEditForm,
    setTreeForm,
    species,
    treeEditForm,
    treeForm,
    trees,
    updateTree,
    zones,
  } = usePark();
  const [search, setSearch] = useState('');

  const filteredTrees = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return trees;
    }

    return trees.filter((tree) => {
      return (
        tree.name.toLowerCase().includes(query) ||
        tree.species?.name
          ?.toLowerCase()
          .includes(query) ||
        tree.zone?.name
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [search, trees]);

  async function handleCreateSubmit(event) {
    event.preventDefault();
    await createTree();
  }

  async function handleUpdateSubmit(event) {
    event.preventDefault();
    await updateTree();
  }

  return (
    <section className="stack-page">
      <header className="page-header-card">
        <p className="sidebar-kicker">Страница деревьев</p>
        <h2>Каталог деревьев парка</h2>
      </header>

      <section className="panel">
        <div className="panel-heading">
          <h3>Поиск по каталогу</h3>
          <p>
            Поиск доступен всем пользователям.
          </p>
        </div>
        <input
          placeholder="Найти дерево, породу или зону"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />
      </section>

      <div className="tree-gallery">
        {filteredTrees.map((tree) => (
          <article key={tree.id} className="photo-card">
            <img
              className="photo-card-image"
              src={getTreePhoto(tree.species?.name)}
              alt={tree.name}
            />
            <div className="photo-card-body">
              <div className="tree-card-top">
                <h3>{tree.name}</h3>
                <span className="chip">
                  {tree.zone?.name}
                </span>
              </div>
              <p>Порода: {tree.species?.name}</p>
              <p>Возраст: {tree.age} лет</p>
              <p>Высота: {tree.height} м</p>
              <p>Дата посадки: {tree.plantingDate}</p>
              {canManageTrees ? (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() =>
                    setTreeEditForm({
                      id: String(tree.id),
                      name: tree.name,
                      age: String(tree.age),
                      height: String(tree.height),
                      plantingDate: tree.plantingDate,
                      speciesId: String(tree.species?.id ?? ''),
                      zoneId: String(tree.zone?.id ?? ''),
                    })
                  }
                >
                  Редактировать дерево
                </button>
              ) : null}
              {canDeleteTrees ? (
                <button
                  className="danger-button"
                  type="button"
                  onClick={() => deleteTree(tree.id)}
                >
                  Удалить дерево
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {role === 'ADMIN' || role === 'MANAGER' ? (
        <section className="panel">
          <div className="panel-heading">
            <h3>Изменить дерево</h3>
            <p>
              Здесь можно обновлять состояние и основные
              параметры дерева.
            </p>
          </div>

          <form className="form-grid" onSubmit={handleUpdateSubmit}>
            <input
              placeholder="ID дерева"
              value={treeEditForm.id}
              disabled
            />
            <input
              placeholder="Название дерева"
              value={treeEditForm.name}
              onChange={(event) =>
                setTreeEditForm({
                  ...treeEditForm,
                  name: event.target.value,
                })
              }
            />
            <input
              placeholder="Возраст"
              type="number"
              value={treeEditForm.age}
              onChange={(event) =>
                setTreeEditForm({
                  ...treeEditForm,
                  age: event.target.value,
                })
              }
            />
            <input
              placeholder="Высота, м"
              type="number"
              step="0.1"
              value={treeEditForm.height}
              onChange={(event) =>
                setTreeEditForm({
                  ...treeEditForm,
                  height: event.target.value,
                })
              }
            />
            <input
              type="date"
              value={treeEditForm.plantingDate}
              onChange={(event) =>
                setTreeEditForm({
                  ...treeEditForm,
                  plantingDate: event.target.value,
                })
              }
            />
            <select
              value={treeEditForm.speciesId}
              onChange={(event) =>
                setTreeEditForm({
                  ...treeEditForm,
                  speciesId: event.target.value,
                })
              }
            >
              <option value="">Порода</option>
              {species.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              value={treeEditForm.zoneId}
              onChange={(event) =>
                setTreeEditForm({
                  ...treeEditForm,
                  zoneId: event.target.value,
                })
              }
            >
              <option value="">Зона</option>
              {zones.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              className="primary-button"
              type="submit"
              disabled={!treeEditForm.id}
            >
              Обновить дерево
            </button>
          </form>
        </section>
      ) : null}

      {role === 'ADMIN' || role === 'MANAGER' ? (
        <section className="panel">
          <div className="panel-heading">
            <h3>Добавить дерево</h3>
            <p>
              Форма доступна для ролей ADMIN и MANAGER.
            </p>
          </div>

          <form className="form-grid" onSubmit={handleCreateSubmit}>
            <input
              placeholder="Название дерева"
              value={treeForm.name}
              onChange={(event) =>
                setTreeForm({
                  ...treeForm,
                  name: event.target.value,
                })
              }
              disabled={!canManageTrees}
            />
            <input
              placeholder="Возраст"
              type="number"
              value={treeForm.age}
              onChange={(event) =>
                setTreeForm({
                  ...treeForm,
                  age: event.target.value,
                })
              }
              disabled={!canManageTrees}
            />
            <input
              placeholder="Высота, м"
              type="number"
              step="0.1"
              value={treeForm.height}
              onChange={(event) =>
                setTreeForm({
                  ...treeForm,
                  height: event.target.value,
                })
              }
              disabled={!canManageTrees}
            />
            <input
              type="date"
              value={treeForm.plantingDate}
              onChange={(event) =>
                setTreeForm({
                  ...treeForm,
                  plantingDate: event.target.value,
                })
              }
              disabled={!canManageTrees}
            />
            <select
              value={treeForm.speciesId}
              onChange={(event) =>
                setTreeForm({
                  ...treeForm,
                  speciesId: event.target.value,
                })
              }
              disabled={!canManageTrees}
            >
              <option value="">Порода</option>
              {species.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              value={treeForm.zoneId}
              onChange={(event) =>
                setTreeForm({
                  ...treeForm,
                  zoneId: event.target.value,
                })
              }
              disabled={!canManageTrees}
            >
              <option value="">Зона</option>
              {zones.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              className="primary-button"
              type="submit"
              disabled={!canManageTrees}
            >
              Сохранить дерево
            </button>
          </form>
        </section>
      ) : null}
    </section>
  );
}

export default TreesPage;

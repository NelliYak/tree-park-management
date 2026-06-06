import { usePark } from '../context/ParkContext';

function DirectoryPage() {
  const {
    canManageTrees,
    createDirectoryItems,
    lookupForm,
    setLookupForm,
    species,
    zones,
  } = usePark();

  async function handleSubmit(event) {
    event.preventDefault();
    await createDirectoryItems();
  }

  return (
    <section className="stack-page">
      <header className="page-header-card">
        <p className="sidebar-kicker">Справочники</p>
        <h2>Породы и зоны парка</h2>
      </header>

      <section className="double-grid">
        <article className="panel">
          <div className="panel-heading">
            <h3>Породы деревьев</h3>
            <p>Справочник видов, доступных в системе.</p>
          </div>

          <div className="table-list">
            {species.map((item) => (
              <article key={item.id} className="list-item">
                <strong>{item.name}</strong>
                <span className="chip">ID {item.id}</span>
              </article>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <h3>Зоны парка</h3>
            <p>Локации, к которым привязываются деревья.</p>
          </div>

          <div className="table-list">
            {zones.map((item) => (
              <article key={item.id} className="list-item">
                <strong>{item.name}</strong>
                <span className="chip">ID {item.id}</span>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h3>Добавить справочные данные</h3>
          <p>
            Доступно для ADMIN и MANAGER.
          </p>
        </div>

        <form className="form-grid split" onSubmit={handleSubmit}>
          <input
            placeholder="Новая порода"
            value={lookupForm.speciesName}
            onChange={(event) =>
              setLookupForm({
                ...lookupForm,
                speciesName: event.target.value,
              })
            }
            disabled={!canManageTrees}
          />
          <input
            placeholder="Новая зона"
            value={lookupForm.zoneName}
            onChange={(event) =>
              setLookupForm({
                ...lookupForm,
                zoneName: event.target.value,
              })
            }
            disabled={!canManageTrees}
          />
          <button
            className="primary-button"
            type="submit"
            disabled={!canManageTrees}
          >
            Сохранить справочники
          </button>
        </form>
      </section>
    </section>
  );
}

export default DirectoryPage;

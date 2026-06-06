import { usePark } from '../context/ParkContext';

function InspectionsPage() {
  const {
    canManageTrees,
    createInspection,
    inspectionForm,
    inspections,
    setInspectionForm,
    trees,
  } = usePark();

  async function handleSubmit(event) {
    event.preventDefault();
    await createInspection();
  }

  return (
    <section className="stack-page">
      <header className="page-header-card">
        <p className="sidebar-kicker">Страница осмотров</p>
        <h2>Журнал инспекций</h2>
      </header>

      <section className="panel">
        <div className="panel-heading">
          <h3>Добавить осмотр</h3>
          <p>
            Запись о состоянии дерева создается отдельно
            от каталога.
          </p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            type="date"
            value={inspectionForm.inspectionDate}
            onChange={(event) =>
              setInspectionForm({
                ...inspectionForm,
                inspectionDate: event.target.value,
              })
            }
            disabled={!canManageTrees}
          />
          <input
            placeholder="Состояние"
            value={inspectionForm.condition}
            onChange={(event) =>
              setInspectionForm({
                ...inspectionForm,
                condition: event.target.value,
              })
            }
            disabled={!canManageTrees}
          />
          <input
            placeholder="Комментарий"
            value={inspectionForm.comment}
            onChange={(event) =>
              setInspectionForm({
                ...inspectionForm,
                comment: event.target.value,
              })
            }
            disabled={!canManageTrees}
          />
          <select
            value={inspectionForm.treeId}
            onChange={(event) =>
              setInspectionForm({
                ...inspectionForm,
                treeId: event.target.value,
              })
            }
            disabled={!canManageTrees}
          >
            <option value="">Выберите дерево</option>
            {trees.map((tree) => (
              <option key={tree.id} value={tree.id}>
                {tree.name}
              </option>
            ))}
          </select>
          <button
            className="primary-button"
            type="submit"
            disabled={!canManageTrees}
          >
            Добавить осмотр
          </button>
        </form>
      </section>

      <section className="inspection-grid">
        {inspections.map((inspection) => (
          <article key={inspection.id} className="log-item">
            <strong>{inspection.tree?.name}</strong>
            <p>
              {inspection.inspectionDate} -{' '}
              {inspection.condition}
            </p>
            <p>{inspection.comment}</p>
          </article>
        ))}
      </section>
    </section>
  );
}

export default InspectionsPage;

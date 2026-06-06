import { usePark } from '../context/ParkContext';

function DashboardPage() {
  const {
    inspections,
    permissions,
    species,
    trees,
    users,
    zones,
  } = usePark();

  const latestInspection = inspections.at(-1);

  return (
    <section className="stack-page">
      <header className="page-header-card">
        <p className="sidebar-kicker">Главная страница</p>
        <h2>Обзор системы парка</h2>
      </header>

      <section className="metrics-grid">
        <article className="metric-card">
          <span>Пользователи</span>
          <strong>{users.length}</strong>
        </article>
        <article className="metric-card">
          <span>Деревья</span>
          <strong>{trees.length}</strong>
        </article>
        <article className="metric-card">
          <span>Породы</span>
          <strong>{species.length}</strong>
        </article>
        <article className="metric-card">
          <span>Зоны</span>
          <strong>{zones.length}</strong>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h3>Последний осмотр</h3>
          <p>Актуальная запись из журнала инспекций.</p>
        </div>
        <div className="feature-box">
          {latestInspection ? (
            <>
              <strong>
                {latestInspection.tree?.name}
              </strong>
              <p>{latestInspection.inspectionDate}</p>
              <p>{latestInspection.condition}</p>
              <p>{latestInspection.comment}</p>
            </>
          ) : (
            <p>Журнал осмотров пока пуст.</p>
          )}
        </div>
      </section>
    </section>
  );
}

export default DashboardPage;

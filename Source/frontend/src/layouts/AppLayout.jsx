import {
  NavLink,
  Outlet,
} from 'react-router-dom';

import { usePark } from '../context/ParkContext';

function AppLayout() {
  const {
    error,
    role,
    session,
    signOut,
    status,
  } = usePark();

  const navItems = [
    { to: '/', label: 'Главная' },
    { to: '/trees', label: 'Просмотр деревьев' },
    { to: '/profile', label: 'Профиль' },
    ...(role === 'ADMIN'
      ? [{ to: '/directory', label: 'Справочники' }]
      : []),
    ...(role === 'ADMIN' || role === 'MANAGER'
      ? [{ to: '/inspections', label: 'Осмотры' }]
      : []),
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="sidebar-kicker">Tree Park Management</p>
          <h1 className="sidebar-title">
            Учет деревьев
          </h1>
          <p className="sidebar-text">
            Интерфейс показывает только те разделы,
            которые разрешены текущей роли.
          </p>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'sidebar-link active'
                  : 'sidebar-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="account-box">
          <p className="account-name">
            {session?.displayName}
          </p>
          <p className="account-role">Роль: {role}</p>
          <button
            className="secondary-button"
            type="button"
            onClick={signOut}
          >
            Выйти
          </button>
        </div>
      </aside>

      <div className="content-area">
        <header className="topbar">
          <div>
            <h2 className="topbar-title">{status}</h2>
            <p className="topbar-subtitle">
              Аккаунт: {session?.displayName}
            </p>
          </div>
        </header>

        {error ? <div className="alert-box">{error}</div> : null}

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

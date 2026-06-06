import { usePark } from '../context/ParkContext';

function ProfilePage() {
  const {
    canManageTrees,
    canManageUsers,
    createUser,
    currentUser,
    deleteUser,
    inspections,
    permissions,
    setUserForm,
    userForm,
    users,
  } = usePark();

  const latestPersonalActivity = inspections.at(-1);

  async function handleSubmit(event) {
    event.preventDefault();
    await createUser();
  }

  return (
    <section className="stack-page">
      <header className="page-header-card">
        <p className="sidebar-kicker">Профиль</p>
        <h2>Профиль сотрудника</h2>
      </header>

      <section className="double-grid">
        <article className="panel">
          <div className="panel-heading">
            <h3>Основные данные</h3>
            <p>Карточка текущего сотрудника.</p>
          </div>
          <div className="feature-box">
            <strong>
              {currentUser?.name ?? 'Сотрудник парка'}
            </strong>
            <p>Email: {currentUser?.email ?? 'не указан'}</p>
            <p>
              Возраст: {currentUser?.age ?? 'не указан'}
            </p>
            <p>Роль: {currentUser?.role ?? 'GUEST'}</p>
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <h3>Ваши возможности</h3>
            <p>Показываются только разрешенные действия.</p>
          </div>
          <ul className="role-list">
            {permissions.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>
              Работа с деревьями:{' '}
              {canManageTrees ? 'да' : 'только просмотр'}
            </li>
            <li>
              Управление сотрудниками:{' '}
              {canManageUsers ? 'да' : 'нет'}
            </li>
            <li>
              Последняя запись в журнале:{' '}
              {latestPersonalActivity
                ? latestPersonalActivity.inspectionDate
                : 'нет данных'}
            </li>
          </ul>
        </article>
      </section>

      {canManageUsers ? (
        <section className="panel">
          <div className="panel-heading">
            <h3>Создание сотрудника</h3>
            <p>
              Администратор может управлять учетными
              записями сотрудников.
            </p>
          </div>

          <form className="form-grid" onSubmit={handleSubmit}>
            <input
              placeholder="Имя"
              value={userForm.name}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  name: event.target.value,
                })
              }
            />
            <input
              placeholder="Email"
              type="email"
              value={userForm.email}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  email: event.target.value,
                })
              }
            />
            <input
              placeholder="Возраст"
              type="number"
              value={userForm.age}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  age: event.target.value,
                })
              }
            />
            <select
              value={userForm.role}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  role: event.target.value,
                })
              }
            >
              <option value="ADMIN">ADMIN</option>
              <option value="MANAGER">MANAGER</option>
              <option value="GUEST">GUEST</option>
            </select>
            <input
              placeholder="Пароль"
              type="password"
              value={userForm.password}
              onChange={(event) =>
                setUserForm({
                  ...userForm,
                  password: event.target.value,
                })
              }
            />
            <button className="primary-button" type="submit">
              Создать пользователя
            </button>
          </form>
        </section>
      ) : null}

      {canManageUsers ? (
        <section className="panel">
          <div className="panel-heading">
            <h3>Удаление пользователей</h3>
            <p>
              Администратор может удалять учетные записи.
            </p>
          </div>
          <div className="table-list">
            {users.map((user) => (
              <article key={user.id} className="list-item">
                <div>
                  <strong>{user.name}</strong>
                  <p>{user.email}</p>
                </div>
                {currentUser?.id !== user.id ? (
                  <button
                    className="danger-button compact-button"
                    type="button"
                    onClick={() => deleteUser(user.id)}
                  >
                    Удалить
                  </button>
                ) : (
                  <span className="chip">Текущий аккаунт</span>
                )}
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}

export default ProfilePage;

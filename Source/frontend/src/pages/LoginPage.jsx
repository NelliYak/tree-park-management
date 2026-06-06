import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePark } from '../context/ParkContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login, users } = usePark();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    const result = await login({
      email,
      password,
    });

    if (result.ok) {
      navigate('/');
    }
  }

  return (
    <div className="login-page">
      <section className="login-card">
        <div>
          <p className="sidebar-kicker">Курсовой проект КСП</p>
          <h1 className="login-title">
            Вход в систему учета деревьев
          </h1>
          <p className="login-text">
            Введите почту и пароль сотрудника для входа
            в систему.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            placeholder="Почта"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <input
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          <div className="login-preview">
            <strong>Тестовые аккаунты</strong>
            {users.map((user) => (
              <p key={user.id}>
                {user.email} - {user.role}
              </p>
            ))}
          </div>

          <div className="login-actions">
            <button
              className="primary-button"
              type="submit"
              disabled={!email || !password}
            >
              Войти
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;

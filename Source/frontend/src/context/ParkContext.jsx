import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import api from '../api/api';

const ParkContext = createContext(null);

export const ROLE_PERMISSIONS = {
  ADMIN: [
    'создавать пользователей',
    'удалять пользователей',
    'добавлять деревья',
    'редактировать деревья',
    'управлять видами деревьев',
    'управлять зонами парка',
    'просматривать логи',
    'создавать резервные копии БД',
  ],
  MANAGER: [
    'просматривать деревья',
    'проводить осмотры',
    'добавлять комментарии',
    'обновлять состояние деревьев',
  ],
  GUEST: [
    'смотреть каталог деревьев',
    'искать деревья',
    'смотреть статистику',
  ],
};

const INITIAL_USER_FORM = {
  name: '',
  email: '',
  age: '',
  role: 'GUEST',
  password: '',
};

const INITIAL_TREE_FORM = {
  name: '',
  age: '',
  height: '',
  plantingDate: '',
  speciesId: '',
  zoneId: '',
};

const INITIAL_TREE_EDIT_FORM = {
  id: '',
  name: '',
  age: '',
  height: '',
  plantingDate: '',
  speciesId: '',
  zoneId: '',
};

const INITIAL_INSPECTION_FORM = {
  inspectionDate: '',
  condition: '',
  comment: '',
  treeId: '',
};

const INITIAL_LOOKUP_FORM = {
  speciesName: '',
  zoneName: '',
};

function readStoredSession() {
  const rawSession = localStorage.getItem(
    'tree-park-session',
  );

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession);
  } catch {
    localStorage.removeItem('tree-park-session');
    return null;
  }
}

export function ParkProvider({ children }) {
  const [session, setSession] = useState(() =>
    readStoredSession(),
  );
  const [users, setUsers] = useState([]);
  const [trees, setTrees] = useState([]);
  const [species, setSpecies] = useState([]);
  const [zones, setZones] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [status, setStatus] = useState('Загрузка данных...');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userForm, setUserForm] = useState(INITIAL_USER_FORM);
  const [treeForm, setTreeForm] = useState(INITIAL_TREE_FORM);
  const [treeEditForm, setTreeEditForm] = useState(
    INITIAL_TREE_EDIT_FORM,
  );
  const [inspectionForm, setInspectionForm] = useState(
    INITIAL_INSPECTION_FORM,
  );
  const [lookupForm, setLookupForm] = useState(
    INITIAL_LOOKUP_FORM,
  );

  const role = session?.role ?? 'GUEST';
  const permissions = ROLE_PERMISSIONS[role] ?? [];
  const canManageTrees =
    role === 'ADMIN' || role === 'MANAGER';
  const canManageUsers = role === 'ADMIN';
  const canDeleteTrees = role === 'ADMIN';
  const canManageDirectory = role === 'ADMIN';
  const canViewLogs =
    role === 'ADMIN' || role === 'MANAGER';
  const isAuthenticated = Boolean(session);
  const currentUser = users.find(
    (user) => user.id === session?.userId,
  ) ?? null;

  useEffect(() => {
    if (session) {
      localStorage.setItem(
        'tree-park-session',
        JSON.stringify(session),
      );
      localStorage.setItem('tree-park-role', session.role);
      return;
    }

    localStorage.removeItem('tree-park-session');
    localStorage.removeItem('tree-park-role');
  }, [session]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setIsLoading(true);
      setError('');
      setStatus('Обновляем данные из API...');

      const requests = [
        api.get('/users'),
        api.get('/trees'),
        api.get('/species'),
        api.get('/zones'),
        api.get('/inspections'),
      ];

      const [
        usersResponse,
        treesResponse,
        speciesResponse,
        zonesResponse,
        inspectionsResponse,
      ] = await Promise.all(requests);

      setUsers(usersResponse.data);
      setTrees(treesResponse.data);
      setSpecies(speciesResponse.data);
      setZones(zonesResponse.data);
      setInspections(inspectionsResponse.data);
      setStatus('Данные синхронизированы');
    } catch (requestError) {
      handleError(requestError);
      setStatus('Не удалось получить данные');
    } finally {
      setIsLoading(false);
    }
  }

  async function createUser() {
    try {
      setError('');

      await api.post('/users', {
        name: userForm.name,
        email: userForm.email,
        age: userForm.age ? Number(userForm.age) : undefined,
        role: userForm.role,
        password: userForm.password,
      });

      setUserForm(INITIAL_USER_FORM);
      await loadData();
      setStatus('Пользователь добавлен');
      return true;
    } catch (requestError) {
      handleError(requestError);
      return false;
    }
  }

  async function deleteUser(id) {
    try {
      setError('');
      await api.delete(`/users/${id}`);
      await loadData();
      setStatus('Пользователь удален');
      return true;
    } catch (requestError) {
      handleError(requestError);
      return false;
    }
  }

  async function createTree() {
    try {
      setError('');

      await api.post('/trees', {
        name: treeForm.name,
        age: Number(treeForm.age),
        height: Number(treeForm.height),
        plantingDate: treeForm.plantingDate,
        speciesId: Number(treeForm.speciesId),
        zoneId: Number(treeForm.zoneId),
      });

      setTreeForm(INITIAL_TREE_FORM);
      await loadData();
      setStatus('Дерево добавлено в реестр');
      return true;
    } catch (requestError) {
      handleError(requestError);
      return false;
    }
  }

  async function updateTree() {
    try {
      setError('');

      await api.put(`/trees/${treeEditForm.id}`, {
        name: treeEditForm.name,
        age: Number(treeEditForm.age),
        height: Number(treeEditForm.height),
        plantingDate: treeEditForm.plantingDate,
        speciesId: Number(treeEditForm.speciesId),
        zoneId: Number(treeEditForm.zoneId),
      });

      setTreeEditForm(INITIAL_TREE_EDIT_FORM);
      await loadData();
      setStatus('Данные дерева обновлены');
      return true;
    } catch (requestError) {
      handleError(requestError);
      return false;
    }
  }

  async function deleteTree(id) {
    try {
      setError('');
      await api.delete(`/trees/${id}`);
      await loadData();
      setStatus('Дерево удалено из реестра');
      return true;
    } catch (requestError) {
      handleError(requestError);
      return false;
    }
  }

  async function createInspection() {
    try {
      setError('');

      await api.post('/inspections', {
        inspectionDate: inspectionForm.inspectionDate,
        condition: inspectionForm.condition,
        comment: inspectionForm.comment,
        treeId: Number(inspectionForm.treeId),
      });

      setInspectionForm(INITIAL_INSPECTION_FORM);
      await loadData();
      setStatus('Результаты осмотра сохранены');
      return true;
    } catch (requestError) {
      handleError(requestError);
      return false;
    }
  }

  async function createDirectoryItems() {
    try {
      setError('');
      const requests = [];

      if (lookupForm.speciesName.trim()) {
        requests.push(
          api.post('/species', {
            name: lookupForm.speciesName.trim(),
          }),
        );
      }

      if (lookupForm.zoneName.trim()) {
        requests.push(
          api.post('/zones', {
            name: lookupForm.zoneName.trim(),
          }),
        );
      }

      if (requests.length === 0) {
        setStatus('Введите хотя бы одну справочную запись');
        return false;
      }

      await Promise.all(requests);
      setLookupForm(INITIAL_LOOKUP_FORM);
      await loadData();
      setStatus('Справочные данные обновлены');
      return true;
    } catch (requestError) {
      handleError(requestError);
      return false;
    }
  }

  async function login({ email, password }) {
    try {
      setError('');
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      const user = response.data.user;

      signIn({
        role: user.role,
        displayName: user.name,
        userId: user.id,
        user,
      });

      return { ok: true };
    } catch (requestError) {
      handleError(requestError);
      return { ok: false };
    }
  }

  function signIn(nextSession) {
    setSession(nextSession);
    setStatus(`Выполнен вход: ${nextSession.role}`);
  }

  function signOut() {
    setSession(null);
    setStatus('Выполнен выход из аккаунта');
    setTreeEditForm(INITIAL_TREE_EDIT_FORM);
  }

  function handleError(requestError) {
    const responseMessage =
      requestError.response?.data?.message;

    if (Array.isArray(responseMessage)) {
      setError(responseMessage.join(', '));
      return;
    }

    setError(
      responseMessage ??
        'Произошла ошибка при обращении к серверу',
    );
  }

  return (
    <ParkContext.Provider
      value={{
        canDeleteTrees,
        canManageDirectory,
        canManageTrees,
        canManageUsers,
        canViewLogs,
        createDirectoryItems,
        createInspection,
        createTree,
        createUser,
        currentUser,
        deleteTree,
        deleteUser,
        error,
        inspectionForm,
        inspections,
        isAuthenticated,
        isLoading,
        loadData,
        login,
        lookupForm,
        permissions,
        role,
        session,
        setInspectionForm,
        setLookupForm,
        setTreeEditForm,
        setTreeForm,
        setUserForm,
        signOut,
        species,
        status,
        treeEditForm,
        treeForm,
        trees,
        updateTree,
        userForm,
        users,
        zones,
      }}
    >
      {children}
    </ParkContext.Provider>
  );
}

export function usePark() {
  const context = useContext(ParkContext);

  if (!context) {
    throw new Error('usePark must be used inside ParkProvider');
  }

  return context;
}

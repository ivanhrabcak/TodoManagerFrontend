const API_URL = process.env.REACT_APP_API_URL;

const fetchWithAuthentication = (url, init, token) => {
  return fetch(url, {
    ...init,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const createTask = async (token, name, description) => {
  const response = await fetchWithAuthentication(
    `${API_URL}/tasks`,
    {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
      }),
    },
    token,
  );

  return await response.json();
};

const fetchTasks = async (token) => {
  const response = await fetchWithAuthentication(
    `${API_URL}/tasks`,
    {
      method: 'GET',
    },
    token,
  );

  return await response.json();
};

const modifyTask = async (task, token) => {
  const response = await fetchWithAuthentication(
    `${API_URL}/tasks/${task.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(task),
    },
    token,
  );

  return await response.json();
};

const toggleTask = async (taskId, token) => {
  const response = await fetchWithAuthentication(
    `${API_URL}/tasks/toggle/${taskId}`,
    {
      method: 'POST',
    },
    token,
  );

  return await response.json();
};

const removeTask = async (taskId, token) => {
  const response = fetchWithAuthentication(
    `${API_URL}/tasks/${taskId}`,
    {
      method: 'DELETE',
    },
    token,
  );

  return await (await response).json();
};

export { createTask, fetchTasks, modifyTask, toggleTask, removeTask };

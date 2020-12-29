const API_URL = process.env.REACT_APP_API_URL;

export const modifyTask = async (task) => {
  const response = await fetch(`${API_URL}/tasks/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  return await response.json();
};

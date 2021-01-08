import http from '@/axios';

export async function getItems() {
  const { pathname } = window.location;

  try {
    return await http.get(pathname);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addItem(data) {
  const { pathname } = window.location;

  try {
    return await http.post(pathname, data);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateItem(data) {
  const { pathname } = window.location;

  try {
    return await http.patch(pathname, data);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteItem(data) {
  const { pathname } = window.location;

  try {
    return await http.delete(pathname, { data });
  } catch (error) {
    throw new Error(error);
  }
}

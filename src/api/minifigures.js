import http from '../axios';

const pathname = '/minifigs';

export async function getMinifigures() {
  try {
    return await http.get(pathname);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addMinifigure(data) {
  try {
    return await http.post(pathname, data);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateMinifigure(data) {
  try {
    return await http.patch(pathname, data);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteMinifigure(data) {
  try {
    return await http.delete(pathname, { data });
  } catch (error) {
    throw new Error(error);
  }
}

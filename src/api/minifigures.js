import http from '@/axios';

const pathname = '/minifigures';

export async function getMinifigures() {
  try {
    return await http.get(pathname);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getSingleMinifigure(itemId) {
  try {
    return await http.get(`${pathname}/${itemId}`);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addMinifigure(payload) {
  try {
    return await http.post(pathname, payload);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateMinifigure(payload) {
  try {
    return await http.patch(pathname, payload);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteMinifigure(payload) {
  try {
    return await http.delete(pathname, { data: payload });
  } catch (error) {
    throw new Error(error);
  }
}

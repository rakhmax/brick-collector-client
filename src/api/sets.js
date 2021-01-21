import http from '@/axios';

const pathname = '/sets';

export async function getSets() {
  try {
    return await http.get(pathname);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getSingleSet(itemId) {
  try {
    return await http.get(`${pathname}/${itemId}`);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addSet(payload) {
  try {
    return await http.post(pathname, payload);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateSet(payload) {
  try {
    return await http.patch(pathname, payload);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteSet(payload) {
  try {
    return await http.delete(pathname, { data: payload });
  } catch (error) {
    throw new Error(error);
  }
}

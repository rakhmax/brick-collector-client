import http from '@/axios';

const pathname = '/sets';

export async function getSets() {
  try {
    return await http.get(pathname);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addSet(data) {
  try {
    return await http.post(pathname, data);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateSet(data) {
  try {
    return await http.patch(pathname, data);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteSet(data) {
  try {
    return await http.delete(pathname, { data });
  } catch (error) {
    throw new Error(error);
  }
}

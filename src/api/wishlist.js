import http from '@/axios';

const pathname = '/wishlist';

export async function getWishlist() {
  try {
    return await http.get(pathname);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addWishlist(payload) {
  try {
    return await http.post(pathname, payload);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateWishlist(payload) {
  try {
    return await http.patch(pathname, payload);
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteWishlist(payload) {
  try {
    return await http.delete(pathname, { data: payload });
  } catch (error) {
    throw new Error(error);
  }
}

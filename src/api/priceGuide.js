import http from '../axios';

const pathname = '/price';

export async function getPriceGuide(itemId) {
  try {
    return await http.get(pathname, { params: itemId });
  } catch (error) {
    throw new Error(error);
  }
}

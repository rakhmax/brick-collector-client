import http from '../axios';

const pathname = '/price';

export async function getPriceGuide(itemId, type) {
  try {
    return await http.get(pathname, {
      params: {
        type,
        id: itemId,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

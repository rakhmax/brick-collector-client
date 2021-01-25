import http from '@/axios';

async function searchData(query, type) {
  try {
    const { data } = await http.get(`search?q=${query}&type=${type === 'W' ? 'S,M' : type}`);
    return data || [];
  } catch (error) {
    throw new Error(error);
  }
}

export default searchData;

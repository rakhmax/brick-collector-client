import { getPriceGuide } from '@/api/priceGuide';

export async function getPriceGuideByItemIdAndType({ itemId }, currentItemId, type) {
  if (itemId !== currentItemId) {
    const { data } = await getPriceGuide(itemId, type);

    return {
      itemId,
      ...data,
    };
  }

  return {};
}

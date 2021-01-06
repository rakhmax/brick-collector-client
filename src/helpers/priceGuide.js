import { getPriceGuide } from '../api/priceGuide';

export async function setPriceGuideByItemIdAndType(item, value, type) {
  if (item.itemId !== this.currentItemPriceGuide.itemId) {
    this.currentItemPriceGuide = {
      itemId: null,
      new: {},
      used: {},
    };
  }

  if (value && item.itemId !== this.currentItemPriceGuide.itemId) {
    const { data } = await getPriceGuide(item.itemId, type);

    this.currentItemPriceGuide = {
      itemId: item.itemId,
      ...data,
    };
  }
}

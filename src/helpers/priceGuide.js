import { getPriceGuide } from '../api/priceGuide';

export async function setPriceGuideByItemIdAndType({ itemId }, value, type) {
  if (itemId !== this.currentItemPriceGuide.itemId) {
    this.currentItemPriceGuide = {
      itemId: null,
      new: {},
      used: {},
    };
  }

  if (value && itemId !== this.currentItemPriceGuide.itemId) {
    const { data } = await getPriceGuide(itemId, type);

    this.currentItemPriceGuide = {
      itemId,
      ...data,
    };
  }
}

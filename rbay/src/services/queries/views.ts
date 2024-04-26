import { client } from '$services/redis';
import { itemsKey, itemsByViewSkey } from '$services/keys';

export const incrementView = async (itemId: string, userId: string) => {
	return Promise.all([
		client.hIncrBy(itemsKey(itemId), 'views', 1),
		client.zIncrBy(itemsByViewSkey(), 1, itemId)
	]);
};

import { client } from "$services/redis";
import { userLikeskey,itemsKey } from "$services/keys";
import { getItems } from "./items";

export const userLikesItem = async (itemId: string, userId: string) => {
    await client.sIsMember(userLikeskey(userId),itemId);
};

export const likedItems = async (userId: string) => {
    const ids = await client.sMembers(userLikeskey(userId));
    return getItems(ids);
};

export const likeItem = async (itemId: string, userId: string) => {
   const inserted= await client.sAdd(userLikeskey(userId),itemId);

   if(inserted){
        return client.hIncrBy(itemsKey(itemId),'likes',1);
    }
};

export const unlikeItem = async (itemId: string, userId: string) => {
    const removed = await client.sRem(userLikeskey(userId),itemId);

    if(removed){
        return client.hIncrBy(itemsKey(itemId),'likes',-1);
        }
};

export const commonLikedItems = async (userOneId: string, userTwoId: string) => {
    const ids = await client.sInter([userLikeskey(userOneId),userLikeskey(userTwoId)]);
    return getItems(ids);
};

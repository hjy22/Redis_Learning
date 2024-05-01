export const pageCacheKey = (id:string)=>`pagecache#${id}`;
export const userKey = (userId:string)=>`users#${userId}`;
export const sessionKey = (sessionId:string)=>`session#${sessionId}`;
export const usernameUniquekey = ()=>`usernames:unique`;
export const userLikeskey = (userId:string)=>`users:likes#${userId}`;
export const usernameskey = ()=>`username`;

//Items
export const itemsKey = (itemId:string)=>`items#${itemId}`;
export const itemsByViewSkey =  ()=>`items:views`;
export const itemsByEndingAtKey  =  ()=>`items:endingAt`;
export const itemsViewsKey = (itemId:string)=>`items:views#${itemId}`;
export const bidHistoryKey = (itemId:string)=>`history#${itemId}`;
export const itemsByPriceKey = ()=>'items:price';

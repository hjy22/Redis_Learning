import type { Session } from '$services/types';
import { sessionKey } from '$services/keys';
import { client } from '$services/redis';
import { genId } from '$services/utils';

export const getSession = async (id: string) => {
    const session = await client.HGETALL(sessionKey(id));
    
    //用户还未登录
    if(Object.keys(session).length===0){
        return null;
    }
    return deserialize(id,session);
};

export const saveSession = async (session: Session) => {
    return client.hSet(sessionKey(session.id),serialize(session))
};

const serialize=(session:Session)=>{
    return{
        userId:session.userId,
        username:session.username
    };
}

const deserialize=(id:string,session:{[key:string]:string})=>{
    return{
        id,
        userId:session.userId,
        username:session.username
    };
}
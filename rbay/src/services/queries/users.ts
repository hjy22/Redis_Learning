import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { userKey,usernameUniquekey,usernameskey } from '$services/keys';

export const getUserByUsername = async (username: string) => {
    const decimalId = await client.zScore(usernameskey(),username)
    if(!decimalId){
        throw new Error("user does not exits");
    }
    const id=decimalId.toString(16);
    const user = await client.hGetAll(userKey(id));
    return deserialize(id,user);
};

export const getUserById = async (id: string) => {
    const user = await client.hGetAll(userKey(id))
    return deserialize(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
    const id = genId();

    const exists = await client.sIsMember(usernameUniquekey(),attrs.username);
    if(exists){
        throw new Error('Username is taken');
    }

    await client.hSet(userKey(id),serialize(attrs))
    await client.sAdd(usernameUniquekey(),attrs.username);
    await client.zAdd(usernameskey(),{
        value: attrs.username,
        score:  parseInt(id, 16)
    })
    
    return id;
};

const serialize=(user:CreateUserAttrs)=>{
    return{
        username:user.username,
        password:user.password
    };
}

const deserialize=(id:string,user:{[key:string]:string})=>{
    return{
        id:id,
        username:user.username,
        password:user.password
    };
}

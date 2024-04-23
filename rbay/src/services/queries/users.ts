import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { userKey,usernameUniquekey } from '$services/keys';

export const getUserByUsername = async (username: string) => {};

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

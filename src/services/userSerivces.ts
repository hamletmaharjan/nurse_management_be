import knex from '../db';

interface User { 
    firstName:string, 
    lastName:string, 
    name: string,
    email: string,
    password: string, 
 }

export const createUser = (user: any) => {
    return knex('users').insert(user);
} 

export const fetchUserByEmail = (email: string) => {
    return knex('users').where('email', email).first();
}

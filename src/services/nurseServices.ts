// const knex:any = require('../db');
// import {knex} from '../db';

import knex from '../db';

interface Nurse { 
    full_name:string, 
    contact:string, 
    working_days?: string,
    start_time?: string,
    end_time?: string, 
    address?: string,
    image?: string,
    email: string,
    user_id?: number
}

export const createNurse = (nurse: Nurse) => {
    return knex('nurses').insert(nurse);
} 

export const fetchAllNurses = () => {
    return knex.select().table('nurses');
}

export const fetchNurseById = (nurseId: number) => {
    return knex('nurses').where('id', nurseId).first();
}

export const updateNurse = (nurseId: number, nurse:object) => {
    return knex('nurses').where('id', nurseId).update(nurse);
}

export const deleteNurseById = (nurseId: number) => {
    return knex('nurses').where('id', nurseId).del();
}

// export const fetchUserByEmail = (email: string) => {
//     return knex('users').where('email', email).first();
// }

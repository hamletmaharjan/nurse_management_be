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
    return knex.select().table('nurses').orderBy('full_name');
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

export const fetchRoundingManager = () => {
    return knex('nurses').where('is_rounding_manager',true).first();
}

// export const updateRoundingManager = (id:number, nurse: object) => {
//     return knex('nurses').where('id', id).update(nurse);
// }

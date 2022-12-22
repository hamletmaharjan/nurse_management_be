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
    return knex('nurses').insert(nurse).returning('*');
} 

export const fetchAllNurses = () => {
    return knex.select().table('nurses').orderBy('full_name')
    .then((nurses)=> {
	    let result = nurses.map(function (nurse) { 
	        nurse.image = "images/" + nurse.image;
	        return nurse;
	    });
	    return result;
  	});;
}

export const fetchNurseById = (nurseId: number) => {
    return knex('nurses').where('id', nurseId).first()
    .then((nurse) => {
      let result = nurse;
      result.image = "images/" + result.image;
      return result;
  });
}

export const updateNurse = (nurseId: number, nurse:object) => {
    return knex('nurses').where('id', nurseId).update(nurse).returning('*').then(data => data[0]);
}

export const deleteNurseById = (nurseId: number) => {
    return knex('nurses').where('id', nurseId).del();
}

export const fetchRoundingManager = () => {
    return knex('nurses').where('is_rounding_manager',true).first();
}

export const fetchUnmodifiedNurseById = (nurseId: number) => {
    return knex('nurses').where('id', nurseId).first()
};

// export const updateRoundingManager = (id:number, nurse: object) => {
//     return knex('nurses').where('id', id).update(nurse);
// }

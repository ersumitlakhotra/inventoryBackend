import pool from "../config/db.js";
import { createLogsService } from "./logsModel.js";
const tableName = "public.\"equipment\"";

export const getAllEquipmentService = async (cid) => {
    const result = await pool.query(`SELECT E.*,U.fullname as user,encode(E.picture, 'escape') as picture FROM ${tableName} E inner join public.\"user\" U on (U.id=E.uid)  where E.cid=$1 ORDER BY E.unit ASC`, [cid]);
    return result.rows;
}; 

 export const getEquipmentByIdService = async (cid, id) => {
    const result = await pool.query(`SELECT E.*,U.fullname as user,encode(E.picture, 'escape') as picture FROM ${tableName} E inner join public.\"user\" U on (U.id=E.uid) where E.id=$1 and E.cid=$2`, [id, cid]);
    return result.rows;
};

export const createEquipmentService = async (cid,  uid, unit, plate, vin, model, make, year,   status,picture,description,notes  ) => {
    const result = await pool.query(`INSERT INTO ${tableName} (cid, uid, unit, plate, vin, model, make, year,   status ,picture,description,notes,createdat,modifiedat) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`, [cid,  uid, unit, plate, vin, model, make, year,   status ,picture,description,notes, new Date(), new Date()]);   
    await createLogsService(cid, uid, 'New Equipment Created', 'Equipment', result.rows[0].id,"Created");
    return result.rows[0];
};

export const updateEquipmentService = async (cid, id, uid, unit, plate, vin, model, make, year,   status,picture,description,notes) => {
    const previous = await getEquipmentByIdService(cid, id);
    const result = await pool.query(`UPDATE ${tableName} set uid=$3,unit=$4,plate=$5, vin=$6, model=$7, make=$8,year=$9,status=$10,picture=$11,description=$12,notes=$13,modifiedat=$14 where id=$2 and cid=$1 RETURNING *`, [cid, id, uid, unit, plate, vin, model, make, year,   status,picture,description,notes,  new Date()]);
         const array = [
        { prev: previous[0].unit, next: unit, title: 'Unit' },
        { prev: previous[0].plate, next: plate, title: 'Plate' },
        { prev: previous[0].vin, next: vin, title: 'Vin' },
        { prev: previous[0].make, next: make, title: 'Make' },
        { prev: previous[0].model, next: model, title: 'Model' },
        { prev: previous[0].year, next: year, title: 'Year' },
        { prev: previous[0].description, next: description, title: 'Description' },
        { prev: previous[0].notes, next: notes, title: 'Notes' },
        { prev: previous[0].status, next: status, title: 'Status' },
        { prev: previous[0].picture, next: picture, title: 'Picture' },
    ];

    await createLogsService(cid, uid, '', 'Equipment', id, "Modified",array);
  return result.rows[0];
};

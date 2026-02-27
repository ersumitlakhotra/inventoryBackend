import pool from "../config/db.js";
import { createLogsService } from "./logsModel.js";
const tableName = "public.\"inventory\"";

export const getAllInventoryService = async (cid) => {
    const result = await pool.query(`SELECT I.*,encode(I.picture, 'escape') as picture,U.fullname as user FROM ${tableName} I inner join public.\"user\" U on (U.id=I.uid) where I.cid=$1 ORDER BY I.name ASC`, [cid]);
    return result.rows;
}; 

 export const getInventoryByIdService = async (cid, id) => {
    const result = await pool.query(`SELECT I.*,encode(I.picture, 'escape') as picture,U.fullname as user FROM ${tableName} I inner join public.\"user\" U on (U.id=I.uid) where I.id=$1 and I.cid=$2`, [id, cid]);
    return result.rows;
};

export const createInventoryService = async (cid, uid, name, description, unique, notes,  picture ,instock ) => {
    const result = await pool.query(`INSERT INTO ${tableName} (cid,uid, name, description, \"unique\", notes,  picture,instock  ,createdat,modifiedat) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`, [cid, uid, name, description, unique, notes,  picture,instock , new Date(), new Date()]);
     await createLogsService(cid, uid, 'New Inventory Created', 'Inventory', result.rows[0].id,"Created");
    return result.rows[0];
};

export const updateInventoryService = async (cid, id, uid, name, description, unique, notes,  picture,instock  ) => {
        const previous = await getInventoryByIdService(cid, id);
    const result = await pool.query(`UPDATE ${tableName} set uid=$3,name=$4,description=$5, \"unique\"=$6, notes=$7, picture=$8,instock =$9,modifiedat=$10 where id=$2 and cid=$1 RETURNING *`, [cid, id, uid, name, description, unique, notes,  picture,instock ,  new Date()]);
         const array = [
        { prev: previous[0].name, next: name, title: 'Item name' },
        { prev: previous[0].description, next: description, title: 'Description' },
        { prev: previous[0].unique, next: unique, title: 'Serial #' },
        { prev: previous[0].instock, next: instock, title: 'In Stock' },
        { prev: previous[0].notes, next: notes, title: 'Notes' },
        { prev: previous[0].picture, next: picture, title: 'Picture' },
    ];

    await createLogsService(cid, uid, '', 'Inventory', id, "Modified",array);
    return result.rows[0];
};

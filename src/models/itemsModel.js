import pool from "../config/db.js";
const tableName = "public.\"items\"";

export const getAllItemsService = async (cid) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where cid=$1 ORDER BY title ASC`, [cid]);
    return result.rows;
}; 

 export const getItemsByIdService = async (cid, id,type) => {
    const result = await pool.query(`SELECT * FROM ${tableName}  where cid=$1 and reftype=$2 ORDER BY title ASC`, [id, cid,type]);
    return result.rows;
};

export const createItemsService = async (cid, type, title) => {
    const isExist = await pool.query(`SELECT * FROM  ${tableName} where cid=$1 and refType=$2 and LOWER(title)=$3 limit 1`, [cid, type, title.toLowerCase()]);
    if (isExist.rowCount === 0) {
        const result = await pool.query(`INSERT INTO ${tableName} (cid,  reftype,  title, createdat,modifiedat) VALUES ($1,$2,$3,$4,$5) RETURNING *`, [cid, type, title, new Date(), new Date()]);
        return result.rows[0];
    }
    else
        return isExist.rows[0]

};


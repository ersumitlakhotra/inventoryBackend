import pool from "../config/db.js";
const tableName = "public.\"user\"";

export const getUserAuthService = async (username, password) => {
    const result = await pool.query(`SELECT U.*,C.active FROM ${tableName} U INNER JOIN company C on (C.id = U.cid) where U.status='Active' and U.username=$1 and U.password=$2`, [username.toLowerCase(), password]);
    return result.rows;
};
export const getAllUsersService = async (cid) => {
    const result = await pool.query(`SELECT *,encode(profilepic, 'escape') as picture FROM ${tableName} where cid=$1 ORDER BY fullname ASC`, [cid]);
    return result.rows;
}; 

 export const getUsersByIdService = async (cid, id) => {
    const result = await pool.query(`SELECT *,encode(profilepic, 'escape') as picture FROM ${tableName} where id=$1 and cid=$2`, [id, cid]);
    return result.rows;
};

export const createUsersService = async (cid, fullname, username, password, role, status, profilepic) => {
    const result = await pool.query(`INSERT INTO ${tableName} (cid,fullname, username, password,  role, status, profilepic ,createdat,modifiedat) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`, [cid, fullname, username, password,  role, status, profilepic, new Date(), new Date()]);
    return result.rows[0];
};

export const updateUsersService = async (cid, id, fullname, username, password,  role, status, profilepic ) => {
    const result = await pool.query(`UPDATE ${tableName} set fullname=$3,username=$4,password=$5, role=$6, status=$7, profilepic=$8,modifiedat=$9 where id=$2 and cid=$1 RETURNING *`, [cid, id, fullname, username, password,  role, status, profilepic, new Date()]);
    return result.rows[0];
};
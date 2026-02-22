import pool from "../config/db.js";
const tableName = "public.\"user\"";

export const getUserAuthService = async (username, password) => {
    const result = await pool.query(`SELECT U.*,C.active FROM ${tableName} U INNER JOIN company C on (C.id = U.cid) where U.status='Active'  and LOWER(username)=$1 and U.password=$2`, [username.toLowerCase(), password]);
    return result.rows;
};
export const getAllUsersService = async (cid) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where cid=$1 and role <> 'Administrator' ORDER BY fullname ASC`, [cid]);
    return result.rows;
}; 
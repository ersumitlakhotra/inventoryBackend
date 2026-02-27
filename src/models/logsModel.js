import pool from "../config/db.js";
const tableName = "public.\"logs\"";

export const getAllLogsService = async (cid) => {
    const result = await pool.query(`SELECT R.*,U.fullname as user FROM ${tableName} R inner join public.\"user\" U on (U.id=R.uid)  where R.cid=$1 ORDER BY R.createdat DESC`, [cid]);
    return result.rows;
}; 

 export const getLogsByIdService = async (cid, id,ltype) => {
    const result = await pool.query(`SELECT R.*,U.fullname as user FROM ${tableName} R inner join public.\"user\" U on (U.id=R.uid)  where R.lid=$1 and R.cid=$2 and R.ltype=$3 ORDER BY R.createdat DESC`, [id, cid,ltype]);
    return result.rows;
};

export const createLogsService = async (cid,  uid,  message, ltype, lid,title,array=[] ) => {
    let logMessage = message;
    if (array.length > 0) {
        array.forEach(item => {
            const prev = (item.prev || '').toString().toLowerCase();
            const next = (item.next || '').toString().toLowerCase();

            if (prev !== next) {
                if (prev !== '' && next !== '')
                    logMessage += `${item.title} changed from '${item.prev}' to '${item.next}'\n`;
                else if (prev === '')
                    logMessage += `${item.title} added '${item.next}'\n`;
                else if (next === '')
                    logMessage += `${item.title} removed '${item.prev}'\n`;
            }
        });

        if (!logMessage.trim()) {
            logMessage = 'No changes detected';
        }
    }

    const result = await pool.query(`INSERT INTO ${tableName} (cid,  uid,  message, ltype, lid,title,createdat,modifiedat) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`, [cid,   uid,   `• ${logMessage}`, ltype, lid,title,new Date(), new Date()]);   
    return result.rows[0];
};


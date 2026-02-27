import pool from "../config/db.js";
import { createItemsService } from "./itemsModel.js";
import { createLogsService } from "./logsModel.js";
const tableName = "public.\"repair\"";

export const getAllRepairService = async (cid) => {
    const result = await pool.query(`SELECT R.*,U.fullname as user,E.unit  FROM ${tableName} R inner join public.\"user\" U on (U.id=R.uid) inner join public.\"equipment\" E on (E.id=r.refid)   where R.cid=$1 ORDER BY R.duedate ASC`, [cid]);
    return result.rows;
};

export const getRepairByIdService = async (cid, id) => {
    const result = await pool.query(`SELECT R.*,U.fullname as user,E.unit FROM ${tableName} R inner join public.\"user\" U on (U.id=R.uid) inner join public.\"equipment\" E on (E.id=r.refid)  where R.id=$1 and R.cid=$2`, [id, cid]);
    return result.rows;
};

export const getRepairByEquipmentIdService = async (cid, id) => {
    const result = await pool.query(`SELECT R.*,U.fullname as user,E.unit FROM ${tableName} R inner join public.\"user\" U on (U.id=R.uid) inner join public.\"equipment\" E on (E.id=r.refid)  where R.refid=$1 and R.cid=$2 ORDER BY R.duedate DESC `, [id, cid]);
    return result.rows;
};

export const createRepairService = async (cid, refid, reftype, uid, name, description, expire, status, duedate, quantity, price, notes, kilometer) => {
    const top1 = await pool.query(`SELECT * FROM ${tableName} where cid=$1 ORDER BY id desc`, [cid]);
    let order_no = 1000;
    if(top1.rowCount > 0)   
        order_no = top1.rows[0].order_no;
    order_no = order_no+1;
    
    const result = await pool.query(`INSERT INTO ${tableName} (cid,orderno, refid,reftype,  uid, \"name\", description, expire, status, duedate, quantity, price ,notes,kilometer,createdat,modifiedat) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`, [cid,order_no, refid, reftype, uid, name, description, expire, status, duedate, quantity, price, notes, kilometer, new Date(), new Date()]);
    await createItemsService(cid, 'Service', name);
    await createLogsService(cid, uid, 'New Repair Created', 'Repair', result.rows[0].id, "Created");
    return result.rows[0];
};

export const updateRepairService = async (cid, id, refid, reftype, uid, name, description, expire, status, duedate, quantity, price, notes, kilometer,unit) => {
    const previous = await getRepairByIdService(cid, id);
    await createItemsService(cid, 'Service', name);
    const result = await pool.query(`UPDATE ${tableName} set \"name\"=$3,description=$4,expire=$5, status=$6, duedate=$7, quantity=$8,price=$9,modifiedat=$10, refid=$11,reftype=$12, uid=$13 ,notes=$14, kilometer = $15 where id=$2 and cid=$1 RETURNING *`, [cid, id, name, description, expire, status, duedate, quantity, price, new Date(), refid, reftype, uid, notes, kilometer]);

    const array = [
        { prev: previous[0].status, next: status, title: 'Status' },
        { prev: previous[0].unit, next: unit, title: 'Equipment' },
        { prev: previous[0].duedate, next: duedate, title: 'Due Date' },
        { prev: previous[0].name, next: name, title: 'Service' },
        { prev: previous[0].description, next: description, title: 'Description' },
        { prev: previous[0].kilometer, next: kilometer, title: 'Kilometer' },
        { prev: previous[0].quantity, next: quantity, title: 'Quantity' },
        { prev: previous[0].price, next: price, title: 'Price' },
        { prev: previous[0].notes, next: notes, title: 'Notes' },
    ];

    await createLogsService(cid, uid, '', 'Repair', id, "Modified",array);
    return result.rows[0];
};

import pool from "../config/db.js";

const tableName = "public.\"billing\"";

export const getAllBillingService = async (cid) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where cid=$1 and category='invoice' ORDER BY id DESC `, [cid]);
    return result.rows;
};

export const getAllBillingTwilioService = async (cid) => {
    const result = await pool.query(`SELECT * FROM ${tableName} where cid=$1 and category='twilio' ORDER BY id DESC `, [cid]);
    return result.rows;
};

export const createBillingService = async (cid) => {
    let invoice = `INV-${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(3, '0') }`; 
    const company = await pool.query(`SELECT * FROM company where id=$1 `, [cid]);
    
    let companyinfo = [{
        name: company.rows[0].name,
        address: getAddress(company.rows[0]),
        cell: company.rows[0].cell,
        email: company.rows[0].email,
    }];   
    
    let ischeduleinfo = [{
        name: 'iSchedule Inc.',
        address:'199 KingKnoll Drive, Brampton, AB, L6Y 4N2, Canada',
        cell: '647-680-0045',
        email: 'accounting@ischedule.ca',
    }];
    const address = company.rows[0].addressinfo[0];

    const pricing = parseFloat(company.rows[0].pricing) || 0 ;
    const discount = parseFloat(company.rows[0].discount) || 0 ;
    
    const subtotal = pricing - discount ;
    const tax=address.country === 'Canada' ? getTax(address.province) : 0;
    const taxamount= address.country === 'Canada' ?  subtotal * (tax/100) : 0;
    const totalamount = subtotal+taxamount  ;
    const{ thirdDay :trndate, seventhDay:duedate } = getDaysOfMonth();

    const result = await pool.query(`INSERT INTO ${tableName} (cid,trndate, duedate,pricing,subtotal,tax,taxamount,totalamount,status,invoice,\"companyInfo"\,\"ischeduleInfo"\,discount, createdat,modifiedat) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) ON CONFLICT (cid, invoice) DO UPDATE SET modifiedat = $14 RETURNING *`, [cid, trndate, duedate, parseFloat(pricing).toFixed(2),parseFloat(subtotal).toFixed(2), `${tax}%`, parseFloat(taxamount).toFixed(2), parseFloat(totalamount).toFixed(2), 'Unpaid', invoice,companyinfo,ischeduleinfo,parseFloat(discount).toFixed(2), new Date(), new Date()]);
    return result.rows[0];
};

export const updateBillingService = async (cid, id, trndate, duedate, subtotal, tax, taxamount, totalamount, status) => {
    const result = await pool.query(`UPDATE ${tableName} set trndate=$3,duedate=$4,subtotal=$5,tax=$6,taxamount=$7,totalamount=$8,status=$9,modifiedat=$10 where id=$2 and cid=$1 RETURNING *`, [cid, id, trndate, duedate, subtotal, tax, taxamount, totalamount, status, new Date()]);
    return result.rows[0];
};

function getAddress (companyList) {
    let fullAddress = "";

if (companyList?.addressinfo?.length) {
    const address = companyList.addressinfo[0];

    const parts = [
        address.street,
        address.city,
        address.province,
        address.postal,
        address.country
    ].filter(Boolean); // removes null, undefined, empty

    fullAddress = parts.join(", ");
}
return fullAddress;
}

function getTax(province) {
 {/*const canadaRegions = [
  { name: "Alberta", code: "AB", tax: 5 },
  { name: "British Columbia", code: "BC", tax: 12 },
  { name: "Manitoba", code: "MB", tax: 12 },
  { name: "New Brunswick", code: "NB", tax: 15 },
  { name: "Newfoundland and Labrador", code: "NL", tax: 15 },
  { name: "Nova Scotia", code: "NS", tax: 15 },
  { name: "Ontario", code: "ON", tax: 13 },
  { name: "Prince Edward Island", code: "PE", tax: 15 },
  { name: "Quebec", code: "QC", tax: 14.975 },
  { name: "Saskatchewan", code: "SK", tax: 11 },
  { name: "Northwest Territories", code: "NT", tax: 5 },
  { name: "Nunavut", code: "NU", tax: 5 },
  { name: "Yukon", code: "YT", tax: 5 }
];*/}

 const canadaRegions = [
  { name: "Alberta", code: "AB", tax: 5 },
  { name: "British Columbia", code: "BC", tax: 5 },
  { name: "Manitoba", code: "MB", tax: 5 },
  { name: "New Brunswick", code: "NB", tax: 15 },
  { name: "Newfoundland and Labrador", code: "NL", tax: 15 },
  { name: "Nova Scotia", code: "NS", tax: 15 },
  { name: "Ontario", code: "ON", tax: 13 },
  { name: "Prince Edward Island", code: "PE", tax: 15 },
  { name: "Quebec", code: "QC", tax: 5 },
  { name: "Saskatchewan", code: "SK", tax: 5 },
  { name: "Northwest Territories", code: "NT", tax: 5 },
  { name: "Nunavut", code: "NU", tax: 5 },
  { name: "Yukon", code: "YT", tax: 5 }
];
const taxPercentage = canadaRegions.find(item=> item.code === province)
return taxPercentage.tax
}

function getDaysOfMonth () {
  const date = new Date()
  const year = date.getFullYear();
  const month = date.getMonth();

  const thirdDay = new Date(year, month, 3);
  const seventhDay = new Date(year, month, 7);

  return { thirdDay, seventhDay };
};
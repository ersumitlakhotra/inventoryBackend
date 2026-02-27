import handleResponse from "../middlewares/handleResponse.js";
import { createLogsService } from "../models/logsModel.js";
import { getLogsByIdService } from "../models/logsModel.js";
import { getAllLogsService } from "../models/logsModel.js";

export const getAllLogs = async (req, res, next) => {
    try {
        const data = await getAllLogsService(req.params.cid);
        handleResponse(res, 200, "Fetch Successfully", data);
    }
    catch (err) {
        next(err)
    }
}; 
export const getAllLogsById = async (req,res,next) => {
     const {  ltype }= req.body;
    try{
        const data= await getLogsByIdService(req.params.cid,req.params.id,ltype);
        if(!data) return handleResponse(res,500,"data not found");
        handleResponse(res,200,"Fetch via Id Successfully",data);
    }
    catch(err){
        next(err)
    }
};


export const createLogs = async (req,res,next) => {
    const {  uid,  message, ltype, lid,title }= req.body;
    try{
        const data = await createLogsService(req.params.cid,  uid,  message, ltype, lid,title );
        handleResponse(res,201,"Created Successfully",data)
    }
    catch(err){
        next(err)
    }
};


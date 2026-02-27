import handleResponse from "../middlewares/handleResponse.js";
import { createRepairService, getAllRepairService, getRepairByEquipmentIdService, getRepairByIdService, updateRepairService} from "../models/repairModel.js";

export const getAllRepair = async (req, res, next) => {
    try {
        const data = await getAllRepairService(req.params.cid);
        handleResponse(res, 200, "Fetch Successfully", data);
    }
    catch (err) {
        next(err)
    }
}; 
export const getAllRepairById = async (req,res,next) => {
    try{
        const data= await getRepairByIdService(req.params.cid,req.params.id);
        if(!data) return handleResponse(res,500,"data not found");
        handleResponse(res,200,"Fetch via Id Successfully",data);
    }
    catch(err){
        next(err)
    }
};

export const getAllRepairByEquipmentId = async (req,res,next) => {
    try{
        const data= await getRepairByEquipmentIdService(req.params.cid,req.params.id);
        if(!data) return handleResponse(res,500,"data not found");
        handleResponse(res,200,"Fetch via Id Successfully",data);
    }
    catch(err){
        next(err)
    }
};


export const createRepair = async (req,res,next) => {
    const {  refid, reftype, uid, name, description, expire, status, duedate, quantity, price,notes,kilometer }= req.body;
    try{
        const data = await createRepairService(req.params.cid, refid,reftype,  uid, name, description, expire, status, duedate, quantity, price,notes,kilometer );
        handleResponse(res,201,"Created Successfully",data)
    }
    catch(err){
        next(err)
    }
};

export const updateRepair = async (req,res,next) => {
    const { refid,reftype,  uid, name, description, expire, status, duedate, quantity, price,notes,kilometer,unit }= req.body;
    try{
        const data = await updateRepairService(req.params.cid, req.params.id,refid,reftype, uid, name, description, expire, status, duedate, quantity, price,notes,kilometer,unit  );
        if(!data) return handleResponse(res,500,"data not found");
        handleResponse(res,200,"Updated Successfully",data);
    }
    catch(err){
        next(err)
    }
};
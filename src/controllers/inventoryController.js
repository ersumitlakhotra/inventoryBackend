import handleResponse from "../middlewares/handleResponse.js";
import { createInventoryService, getAllInventoryService, getInventoryByIdService, updateInventoryService } from "../models/inventoryModel.js";

export const getAllInventory = async (req, res, next) => {
    try {
        const data = await getAllInventoryService(req.params.cid);
        handleResponse(res, 200, "Fetch Successfully", data);
    }
    catch (err) {
        next(err)
    }
}; 
export const getAllInventoryById = async (req,res,next) => {
    try{
        const data= await getInventoryByIdService(req.params.cid,req.params.id);
        if(!data) return handleResponse(res,500,"data not found");
        handleResponse(res,200,"Fetch via Id Successfully",data);
    }
    catch(err){
        next(err)
    }
};


export const createInventory = async (req,res,next) => {
    const {  uid, name, description, unique, notes,  picture,instock }= req.body;
    try{
        const data = await createInventoryService(req.params.cid, uid, name, description, unique, notes,  picture,instock  );
        handleResponse(res,201,"Created Successfully",data)
    }
    catch(err){
        next(err)
    }
};

export const updateInventory = async (req,res,next) => {
    const { uid, name, description, unique, notes,  picture,instock   }= req.body;
    try{
        const data = await updateInventoryService(req.params.cid, req.params.id, uid, name, description, unique, notes,  picture,instock  );
        if(!data) return handleResponse(res,500,"data not found");
        handleResponse(res,200,"Updated Successfully",data);
    }
    catch(err){
        next(err)
    }
};
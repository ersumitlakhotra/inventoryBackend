import handleResponse from "../middlewares/handleResponse.js";
import { createInventoryService, getAllInventoryService, getInventoryByIdService, updateInventoryPictureService, updateInventoryService } from "../models/inventoryModel.js";

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
    const {  uid, name, description, unique, notes,  instock }= req.body;
    try{
        const data = await createInventoryService(req.params.cid, uid, name, description, unique, notes,  instock  );
        handleResponse(res,201,"Created Successfully",data)
    }
    catch(err){
        next(err)
    }
};

export const updateInventory = async (req,res,next) => {
    const { uid, name, description, unique, notes,  instock   }= req.body;
    try{
        const data = await updateInventoryService(req.params.cid, req.params.id, uid, name, description, unique, notes,instock  );
        if(!data) return handleResponse(res,500,"data not found");
        handleResponse(res,200,"Updated Successfully",data);
    }
    catch(err){
        next(err)
    }
};
export const updateInventoryPicture = async (req,res,next) => {
    const { id,uid, picture }= req.body;
    try{
        const user = await updateInventoryPictureService(req.params.cid,id,uid, picture);
        handleResponse(res,200,"Updated Successfully",user);
    }
    catch(err){
        next(err)
    }
};
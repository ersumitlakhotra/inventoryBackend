import handleResponse from "../middlewares/handleResponse.js";
import { createItemsService, getAllItemsService, getItemsByIdService } from "../models/itemsModel.js";

export const getAllItems = async (req, res, next) => {
    try {
        const data = await getAllItemsService(req.params.cid);
        handleResponse(res, 200, "Fetch Successfully", data);
    }
    catch (err) {
        next(err)
    }
}; 
export const getAllItemsById = async (req,res,next) => {
     const {  type }= req.body;
    try{
        const data= await getItemsByIdService(req.params.cid,req.params.id,type);
        if(!data) return handleResponse(res,500,"data not found");
        handleResponse(res,200,"Fetch via Id Successfully",data);
    }
    catch(err){
        next(err)
    }
};


export const createItems = async (req,res,next) => {
    const {  type, title }= req.body;
    try{
        const data = await createItemsService(req.params.cid, type,title );
        handleResponse(res,201,"Created Successfully",data)
    }
    catch(err){
        next(err)
    }
};


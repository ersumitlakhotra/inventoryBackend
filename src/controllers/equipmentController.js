import handleResponse from "../middlewares/handleResponse.js";
import { getAllEquipmentService, getEquipmentByIdService ,createEquipmentService, updateEquipmentService} from "../models/equipmentModel.js";


export const getAllEquipment = async (req, res, next) => {
    try {
        const data = await getAllEquipmentService(req.params.cid);
        handleResponse(res, 200, "Fetch Successfully", data);
    }
    catch (err) {
        next(err)
    }
}; 
export const getAllEquipmentById = async (req,res,next) => {
    try{
        const data= await getEquipmentByIdService(req.params.cid,req.params.id);
        if(!data) return handleResponse(res,500,"data not found");
        handleResponse(res,200,"Fetch via Id Successfully",data);
    }
    catch(err){
        next(err)
    }
};


export const createEquipment = async (req,res,next) => {
    const {  uid, unit, plate, vin, model, make, year,   status,picture,description,notes }= req.body;
    try{
        const data = await createEquipmentService(req.params.cid,  uid,unit, plate, vin, model, make, year,   status,picture,description,notes  );
        handleResponse(res,201,"Created Successfully",data)
    }
    catch(err){
        next(err)
    }
};

export const updateEquipment = async (req,res,next) => {
    const {  uid,unit, plate, vin, model, make, year,   status,picture,description,notes  }= req.body;
    try{
        const data = await updateEquipmentService(req.params.cid, req.params.id,  uid, unit, plate, vin, model, make, year, status,picture,description,notes );
        if(!data) return handleResponse(res,500,"data not found");
        handleResponse(res,200,"Updated Successfully",data);
    }
    catch(err){
        next(err)
    }
};
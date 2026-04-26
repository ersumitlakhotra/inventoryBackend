import handleResponse from "../middlewares/handleResponse.js";
import { createUsersService, getAllUsersService ,getUserAuthService, getUsersByIdService, updateUsersPictureService, updateUsersService} from "../models/userModel.js";

export const getUserAuth = async (req, res, next) => {
    try {
        const data = await getUserAuthService(req.params.username, req.params.password);
        handleResponse(res, 200, "Fetch Successfully", data);
    }
    catch (err) {
        next(err)
    }
}; 

export const getAllUsers = async (req, res, next) => {
    try {
        const data = await getAllUsersService(req.params.cid);
        handleResponse(res, 200, "Fetch Successfully", data);
    }
    catch (err) {
        next(err)
    }
}; 

export const getAllUsersById = async (req,res,next) => {
    try{
        const data= await getUsersByIdService(req.params.cid,req.params.id);
        if(!data) return handleResponse(res,500,"data not found");
        handleResponse(res,200,"Fetch via Id Successfully",data);
    }
    catch(err){
        next(err)
    }
};


export const createUsers = async (req,res,next) => {
    const {  fullname, username, password,  role, status}= req.body;
    try{
        const data = await createUsersService(req.params.cid, fullname, username, password,  role, status);
        handleResponse(res,201,"Created Successfully",data)
    }
    catch(err){
        next(err)
    }
};

export const updateUsers = async (req,res,next) => {
    const { fullname, username, password,  role, status }= req.body;
    try{
        const data = await updateUsersService(req.params.cid, req.params.id, fullname, username, password,  role, status );
        if(!data) return handleResponse(res,500,"data not found");
        handleResponse(res,200,"Updated Successfully",data);
    }
    catch(err){
        next(err)
    }
};

export const updateUserPicture = async (req,res,next) => {
    const { id, picture }= req.body;
    try{
        const user = await updateUsersPictureService(req.params.cid,id, picture);
        handleResponse(res,200,"Updated Successfully",user);
    }
    catch(err){
        next(err)
    }
};
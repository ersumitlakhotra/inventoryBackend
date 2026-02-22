import handleResponse from "../middlewares/handleResponse.js";
import { getAllUsersService ,getUserAuthService} from "../models/userModel.js";

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
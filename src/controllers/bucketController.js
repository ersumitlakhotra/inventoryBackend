import handleResponse from "../middlewares/handleResponse.js";
import { uploadToS3Service } from "../models/bucketModel.js";

export const uploadToS3 = async (req, res, next) => {
    const { folder, name, type } = req.body;
    try {
        const user = await uploadToS3Service(req.params.cid,folder, name, type);
        handleResponse(res, 200, "Upload Successfully", user);
    }
    catch (err) {
        next(err)
    }
};
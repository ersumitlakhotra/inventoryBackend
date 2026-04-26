import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3 = new S3Client({
  region: 'ca-central-1'
});

export const uploadToS3Service = async( cid,folder,name,type) => {
    try {
        if (!name || !folder|| !type || !cid) 
            return  {url:'', success:false, message:'Missing Information',path:''};

        const fileKey = `${cid}/${folder}/${name}`;

        const command = new PutObjectCommand({
            Bucket: 'sgltools',
            Key: fileKey,
            ContentType: type,
        });

        const url = await getSignedUrl(s3, command, { expiresIn: 120 });

        return {url:url, success:true, message:"Upload Successfully",path:fileKey}
    } catch (err) {
        return {url:'', success:false, message:err, path:''};
    }
} 
import { S3 } from "aws-sdk";
import { readFile } from "fs";
import { v4 } from "uuid";
import { services } from "../../backend";

const ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;

const BUCKET_NAME = process.env.S3_BUCKET;

export class FileService {

    private s3;

    constructor() {
        this.s3 = new S3({
            accessKeyId: ID,
            secretAccessKey: SECRET
        });
    }

    async saveFile(fileObj: any) {
        const file = await new Promise<Buffer>((resolve, reject) => {
            readFile(fileObj.path, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data)
            });
        });
        const key = `${fileObj.originalFilename}-${v4()}`;

        const id = await services.File.create({ path: key });

        this.s3.upload({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: file
        }, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            services.File.updateOne({ path: data.Location }, { path: key });
        });

        return id;
    }

    async getFile(query: any) {
        const file = await services.File.findOne(query);
        return file.path;
    }

}

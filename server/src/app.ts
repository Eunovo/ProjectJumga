import express from 'express';
import cors from 'cors';
import formData from 'express-form-data'
import os from 'os';
import { router } from './routes';

const app = express();

app.use(cors());

const options = {
    uploadDir: os.tmpdir(),
    // autoClean: true
};

app.use(formData.parse(options));

app.use(express.json());
app.use(router);

export { app };

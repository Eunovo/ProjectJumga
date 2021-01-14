import express from 'express';
import cors from 'cors';
import formData from 'express-form-data'
import os from 'os';
import path from 'path';
import { router } from './routes';

const app = express();

app.use(cors());

const options = {
    uploadDir: os.tmpdir(),
    // autoClean: true
};

app.use(formData.parse(options));

app.use(express.json());
app.use('/api', router);

app.use(express.static(path.join(__dirname, '../../client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build'))
})

export { app };

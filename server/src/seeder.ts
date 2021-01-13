import mongoose from "mongoose";
import { readFileSync } from "fs";
import { repos } from "./backend";
import './config';


const args = process.argv.slice(2);
const jsonString = readFileSync(args[0]).toString();
const seed = JSON.parse(jsonString);

const seedDB = async () => {
    const promises = Object.keys(seed)
        .map(async (key) => {
            const docs = seed[key];
            const promises = docs
                .map((doc: any) => repos[key].create(doc));
            return Promise.all(promises);
        });
    await Promise.all(promises);
    mongoose.connection.close();
}

seedDB();

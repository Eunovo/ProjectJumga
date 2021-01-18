import { mongoose } from "@eunovo/superbackend";
import { readFileSync } from "fs";
import { services } from "./backend";
import './config';


const args = process.argv.slice(2);
const jsonString = readFileSync(args[0]).toString();
const seed = JSON.parse(jsonString);

const seedDB = async () => {
    const promises = Object.keys(seed)
        .map(async (key) => {
            const docs = seed[key];
            const promises = docs
                .map(async (doc: any) => {
                    try {
                        await services[key].create(doc) 
                    } catch (error) {
                        console.log(key, error.message);
                        error?.errors && console.log(error?.errors);
                    }
                });
            return Promise.all(promises);
        });
    await Promise.all(promises);
    mongoose.connection.close();
}

seedDB();

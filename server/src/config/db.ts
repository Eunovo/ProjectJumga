import mongoose from "mongoose";

const DB_URL = process.env.DATABASE_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Database Connected");
});

mongoose.connection.on('disconnect', () => {
    console.log("Database disconnected");
});

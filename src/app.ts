import express, { Application } from "express";
import dotenv from "dotenv";
import path from "path";
//config dotenv
dotenv.config({ path: path.join(__dirname, "./.env") });



const app:Application = express();

app.listen(3000, () => {    
    console.log("Server started on port" + process.env.PORT);
});
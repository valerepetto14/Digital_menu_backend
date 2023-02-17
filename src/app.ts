import express, { Application } from "express";
import dotenv from "dotenv";
import path from "path";
import sequelize from "./database/connection";

//import models of database from "./models";
import { Category } from "./models/category";
import { Card } from "./models/card";
import { Ticket } from "./models/ticket";
import { Table } from "./models/table";
import { User } from "./models/user";
import { Review } from "./models/review";
import { Product } from "./models/product";
import './models/relationships'


//import routes
import { router as authRoute } from "./routes/auth";


//import middlewares
import { errorHandler } from "./middlewares/errosHandler";


//config dotenv
dotenv.config({ path: path.join(__dirname, "./.env") });



const app:Application = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRoute);

//error handler, this must be the last middleware, if not, it will not work, because it will not be able to catch the errors
app.use(errorHandler);

app.listen(3000, () => {
    try {
        console.log("Server started on port" + process.env.PORT);
        sequelize.sync().then(() => {
            console.log("base de datos creada");
        });
    } catch (error) {
        console.log(error);
    }
});
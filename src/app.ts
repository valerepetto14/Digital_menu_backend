import express, { Application } from "express";
import dotenv from "dotenv";
import path from "path";
import sequelize from "./database/connection";
import cookieParser from "cookie-parser";


//import models of database from "./models";
import "./models/relationships"
//import routes
import { router as authRoute } from "./routes/auth.routes";
import { router as userRoute } from "./routes/users.routes";
import { router as categoryRoute } from "./routes/categories.routes";
import { router as optIngredientRoute } from "./routes/optIngredients.routes";
import { router as productsRoute } from "./routes/product.routes";

//import middlewares
import { errorHandler } from "./middlewares/errosHandler.middleware";
import cors from "cors";
//config dotenv
dotenv.config({ path: path.join(__dirname, "./.env") });

const app:Application = express();

//middlewares
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//routes

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/categories", categoryRoute);
app.use("/optingredients", optIngredientRoute);
app.use("/products", productsRoute);
//error handler, this must be the last middleware, if not, it will not work, because it will not be able to catch the errors
app.use(errorHandler);

app.listen(3000, () => {
    try {
        console.log("Server started on port" + process.env.PORT);
        sequelize.sync({force: true}).then(() => {
            console.log("base de datos creada");
        });
    } catch (error) {
        console.log(error);
    }
});
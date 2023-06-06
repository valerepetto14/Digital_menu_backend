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
import { router as subCategoriesRoute } from "./routes/subCategories.routes";
import { router as ticketRoute } from "./routes/ticket.routes";
import { router as cardRoute } from "./routes/card.routes";
import { router as tableRoute } from "./routes/table.routes";
import { router as reviewRoute } from "./routes/reviews.routes";

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
app.use("/subcategories", subCategoriesRoute);
app.use("/tickets", ticketRoute);
app.use('/cards', cardRoute)
app.use('/tables', tableRoute)
app.use('/reviews', reviewRoute)

//error handler, this must be the last middleware, if not, it will not work, because it will not be able to catch the errors
app.use(errorHandler);

export const startServer = () => {
  app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
  });
}

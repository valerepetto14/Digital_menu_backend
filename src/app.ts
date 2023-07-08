import express, { Application } from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

//import models of database from "./models";
import "./models/relationships"
//import routes
import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";
import { categoriesRouter } from "./routes/categories";
import { optIngredientsRouter } from "./routes/optIngredients";
import { productsRouter } from "./routes/product";
import { subCategoriesRouter } from "./routes/subCategories";
import { ticketsRouter } from "./routes/ticket";
import { cardRouter } from "./routes/card";
import { tableRouter } from "./routes/table";
import { reviewsRouter } from "./routes/reviews";
import { orderRouter } from "./routes/order";
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

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/optingredients", optIngredientsRouter);
app.use("/products", productsRouter);
app.use("/subcategories", subCategoriesRouter);
app.use("/tickets", ticketsRouter);
app.use('/cards', cardRouter)
app.use('/tables', tableRouter)
app.use('/reviews', reviewsRouter)
app.use('/orders', orderRouter)

//error handler, this must be the last middleware, if not, it will not work, because it will not be able to catch the errors
app.use(errorHandler);

export const startServer = () => {
  app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
  });
}

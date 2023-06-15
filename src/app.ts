import express, { Application } from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

//import models of database from "./models";
import "./models/relationships"
//import routes
import { authRouter } from "./routes/auth.routes";
import { usersRouter } from "./routes/users.routes";
import { categoriesRouter } from "./routes/categories.routes";
import { optIngredientsRouter } from "./routes/optIngredients.routes";
import { productsRouter } from "./routes/product.routes";
import { subCategoriesRouter } from "./routes/subCategories.routes";
import { ticketsRouter } from "./routes/ticket.routes";
import { cardRouter } from "./routes/card.routes";
import { tableRouter } from "./routes/table.routes";
import { reviewsRouter } from "./routes/reviews.routes";

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

//error handler, this must be the last middleware, if not, it will not work, because it will not be able to catch the errors
app.use(errorHandler);

export const startServer = () => {
  app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
  });
}

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
//error handler, this must be the last middleware, if not, it will not work, because it will not be able to catch the errors
app.use(errorHandler);

const MAX_RETRIES = 3; // Número máximo de intentos de conexión
let currentRetry = 0; // Contador de intentos actual

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .sync({ force: true })
      .then(() => {
        console.log("Base de datos creada");
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const startServer = () => {
  app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
  });
}

const initializeApp = () => {
  connectToDatabase()
    .then(() => {
      startServer();
    })
    .catch((error) => {
      console.log(`Error al conectar a la base de datos: ${error.message}`);
      if (currentRetry < MAX_RETRIES) {
        currentRetry++;
        console.log(`Reintentando conexión (${currentRetry}/${MAX_RETRIES})...`);
        setTimeout(()=>{
            initializeApp()
        }, 5000)
      } else {
        console.log("Se alcanzó el número máximo de intentos. La aplicación no puede iniciar.");
      }
    });
}

initializeApp();
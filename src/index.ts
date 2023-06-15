import { startServer } from "./app";
import initServices from "./services";
import dotenv from "dotenv"
dotenv.config()

const MAX_RETRIES = 3; // Número máximo de intentos de conexión
let currentRetry = 0; // Contador de intentos actual

const initializeApp = async () => {
    try {
        await initServices()
        startServer()
    } catch (error) {
        if (currentRetry < MAX_RETRIES) {
            currentRetry++;
            console.log(error);
            console.log(`Retrying to connect to the database. Attempt ${currentRetry} of ${MAX_RETRIES}`);
            setTimeout(initializeApp, 5000);
        } else {
            console.log('Unable to connect to the database. Exiting process.');
            process.exit(1);
        }
    }
}
  
  initializeApp();
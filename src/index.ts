import sequelize from "./database/connection";
import { startServer } from "./app";


const MAX_RETRIES = 3; // Número máximo de intentos de conexión
let currentRetry = 0; // Contador de intentos actual

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .sync({ force: false })
      .then(() => {
        console.log("Base de datos creada");
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
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
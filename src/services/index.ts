import initDatabase from "./database/connection"
import { setVariables } from "../config"


const initServices = async () => {
    try {
        setVariables()
        await initDatabase()
    } catch (error) {
        throw error
    }
}

export default initServices;
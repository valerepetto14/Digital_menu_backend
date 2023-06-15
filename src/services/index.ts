import initDatabase from "./database/connection"
import { setVariables } from "../config"
import { startPopulate } from "./database/populate"

const initServices = async () => {
    try {
        setVariables()
        await initDatabase()
        await startPopulate()
    } catch (error) {
        throw error
    }
}

export default initServices;
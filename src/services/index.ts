import Database from './database/database';
import { setVariables } from '../config';
import { startPopulate } from './database/populate';

const db = Database.getInstance();

const initServices = async () => {
    try {
        setVariables();
        await db.initDatabase();
        await startPopulate();
    } catch (error) {
        throw error;
    }
};

export default initServices;

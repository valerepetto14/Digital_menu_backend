import Database from './database/database';
import { setVariables } from '../config';
import { startPopulate } from './database/populate';
import S3 from './s3';

export const s3 = S3.getInstance();
const db = Database.getInstance();

const initServices = async () => {
    try {
        setVariables();
        await db.initDatabase();
        await s3.initBucket();
        await startPopulate();
    } catch (error) {
        throw error;
    }
};

export default initServices;

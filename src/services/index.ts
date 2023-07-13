import database from './database/database';
import Bucket from './bucket';

import { setVariables } from '../config';
import { startPopulate } from './database/populate';

const db = new database();
const bucket = Bucket.getInstance();

const initServices = async () => {
    try {
        setVariables();
        await db.initDatabase();
        await bucket.initBucket();
        await startPopulate();
    } catch (error) {
        throw error;
    }
};

export default initServices;

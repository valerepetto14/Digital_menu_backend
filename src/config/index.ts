import DB from './db';

const db = new DB();

export const setVariables = () => {
    db.setVariables();
    console.log('the Variables has been established successfully.')
}

export {
    db
}
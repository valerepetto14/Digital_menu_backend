import { UserModel } from "../models/user";

export const checkIfUserExists = async (email: string):Promise<boolean> => {
    try {
        const user = await UserModel.findOne({where: {email: email}});
        console.log('user found', user);
        if (user) {
            return true;
        }
        return false;
    } catch (error) {
        throw (error);
    }
};
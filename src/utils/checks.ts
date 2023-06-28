import { User } from '../models/user';

export const checkIfUserExists = async (email: string): Promise<boolean> => {
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

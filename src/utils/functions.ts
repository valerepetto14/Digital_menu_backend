import { Category } from "../models/category";
import { SubCategory } from "../models/subCategory";
import { OptIngredient } from "../models/optIngredient";

export const pagination = (limit: number, page: number) => {
    return {
        limite: limit ? parseInt(limit.toString()) : 10,
        pagina: page ? parseInt(page.toString()) : 1,
        offset: page ? page * (limit ? limit : 10) - (limit ? limit : 10) : 0
    }
};

export const checkCategoryExists = async (id: string) => {
    const category = await Category.findByPk(id);
    if (category) 
        return true;
    return false;
};

export const checkSubCategoryExists = async (id: string) => {
    try {
        const subCategory = await SubCategory.findByPk(id);
        if (subCategory) 
            return true;
        return false;  
    } catch (error) {
        
    }
};

export const checkOptIngredientExists = async (ids:Array<string>) => {
    try {
        for (let i of ids) {
            const optIngredient = await OptIngredient.findByPk(i);
            if (!optIngredient) 
                return false;
        }
        return true;
    } catch (error) {
        
    }
}

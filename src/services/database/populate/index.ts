import { Category } from "../../../models/category";
import { SubCategory } from "../../../models/subCategory";
import { OptIngredient } from "../../../models/optIngredient";
import { Product } from "../../../models/product";
import { categoriesData } from "./categories";
import { subCategoriesData } from "./subcategories";
import { optIngredientsData } from "./optIngredients";
import { productsData } from "./products";


export const startPopulate = async () => {
    try {
        if(process.env.NODE_ENV === "development" && process.env.POPULATE_DB === "true") {
            console.log("POPULATING DATABASE");
            await Category.bulkCreate(categoriesData);
            await SubCategory.bulkCreate(subCategoriesData);
            await OptIngredient.bulkCreate(optIngredientsData);
            await Product.bulkCreate(productsData);
            console.log("Database populated successfully");
        }
    } catch (error) {
        throw error
    }
}

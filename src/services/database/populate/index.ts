import { Category } from "../../../models/category";
import { SubCategory } from "../../../models/subCategory";
import { OptIngredient } from "../../../models/optIngredient";
import { Product } from "../../../models/product";
import { Card } from "../../../models/card";
import { Table } from "../../../models/table";
import { tablesData } from "./tables";
import { categoriesData } from "./categories";
import { subCategoriesData } from "./subcategories";
import { optIngredientsData } from "./optIngredients";
import { productsData } from "./products";
import { cardsData } from "./cards";

export const startPopulate = async () => {
    try {
        if(process.env.NODE_ENV === "development" && process.env.POPULATE_DB === "true") {
            console.log("POPULATING DATABASE");
            await Category.bulkCreate(categoriesData);
            await SubCategory.bulkCreate(subCategoriesData);
            await Card.bulkCreate(cardsData);
            await Table.bulkCreate(tablesData);
            await OptIngredient.bulkCreate(optIngredientsData);
            await Product.bulkCreate(productsData);
            console.log("Database populated successfully");
        }
    } catch (error) {
        throw error
    }
}

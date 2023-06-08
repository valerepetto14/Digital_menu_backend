import { Category } from "../../models/category";
import { SubCategory } from "../../models/subCategory";
import { OptIngredient } from "../../models/optIngredient";
import { Product } from "../../models/product";
import { categoriesData } from "./categories";
import { subCategoriesData } from "./subcategories";
import { optIngredientsData } from "./optIngredients";
import { productsData } from "./products";


const startPopulate = async () => {
    await Category.bulkCreate(categoriesData);
    await SubCategory.bulkCreate(subCategoriesData);
    await OptIngredient.bulkCreate(optIngredientsData);
    await Product.bulkCreate(productsData);
}

startPopulate()
.then(() => {
    console.log('Succesfully populated')
})
.catch((error)=>{
    console.log(error);
})
import { CategoryModel } from "../../models/category";
import { SubCategoryModel } from "../../models/subCategory";
import { OptIngredientModel } from "../../models/optIngredient";
import { ProductModel } from "../../models/product";
import { categoriesData } from "./categories";
import { subCategoriesData } from "./subcategories";
import { optIngredientsData } from "./optIngredients";
import { productsData } from "./products";


const startPopulate = async () => {
    await CategoryModel.bulkCreate(categoriesData);
    await SubCategoryModel.bulkCreate(subCategoriesData);
    await OptIngredientModel.bulkCreate(optIngredientsData);
    await ProductModel.bulkCreate(productsData);
}

startPopulate()
.then(() => {
    console.log('Succesfully populated')
})
.catch((error)=>{
    console.log(error);
})
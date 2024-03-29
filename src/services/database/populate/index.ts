import { Category } from '../../../models/category';
import { SubCategory } from '../../../models/subCategory';
import { OptIngredient } from '../../../models/optIngredient';
import { OptIngredientProduct } from '../../../models/optIngredientProduct';
import { Product } from '../../../models/product';
import { categoriesData } from './categories';
import { subCategoriesData } from './subcategories';
import { optIngredientsData } from './optIngredients';
import { optIngredientProductData } from './optIngredientProduct';
import { productsData } from './products';

export const startPopulate = async () => {
    try {
        if (process.env.NODE_ENV === 'development' && process.env.POPULATE_DB === 'true') {
            console.log('POPULATING DATABASE');
            await Category.bulkCreate(categoriesData);
            await SubCategory.bulkCreate(subCategoriesData);
            await OptIngredient.bulkCreate(optIngredientsData);
            await Product.bulkCreate(productsData);
            await OptIngredientProduct.bulkCreate(optIngredientProductData);
            console.log('Database populated successfully');
        }
    } catch (error) {
        throw error;
    }
};

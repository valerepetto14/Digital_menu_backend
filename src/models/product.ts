import { Model, DataTypes, Sequelize } from 'sequelize';
import { Category } from './category';
import { SubCategory } from './subCategory';
import { OptIngredient } from './optIngredient';
import { ProductStatus } from '../utils/types/interfaces';
import { OptIngredientProduct } from './optIngredientProduct';

export class Product extends Model {
    public id!: string;
    public name!: string;
    public description!: string;
    public currentPrice!: string;
    public status!: ProductStatus.ACTIVE | ProductStatus.INACTIVE | ProductStatus.SIN_STOCK;
    public image!: string;
    public cookingTime!: number;
    public categoryId!: string;
    public subCategoryId!: string;
    public category!: Category;
    public subCategory!: SubCategory;
    public optIngredients!: OptIngredient[];
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public removeOptIngredients!: (optIngredients: OptIngredient[], options?: Object) => Promise<any>;
    public setOptIngredients!: (optIngredients: OptIngredient[], options?: Object) => Promise<any>;
    public addOptIngredients = async (optIngredients: OptIngredient[], options?: Object) => {
        try {
            await OptIngredientProduct.bulkCreate(
                optIngredients.map((optIngredient) => ({
                    productId: this.id,
                    optIngredientId: optIngredient.id,
                    defaultQuantity: optIngredient.defaultQuantity,
                    maxQuantity: optIngredient.maxQuantity,
                    variants: optIngredient.variants,
                }))
            );
        } catch (error) {
            throw error;
        }
    };
}

export const initProduct = (sequelize: Sequelize) => {
    Product.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            currentPrice: {
                type: DataTypes.DECIMAL(10, 2),
                defaultValue: 0,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING(20),
                values: [ProductStatus.ACTIVE, ProductStatus.INACTIVE, ProductStatus.SIN_STOCK],
                defaultValue: ProductStatus.ACTIVE,
            },
            image: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            cookingTime: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            categoryId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: Category,
                    key: 'id',
                },
            },
            subCategoryId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: SubCategory,
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'products',
            timestamps: true,
        }
    );
};

import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/connection';
import { CategoryModel } from './category';
import { SubCategoryModel } from './subCategory';
import { OptIngredientModel } from './optIngredient';

export class ProductModel extends Model {
    public id!: string;
    public name!: string;
    public description!: string;
    public currentPrice!: string;
    public status!: boolean;
    public available!: boolean;
    public image!: string;
    public categoryId!: string;
    public subCategoryId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public addOptIngredients!: (optIngredients: OptIngredientModel[], options?: Object) => Promise<any>;
}

ProductModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    currentPrice: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    image: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references : {
          model: CategoryModel,
          key: 'id'
        }
    },
    subCategoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references : {
          model: SubCategoryModel,
          key: 'id'
        }
    }
    },{
      sequelize,
      tableName: 'products',
      timestamps: true
    }
);

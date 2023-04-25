import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/connection';
import { CategoryModel } from './category';
import { OptIngredientModel, OptIngredient } from './optIngredient';

export interface Product extends Model {
    id: string;
    name: string;
    description: string;
    currentPrice: number;
    status: boolean;
    available: boolean;
    categoryId: string; // foreign key
    createdAt: Date;
    updatedAt: Date;
    addOptIngredients: (optIngredients: OptIngredient[], options?: Object) => Promise<any>;
  }

export const ProductModel = sequelize.define<Product>('products',{
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    currentPrice: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    image : {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CategoryModel,
        key: 'id'
      }
    }
}, {
	timestamps: true
});

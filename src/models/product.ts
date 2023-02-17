import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/connection';
import { CategoryModel } from './category';

export class Product extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public currentPrice!: number;
  public status!: boolean;
  public available!: boolean;
  public categoryId!: string; // foreign key

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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

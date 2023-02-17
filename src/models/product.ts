import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/connection';
import Category from './category';

class Product extends Model {
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

Product.init({
  id: {
    type: DataTypes.UUIDV4,
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
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, {
  tableName: 'products',
  sequelize
});

// Add association to category model
Product.hasOne(Category, {
    foreignKey: 'categoryId'
});  

export default Product;
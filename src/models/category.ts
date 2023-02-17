import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import Product from './product';

class Category extends Model {
  public id!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init({
  id: {
    type: DataTypes.UUIDV4,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'categories',
  sequelize
});

// Add association to Product model
Category.hasMany(Product, {
  foreignKey: 'categoryId'
});

export default Category;
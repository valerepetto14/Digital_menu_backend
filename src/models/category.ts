import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export class Category extends Model {
  public id!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const CategoryModel = sequelize.define('categories', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },{
    timestamps:true
  }
)
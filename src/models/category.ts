import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export interface Category extends Model {
    id: string;
    tile: string;
    createdAt: Date;
    updatedAt: Date;
}

export const CategoryModel = sequelize.define<Category>('categories', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
  },{
    timestamps:true
  }
)
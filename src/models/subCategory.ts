import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { CategoryModel } from './category';

export class SubCategoryModel extends Model {
  public id!: string;
  public title!: string;
  public status!: boolean;
  public categoryId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SubCategoryModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references : {
          model: CategoryModel,
          key: 'id'
        }
    }
  },
  {
    sequelize,
    tableName: 'subCategories',
    timestamps: true
  }
);

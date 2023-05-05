import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export class OptIngredientModel extends Model {
  public id!: string;
  public name!: string;
  public price?: string;
  public addOrRem!: 'ADD' | 'REMOVE';
  public status!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OptIngredientModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    price: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: '0'
    },
    addOrRem: {
      type: DataTypes.ENUM('ADD', 'REMOVE'),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'optIngredients',
    timestamps: true
  }
);

export default OptIngredientModel;
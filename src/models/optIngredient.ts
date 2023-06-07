import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export class OptIngredient extends Model {
  public id!: string;
  public name!: string;
  public price?: string;
  public status!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OptIngredient.init(
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

export default OptIngredient;
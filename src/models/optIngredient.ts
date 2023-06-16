import { Model, DataTypes, Sequelize } from 'sequelize';
import { OptIngredientStatus } from '../utils/types/interfaces';

export class OptIngredient extends Model {
  public id!: string;
  public name!: string;
  public price?: string;
  public status!: OptIngredientStatus.ACTIVE | OptIngredientStatus.INACTIVE | OptIngredientStatus.SIN_STOCK;
  public variants?: Array<Object>;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export const initOptIngredient = (sequelize: Sequelize) => {
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
        type: DataTypes.STRING(20),
        values: [OptIngredientStatus.ACTIVE, OptIngredientStatus.INACTIVE, OptIngredientStatus.SIN_STOCK],
        defaultValue: OptIngredientStatus.ACTIVE
      },
      variants: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
        defaultValue: []
      },
    },
    {
      sequelize,
      tableName: 'optIngredients',
      timestamps: true
    }
  );
};

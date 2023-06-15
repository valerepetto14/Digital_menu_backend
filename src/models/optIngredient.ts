import { Model, DataTypes, Sequelize } from 'sequelize';

export class OptIngredient extends Model {
  public id!: string;
  public name!: string;
  public price?: string;
  public status!: boolean;
  public variants?: Array<JSON>;
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
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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

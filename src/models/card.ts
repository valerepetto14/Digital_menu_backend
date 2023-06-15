import { Model, DataTypes, Sequelize } from 'sequelize';

export class Card extends Model {
  public id!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initCard = (sequelize: Sequelize) => {
    Card.init(
        {
          id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        },
        {
          sequelize,
          tableName: 'cards',
          timestamps: true
        }
      );
}

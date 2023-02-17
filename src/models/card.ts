import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export class Card extends Model {
  public id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const CardModel = sequelize.define<Card>('cards',
	{
	id: {
		type: DataTypes.UUID,
		primaryKey: true
	}
	},{
		timestamps:true
  	}
);
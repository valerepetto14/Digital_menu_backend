import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { Ticket } from './ticket';

export class Card extends Model {
  public id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const CardModel = sequelize.define('cards',
	{
	id: {
		type: DataTypes.STRING,
		primaryKey: true
	}
	},{
		timestamps:true
  	}
);
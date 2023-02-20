import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export interface Card extends Model {
  	id: string;
	createdAt: Date;
	updatedAt: Date;
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
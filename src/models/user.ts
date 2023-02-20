import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/connection';

export interface User extends Model {
  	id: string;
  	email: string;
  	firstName: string;
  	lastName: string;
  	phoneNumber: string;
  	type: string;
  	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export const UserModel = sequelize.define<User>('users',{
	id: {
		type: DataTypes.UUID,
		primaryKey: true
	},
	email: {
		type: DataTypes.STRING(60),
		allowNull: false,
	},
	firstName: {
		type: DataTypes.STRING(20),
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING(20),
		allowNull: false,
	},
	phoneNumber: {
		type: DataTypes.STRING(15),
		allowNull: false,
	},
	type: {
		type: DataTypes.STRING(20),
		allowNull: false,
		validate: {
			isIn: [['admin', 'employee']]
		}
	},
	password: {
		type: DataTypes.STRING(256),
		allowNull: false,
	}
}, {
	timestamps: true
});

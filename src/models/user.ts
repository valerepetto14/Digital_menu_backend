import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { Session } from './session';
import { Ticket } from './ticket';

export class User extends Model {
  public id!: string;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public phoneNumber!: string;
  public type!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const UserModel = sequelize.define('users',{
	id: {
		type: DataTypes.STRING,
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
	phoneMumber: {
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


export default User;
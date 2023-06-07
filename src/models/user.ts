import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/connection';

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

User.init({
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
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
	sequelize,
	tableName: 'users',
	timestamps: true
});

export default User;
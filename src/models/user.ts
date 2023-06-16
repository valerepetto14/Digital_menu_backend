import { Model, DataTypes, Sequelize } from 'sequelize';
import { UserTypes } from '../utils/types/interfaces';

export class User extends Model {
	public id!: string;
	public email!: string;
	public firstName!: string;
	public lastName!: string;
	public phoneNumber!: string;
	public type!: UserTypes.ADMIN | UserTypes.EMPLOYEE;
	public password!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export const initUser = (sequelize: Sequelize) => {
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
			values: [UserTypes.ADMIN, UserTypes.EMPLOYEE],
			defaultValue: UserTypes.EMPLOYEE
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
}
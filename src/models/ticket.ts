import { Model, DataTypes, BelongsToManyAddAssociationMixin} from 'sequelize';
import sequelize from '../database/connection';
import { CardModel } from './card';
import UserModel from './user';
import TableModel from './table';
import { ProductModel } from './product';

export class TicketModel extends Model {
	public id!: string;
	public tableId!: string;
	public cardId!: string;
	public userId!: string;
	public status!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	//function that add products to ticket because of the many to many relationship
	public addProduct!: BelongsToManyAddAssociationMixin<ProductModel, string>;
}

TicketModel.init({
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	tableId: {
		type: DataTypes.UUID,
		allowNull: false,
		references : {
			model: TableModel,
			key: 'id'
		}
	},
	cardId: {
		type: DataTypes.UUID,
		allowNull: false,
		references : {
			model: CardModel,
			key: 'id'
		}
	},
	userId: {
		type: DataTypes.UUID,
		allowNull: false,
		references : {
			model: UserModel,
			key: 'id'
		}
	},
	status: {
		type: DataTypes.STRING(20),
		allowNull: false,
		validate: {
		isIn: [['send', 'inProgress', 'done']]
		}
	}
}, {
	sequelize,
	tableName: 'tickets',
	timestamps: true
});
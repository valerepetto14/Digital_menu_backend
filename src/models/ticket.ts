import { Model, DataTypes, BelongsToManyAddAssociationMixin, Sequelize} from 'sequelize';
import { Table } from './table';
import { Product } from './product';

export class Ticket extends Model {
	public id!: string;
	public tableId!: string;
	public cardId!: string;
	public userId!: string;
	public status!: string;
	public products!: Product[];
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	//function that add products to ticket because of the many to many relationship
	public addProduct!: BelongsToManyAddAssociationMixin<Product, string>;
}


export const initTicket = (sequelize: Sequelize) => {
	Ticket.init({
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		tableId: {
			type: DataTypes.UUID,
			allowNull: false,
			references : {
				model: Table,
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
}
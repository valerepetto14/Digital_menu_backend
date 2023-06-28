import { Model, DataTypes, BelongsToManyAddAssociationMixin, Sequelize} from 'sequelize';
import { Table } from './table';
import { Card } from './card';
import { Product } from './product';
import { TicketRow } from './ticketsRow';
import { TicketStatus } from '../utils/types/interfaces';
import { Category } from './category';
import { SubCategory } from './subCategory';

export class Ticket extends Model {
	public id!: string;
	public tableId!: string;
	public cardId!: string;
	public userId!: string;
	public status!: TicketStatus.SEND | TicketStatus.IN_PROGRESS | TicketStatus.DONE;
	public products!: Product[];
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	//function that add products to ticket because of the many to many relationship
	public addProduct!: BelongsToManyAddAssociationMixin<Product, string>;

	public getTicketRows = async () => {
		try {
			const ticketRows = await TicketRow.findAll({
				where: {
					ticketId: this.id
				},
				attributes: ['quantity', 'unitPrice', 'optIngredients'],
				include: [
					{
						model: Product,
						attributes: ['id', 'name', 'currentPrice'],
						include: [
							{
								model: Category,
								attributes: ['title'],
								as: 'categories'
							},
							{
								model: SubCategory,
								attributes: ['title'],
								as: 'subCategories'
							}
						]
					}
				]
			});
			return ticketRows;	
		} catch (error) {
			throw error;
		}
	}
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
		cardId: {
			type: DataTypes.UUID,
			allowNull: false,
			references : {
				model: Card,
				key: 'id'
			}
		},
		status: {
			type: DataTypes.STRING(20),
			defaultValue: TicketStatus.SEND,
			values: [TicketStatus.SEND, TicketStatus.IN_PROGRESS, TicketStatus.DONE],
		}
	}, {
		sequelize,
		tableName: 'tickets',
		timestamps: true
	});
}
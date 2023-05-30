// import { Model, DataTypes } from 'sequelize';
// import sequelize from '../database/connection';
// import { OptIngredientModel } from './optIngredient';
// import { TicketRowModel } from './ticketsRow';

// export class TicketRowOptIngredientModel extends Model {
//     public id!: string;
//     public ticketRowId!: string;
//     public optIngredientId!: string;
//     public selected!: boolean;
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
// }

// TicketRowOptIngredientModel.init({
//     id: {
//         type: DataTypes.UUID,
//         primaryKey: true
//     },
//     ticketRowId: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         references : {
//             model: TicketRowModel,
//             key: 'id'
//         }
//     },
//     optIngredientId: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         references : {
//             model: OptIngredientModel,
//             key: 'id'
//         }
//     },
//     selected: {
//         type: DataTypes.BOOLEAN
//     }
// }, {
//     sequelize,
//     tableName: 'ticketRowOptIngredient',
//     timestamps: true
// })

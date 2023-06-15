import { Model, DataTypes, Sequelize } from 'sequelize';
import { Ticket } from './ticket';

export class Review extends Model {
    public id!: string;
    public ticketId!: string;
    public service!: number;
    public attention!: number;
    public environment!: number;
    public description!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const initReview = (sequelize: Sequelize) => {
    Review.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        ticketId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Ticket,
                key: 'id'
            }
        },
        service: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[1, 2, 3, 4, 5]],
                isInt : true
            }
        },
        attention: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[1, 2, 3, 4, 5]],
                isInt : true
            }
        },
        environment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[1, 2, 3, 4, 5]],
                isInt : true
            }
        },
        food: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isIn: [[1, 2, 3, 4, 5]],
                isInt : true
            }
        }
    }, {
        sequelize,
        tableName: 'reviews',
        timestamps: true
    });
}
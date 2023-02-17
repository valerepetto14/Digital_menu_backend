import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';


export class Session extends Model {
  public id!: string;
  public token!: string;
  public userId!: string;
  public expiration!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const SessionModel = sequelize.define('sessions',{
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
        model: 'users',
        key: 'id'
        }
    },
    expiration: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true
});

import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import { UserModel } from './user';

export class Session extends Model {
  public id!: string;
  public token!: string;
  public userId!: string;
  public expiration!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const SessionModel = sequelize.define<Session>('sessions',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: true
});

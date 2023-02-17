import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import User from './user';

class Session extends Model {
  public id!: string;
  public token!: string;
  public userId!: string;
  public expiration!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Session.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiration: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize
});

// Add association to User model
Session.belongsTo(User, {
  foreignKey: 'userId'
});

export default Session;
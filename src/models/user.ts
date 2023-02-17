import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import Session from './session';
import Ticket from './ticket';

class User extends Model {
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
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneMumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize
});

// Add association to Ticket model
User.hasMany(Ticket, {
  foreignKey: 'ticketId'
});

// Add association to Session model
User.belongsTo(Session, {
    foreignKey: 'sessionId'
  });

export default User;
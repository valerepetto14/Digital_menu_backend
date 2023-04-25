import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

export interface OptIngredient extends Model {
    id: string;
    name: string;
    addOrRem: boolean;

    createdAt: Date;
    updatedAt: Date;
}

export const OptIngredientModel = sequelize.define<OptIngredient>('optIngredients', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    price: {
        type: DataTypes.STRING(15),
        allowNull: true,
        defaultValue: '0'
    },
    addOrRem: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
			isIn: [['ADD', 'REMOVE']]
		}
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
  },{
    timestamps:true
  }
)
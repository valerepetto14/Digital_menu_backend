import { Model, DataTypes, Sequelize, Identifier } from 'sequelize';
import { CARD_NOT_FOUND } from '../utils/errors';
export class Card extends Model {
  public id!: string;
  public number!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initCard = (sequelize: Sequelize) => {
    Card.init(
        {
          id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
          number: {
            type: DataTypes.INTEGER,
          },
        },
        {
          sequelize,
          tableName: 'cards',
          timestamps: true
        }
      );
}


export const getCard = async (cardId: Identifier ): Promise<Card> => {
	try {
		const card = await Card.findByPk(cardId);
		if (card) {
      return card;
    }
    throw CARD_NOT_FOUND;
	} catch (error) {
		throw error;
	}
}
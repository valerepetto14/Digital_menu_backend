import { Model, DataTypes, Sequelize } from 'sequelize';
import { CategoryStatus } from '../utils/types/interfaces';
import { IUpdateCategory } from '../utils/types/interfaces';
export class Category extends Model {
	public id!: string;
	public title!: string;
	public status!: CategoryStatus.ACTIVE | CategoryStatus.INACTIVE;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	updateCategory = async (body: IUpdateCategory) => {
		try {
			//update the category and you can add the subcategories
			const categoryUpdated = await Category.update(
				{
					title: body.title,
					status: body.status
				},
				{
					where: {
						id: this.id
					}
				}
			);
			//check the ids of the subcategories and 
		} catch (error) {
			throw error;
		}
  	};

  }

export const initCategory = (sequelize: Sequelize) => {
  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      status: {
        type: DataTypes.STRING(20),
        values: [CategoryStatus.ACTIVE, CategoryStatus.INACTIVE],
        defaultValue: CategoryStatus.ACTIVE
      }
    },
    {
      sequelize,
      tableName: 'categories',
      timestamps: true
    }
  );
};

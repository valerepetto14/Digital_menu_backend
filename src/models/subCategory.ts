import { Model, DataTypes, Sequelize } from 'sequelize';
import { Category} from './category';
import { SubCategoryStatus } from '../utils/types/interfaces';

export class SubCategory extends Model {
  public id!: string;
  public title!: string;
  public status!: SubCategoryStatus.ACTIVE | SubCategoryStatus.INACTIVE;
  public categoryId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initSubCategory = (sequelize: Sequelize) => {
  SubCategory.init(
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
        values: [SubCategoryStatus.ACTIVE, SubCategoryStatus.INACTIVE],
        defaultValue: SubCategoryStatus.ACTIVE
      },
      categoryId: {
          type: DataTypes.UUID,
          allowNull: false,
          references : {
            model: Category,
            key: 'id'
          }
      }
    },
    {
      sequelize,
      tableName: 'subCategories',
      timestamps: true
    }
  );
};

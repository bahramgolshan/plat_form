import { DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('review_attributes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    review_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'reviews',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    attribute_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'category_attributes',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });

  await queryInterface.addIndex('review_attributes', ['review_id']);
  await queryInterface.addIndex('review_attributes', ['attribute_id']);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('review_attributes');
}
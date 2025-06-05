import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      category_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      parent_category_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Categories',
          key: 'category_id',
        },
        onDelete: 'SET NULL',
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      icon: DataTypes.STRING(255),
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      metadata: DataTypes.JSONB,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: DataTypes.DATE,
    });

    await queryInterface.addIndex('Categories', ['parent_category_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Categories');
  },
};
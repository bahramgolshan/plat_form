import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CategoryAttributes', {
      attribute_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'category_id',
        },
        onDelete: 'CASCADE',
      },
      attribute_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      attribute_type: {
        type: DataTypes.ENUM('string', 'number', 'date', 'boolean', 'select'),
        allowNull: false,
      },
      is_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sort_order: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: DataTypes.DATE,
    });

    await queryInterface.addIndex('CategoryAttributes', ['category_id', 'attribute_name'], {
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('CategoryAttributes');
  },
};
import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Listings', {
      listing_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      supplier_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'category_id',
        },
        onDelete: 'RESTRICT',
      },
      vertical_extension_id: DataTypes.UUID,
      vertical_extension_type: DataTypes.STRING(50),
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: DataTypes.TEXT,
      base_price: DataTypes.DECIMAL(10, 2),
      currency: DataTypes.STRING(3),
      status: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        allowNull: false,
      },
      instant_bookable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      cancellation_policy_id: DataTypes.UUID,
      average_rating: DataTypes.DECIMAL(3, 2),
      review_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
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

    await queryInterface.addIndex('Listings', ['category_id']);
    await queryInterface.addIndex('Listings', ['supplier_id']);
    await queryInterface.addIndex('Listings', ['status']);
    await queryInterface.addIndex('Listings', ['vertical_extension_type']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Listings');
  },
};
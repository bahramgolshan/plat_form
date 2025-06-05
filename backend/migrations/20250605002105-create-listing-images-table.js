import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ListingImages', {
      image_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      listing_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Listings',
          key: 'listing_id',
        },
        onDelete: 'CASCADE',
      },
      image_url: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      caption: DataTypes.STRING(255),
      sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: DataTypes.DATE,
    });

    await queryInterface.addIndex('ListingImages', ['listing_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ListingImages');
  },
};
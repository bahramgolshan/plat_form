import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ListingExclusions', {
      exclusion_id: {
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
      exclusion_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      reason: DataTypes.STRING(255),
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: DataTypes.DATE,
    });

    await queryInterface.addIndex('ListingExclusions', ['listing_id', 'exclusion_date'], {
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ListingExclusions');
  },
};
import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ListingTags', {
      listing_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Listings',
          key: 'listing_id',
        },
        onDelete: 'CASCADE',
      },
      tag_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Tags',
          key: 'tag_id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint('ListingTags', {
      fields: ['listing_id', 'tag_id'],
      type: 'primary key',
      name: 'listing_tags_pkey',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ListingTags');
  },
};
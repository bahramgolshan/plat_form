import { DataTypes } from 'sequelize'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('listing_images', {
      image_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      listing_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'listings',
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
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted_at: DataTypes.DATE,
    })

    await queryInterface.addIndex('listing_images', ['listing_id'])
  },

  async down(queryInterface) {
    await queryInterface.dropTable('listing_images')
  },
}

import { DataTypes } from 'sequelize'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('listing_exclusions', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      listing_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'listings',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      exclusion_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      reason: DataTypes.STRING(255),
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted_at: DataTypes.DATE,
    })

    await queryInterface.addIndex('listing_exclusions', ['listing_id', 'exclusion_date'], {
      unique: true,
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('listing_exclusions')
  },
}

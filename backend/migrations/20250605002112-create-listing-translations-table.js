import { DataTypes } from 'sequelize'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('listing_translations', {
      translation_id: {
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
      language_code: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: DataTypes.TEXT,
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })

    await queryInterface.addIndex('listing_translations', ['listing_id', 'language_code'], {
      unique: true,
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('listing_translations')
  },
}

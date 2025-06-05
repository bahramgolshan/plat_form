import { DataTypes } from 'sequelize'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tags', {
      tag_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: DataTypes.DATE,
    })

    await queryInterface.addIndex('tags', ['name'], {
      unique: true,
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tags')
  },
}

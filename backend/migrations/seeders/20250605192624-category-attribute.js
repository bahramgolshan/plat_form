import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    // Get category IDs
    const categories = await queryInterface.sequelize.query('SELECT id, name FROM categories;')

    const toursCategory = categories[0].find((c) => c.name === 'Tours')
    const activitiesCategory = categories[0].find((c) => c.name === 'Activities')
    const transportCategory = categories[0].find((c) => c.name === 'Transportation')

    console.log('here \n', toursCategory, activitiesCategory, transportCategory)
    await queryInterface.bulkInsert(
      'category_attributes',
      [
        // Tours attributes
        {
          id: uuidv4(),
          category_id: toursCategory.id,
          name: 'Duration',
          type: 'string',
          is_required: true,
          sort_order: 1,
          created_at: new Date(),
        },
        {
          id: uuidv4(),
          category_id: toursCategory.id,
          name: 'Group Size',
          type: 'number',
          is_required: false,
          sort_order: 2,
          created_at: new Date(),
        },
        {
          id: uuidv4(),
          category_id: toursCategory.id,
          name: 'Includes Meals',
          type: 'boolean',
          is_required: false,
          sort_order: 3,
          created_at: new Date(),
        },

        // Activities attributes
        {
          id: uuidv4(),
          category_id: activitiesCategory.id,
          name: 'Difficulty Level',
          type: 'select',
          is_required: true,
          sort_order: 1,
          created_at: new Date(),
        },
        {
          id: uuidv4(),
          category_id: activitiesCategory.id,
          name: 'Equipment Provided',
          type: 'boolean',
          is_required: false,
          sort_order: 2,
          created_at: new Date(),
        },

        // Transportation attributes
        {
          id: uuidv4(),
          category_id: transportCategory.id,
          name: 'Vehicle Type',
          type: 'string',
          is_required: true,
          sort_order: 1,
          created_at: new Date(),
        },
        {
          id: uuidv4(),
          category_id: transportCategory.id,
          name: 'Passenger Capacity',
          type: 'number',
          is_required: true,
          sort_order: 2,
          created_at: new Date(),
        },
      ],
      {
        ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('category_attributes', null, {})
  },
}

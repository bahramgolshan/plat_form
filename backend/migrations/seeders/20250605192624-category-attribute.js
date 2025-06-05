import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    // Get category IDs
    const categories = await queryInterface.sequelize.query(
      'SELECT category_id, name FROM categories;'
    )

    const toursCategory = categories[0].find((c) => c.name === 'Tours')
    const activitiesCategory = categories[0].find((c) => c.name === 'Activities')
    const transportCategory = categories[0].find((c) => c.name === 'Transportation')

    await queryInterface.bulkInsert(
      'category_attributes',
      [
        // Tours attributes
        {
          attribute_id: uuidv4(),
          category_id: toursCategory.category_id,
          attribute_name: 'Duration',
          attribute_type: 'string',
          is_required: true,
          sort_order: 1,
          created_at: new Date(),
        },
        {
          attribute_id: uuidv4(),
          category_id: toursCategory.category_id,
          attribute_name: 'Group Size',
          attribute_type: 'number',
          is_required: false,
          sort_order: 2,
          created_at: new Date(),
        },
        {
          attribute_id: uuidv4(),
          category_id: toursCategory.category_id,
          attribute_name: 'Includes Meals',
          attribute_type: 'boolean',
          is_required: false,
          sort_order: 3,
          created_at: new Date(),
        },

        // Activities attributes
        {
          attribute_id: uuidv4(),
          category_id: activitiesCategory.category_id,
          attribute_name: 'Difficulty Level',
          attribute_type: 'select',
          is_required: true,
          sort_order: 1,
          created_at: new Date(),
        },
        {
          attribute_id: uuidv4(),
          category_id: activitiesCategory.category_id,
          attribute_name: 'Equipment Provided',
          attribute_type: 'boolean',
          is_required: false,
          sort_order: 2,
          created_at: new Date(),
        },

        // Transportation attributes
        {
          attribute_id: uuidv4(),
          category_id: transportCategory.category_id,
          attribute_name: 'Vehicle Type',
          attribute_type: 'string',
          is_required: true,
          sort_order: 1,
          created_at: new Date(),
        },
        {
          attribute_id: uuidv4(),
          category_id: transportCategory.category_id,
          attribute_name: 'Passenger Capacity',
          attribute_type: 'number',
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

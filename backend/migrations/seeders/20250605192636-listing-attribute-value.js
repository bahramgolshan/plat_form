import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    // Get listings and attributes
    const [listings] = await queryInterface.sequelize.query(
      'SELECT listing_id, category_id, title FROM listings;'
    )
    const [attributes] = await queryInterface.sequelize.query(
      'SELECT attribute_id, category_id, attribute_name FROM category_attributes;'
    )

    // Create attribute values for each listing
    const attributeValues = []

    listings.forEach((listing) => {
      // Find the category for this listing
      const listingCategory = attributes.filter((attr) => attr.category_id === listing.category_id)

      // Add appropriate attributes for each listing
      listingCategory.forEach((attr) => {
        let value

        switch (attr.attribute_name) {
          case 'Duration':
            value = listing.title.includes('Tour')
              ? '3 hours'
              : listing.title.includes('Class')
                ? '2.5 hours'
                : listing.title.includes('Rental')
                  ? '24 hours'
                  : '1 day'
            break
          case 'Group Size':
            value = '10'
            break
          case 'Includes Meals':
            value = 'false'
            break
          case 'Difficulty Level':
            value = listing.title.includes('Rock Climbing') ? 'Intermediate' : 'Beginner'
            break
          case 'Equipment Provided':
            value = 'true'
            break
          case 'Vehicle Type':
            value = listing.title.includes('SUV')
              ? 'Luxury SUV'
              : listing.title.includes('Convertible')
                ? 'Convertible'
                : 'Tour Bus'
            break
          case 'Passenger Capacity':
            value = listing.title.includes('SUV')
              ? '4'
              : listing.title.includes('Convertible')
                ? '2'
                : '50'
            break
          default:
            value = 'N/A'
        }

        attributeValues.push({
          value_id: uuidv4(),
          listing_id: listing.listing_id,
          attribute_id: attr.attribute_id,
          attribute_value: value,
          created_at: new Date(),
        })
      })
    })

    await queryInterface.bulkInsert('listing_attribute_values', attributeValues, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('listing_attribute_values', null, {})
  },
}

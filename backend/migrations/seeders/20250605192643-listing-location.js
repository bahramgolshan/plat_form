import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    // Get listings and locations
    const [listings] = await queryInterface.sequelize.query(
      'SELECT listing_id, title FROM listings;'
    )

    const [locations] = await queryInterface.sequelize.query(
      'SELECT location_id, name, type FROM locations;'
    )

    // Create location associations
    const listingLocations = []

    listings.forEach((listing) => {
      const isNYC = listing.title.includes('NYC') || listing.title.includes('New York')
      const isBarcelona = listing.title.includes('Barcelona')

      // Add 1-2 locations per listing
      const locationCount = 1 + Math.floor(Math.random() * 2)

      if (isNYC) {
        const nycLocations = locations.filter(
          (loc) => loc.name.includes('New York') || loc.name.includes('Times Square')
        )

        for (let i = 0; i < Math.min(locationCount, nycLocations.length); i++) {
          listingLocations.push({
            listing_location_id: uuidv4(),
            listing_id: listing.listing_id,
            location_id: nycLocations[i].location_id,
            stop_order: i + 1,
            label: nycLocations[i].type === 'poi' ? 'Meeting Point' : 'Main Location',
            created_at: new Date(),
          })
        }
      } else if (isBarcelona) {
        const bcnLocations = locations.filter(
          (loc) => loc.name.includes('Barcelona') || loc.name.includes('Sagrada')
        )

        for (let i = 0; i < Math.min(locationCount, bcnLocations.length); i++) {
          listingLocations.push({
            listing_location_id: uuidv4(),
            listing_id: listing.listing_id,
            location_id: bcnLocations[i].location_id,
            stop_order: i + 1,
            label: bcnLocations[i].type === 'poi' ? 'Meeting Point' : 'Main Location',
            created_at: new Date(),
          })
        }
      } else {
        // Default to first location
        listingLocations.push({
          listing_location_id: uuidv4(),
          listing_id: listing.listing_id,
          location_id: locations[0].location_id,
          stop_order: 1,
          label: 'Main Location',
          created_at: new Date(),
        })
      }
    })

    await queryInterface.bulkInsert('listing_locations', listingLocations, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('listing_locations', null, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },
}

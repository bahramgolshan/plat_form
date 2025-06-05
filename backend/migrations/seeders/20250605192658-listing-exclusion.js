import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    // Get listings
    const [listings] = await queryInterface.sequelize.query(
      'SELECT listing_id, title FROM listings;'
    )

    // Create random exclusions
    const listingExclusions = []
    const today = new Date()
    const reasons = [
      'Maintenance',
      'Private Event',
      'Guide Unavailable',
      'Holiday',
      'Weather Conditions',
    ]

    listings.forEach((listing) => {
      // 1-3 random exclusions per listing
      const exclusionCount = 1 + Math.floor(Math.random() * 3)

      for (let i = 0; i < exclusionCount; i++) {
        const daysOffset = 7 + Math.floor(Math.random() * 21) // 1-4 weeks from now
        const date = new Date(today)
        date.setDate(today.getDate() + daysOffset)

        listingExclusions.push({
          exclusion_id: uuidv4(),
          listing_id: listing.listing_id,
          exclusion_date: date,
          reason: reasons[Math.floor(Math.random() * reasons.length)],
          created_at: new Date(),
        })
      }
    })

    await queryInterface.bulkInsert('listing_exclusions', listingExclusions, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('listing_exclusions', null, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },
}

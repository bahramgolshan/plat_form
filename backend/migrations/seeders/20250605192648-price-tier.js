import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    // Get listings
    const [listings] = await queryInterface.sequelize.query(
      'SELECT id, title, base_price, currency FROM listings;'
    )

    // Create price tiers for each listing
    const priceTiers = []

    listings.forEach((listing) => {
      // Default price tier
      priceTiers.push({
        id: uuidv4(),
        listing_id: listing.id,
        label: 'Standard',
        amount: listing.base_price,
        currency: listing.currency,
        is_default: true,
        created_at: new Date(),
      })

      // Child price tier (if applicable)
      if (listing.title.includes('Tour') || listing.title.includes('Activity')) {
        priceTiers.push({
          id: uuidv4(),
          listing_id: listing.id,
          label: 'Child (5-12)',
          min_age: 5,
          max_age: 12,
          amount: listing.base_price * 0.7, // 30% discount for children
          currency: listing.currency,
          is_default: false,
          created_at: new Date(),
        })
      }

      // Senior price tier (if applicable)
      if (listing.title.includes('Tour')) {
        priceTiers.push({
          id: uuidv4(),
          listing_id: listing.id,
          label: 'Senior (65+)',
          min_age: 65,
          amount: listing.base_price * 0.8, // 20% discount for seniors
          currency: listing.currency,
          is_default: false,
          created_at: new Date(),
        })
      }
    })

    await queryInterface.bulkInsert('price_tiers', priceTiers, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('price_tiers', null, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },
}

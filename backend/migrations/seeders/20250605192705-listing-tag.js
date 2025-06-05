import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    // Get listings and tags
    const [listings] = await queryInterface.sequelize.query(
      'SELECT listing_id, title FROM listings;'
    )

    const [tags] = await queryInterface.sequelize.query('SELECT tag_id, name FROM tags;')

    // Create tag associations
    const listingTags = []

    listings.forEach((listing) => {
      // 2-4 random tags per listing
      const tagCount = 2 + Math.floor(Math.random() * 3)
      const shuffledTags = [...tags].sort(() => 0.5 - Math.random())

      // Always include at least one relevant tag
      let relevantTags = []

      if (listing.title.includes('Luxury')) {
        relevantTags = tags.filter((t) => t.name === 'Luxury')
      } else if (listing.title.includes('Rock Climbing')) {
        relevantTags = tags.filter((t) => t.name === 'Adventure')
      } else if (listing.title.includes('Family')) {
        relevantTags = tags.filter((t) => t.name === 'Family-friendly')
      } else if (listing.title.includes('Sagrada')) {
        relevantTags = tags.filter((t) => t.name === 'Historical')
      }

      // Add relevant tags first
      relevantTags.slice(0, 1).forEach((tag) => {
        listingTags.push({
          listing_id: listing.listing_id,
          tag_id: tag.tag_id,
          created_at: new Date(),
        })
      })

      // Add remaining random tags
      const remainingTags = tagCount - relevantTags.length
      shuffledTags.slice(0, remainingTags).forEach((tag) => {
        if (!relevantTags.some((t) => t.tag_id === tag.tag_id)) {
          listingTags.push({
            listing_id: listing.listing_id,
            tag_id: tag.tag_id,
            created_at: new Date(),
          })
        }
      })
    })

    await queryInterface.bulkInsert('listing_tags', listingTags, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('listing_tags', null, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },
}

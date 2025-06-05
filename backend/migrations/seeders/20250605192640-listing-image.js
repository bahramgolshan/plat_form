import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    // Get listings
    const [listings] = await queryInterface.sequelize.query(
      'SELECT id, title FROM listings;'
    )

    // Sample image URLs (using placeholder service)
    const sampleImages = [
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
      'https://images.unsplash.com/photo-1518391846015-55a9cc003b25',
    ]

    // Create 3-5 images for each listing
    const listingImages = []

    listings.forEach((listing) => {
      const imageCount = 3 + Math.floor(Math.random() * 3) // 3-5 images

      for (let i = 0; i < imageCount; i++) {
        listingImages.push({
          id: uuidv4(),
          listing_id: listing.id,
          image_url: `${sampleImages[i]}?${listing.title.replace(/\s+/g, '-')}-${i}`,
          caption: `${listing.title} - Photo ${i + 1}`,
          sort_order: i + 1,
          is_primary: i === 0,
          created_at: new Date(),
        })
      }
    })

    await queryInterface.bulkInsert('listing_images', listingImages, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('listing_images', null, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },
}

import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    // Get listings
    const [listings] = await queryInterface.sequelize.query(
      'SELECT id, title, description FROM listings;'
    )

    // Create translations for each listing
    const listingTranslations = []

    listings.forEach((listing) => {
      // English (same as original)
      listingTranslations.push({
        id: uuidv4(),
        listing_id: listing.id,
        language_code: 'en',
        title: listing.title,
        description: listing.description,
        created_at: new Date(),
        updated_at: new Date(),
      })

      // Spanish translation
      let spanishTitle, spanishDescription

      if (listing.title.includes('NYC') || listing.title.includes('New York')) {
        spanishTitle = listing.title
          .replace('NYC', 'Nueva York')
          .replace('New York', 'Nueva York')
          .replace('Tour', 'Recorrido')
          .replace('Bike', 'Bicicleta')
        spanishDescription = `Recorrido por ${listing.description}`
      } else if (listing.title.includes('Barcelona')) {
        spanishTitle = listing.title.replace('Tour', 'Visita Guiada')
        spanishDescription = listing.description
      } else {
        spanishTitle = listing.title
        spanishDescription = listing.description
      }

      listingTranslations.push({
        id: uuidv4(),
        listing_id: listing.id,
        language_code: 'es',
        title: spanishTitle,
        description: spanishDescription || listing.description,
        created_at: new Date(),
        updated_at: new Date(),
      })
    })

    await queryInterface.bulkInsert('listing_translations', listingTranslations, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('listing_translations', null, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },
}

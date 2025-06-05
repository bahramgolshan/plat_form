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

    // Generate 10 listings
    const listings = [
      // Tours
      {
        listing_id: uuidv4(),
        supplier_id: uuidv4(),
        category_id: toursCategory.category_id,
        title: 'NYC Downtown Walking Tour',
        description: 'Explore the heart of New York City with our expert guide',
        base_price: 45.0,
        currency: 'USD',
        status: 'published',
        instant_bookable: true,
        average_rating: 4.8,
        review_count: 124,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        listing_id: uuidv4(),
        supplier_id: uuidv4(),
        category_id: toursCategory.category_id,
        title: 'Barcelona Gothic Quarter Tour',
        description: 'Discover the medieval history of Barcelona',
        base_price: 35.0,
        currency: 'EUR',
        status: 'published',
        instant_bookable: false,
        average_rating: 4.7,
        review_count: 89,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        listing_id: uuidv4(),
        supplier_id: uuidv4(),
        category_id: toursCategory.category_id,
        title: 'Central Park Bike Tour',
        description: 'Cycle through the iconic Central Park with stops at major landmarks',
        base_price: 55.0,
        currency: 'USD',
        status: 'published',
        instant_bookable: true,
        average_rating: 4.9,
        review_count: 215,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Activities
      {
        listing_id: uuidv4(),
        supplier_id: uuidv4(),
        category_id: activitiesCategory.category_id,
        title: 'Rock Climbing in Montserrat',
        description: 'Guided rock climbing experience near Barcelona',
        base_price: 85.0,
        currency: 'EUR',
        status: 'published',
        instant_bookable: false,
        average_rating: 4.9,
        review_count: 42,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        listing_id: uuidv4(),
        supplier_id: uuidv4(),
        category_id: activitiesCategory.category_id,
        title: 'Hudson River Kayaking',
        description: 'Kayak tour with stunning views of Manhattan skyline',
        base_price: 75.0,
        currency: 'USD',
        status: 'published',
        instant_bookable: true,
        average_rating: 4.7,
        review_count: 67,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        listing_id: uuidv4(),
        supplier_id: uuidv4(),
        category_id: activitiesCategory.category_id,
        title: 'Tapas Cooking Class',
        description: 'Learn to make authentic Spanish tapas',
        base_price: 65.0,
        currency: 'EUR',
        status: 'published',
        instant_bookable: true,
        average_rating: 4.8,
        review_count: 93,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Transportation
      {
        listing_id: uuidv4(),
        supplier_id: uuidv4(),
        category_id: transportCategory.category_id,
        title: 'Luxury SUV Airport Transfer',
        description: 'Comfortable private transfer to/from JFK Airport',
        base_price: 120.0,
        currency: 'USD',
        status: 'published',
        instant_bookable: true,
        average_rating: 4.8,
        review_count: 56,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        listing_id: uuidv4(),
        supplier_id: uuidv4(),
        category_id: transportCategory.category_id,
        title: 'Convertible Car Rental',
        description: 'Sporty convertible for exploring Barcelona in style',
        base_price: 95.0,
        currency: 'EUR',
        status: 'published',
        instant_bookable: true,
        average_rating: 4.6,
        review_count: 34,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        listing_id: uuidv4(),
        supplier_id: uuidv4(),
        category_id: transportCategory.category_id,
        title: 'Hop-on Hop-off Bus Tour',
        description: '24-hour access to tourist bus routes in NYC',
        base_price: 45.0,
        currency: 'USD',
        status: 'published',
        instant_bookable: true,
        average_rating: 4.3,
        review_count: 187,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        listing_id: uuidv4(),
        supplier_id: uuidv4(),
        category_id: transportCategory.category_id,
        title: 'Electric Bike Rental',
        description: 'Explore Barcelona effortlessly with our e-bikes',
        base_price: 25.0,
        currency: 'EUR',
        status: 'published',
        instant_bookable: true,
        average_rating: 4.7,
        review_count: 72,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert('listings', listings, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('listings', null, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },
}

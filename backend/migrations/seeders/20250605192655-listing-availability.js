import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    // Get listings
    const [listings] = await queryInterface.sequelize.query(
      'SELECT id, title FROM listings;'
    )

    // Create availability for next 4 weeks
    const listingAvailabilities = []
    const today = new Date()

    listings.forEach((listing) => {
      const isRental = listing.title.includes('Rental')

      for (let i = 0; i < 28; i++) {
        // 4 weeks
        const date = new Date(today)
        date.setDate(today.getDate() + i)

        const dayOfWeek = date.getDay() // 0 = sunday, 1 = monday, etc.
        const dayName = [
          'sunday',
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
        ][dayOfWeek]

        // Check if this listing has a schedule for this day
        const hasSchedule =
          !isRental &&
          ((listing.title.includes('Weekend') &&
            (dayName === 'saturday' || dayName === 'sunday')) ||
            (!listing.title.includes('Weekend') &&
              (dayName === 'tuesday' || dayName === 'thursday' || dayName === 'saturday')))

        if (isRental || hasSchedule) {
          const availableQuantity = isRental ? 10 : 15

          listingAvailabilities.push({
            id: uuidv4(),
            listing_id: listing.id,
            date: date,
            start_time: isRental ? '09:00:00' : dayName === 'saturday' ? '09:00:00' : '10:00:00',
            end_time: isRental ? '18:00:00' : dayName === 'saturday' ? '17:00:00' : '14:00:00',
            available_quantity: availableQuantity,
            booked_quantity: Math.floor(Math.random() * 5), // Random bookings 0-4
            created_at: new Date(),
            updated_at: new Date(),
          })
        }
      }
    })

    await queryInterface.bulkInsert('listing_availabilities', listingAvailabilities, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('listing_availabilities', null, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },
}

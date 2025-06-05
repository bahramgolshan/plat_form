import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    // Get listings
    const [listings] = await queryInterface.sequelize.query(
      'SELECT id, title FROM listings;'
    )

    // Create schedules for each listing
    const listingSchedules = []

    const daysOfWeek = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ]

    listings.forEach((listing) => {
      // Rental listings have different schedules
      if (listing.title.includes('Rental')) {
        // Available all days
        listingSchedules.push({
          id: uuidv4(),
          listing_id: listing.id,
          day_of_week: daysOfWeek[0],
          start_time: '09:00:00',
          end_time: '18:00:00',
          is_recurring: true,
          created_at: new Date(),
        })
      } else {
        // Tours/activities have specific schedules
        const isWeekendOnly = Math.random() > 0.7 // 30% chance

        if (isWeekendOnly) {
          // Weekend schedule
          listingSchedules.push({
            id: uuidv4(),
            listing_id: listing.id,
            day_of_week: daysOfWeek[5],
            start_time: '10:00:00',
            end_time: '16:00:00',
            is_recurring: true,
            created_at: new Date(),
          })
          listingSchedules.push({
            id: uuidv4(),
            listing_id: listing.id,
            day_of_week: daysOfWeek[6],
            start_time: '10:00:00',
            end_time: '16:00:00',
            is_recurring: true,
            created_at: new Date(),
          })
        } else {
          // Weekday schedule
          listingSchedules.push({
            id: uuidv4(),
            listing_id: listing.id,
            day_of_week: daysOfWeek[1],
            start_time: '10:00:00',
            end_time: '14:00:00',
            is_recurring: true,
            created_at: new Date(),
          })
          listingSchedules.push({
            id: uuidv4(),
            listing_id: listing.id,
            day_of_week: daysOfWeek[3],
            start_time: '10:00:00',
            end_time: '14:00:00',
            is_recurring: true,
            created_at: new Date(),
          })
          listingSchedules.push({
            id: uuidv4(),
            listing_id: listing.id,
            day_of_week: daysOfWeek[5],
            start_time: '09:00:00',
            end_time: '17:00:00',
            is_recurring: true,
            created_at: new Date(),
          })
        }
      }
    })

    await queryInterface.bulkInsert('listing_schedules', listingSchedules, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('listing_schedules', null, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },
}

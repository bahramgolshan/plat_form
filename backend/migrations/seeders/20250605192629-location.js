import { v4 as uuidv4 } from 'uuid'

export default {
  async up(queryInterface, Sequelize) {
    // Insert continents
    const northAmericaId = uuidv4()
    const europeId = uuidv4()

    await queryInterface.bulkInsert(
      'locations',
      [
        {
          location_id: northAmericaId,
          parent_id: null,
          name: 'North America',
          type: 'continent',
          latitude: 47.1304,
          longitude: -100.5489,
          timezone: 'UTC-5 to UTC-10',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          location_id: europeId,
          parent_id: null,
          name: 'Europe',
          type: 'continent',
          latitude: 54.526,
          longitude: 15.2551,
          timezone: 'UTC to UTC+3',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {
        ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
      }
    )

    // Insert countries
    const usaId = uuidv4()
    const spainId = uuidv4()

    await queryInterface.bulkInsert(
      'locations',
      [
        {
          location_id: usaId,
          parent_id: northAmericaId,
          name: 'United States',
          type: 'country',
          latitude: 37.0902,
          longitude: -95.7129,
          timezone: 'UTC-5 to UTC-10',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          location_id: spainId,
          parent_id: europeId,
          name: 'Spain',
          type: 'country',
          latitude: 40.4637,
          longitude: -3.7492,
          timezone: 'UTC+1',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {
        ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
      }
    )

    // Insert cities
    const nycId = uuidv4()
    const barcelonaId = uuidv4()

    await queryInterface.bulkInsert(
      'locations',
      [
        {
          location_id: nycId,
          parent_id: usaId,
          name: 'New York City',
          type: 'city',
          latitude: 40.7128,
          longitude: -74.006,
          timezone: 'UTC-5',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          location_id: barcelonaId,
          parent_id: spainId,
          name: 'Barcelona',
          type: 'city',
          latitude: 41.3851,
          longitude: 2.1734,
          timezone: 'UTC+1',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {
        ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
      }
    )

    // Insert districts/POIs
    await queryInterface.bulkInsert(
      'locations',
      [
        {
          location_id: uuidv4(),
          parent_id: nycId,
          name: 'Times Square',
          type: 'poi',
          latitude: 40.758,
          longitude: -73.9855,
          timezone: 'UTC-5',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          location_id: uuidv4(),
          parent_id: barcelonaId,
          name: 'Sagrada Familia',
          type: 'poi',
          latitude: 41.4036,
          longitude: 2.1744,
          timezone: 'UTC+1',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {
        ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('locations', null, {
      ignoreDuplicates: true, // Optional: for MySQL/PostgreSQL if running multiple times
    })
  },
}

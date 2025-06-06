import { DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('reviews', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    booking_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'bookings',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'listings',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    reviewer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    title: {
      type: DataTypes.STRING
    },
    comment: {
      type: DataTypes.TEXT
    },
    response_text: {
      type: DataTypes.TEXT
    },
    response_date: {
      type: DataTypes.DATE
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'published', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    deleted_at: {
      type: DataTypes.DATE
    }
  });

  await queryInterface.addIndex('reviews', ['booking_id']);
  await queryInterface.addIndex('reviews', ['listing_id']);
  await queryInterface.addIndex('reviews', ['reviewer_id']);
  await queryInterface.addIndex('reviews', ['rating']);
  await queryInterface.addIndex('reviews', ['is_verified']);
  await queryInterface.addIndex('reviews', ['status']);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('reviews');
}
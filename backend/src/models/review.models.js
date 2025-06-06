import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Review = sequelize.define('review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
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
    responseText: {
      type: DataTypes.TEXT,
      field: 'response_text'
    },
    responseDate: {
      type: DataTypes.DATE,
      field: 'response_date'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_verified'
    },
    status: {
      type: DataTypes.ENUM('pending', 'published', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    }
  }, {
    paranoid: true,
    underscored: true,
    timestamps: true,
    tableName: 'reviews'
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Booking, {
      foreignKey: 'booking_id',
      as: 'booking'
    });
    Review.belongsTo(models.Listing, {
      foreignKey: 'listing_id',
      as: 'listing'
    });
    Review.belongsTo(models.User, {
      foreignKey: 'reviewer_id',
      as: 'reviewer'
    });
    Review.hasMany(models.ReviewAttribute, {
      foreignKey: 'review_id',
      as: 'attributes'
    });
  };

  return Review;
};
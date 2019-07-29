class Review < ApplicationRecord
  belongs_to :restaurant
  belongs_to :user
  after_commit :update_review_summaries
 
  def update_review_summaries
    restaurant.update(average_rating: restaurant.reviews.average(:rating))
    restaurant.update(lowest_rating: restaurant.reviews.minimum(:rating))
    restaurant.update(highest_rating: restaurant.reviews.maximum(:rating))
  end
end

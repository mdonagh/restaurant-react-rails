class Restaurant < ApplicationRecord
  has_many :reviews
  belongs_to :owner, class_name: 'User', foreign_key: :user_id
  scope :by_rating, -> { order(average_rating: :desc) }
end

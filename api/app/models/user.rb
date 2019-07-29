# frozen_string_literal: true

class User < ActiveRecord::Base
  enum role: [:user, :restaurant_owner, :admin]
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :trackable, :validatable
  before_create :skip_confirmation!
  has_many :restaurants

  def reviews_pending_owner_reply
    Review.includes(:restaurant).includes(:user).where(restaurant_id: restaurants.pluck(:id), owner_reply: nil)
      .to_json(include: {
                 restaurant: { only: [:name]},
                 user: { only: [:email]},
              })
  end

  include DeviseTokenAuth::Concerns::User
end

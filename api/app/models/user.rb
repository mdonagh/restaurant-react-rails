# frozen_string_literal: true

class User < ActiveRecord::Base
  enum role: [:user, :user_manager, :admin]
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :trackable, :validatable
  before_create :skip_confirmation!
  has_many :meals
  after_save :calories_changed?

  def calories_changed?
    update_meal_totals if self.previous_changes.keys.include?('calories')
  end

  def update_meal_totals
    meals_by_date = Meal.where(user_id: id).group_by{ |meal| meal.date }
    meals_by_date.each do |date, daily_meals|
	    daily_calories = daily_meals.map{ |meal| meal.calories }.compact.sum
      if daily_calories >= calories
        Meal.where(id: daily_meals.map{|meal| meal.id}).update_all(met_goal: false)
      else
        Meal.where(id: daily_meals.map{|meal| meal.id}).update_all(met_goal: true)
      end
    end
  end


  include DeviseTokenAuth::Concerns::User
end

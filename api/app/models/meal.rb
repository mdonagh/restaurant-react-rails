# frozen_string_literal: true

class Meal < ActiveRecord::Base
  after_commit :update_daily_totals
  belongs_to :user

  def update_daily_totals
    daily_meals = Meal.where(user_id: user_id, date: date)
    daily_calories = daily_meals.map{ |meal| meal.calories }.compact.sum
    target_calories = user.calories
      if daily_calories >= target_calories
        daily_meals.update_all(met_goal: false)
      else
        daily_meals.update_all(met_goal: true)
      end
    end

  handle_asynchronously :update_daily_totals
end

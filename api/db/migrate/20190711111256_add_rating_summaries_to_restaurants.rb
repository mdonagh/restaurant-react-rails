class AddRatingSummariesToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :average_rating, :decimal, :precision => 2
    add_column :restaurants, :highest_rating, :integer
    add_column :restaurants, :lowest_rating, :integer
  end
end

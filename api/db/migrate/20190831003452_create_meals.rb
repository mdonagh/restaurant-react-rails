class CreateMeals < ActiveRecord::Migration[5.2]
  def change
    create_table :meals do |t|
    	t.string :text
    	t.date :date
    	t.time :time
    	t.integer :calories
    	t.integer :user_id
    	t.boolean :met_goal
    end
  end
end

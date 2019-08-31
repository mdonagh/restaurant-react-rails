class AddUserTypeToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :role, :integer
    add_column :users, :daily_calory_goal, :integer
  end
end

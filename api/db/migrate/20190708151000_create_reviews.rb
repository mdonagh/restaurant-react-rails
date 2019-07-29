class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :rating
      t.text :user_comment
      t.text :owner_reply
      t.integer :user_id
      t.integer :restaurant_id
      t.index :user_id
      t.index :restaurant_id
      t.timestamps
    end
  end
end

# t.integer "rating"
# t.text "user_comment"
# t.text "owner_reply"
# t.integer "user_id"
# t.integer "restaurant_id"
# t.datetime "created_at", null: false
# t.datetime "updated_at", null: false
# t.index ["restaurant_id"], name: "index_reviews_on_restaurant_id"
# t.index ["user_id"], name: "index_reviews_on_user_id"

FactoryBot.define do
  factory :review do
    rating { rand(1..5) }
    user
    user_comment { Faker::Hacker.say_something_smart }
  end
end
    # t.string "name"
    # t.string "address"
    # t.string "description"
    # t.integer "user_id"
    # t.datetime "created_at", null: false
    # t.datetime "updated_at", null: false
    # t.decimal "average_rating", precision: 2
    # t.integer "highest_rating"
    # t.integer "lowest_rating"
    # t.index ["user_id"], name: "index_restaurants_on_user_id"

FactoryBot.define do
  factory :restaurant do
    name { Faker::Name.name }
    address { Faker::Address.full_address }
    description { Faker::Coffee.notes }
    owner { create(:user) }

    trait :with_comments do
      after(:create) do |restaurant|
        for i in 0..6 do
          create(:review, restaurant_id: restaurant.id)
        end
      end
    end
  end
end
FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { Random.new(10) }
  end
end
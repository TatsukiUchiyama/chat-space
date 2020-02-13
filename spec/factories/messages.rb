FactoryBot.define do
  factory :message do
    body {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/images.jpeg")}
    user
    group
  end
end

# FactoryBot.define do
#   factory :message do
#     body  {"これは本文です"}
#     image {"images.jpeg"}
#     user  {1}
#     group {1}
#   end
# end
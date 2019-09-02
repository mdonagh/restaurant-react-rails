Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  resources :meals
  resources :users
  get 'meals_for_user/:id', to: 'meals#meals_for_user'
  get 'my_meals/', to: 'meals#my_meals'
  get 'filtered_meals', to: 'meals#filtered_meals'
end

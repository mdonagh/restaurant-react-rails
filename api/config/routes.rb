Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  resources :meals
  resources :users
  get 'meals_for_user', to: 'meals#meals_for_user'
end

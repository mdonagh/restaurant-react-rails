Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  root to: "home#index"
  resources :restaurants, only: [:index, :create, :show, :destroy]
  get 'reviews/pending_owner_reply', to: 'reviews#pending_owner_reply'
  get 'owner_restaurants', to: 'restaurants#owner_restaurants'
  resources :reviews, only: [:create, :update, :destroy]
  resources :users, only: [:index, :destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

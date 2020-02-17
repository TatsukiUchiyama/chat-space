Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users
  resources :groups do
    resources :messages
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end

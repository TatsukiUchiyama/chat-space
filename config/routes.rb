Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users,  except: [:show, :create]
  resources :groups, except: [:show, :destroy] do
    resources :messages, only: [:index, :create]
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end
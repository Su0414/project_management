Rails.application.routes.draw do
  # get 'sessions/new'
  # get 'sessions/create'
  # get 'sessions/show'
  # get 'sessions/destroy'
  # get 'users/show'
  # get 'users/new'
  # get 'users/create'
  # get 'users/edit'
  # get 'users/update'
  # get 'users/destroy'

  root 'application#home'
  get '/signin', to: 'sessions#sign_in'
  post '/signin', to: 'sessions#create'

  delete '/signout', to: 'sessions#destroy'
  
  resources :users
  resources :projects

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
  get 'tasks/index'
  get 'tasks/show'
  get 'tasks/new'
  get 'tasks/edit'
  get 'projects/index'
  get 'projects/show'
  get 'projects/new'
  get 'projects/edit'
  root 'application#home'

  get '/signin', to: 'sessions#sign_in'
  post '/signin', to: 'sessions#create'

  delete '/signout', to: 'sessions#destroy'
  
  resources :users
  resources :projects
  resources :tasks

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

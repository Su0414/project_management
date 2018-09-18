Rails.application.routes.draw do
  
  root 'application#home'

  get '/signin', to: 'sessions#sign_in'
  post '/signin', to: 'sessions#create'

  delete '/signout', to: 'sessions#destroy'

  get 'users/auth/github/callback' => 'sessions#create'
  
  resources :users
  
  resources :projects do 
      resources :tasks do 
        member do 
          patch :complete
        end 
      end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

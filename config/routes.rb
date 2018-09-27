Rails.application.routes.draw do
  
  root 'application#home'

  get '/signin', to: 'sessions#sign_in'
  post '/signin', to: 'sessions#create'
  delete '/signout', to: 'sessions#destroy'

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('application#home')
  
 
  resources :users do 
      resources :tasks, only: [:index]          
  end 

  resources :projects  do 
    member do          
      get :completed
    end   
  end 

  resources :projects  do 
      resources :tasks, only: [:create, :edit, :update, :destroy ]  do 
        member do          
          patch :complete
        end         
      end
  end

end

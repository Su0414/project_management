Rails.application.routes.draw do
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/show'
  get 'sessions/destroy'
  get 'users/show'
  get 'users/new'
  get 'users/create'
  get 'users/edit'
  get 'users/update'
  get 'users/destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

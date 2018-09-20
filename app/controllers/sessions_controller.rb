
class SessionsController < ApplicationController
  before_action :authenticate_user, only: [:destroy]

  def sign_in
    @user = User.new
    @users = User.all
  end

  def create     
    if request.env["omniauth.auth"]      
      @user = User.from_omniauth(request.env["omniauth.auth"])        
        session[:user_id] = @user.id
        redirect_to user_path(@user)    
     else # if not through social , its regular
        @user = User.find_by(email: params[:user][:email])
        if @user && @user.authenticate(params[:user][:password])
          session[:user_id] = @user.id
          redirect_to user_path(@user)
        else
          redirect_to signin_path
        end
     end 
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end

  private
 
  def auth
    request.env['omniauth.auth']
  end

end

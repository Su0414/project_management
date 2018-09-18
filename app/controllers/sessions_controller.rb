
class SessionsController < ApplicationController
  def sign_in
    @user = User.new
    @users = User.all
  end

  def create       
      # if @user = User.find_or_create_by_omniauth(auth_hash)      
      @user = User.find_or_create_by(email: auth['email']) do |u|
       user.password = SecureRandom.hex       

        # u.firstname = auth['info']['name']
        # u.email = auth['info']['email']
        # u.image = auth['info']['image']
      end
      
        session[:user_id] = @user.id
        redirect_to user_path(@user)
    
    # else # if not through social , its regular

      @user = User.find_by(email: params[:user][:email])
      if @user && @user.authenticate(params[:user][:password])
        session[:user_id] = @user.id
        redirect_to user_path(@user)
      else
        redirect_to signin_path
      end
    # end 
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

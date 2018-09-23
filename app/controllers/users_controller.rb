class UsersController < ApplicationController
  before_action :authenticate_user, only: [:show, :edit, :update]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = "Successfully created User."
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      flash[:notice] = "Un-Successfully created User."
      render :new
    end

  end

  def show
    @user = User.find_by(id: params[:id])
    @projects = @user.projects.status.uniq

    if !current_user.admin
      if current_user != @user
        redirect_to root_path
      end
    end
  end

  def edit
    @user = User.find_by(id: params[:id])
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user.update(user_params)
      flash[:notice] = "Successfully updated User Profile."
      redirect_to @user
    else
      flash[:notice] = "Un-Successfully updated User Profile."
      render :edit
    end
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :admin )
  end
end

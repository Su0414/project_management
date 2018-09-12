class ProjectsController < ApplicationController
  def index
    @projects = Project.all
    if current_user.admin
      @users = User.where(admin: false)
    else 
      @users = User.where(id: current_user.id)
    end
  end

  def show
    
  end

  def new
    @project = Project.new
  end

  def create 
  end

  def edit
  end
end

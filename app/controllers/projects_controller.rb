class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]

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
    @project = Project.new(project_params)
    if @project.save
      redirect_to @project
    else 
      render :new
    end
  end

  def edit
  end

  def update 
    
    if @project.update(project_params)
      redirect_to @project
    else 
      render :edit
    end
  end


  private
  def set_project
    @project = Project.find_by(id: params[:id])
  end 

  def project_params
    params.require(:project).permit(:name, :description)
  end

end

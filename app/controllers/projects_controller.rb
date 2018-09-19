class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]

  def index    
    if current_user.admin
      @users = User.where(admin: false)  
      @projects = Project.all.recent    
    else 
      @users = User.where(id: current_user.id)
      @projects = Project.all.status
    end
  end

  def show    
  end

  def new
    @project = Project.new
    @task = Task.new
  end

  def create 
    @project = Project.new(project_params)
    if @project.save
      flash[:notice] = "Successfully created Project."
      redirect_to @project
    else 
      flash[:notice] = "Un-Successfully created Project."
      render :new
    end
  end

  def edit
  end

  def update     
    if @project.update(project_params)
      flash[:notice] = "Successfully updated project."
      redirect_to @project
    else 
      flash[:notice] = "Un-Successfully updated project."
      render :edit
    end
  end


  private
  def set_project
    @project = Project.find_by(id: params[:id])
  end 

  def project_params
    params.require(:project).permit(:name, :description, :status)
  end

end

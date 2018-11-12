class TasksController < ApplicationController
  before_action :authenticate_user, only: [:create, :index, :destroy, :complete, :edit, :update]
  before_action :set_project, except: [:index]
  before_action :set_task, only: [:destroy, :complete, :edit, :update]

  def create  
    @task = @project.tasks.new(task_params)
    @task.user_id = current_user.id
    
    if @task.save
      flash[:notice] = "Successfully created task."
      respond_to do |format|
        format.json { render json: @project, status: 201}
      end
    else 
      flash[:notice] = "Ooopss ...Task was not created.Check if this task already exists or content can not be blank"
      redirect_to @project
    end
  end

  def index    
    @user = User.find_by(id: params[:user_id])    
    respond_to do |format|
      format.json { render json: @user, status: 201}
    end
  end 

  def destroy  
    if @task.delete 
      flash[:notice] = "Task was deleted successfully !"
    else 
      flash[:notice] = "Task was not deleted !"
    end 
    redirect_to @project    
  end

  def complete     
    if @task.update_attribute(:completed_at, Time.now)      
      flash[:notice] = "Congrats ! Task was completed successfully !"
    else
      flash[:notice] = "Ooopps there was some error !"
    end 
    redirect_to @project
  end 

  def edit 
  end 

  def update 
    if @task.update(task_params)
      flash[:notice] = "Successfully updated task."
      redirect_to @project
    else 
      flash[:notice] = "Un-Successfully updated task."
      render :edit
    end
  end 
 
  private
  
  def set_task 
    @task = @project.tasks.find_by(id: params[:id])
  end 

  def set_project
    @project = Project.find_by(id: params[:project_id])
  end 

  def task_params
    params.require(:task).permit(:content, :project_id => @project.id)
  end

end

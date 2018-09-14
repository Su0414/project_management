class TasksController < ApplicationController
  before_action :set_project
  
  def create  
    @task = @project.tasks.new(task_params)
    @task.user_id = current_user.id
    
    if @task.save
      redirect_to @project
    else 
      render :new
    end
  end

  def destroy
    @task = @project.tasks.find_by(params[:id])
    if @task.delete 
      flash[:success] = "Task was deleted successfully !"
    else 
      flash[:error] = "Task was not deleted !"
    end 
    redirect_to @project
  end

  private

  def set_project
    @project = Project.find_by(id: params[:project_id])
  end 

  def task_params
    params.require(:task).permit(:content, :project_id => @project.id)
  end

end

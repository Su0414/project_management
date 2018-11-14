class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :status
  
  attribute :logged_user
  
  attribute :completed_tasks
  attribute :all_tasks

  def logged_user
    current_user
  end 


  def completed_tasks
    self.object.tasks.completed.map do |task|
      {
        id: task.id,
        content: task.content, 
        project_id: task.project_id,
        completed_at: task.completed_at     
      }
    end 
  end

  def all_tasks
    self.object.tasks.map do |task|
      {
        id: task.id,
        content: task.content,
        project_id: task.project_id,
        user_id: task.user_id,        
        completed_at: task.completed_at      
      }
    end 
  end 

end

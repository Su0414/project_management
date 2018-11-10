class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :status, :completed_tasks, :all_tasks

  def completed_tasks
    self.object.tasks.completed.map do |task|
      {
        id: task.id,
        content: task.content, 
        completed_at: task.completed_at     
      }
    end 
  end

  def all_tasks
    self.object.tasks.map do |task|
      {
        id: task.id,
        content: task.content,
        completed_at: task.completed_at      
      }
    end 
  end  

end

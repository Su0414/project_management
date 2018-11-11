class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :status 
  
  attribute :completed_tasks
  attribute :all_tasks
  attribute :pending_tasks

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
  
  def pending_tasks
    self.object.tasks.pending.map do |task|
      {
        id: task.id,
        content: task.content, 
        completed_at: task.completed_at     
      }
    end 
  end

end

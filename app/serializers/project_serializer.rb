class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :status, :completed_tasks

  def completed_tasks
    self.object.tasks.completed.map do |task|
      {
        id: task.id,
        content: task.content      
      }
    end 
  end

  

end

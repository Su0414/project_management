class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :admin, :user_tasks
  attribute :logged_user

  # def user_tasks
  #   self.object.tasks.pending
  #               .where(user_id: scope.id)
  #               .order(:project_id)
  #               .collect{|task| 

  #                         task.slice(:id, :content, :project_id)
  #                       };
  # end


  def logged_user
    current_user
  end 

  def user_tasks
    self.object.tasks.pending.map do |task|
      {
        id: task.id,
        content: task.content,
        user: task.user_name(task.user_id),        
        completed_at: task.completed_at,
        project: task.project_name(task.project_id)   
      }
    end            
  end
end

class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :admin, :user_tasks
  
  def user_tasks
    object.tasks.pending.where(user_id: scope.id).order(:project_id);
  end

    
end

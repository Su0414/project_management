class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :admin, :user_projects
  
  def user_projects
    self.object.projects.map do |project|
      {
        id: project.id,
        name: project.name, 
        status: project.status,
        user_tasks: project.tasks.collect{|task| task.slice(:id, :content)}
      }
    end 
  end 
end

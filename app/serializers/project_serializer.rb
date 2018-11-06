class ProjectSerializer < ActiveModel::Serializer
    attributes :id, :name, :description, :status
    
    has_many :tasks
    has_many :users, through: :tasks
end
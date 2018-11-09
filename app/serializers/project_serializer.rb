class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :status 
end

class TaskSerializer < ActiveModel::Serializer
    attributes :id, :content
    belongs_to :project
    belongs_to :user
end
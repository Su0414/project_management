class UserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :email, :admin
    
    has_many :tasks
    has_many :projects, through: :tasks
end
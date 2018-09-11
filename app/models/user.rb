class User < ActiveRecord::Base
    has_secure_password 
    
    has_many :tasks
    has_many :projects, through: :tasks
  end
class Project < ActiveRecord::Base
    has_many :tasks
    has_many :users, through: :tasks

    scope :status, -> { where status: "active" }

  end
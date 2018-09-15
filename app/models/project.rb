class Project < ActiveRecord::Base
    has_many :tasks
    has_many :users, through: :tasks

    scope :by_status, -> { where status: "active" }
    scope :recent, -> { order("projects.updated_at DESC") }

  end
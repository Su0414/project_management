class Project < ActiveRecord::Base
    validates :name, presence: true, uniqueness: true

    has_many :tasks
    has_many :users, through: :tasks

    scope :status, -> { where(status: 'active') }
    scope :recent, -> { order('projects.updated_at DESC') }

  end
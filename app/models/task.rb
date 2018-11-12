class Task < ActiveRecord::Base
  validates :content, presence: true

    belongs_to :project
    belongs_to :user

    scope :pending, -> { where(completed_at: '') }
    scope :recent, -> { order('tasks.updated_at DESC') }

    scope :completed, -> { where.not(completed_at: '') }
    # scope :project_name ->(project_id) {project.name where(Task.project_id: project_id)}

   def completed?
      !completed_at.blank?
    end 
  end
class Task < ActiveRecord::Base
  validates :content, presence: true

    belongs_to :project
    belongs_to :user

    scope :pending, -> { where(completed_at: '') }
    scope :recent, -> { order('tasks.updated_at DESC') }

    scope :completed, -> { where.not(completed_at: '') }


   def completed?
      !completed_at.blank?
    end 
  end
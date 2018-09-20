class Task < ActiveRecord::Base
  validates :content, presence: true

    belongs_to :project
    belongs_to :user

    scope :pending, -> { where(completed_at: '') }


   def completed?
      !completed_at.blank?
    end 
  end
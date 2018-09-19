class Task < ActiveRecord::Base
  validates :content, presence: true

    belongs_to :project
    belongs_to :user

    def completed?
      !completed_at.blank?
    end 
  end
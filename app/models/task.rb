class Task < ActiveRecord::Base
    belongs_to :project
    belongs_to :user

    def completed?
      !completed_at.blank?
    end 
  end
class Task < ActiveRecord::Base
  validates :content, presence: true
  validates :content, uniqueness: { scope: :project_id,
                                  message: "Projects should have unique tasks" }
    belongs_to :project
    belongs_to :user

    scope :pending, -> { where(completed_at: '') }
    scope :recent, -> { order('tasks.updated_at DESC') }

    scope :completed, -> { where.not(completed_at: '') }

   def completed?
      !completed_at.blank?
   end 

   def project_name(id)    
    return Project.select(:id, :name, :status).where(id: id)
   end 

   def user_name(id)    
    return User.select(:id, :first_name, :last_name).where(id: id)
   end 
  
  end
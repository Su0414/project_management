class User < ActiveRecord::Base
    validates :first_name, presence: true, length: { minimum: 3 }
    validates :last_name, presence: true, length: { minimum: 2 }

    validates :password, presence: true

    validates :email, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

    has_secure_password 
    
    has_many :tasks
    has_many :projects, through: :tasks


    def self.find_or_create_by_omniauth(auth_hash)
      self.where(:email => auth_hash["info"]["email"]).first_or_create do |user|
        user.password = SecureRandom.hex
        user.first_name = auth_hash["info"]["name"]
        # user.provider = auth_hash["provider"]
        user.id = auth_hash["uid"]
      end 
    end
    
  end
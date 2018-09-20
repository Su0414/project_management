
class User < ActiveRecord::Base
    validates :first_name, presence: true, length: { minimum: 3 }
    validates :last_name, presence: true, length: { minimum: 2 }

    validates :password, presence: true

    validates :email, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

    has_secure_password 
    
    has_many :tasks
    has_many :projects, through: :tasks

    def self.from_omniauth(auth)
      where(auth.slice("provider", "uid")).first || create_from_omniauth(auth)
    end
    
    def self.create_from_omniauth(auth)
      create! do |user|     
        user.provider = auth["provider"]
        user.uid = auth["uid"]
        user.first_name = auth["info"]["nickname"]
        user.last_name = auth["info"]["name"]
        # user.email = auth["info"]["email"]
        user.email = user.first_name + "@pgm.com"
        user.password = SecureRandom.hex
      end
    end
    
  end
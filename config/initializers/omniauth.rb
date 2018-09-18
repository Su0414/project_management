Rails.application.config.middleware.use OmniAuth::Builder do
    # provider :twitter, ENV['TWITTER_KEY'], ENV['TWITTER_SECRET']
    provider :github, '5d4fe6bcc58ab5dc960b', '7fc1c054e25dd3f2ccc7fee5832c8493dd061609',
    {:provider_ignores_state => true}
  end
Rails.application.config.middleware.use OmniAuth::Builder do
    # provider :twitter, ENV['TWITTER_KEY'], ENV['TWITTER_SECRET']
    provider :github, '75277a511974bc2890cc', 'a9f18f38cc014b6e1bfe2ef42824410e2c46ee2a'
  end
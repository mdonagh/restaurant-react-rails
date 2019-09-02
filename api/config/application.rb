require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TopTalCalories
  class Application < Rails::Application
  config.load_defaults 5.2
  config.active_job.queue_adapter = :delayed_job


  config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins '*'
      resource '*', 
        headers: :any, 
        expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
        methods: [:get, :post, :options, :put, :patch, :delete]
    end
  end
  end
end

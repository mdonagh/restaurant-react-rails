# frozen_string_literal: true

class User < ActiveRecord::Base
  enum role: [:user, :user_manager, :admin]
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :trackable, :validatable
  before_create :skip_confirmation!

  include DeviseTokenAuth::Concerns::User
end

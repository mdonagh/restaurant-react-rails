class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def destroy
    return head 403 unless current_user.admin?
    User.find(params['id']).destroy
  end
end

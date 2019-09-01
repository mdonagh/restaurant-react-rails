class UsersController < ApplicationController
  def index
  	return head 403 unless current_user.admin? || current_user.user_manager?
    render json: User.all
  end

  def show
  	return head 403 unless current_user.admin? || current_user.user_manager?
    @meal = User.find(params[:id])
    render json: @meal
  end

  def create
  	return head 403 unless current_user.admin? || current_user.user_manager?
    User.create(user_params)
    head 201
  end

  def update
  	return head 403 unless current_user.admin? || current_user.user_manager?
    User.update(user_params)
    head 201
  end

  def destroy
  	return head 403 unless current_user.admin? || current_user.user_manager?
    User.find(params['id']).destroy
  end

  private
    def user_params
      params.require(:user).permit(:email, :password, :role, :calories)
    end
end

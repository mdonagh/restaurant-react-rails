class MealsController < ApplicationController
  def index
    render json: Meal
  end

  def owner_meals
    return render json: Meal.where(user_id: current_user.id)
    head 403
  end

  def show
    @meal = Meal.find(params[:id])
    render json: @meal, include: [ :reviews ]
  end

  def create
    params['meal']['user_id'] = current_user.id
    Meal.create(meal_params)
  end

  def destroy
    return head 403 unless current_user.admin?
    Meal.find(params['id']).destroy
  end

  private
    def meal_params
      params.require(:meal).permit(:text, :date, :time, :calories)
    end
end

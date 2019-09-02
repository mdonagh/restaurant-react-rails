class MealsController < ApplicationController
  def index
    render json: Meal.all
  end

  def my_meals
    render json: Meal.where(user_id: current_user.id)
  end

  def show
    @meal = Meal.find(params[:id])
    render json: @meal
  end

  def create
    params['meal']['user_id'] = current_user.id
    params['meal']['time'] = Time.at(params['meal']['time'])
    params['meal']['date'] = Date.parse(params['meal']['date'])
    Meal.create(meal_params)
  end

  def update
    params['meal']['user_id'] = current_user.id
    Meal.find(params['id']).update(meal_params)
  end

  def destroy
    #return head 403 unless current_user.admin?
    Meal.find(params['id']).destroy
  end

  def meals_for_user
    render json: Meal.where(user_id: params[:id])
  end

  def filtered_meals
    params.permit(:startDate, :endDate, :endTime, :startTime)
    @meals = Meal.where(user_id: current_user.id)
    @meals = @meals.where("date >= ?", params[:startDate]) if params[:startDate]
    @meals = @meals.where("date <= ?", params[:endDate]) if params[:endDate]
    @meals = @meals.where("time >= ?", params[:startTime]) if params[:startTime]
    @meals = @meals.where("time <= ?", params[:endTime]) if params[:endTime]
    render json: @meals
  end

  private
    def meal_params
      params.require(:meal).permit(:text, :date, :time, :calories, :user_id)
    end
end

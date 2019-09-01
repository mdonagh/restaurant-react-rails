class MealsController < ApplicationController
  def index
    render json: Meal.all
  end

  def owner_meals
    return render json: Meal.where(user_id: current_user.id)
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
    head 201
  end

  def update
    params['meal']['user_id'] = current_user.id
    Meal.find(params['id']).update(meal_params)
    head 202
  end

  def destroy
    #return head 403 unless current_user.admin?
    Meal.find(params['id']).destroy
    head 204
  end

  private
    def meal_params
      params.require(:meal).permit(:text, :date, :time, :calories, :user_id)
    end
end

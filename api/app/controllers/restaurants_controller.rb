class RestaurantsController < ApplicationController
  def index
    render json: Restaurant.by_rating
  end

  def owner_restaurants
    return render json: Restaurant.by_rating.where(user_id: current_user.id) if current_user.restaurant_owner?
    head 403
  end

  def show
    @restaurant = Restaurant.includes(:reviews).order("reviews.created_at desc").find(params[:id])
    render json: @restaurant, include: [ :reviews ]
  end

  def create
    params['restaurant']['user_id'] = current_user.id
    Restaurant.create(restaurant_params)
  end

  def destroy
    return head 403 unless current_user.admin?
    Restaurant.find(params['id']).destroy
  end

  private
    def restaurant_params
      params.require(:restaurant).permit(:name, :address, :description, :user_id)
    end
end

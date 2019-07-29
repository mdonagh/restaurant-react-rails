class ReviewsController < ApplicationController
  def create
    params['review']['user_id'] = current_user.id
    Review.create(review_params)
  end

  def update
    Review.find(params['id']).update(owner_reply: params['review']['owner_reply'])
  end

  def pending_owner_reply
    render json: current_user.reviews_pending_owner_reply
  end

  def destroy
    return head 403 unless current_user.admin?
    Review.find(params['id']).destroy
  end

 private
  def review_params
    params.require(:review).permit(:rating, :user_comment, :restaurant_id, :user_id)
  end
end

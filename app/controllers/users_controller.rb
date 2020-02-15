class UsersController < ApplicationController


  def index
    return nil if params[:keyword] == ""
    @users = User.where(['nickname LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    # nicknameカラムから受け取ったキーワードの文字がどこかしらに含まれている内容があるか検索　ただしカレントユーザーは検索しない
    respond_to do |format|
      format.html
      format.json
    end
  end


  # def index
  #   @user = User.search(params[:keyword])
  #   binding.pry
  #   respond_to do |format|
  #     format.html
  #     format.json
  #   end
  # end

  def new
  end


  def edit
  end

  def delete
  end
  

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

end

class MessagesController < ApplicationController
  
  def index
    @message = Message.new
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user)
  end

  def create
    # Message.create(message_params)
    @group = Group.find(params[:group_id])
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: "メッセージが送信されました"
    else
      @message = @group.messages.includes(:user)
      flash.now[:alert] = "メッセージを入力してください"
      render :index
    end
    
  end


  private
  def message_params
    params.require(:message, :id).permit(:body, :image).merge(user_id: current_user.id)
  end
end




# class MessagesController < ApplicationController
#   before_action :set_group

#   def index
#     @message = Message.new
#     @messages = @group.messages.includes(:user)
#   end

#   def create
#     @message = @group.messages.new(message_params)
#     if @message.save
#       redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
#     else
#       @messages = @group.messages.includes(:user)
#       flash.now[:alert] = 'メッセージを入力してください。'
#       render :index
#     end
#   end

#   private

#   def message_params
#     params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
#   end

#   def set_group
#     @group = Group.find(params[:group_id])
#   end
# end
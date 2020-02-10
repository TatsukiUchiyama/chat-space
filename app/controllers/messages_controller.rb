class MessagesController < ApplicationController
  
  def index
    @message = Message.all
  end

  def create
  end


  private
  def create_params
    params.require(:message).permit(:body, :image)
  end


end

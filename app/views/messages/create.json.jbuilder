json.created_at @message.created_at.strftime("%Y/%m/%d  %H:%M")
json.body @message.body
json.image @message.image_url
json.user_name @message.user.nickname
json.id @message.id
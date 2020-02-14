
$(function(){

  var message_list = $(".chat-main__message-list");

  function appendMessage(message){
        
    if ( message.image ) {
      var html = `<div class="chat-main__message-list__user-area">
                    <div class="chat-main__message-list__user-area--name">${message.user_name}</div>
                    <div class="chat-main__message-list__user-area--date">${message.created_at}</div>
                  </div>
                  <div class="chat-main__message-list__message-area">
                    <div class="chat-main__message-list__message-area--text">${message.body}</div>
                    <img src= ${message.image} class="message_image" >
                  </div>`

      message_list.append(html)
    } else {

        var html = `<div class="chat-main__message-list__user-area">
                      <div class="chat-main__message-list__user-area--name">${message.user_name}</div>
                      <div class="chat-main__message-list__user-area--date">${message.created_at}</div>
                    </div>
                    <div class="chat-main__message-list__message-area">
                      <div class="chat-main__message-list__message-area--text">${message.body}</div>
                    </div>`

      message_list.append(html)
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      appendMessage(message);
      message_list.animate({ scrollTop: message_list[0].scrollHeight});
      $('.form_reset')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $('.chat-main__message-form--send-btn').prop('disabled', false);
    });
  });
});

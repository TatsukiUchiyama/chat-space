
$(function(){
  let message_list = $(".chat-main__message-list");
  function appendMessage(message){    
    if ( message.image ) {
      var html = `<div class="chat-main__message-list__content" data-message-id=` + message.id + `>
                    <div class="chat-main__message-list__content__user-area">
                      <div class="chat-main__message-list__content__user-area--name">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-list__content__user-area--date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-main__message-list__content__message-area">
                      <div class="chat-main__message-list__content__message-area--text">
                        ${message.body}
                      </div>
                      <img src= ${message.image} class="message_image" >  
                    </div>
                  </div>`
      message_list.append(html)
    } else {
      var html = `<div class="chat-main__message-list__content" data-message-id=` + message.id + `>
                    <div class="chat-main__message-list__content__user-area">
                      <div class="chat-main__message-list__content__user-area--name">
                        ${message.user_name}
                      </div>
                      <div class="chat-main__message-list__content__user-area--date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-main__message-list__content__message-area">
                      <div class="chat-main__message-list__content__message-area--text">
                        ${message.body}
                      </div>
                    </div>
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
    var reloadMessages = function() {
      last_message_id = $('.chat-main__message-list__content:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            appendMessage(message);
          });
          message_list.animate({ scrollTop: message_list[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('エラーが発生しました。');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
});
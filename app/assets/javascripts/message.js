$(function(){
  function buildHTML(message){
    var img = (message.image.url == null)? `</p>`:`<img src ="${ message.image.url }"></p>`;
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                    ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                    ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <div class="lower-message__content">
                    ${message.content}
                    </div>
                    <img class="lower-message__image" >
                    ${ img }
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight+100}, 'fast');
    })

    .fail(function(){
      alert('error1');
    })

    return false; 
  });

  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight+100}, 'fast');
      var last_message_id = $('.message').last().data('id');
      var href = 'api/messages'

      $.ajax({
        url: href,
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })

      .done(function(message){
        message.forEach(function(message){
          var insertHTML = buildHTML(message)
          $('.messages').append(insertHTML)
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight+100}, 'fast');
        })
      })

      .fail(function(){
        alert('error2');
      });

    } else {
      clearInterval(interval);
    }
  }, 5000 );
});
$(function(){
  function buildHTML(message){
    var html = `<div class="message" data-id="${ message.id }">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                    ${ message.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class="lower-message">
                    <% if message.content.present? %>
                      <div class="lower-message__content">
                        ${ message.body }
                      </div>
                      <br>
                      ${ img }
                  </div>`
  }

  $('new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'PORT',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $(',messages').append(html);
      $('new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}); 
    })

    .fail(function(){
      alert('error');
    })

    return false; 
  });
});
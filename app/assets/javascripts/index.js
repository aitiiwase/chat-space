$(function() {
  
  var search_list = $("#user-search-result");

  function appendList(user) {  //検索結果の表示
    var html = `<div class="chat-group-user clearfix search" id="${ user.id }_search">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" id="${ user.id }_add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`
    search_list.append(html)
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendList(user);
          //検索リストで追加ボタンがクリックされたとき
          $(".chat-group-user.clearfix.search").on("click", `#${user.id}_add`, function() {  //ajaxで後から追加された要素にもイベントを発火させる際の記述方法
            appendUser(user);
            $(`#${user.id}_search`).remove();  //メンバーに追加されたユーザーを検索リストから削除
          });
        });
        
      } else {
        appendErrMsgToHTML("一致するユーザーがありません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});
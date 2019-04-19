# 小工具-採買清單
可以增加你的購買清單，
已購買的可以打勾，
也可刪除清單，
資料儲存在你的瀏覽器中。



$(document).ready(function(){
  var listnum = 1;
  var list = $("ul");
  var sortableList = $( "#sortable" );
  var taskInput = $(".add-text");
  var addButton = $(".add");

  //增加項目規則//
  function additem (){
    var addtext = taskInput.val();
    var listitem = $("<li><div><input type='checkbox' value='None' name='check' ></div><p>" + addtext + "</p><a class='close'>X</a></li>");
    
    //輸入框大於等於1字時可增加//
    if(addtext.length > 0) {
      list.prepend(listitem);
      taskInput.val("");
    }
  }

  //按下Enter鍵也可以增加//
  addButton.click(function(){
     additem(); 
  });
  
  //儲存html//
  $('#save').click(function() {    
    localStorage.setItem("test", $('#sortable').html());
    alert('已成功儲存');
  });

  //按下Enter鍵也可以增加//
  taskInput.keypress(function( event ) {
     if ( event.which == 13 ) {
       additem();
     }
  });

  //checkbox 打勾項目下橫線 移至最上層//
  list.on('click', 'input[type=checkbox]', function () {
      if ( $(this).parents("li").hasClass("compvared") ) {
        $(this).removeAttr('checked');
        $(this).parents("li").removeClass("compvared");
        $(this).parents("li").appendTo("ul");
      } else {
        $(this).attr('checked', true);
        $(this).parents("li").addClass("compvared");
        $(this).parents("li").prependTo("ul"); 
      }
  });
 
  //按下X 取消項目//
  list.on('click', '.close', function () {
      $(this).parent().remove();
  });

  //讀取html//
  $('#sortable').html(localStorage.getItem("test"));

});


//图片上传
function handleFiles(obj) {
  var files = obj.files;
  var imgdiv=$(obj).parents('.uploadImg');
  var i=$(imgdiv).attr('id');
  var imgAm=$(imgdiv).attr('data');
  var iconId='#iconImg'+imgAm;
  if (window.URL) {
      var img = new Image();
      img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
      img.width = 40;
      img.height = 40;
      img.onload = function (e) {
        window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
      };
      path = window.URL.createObjectURL(files[0]);
      $(iconId).html("<img src='"+path+"' width='100' height='100' /><a class=' delete-btn' data='"+i+"' onclick='deleteImg(this)'>x</a>");
  }else if (window.FileReader) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function (e) {
      img.src = this.result;
      img.width = 40;
      img.height = 40;
    };
    path = this.result;
    $(iconId).html("<img src='"+path+"' width='100' height='100' /><a class=' delete-btn' data='"+i+"' onclick='deleteImg(this)'>x</a>");
  }else {
    //ie
    obj.select();
    obj.blur();
    var nfile = document.selection.createRange().text;
    document.selection.empty();
    img.src = nfile;
    img.width = 40;
    img.height = 40;
    img.onload = function () {
      alert(nfile + "," + img.fileSize + " bytes");
    };
    path = document.selection.createRange().text;
    $(iconId).html("<img src='"+path+"' width='100' height='100' /><a class=' delete-btn' data='"+i+"' onclick='deleteImg(this)'>x</a>");
  }
}
//上传图片删除图片
function deleteImg(obj){
  $(obj).parents('.uploadImg').remove();
}
//点击增加上传模块
var imgAm=0;
function addImg(){
  imgAm++;
  $('#communityForm ul').append(
    '<li class="uploadImg" id="uploadImg'+imgAm+'" data="'+imgAm+'">'
        +'<div class="item-inner">'
          +'<div class="item-input item-img" id="iconImg'+imgAm+'">'
            +'<img src="upload.jpg" alt="" style="width: 100px;">'
          +'</div>'
          +'<div class="item-input">'
            +'<input type="file" name="file" class="uploadInput" onchange="handleFiles(this)">'
          +'</div>'
      +'</div>'
    +'</li>');
}

// 提交方式var formData = new FormData($$('#communityForm')[0])，然后ajax传的data值为formData即可
function showSwal(message) {
   Swal.fire({title:message,text: 'Cửa sổ sẽ tự đóng trong vòng 2 giây',timer:2000})
}
function showAlert(message){
   Swal.fire({
      icon: 'error',
      title: 'Vui lòng kiểm tra lại!',
      text: message,
   })
}
function confirmMessage(message, callback){
   Swal.fire({
      title: 'Xác nhận thao tác!',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chấp nhận'
    }).then((result) => {
      if (result.isConfirmed) {
         callback(true);
      }
    })
}
function showLoading(){
   var loadingDiv = document.createElement("div");
   loadingDiv.innerHTML = `<img src="../assets/admin/img/loading.gif" width="300px"/>`;
   loadingDiv.id = "loadingDiv";
   loadingDiv.style.cssText = "width:100vw; height: 100vh; background-color: black; opacity: 0.7; position: fixed; top:0px; left: 0px; z-index: 2; display: flex;align-items: center; justify-content: center;";
   document.body.appendChild(loadingDiv);
}
function stopLoading(){
   var loadingDiv = document.getElementById("loadingDiv");
   if(loadingDiv){
      loadingDiv.remove();
   }
}
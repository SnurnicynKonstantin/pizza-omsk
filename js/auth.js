function ajax_login() {
    $.ajax({
      url: '/user/login',
      data: "phone="+$("#login_phone").val().replace(/[^0-9]/gi,"").substr(1)+'&password='+$("#login_password").val()+"&ajax=login-form",
      success: function(data){
        data = JSON.parse(data);
        if (data.error === false) {
            window.location.replace("/");
        } else {
            $('#login_error').html(data.data.message);
        }
      }
  });
}

function ajax_recovery() {
  $("#recovery_submit").prop('disabled', true);
    $.ajax({
      url: '/user/recovery',
      data: "phone="+$("#recovery_phone").val().replace(/[^0-9]/gi,"").substr(1),
      success: function(data){
        data = JSON.parse(data);
        if (data.error === false) {
            $('.auth_form').hide();
            $('#recovery_message').html(data.data.message);
        } else {
            $("#recovery_submit").prop('disabled', false);
            $('#recovery_error').html(data.data.message);
        }
      }
  });
}




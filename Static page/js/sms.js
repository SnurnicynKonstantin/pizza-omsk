// $("#sms_phone").mask("+7? (999) 999 99 99").blur(function () {
//                     if ($(this).mask() == '') $(this).val('');
//          });

$("#sms_phone").live('focusin', function() {
  $("#sms_phone").mask("+7? (999) 999 99 99").blur(function () {
                    if ($(this).mask() == '') $(this).val('');
         });
});
function AjaxSmsConfirm(result_id,form_id) {
        $("#error_message").html("");
				$("#success_message").html("");
        $("#confirmButton").prop("disabled", true);
                jQuery.ajax({
                    url:     "/sms/confirm/", //Адрес подгружаемой страницы
                    type:     "GET", //Тип запроса
                    dataType: "json", //Тип данных
                    data: jQuery("#"+form_id).serialize(),
                    success: function(response) { //Если все нормально
                      if (response.error === false) {
                        $("#confirm_form").hide();
                        $("#success_message").html(response.message);
                        stopTimer();
                      } else {
                        $("#error_message").html(response.message);
                      }
                      $("#confirmButton").prop("disabled", false);

                    	// console.log(response);
	                }
             });
}

function AjaxSendSms(result_id,form_id) {
				stopTimer();
				$("#error_message").html("");
				$("#success_message").html("");
        $("#sendButton").prop("disabled", true);

                jQuery.ajax({
                    url:     "/sms/send", //Адрес подгружаемой страницы
                    type:     "GET", //Тип запроса
                    dataType: "json", //Тип данных
                    data: "phone="+$("#sms_phone").val().replace(/[^0-9]/gi,"").substr(1),
                    //data: jQuery("#"+form_id).serialize(),
                    success: function(response) { //Если все нормально
                    	if (response.error === false) {
	                    	$("#request_form").hide();
                    		$("#confirm_form").show();
                    		$("#code_id").val(response.code_id);
                    		startTimer();
                    	} else {
		                	$("#error_message").html(response.message);
                    	}
                      $("#sendButton").prop("disabled", false);
                    	// console.log(response);
	                }
             });
}

$('#success_message').bind('change', function() {
  	if ($(this).text() != false) {
  		$(this).show();
  	} else {
  		$(this).hide();
  	}
});

$('#error_message').bind('change', function() {
  	if ($(this).text() != false) {
  		$(this).show();
  	} else {
  		$(this).hide();
  	}
});
$('#timer').bind('change', function() {
	// console.log(parseInt($(this).html()));
  	if ( parseInt($(this).html()) == 0 || parseInt($(this).html()) < 0) {


  	}
});

function restartTimer() {
	$("#request_form").show();
	$("#confirm_form").hide();
	stopTimer();
	$("#error_message").html('Время действия кода закончилось! <br>Пожалуйста повторите попытку!');
}

var timer;
var count = $('#code_live_time').html();
function startTimer() {
	$('#timer').html($('#code_live_time').html());
	timer = setInterval(function() { count = $('#timer').html(); count--; $('#timer').html(count); if (count == 0 || count <0) {restartTimer();} }, 1000);
}
function stopTimer() {
	clearInterval(timer);
}


// $("#sms_phone").live("keyup", function() {
// 	// console.log( isNaN( $(this).val()) );
// 	if ( isNaN( $(this).val() ) == true) {
//   		$("input#sms_phone").val("");
//   	}
// });

// $("#sms_code").live("keyup", function() {
// 	// console.log( isNaN( $(this).val()) );
// 	if ( isNaN( $(this).val() ) == true) {
//   		$("input#sms_code").val("");
//   	}
// });
// $("input#sms_phone").live("keyup", function() {
// 	console.log( typeof $(this).val() );
// 	if ( typeof $(this).val() != 'number') {
//   		$("input#sms_phone").val("");
//   	}
// });
function showSmsForm() {
    $("#parent_popup").dialog($.extend({}, {'title': 'Отписаться от sms-рассылки', 'width': 300, 'height': 'auto'}));
}

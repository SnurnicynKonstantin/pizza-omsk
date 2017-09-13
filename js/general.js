function show_delivery_form(){
  	$(".layout").show();
  	$(".windows").html("<div class='popup order_popup'>" + 
  		                   "<a class='close' href='javascript:close_form();''>" + 
  		                       "<img src='./pix/blank.gif' alt='Закрыть' title='Закрыть'>" + 
  		                    "</a>" +
  		                   "<div class='block_inner'>" + 
  		                       "<div>Доставка от 500 р. до 22 часов.</div>" + 
  		                    "</div>" + 
  		                "</div>");
  	var Top_modal_window = $(window).height()/2-$(".order_popup").height()/2;
	var Left_modal_window = $(document).width()/2-$(".order_popup").width()/2;
	$(".order_popup").css({"top":Top_modal_window+"px","display":"block", "left": Left_modal_window+"px" });
}

function close_form() {
	$(".layout").hide();
	$(".windows").html("");
}

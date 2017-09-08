/*
Набор скриптов для работы корзины и заказа
*/


// setTimeout(function() { console.log(promos); }, 2000);

var prize_pizza = 0;
var prize_discount = 0;
var prize_x = 1;
var prize_bonus = [];



function setBeginPrices(element) {
	$("#multi"+element.getAttribute("name")).html(element.getAttribute("price"));
}
$(function() {
	// updateBasket();
	$("#order_phone").mask("+7? (999) 999 99 99").blur(function () {
                    if ($(this).mask() == '') $(this).val('');
         });

	$('#custom_bonus').bind("change keyup input click", function() {
	    if (this.value.match(/[^0-9]/g)) {
	        this.value = this.value.replace(/[^0-9]/g, '');
	        $("order_bonus").val("");
	    }
	});
	var bonus = Math.ceil( ($('#total_sum').html() - $('#order_bonus').val()) *0.05*prize_x );
	$('#show_order_bonus').html(bonus);

	$( window ).scroll(function() {
		if ( $(window).scrollTop() > 80) {
			$("div.top_menu").css("top", "0px");

		} else {
			// $("div.top_menu").css("top", "101px");
			var h = $("#alertNotWorking").height() + 155;
			//console.log(h);
			if($("#alertNotWorking").length > 0)
				$("div.top_menu").css("top", h-$(window).scrollTop()+"px");
			else
				$("div.top_menu").css("top", 101-$(window).scrollTop()+"px");
		}
	});

	$("input[type='radio']").change(function() {
            $("#multi"+this.getAttribute("name")).html(this.getAttribute("price"));
    });


	inputs = $("input[type='radio']:checked").toArray();

	for(i in inputs)
	{
		setBeginPrices(inputs[i])
	}
	//inputs.forEach(setBeginPrices);

	$("#custom_bonus").bind('keyup',function(){
		setInterval(checkBonus(), 400);
	});

	$( "#prize_select" ).change(function() {
		//узнаем что за приз и какой группы, чтобы понять как его обрабатывать
		group_id = $("#prize_select option:selected").attr("group");
		prize_value = $("#prize_select option:selected").val();
		prize_title = $("#prize_select option:selected").html();
		prize_base_id = $("#prize_select option:selected").attr("baseid");
		$("#prize_form_title").html("Сюрприз");
		$("#prize_select").prop("disabled", true).hide();
		$("#prize_choice").html(prize_title).show();
		$("#prize_change").show();

		setPrize(group_id, prize_value, prize_title, prize_base_id);
	});



	$(".head_basket").click(function(){
		show_basket();
	});

	$("#check_promocode_button").click(function(){
		check_promo_code($("#promocode").val());
	});

	$( "#order_button" ).click(function() {
		var error = false;
		if ( $("#order_name").val() == "" ) {
			$("#error_name").html("Вы забыли указать Имя");
			error = true;
		}
		if ( $("#order_phone").val() == "" ) {
			$("#error_phone").html("Вы забыли указать Телефон");
			error = true;
		}
		/*if ( $("#order_street").val() == "" ) {
			$("#error_street").html("Вы забыли указать Улицу");
			error = true;
		}*/
		
		if ( $("#order_house").val() == "" ) {
			$("#error_house").html("Вы забыли указать Дом");
			error = true;
		}
		if ( $("#order_flat").val() == "" ) {
			$("#error_flat").html("Вы забыли указать Квартиру");
			error = true;
		}
		bonus = parseInt($("#order_bonus").val());
		if ( false ) {
			var data = {
			  errors: [
			    {
			      message:"Неверно указано количество бонусов",
			    }
			  ]
			};
			$(".errors_block").html(
			  $("#order_errors").render(data)
			);
			error = true;
		}
		if (error) return;
		$("#order_phone").val( $("#order_phone").val().replace(/[^0-9]/gi,"").substr(1) );
	    $('#order_form').submit();
	    $("#order_button").prop('disabled', true);

	});


	$( "#code_button" ).click(function() {
		var error = false;

	    // $('#order_form').submit();
	    $("#loader").show();
	    $("#code_button").prop('disabled', true);
	    $.ajax({
			  url: '/shop/checkCode',
			  data: "code="+$("#surcode").val(),
			  success: function(data){

			  	data = JSON.parse(data);
			  	console.log(data);
			  	if (data.error === false) {
			  		$("#imgbox").html(function(){
			  			return '<img src="'+data.data.img_l+'">';
			  		});
			  		$("#loader").hide();
			  		$("#code_button").prop('disabled', false);
			  		$(".surform").hide();
			  		$(".surimg").slideDown(1500);
			  		$("#surcode").val("");
			  		// $(".basket_table").find("tr:first").append(function(){
			  		// 	return '';
			  		// });

			  		setTimeout(function(){
			  			$('<tr class="new_prize"><td class="col_pic"><img src="'+data.data.img_s+'" width="44" alt="" title="" /></td><td class="col_title"><span>'+data.data.title+'</></td><td class="col_price">'+data.data.deadline_date+'</td></tr>').insertAfter("#head");
			  		}, 1000);
			  		setTimeout(function(){
			  			$(".new_prize:first").animate({backgroundColor: "#fccd33"}, 1000).animate({backgroundColor: "white"}, 4000);
			  		}, 1000);

			  	} else {
			  		$("#loader").hide();
			  		$("#error_code").html(data.data.message);
			  		$("#code_button").prop('disabled', false);
			  		console.log(data);
			  	}

			  }
		});

	});

});

function updateBasket(data, message) {

	data.message = message;
	$("#main_basket").html(
	  $("#mainBasket").render(data)
	);
	$(".popup_basket").animate({ "top": "+=273px" }, "slow", function() {
			setTimeout('$(".popup_basket").fadeOut(1600, "linear")', 6000);
		}
	);
}


function addPosition(position_id, amount){
	$.ajax({
		  url: '/shop/plus',
		  data: "position_id="+position_id+'&amount='+amount,
		  success: function(data){
		  	data = JSON.parse(data).data;
		    updateBasket(data, true);
		    if (data.count >= 1) {
		    	$('#buy_block'+data.id).html(
		    		$('#buyBlockMultiTemplate').render(data)
		    	);
		    } else {
		    	$('#buy_block'+data.id).html(
		    		$('#buyBlockOneTemplate').render(data)
		    	);
		    }
		  }
	});
}

function addPosition(position_id, amount, ny){
	$.ajax({
		  url: '/shop/plus',
		  data: "position_id="+position_id+'&amount='+amount,
		  success: function(data){
		  	data = JSON.parse(data).data;
		    updateBasket(data, true);
		    if (data.count >= 1) {
		    	if (ny) {
		    		$('#buy_block'+data.id).html(
			  			$('#buyBlockMultiTemplateNY').render(data)
			    	);
		    	} else {
		    		$('#buy_block'+data.id).html(
			  			$('#buyBlockMultiTemplate').render(data)
			    	);
		    	}

		    } else {
		    	if (ny) {
		    		$('#buy_block'+data.id).html(
			  			$('#buyBlockOneTemplateNY').render(data)
			    	);
		    	} else {
		    		$('#buy_block'+data.id).html(
			  			$('#buyBlockOneTemplate').render(data)
			    	);
		    	}
		    }
		  }
	});
}



function removePosition(position_id, amount, ny){
	$.ajax({
		  url: '/shop/minus',
		  data: "position_id="+position_id+'&amount='+amount,
		  success: function(data){
		  	data = JSON.parse(data).data;
		    updateBasket(data, false);
		    if (data.count >= 1) {
		    	if (ny) {
		    		$('#buy_block'+data.id).html(
			  			$('#buyBlockMultiTemplateNY').render(data)
			    	);
		    	} else {
		    		$('#buy_block'+data.id).html(
			  			$('#buyBlockMultiTemplate').render(data)
			    	);
		    	}

		    } else {
		    	if (ny) {
		    		$('#buy_block'+data.id).html(
			  			$('#buyBlockOneTemplateNY').render(data)
			    	);
		    	} else {
					var tpl = '#buyBlockOneTemplate';
					
					if(position_id == 22 || position_id == 24 || position_id == 206 || position_id == 207)	
						tpl = tpl+'Discount';
				
					
		    		$('#buy_block'+data.id).html(
			  			$(tpl).render(data)
			    	);
		    	}
		    }
		  }
	});
}

function addRadioPosition(radio_name, amount){
	var position_id = $(":radio[name="+radio_name+"]:checked").val()
	$.ajax({
		  url: '/shop/plus',
		  data: "position_id="+position_id+'&amount='+amount,
		  success: function(data){
		  	data = JSON.parse(data).data;

		    if (data.count == 0) {
		    	$(":radio[name="+radio_name+"][value="+position_id+"]").parent().children(".radioinfo").html(data.add_info);
		    } else {
		    	$(":radio[name="+radio_name+"][value="+position_id+"]").parent().children(".radioinfo").html(data.add_info+" (в корзине: "+data.count+")");
		    }
		    updateBasket(data, true);

		  }
	});
}

function addTablePosition(position_id, amount){
	$.ajax({
		  url: '/shop/plus',
		  data: "position_id="+position_id+'&amount='+amount,
		  success: function(data){
		  	data = JSON.parse(data);
		    if (data.error === false) {
				totalSum = data.data.total_sum;
		    	$('#tr'+position_id).children(".col_qty").children(".qty_row").html(data.data.count);
		    	$('#tr'+position_id).children(".col_price").html(data.data.price);
		    	$('#tr'+position_id).children(".col_sum").html(data.data.sum);
		    	$('#total_sum').html(data.data.total_sum);

		    	$('#custom_bonus').val("");
		    	$('#total_after_bonus_value').html("");
		    	$('#order_bonus').val("");
		    	$("#total_after_bonus").hide();
		    	// $("#bonus_form").hide();


		    }
		  }
	});

}

function addTablePositionOrder(position_id, amount){
	$.ajax({
		  url: '/shop/plus_table',
		  data: "position_id="+position_id+'&amount='+amount+'&prize_id=&prize_pizza='+prize_pizza+'&prize_discount='+prize_discount,
		  success: function(data){
		  	data = JSON.parse(data);
		    if (data.error === false) {
    			if (prize_discount != 0) {
    				$("#main_order_table").html($("#discount_order_table_template").render(data.data));
    			}
    			else if (prize_pizza != 0) {
    				$("#main_order_table").html($("#main_order_table_template").render(data.data));
    			}
    			else if (prize_x != 0) {
    				$("#main_order_table").html($("#main_order_table_template").render(data.data));
    			} else {
    				$("#main_order_table").html($("#main_order_table_template").render(data.data));
    			}
				var bonus = Math.ceil( ($('#total_sum').html() - $('#order_bonus').val()) *0.05*prize_x );
				$('#show_order_bonus').html(bonus);
				$('#total_after_bonus_value').html($('#total_sum').html() - $('#custom_bonus').val());
				if (data.data.priz) {
					//$('#prize_id').val(data.data.priz);
					$('#prize_yes').show();
					$('#prize_no').hide();
				} else{
					//$('#prize_id').val("");
					$('#prize_yes').hide();
					$('#prize_no').show();
				}
				// $("#prize_select [value='0']").attr("selected", "selected");


		    }
		  }
	});

}


function addPrizePizza(prize_pizza){
	prize_discount = 0;
	$.ajax({
		  url: '/shop/plus_prize_pizza',
		  data: 'prize_pizza='+prize_pizza,
		  success: function(data){
		  	data = JSON.parse(data);
		    if (data.error === false) {

	    		$("#main_order_table").html(
				  $("#main_order_table_template").render(data.data)
				);
				var bonus = Math.ceil( ($('#total_sum').html() - $('#order_bonus').val()) *0.05*prize_x );
				$('#show_order_bonus').html(bonus);
				$('#total_after_bonus_value').html($('#total_sum').html() - $('#custom_bonus').val());
				// console.log(data.data.priz);
				if (data.data.priz) {
					$('#prize_id').val(data.data.priz);
					$('#prize_yes').show();
					$('#prize_no').hide();
				} else{
					$('#prize_id').val("");
					$('#prize_yes').hide();
					$('#prize_no').show();
				}

		    }
		  }
	});

}

function addPrizeDiscount(discount, base_id){
	prize_pizza = 0;
	$.ajax({
		  url: '/shop/plus_prize_discount',
		  data: 'discount='+discount+'&base_id='+base_id,
		  success: function(data){
		  	data = JSON.parse(data);
		    if (data.error === false) {

	    		$("#main_order_table").html(
				  $("#discount_order_table_template").render(data.data)
				);
				var bonus = Math.ceil( ($('#total_sum').html() - $('#order_bonus').val()) *0.05*prize_x );
				$('#show_order_bonus').html(bonus);
				$('#total_after_bonus_value').html($('#total_sum').html() - $('#custom_bonus').val());
				// console.log(data.data.priz);
				if (data.data.priz) {
					$('#prize_id').val(data.data.priz);
					$('#prize_yes').show();
					$('#prize_no').hide();
				} else{
					$('#prize_id').val("");
					$('#prize_yes').hide();
					$('#prize_no').show();
				}

		    }
		  }
	});

}

function clearPrize(){
	$.ajax({
		  url: '/shop/clear_prize',
		  success: function(data){
		  	data = JSON.parse(data);
		    if (data.error === false) {

	    		$("#main_order_table").html(
				  $("#main_order_table_template").render(data.data)
				);

				$('#total_after_bonus_value').html($('#total_sum').html() - $('#custom_bonus').val());
				if (data.data.priz) {
					$('#prize_id').val(data.data.priz);
					$('#prize_yes').show();
					$('#prize_no').hide();
				} else{
					$('#prize_id').val("");
					$('#prize_yes').hide();
					$('#prize_no').show();
				}
				prize_pizza = 0;
			    prize_discount = 0;
			    prize_x = 1;
			    $("#prize_pizza_id").val("");
			    $("#prize_discount_id").val("");
			    $("#prize_x_id").val("");

			    var bonus = Math.ceil( ($('#total_sum').html() - $('#order_bonus').val()) *0.05*prize_x );
				$('#show_order_bonus').html(bonus);

		    }
		  }
	});

}

function addPrize(prize_id){
	$.ajax({
		  url: '/shop/add_prize',
		  data: "prize_id="+prize_id,
		  success: function(data){
		  	data = JSON.parse(data);
		  	console.log(data);
		    if (data.error === false) {

		    }
		  }
	});
}

function removeTablePosition(position_id, amount){
	if ($('#tr'+position_id).children(".col_qty").children(".qty_row").html() != 0) {
		$.ajax({
			  url: '/shop/minus',
			  data: "position_id="+position_id+'&amount='+amount,
			  success: function(data){
			  	data = JSON.parse(data);
			    if (data.error === false) {
			    	$('#tr'+position_id).children(".col_qty").children(".qty_row").html(data.data.count);
			    	$('#tr'+position_id).children(".col_price").html(data.data.price);
			    	$('#tr'+position_id).children(".col_sum").html(data.data.sum);
			    	$('#total_sum').html(data.data.total_sum);

			    	$('#custom_bonus').val("");
			    	$('#total_after_bonus_value').html("");
			    	$('#order_bonus').val("");
			    	$("#total_after_bonus").hide();
			    	// $("#bonus_form").hide();
			    }
			  }
		});
	}
}

function removeTablePositionOrder(position_id, amount){
	if ($('#tr'+position_id).children(".col_qty").children(".qty_row").html() != 0) {
		$.ajax({
			  url: '/shop/minus_table',
			  data: "position_id="+position_id+'&amount='+amount+'&prize_id='+$('#prize_id').val()+'&prize_pizza='+prize_pizza+'&prize_discount='+prize_discount,
			  success: function(data){
			  	data = JSON.parse(data);
			    if (data.error === false) {
	    			if (prize_discount != 0) {
	    				$("#main_order_table").html($("#discount_order_table_template").render(data.data));
	    			}
	    			else if (prize_pizza != 0) {
	    				$("#main_order_table").html($("#main_order_table_template").render(data.data));
	    			}
	    			else if (prize_x != 0) {
	    				$("#main_order_table").html($("#main_order_table_template").render(data.data));
	    			} else {
	    				$("#main_order_table").html($("#main_order_table_template").render(data.data));
	    			}
					var bonus = Math.ceil( ($('#total_sum').html() - $('#order_bonus').val()) *0.05*prize_x );
					$('#show_order_bonus').html(bonus);
					$('#total_after_bonus_value').html($('#total_sum').html() - $('#custom_bonus').val());
					if (data.data.priz) {
						$('#prize_id').val(data.data.priz);
						$('#prize_yes').show();
						$('#prize_no').hide();
					} else{
						$('#prize_id').val("");
						$('#prize_yes').hide();
						$('#prize_no').show();
					}
					// $("#prize_select [value='0']").attr("selected", "selected");
			    }
			  }
		});
	}
}

function showBonus () {
	$("#bonus_form").slideToggle("slow");
}



function checkBonus () {
	user_bonus = $("#custom_bonus").val();
	total_sum = $("#total_sum").text();
	if (user_bonus == "0" || user_bonus == "") {
		$("#total_after_bonus_value").html("");
    	$("#total_after_bonus").hide();
    	$("#order_bonus").val("");
    	$("#custom_bonus").val("");
    	var prize_bonus = Math.ceil( ($('#total_sum').html() - $('#order_bonus').val()) *0.05*prize_x );
		$('#show_order_bonus').html(prize_bonus);

	} else {
		//console.log(total_sum);
		if (user_bonus > bonus) {
			user_bonus = bonus;
		}
		
		if (user_bonus > total_sum / 2) {
			user_bonus = total_sum / 2;
		}
	
    	if (user_bonus > bonus) {
	    	$("#order_bonus").val(bonus);
	    	$("#custom_bonus").val(bonus);
	    	$("#total_after_bonus_value").html( $("#total_sum").html() - bonus);
		} else {
			$("#order_bonus").val(user_bonus);
			$("#custom_bonus").val(user_bonus);
			$("#total_after_bonus_value").html( $("#total_sum").html() - user_bonus);
		}
		$("#total_after_bonus").show();
		var prize_bonus = Math.ceil( ($('#total_sum').html() - $('#order_bonus').val()) *0.05*prize_x );
		$('#show_order_bonus').html(prize_bonus);


	}

}

function activate_promo() {
	$("#prize_form_button").html('<a href="javascript:activate_prize();">Сюрприз</a>');
	$("#promo_form_button").html('промо-код');
	$("#f_prize").hide();
	$("#f_promo").show();
}

function activate_prize() {
	$("#promo_form_button").html('<a href="javascript:activate_promo();">промо-код</a>');
	$("#prize_form_button").html('Сюрприз');
	$("#f_prize").show();
	$("#f_promo").hide();
}

function change_prize_choice() {
	clearPrize();
	$("#prize_select [value='0']").attr("selected", "selected");
	$("#prize_form_title").html('<span id="prize_form_button">Сюрприз</span> или <span id="promo_form_button"><a href="javascript:activate_promo();">промо-код</a></span>');
	$("#prize_select").prop("disabled", false).show();
	$("#prize_choice").html("").hide();
	$("#prize_change").hide();
}

function change_promo_choice() {
	clearPrize();
	$("#prize_select [value='0']").attr("selected", "selected");
	$("#prize_form_title").html('<span id="prize_form_button"><a href="javascript:activate_prize();">Сюрприз</a></span> или <span id="promo_form_button">промо-код</span>');
	$("#promocode_input").prop("disabled", false).show();
	$("#promo_choice").html("").hide();
	$("#promo_change").hide();
	$("#promo_error").hide();
}

function setPrize(group_id, prize_value, prize_title, prize_base_id){
		if (group_id == 2) {
		    addPrizePizza(prize_value);
		    prize_pizza = prize_value;
		    prize_discount = 0;
		    prize_x = 1;
		    $("#prize_pizza_id").val(prize_base_id);
		    $("#prize_discount_id").val("");
		    $("#prize_x_id").val("");
		}
		if (group_id == 4) {
		    addPrizeDiscount(prize_value);
		    prize_discount = prize_value;
		    prize_pizza = 0;
		    prize_x = 1;
		    $("#prize_discount_id").val(prize_base_id);
		    $("#prize_pizza_id").val("");
		    $("#prize_x_id").val("");
		}

		if (group_id == 6) {
		    prize_discount = 0;
		    prize_pizza = 0;
		    prize_x = prize_value;

		    var bonus = Math.ceil( ($('#total_sum').html() - $('#order_bonus').val()) *0.05*prize_x );
			$('#show_order_bonus').html(bonus);

		    $("#prize_discount_id").val("");
		    $("#prize_pizza_id").val("");
		    $("#prize_x_id").val(prize_base_id);
		}
	}

function givePromoPrizeToUser(prize_id, group_id, prize_value, prize_title){
	$.ajax({
		  url: '/shop/add_promoprize',
		  data: "prize_id="+prize_id,
		  success: function(data){
		  	data = JSON.parse(data);
		    if (data.error === false) {
		    	setPrize(group_id, prize_value, prize_title, data.data.userprize_id);
		    	return data.data.userprize_id;
		    }
		  }
	});
}
function removePromoPrizeToUser(){
	$.ajax({
		  url: '/shop/remove_promoprize',
		  success: function(data){
		  }
	});
}


function check_promo_code(code){
	if (code == "7777") {
		var group_id = 4;
		var prize_value = 15;
		var prize_title = "Скидка 15%";
		givePromoPrizeToUser(60,group_id, prize_value, prize_title);
	} else if (code == "1111") {
		var group_id = 6;
		var prize_value = 5;
		var prize_title = "Бонус х5";
		givePromoPrizeToUser(56,group_id, prize_value, prize_title);
	} else if (code == "2222") {
		var group_id = 2;
		var prize_value = 162;
		var prize_title = "Блюдо в подарок добавлено в корзину";
		givePromoPrizeToUser(65,group_id, prize_value, prize_title);

	} else{
		$("#promo_error").show();
		exit();
	}
    
//    $("#promo_error").show();
//    exit();
    
	$("#prize_form_title").html("Промо-код");
	$("#promocode_input").prop("disabled", true).hide();
	$("#promocode").val("");
	$("#promo_choice").html(prize_title).show();
	$("#promo_change").show();
	$("#promo_error").hide();
}




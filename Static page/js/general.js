$(document).ready(function() {
    // $("a.big_images").fancybox();

    $("#surcode").mask("99999999").blur(function () {
        if ($(this).mask() == '') $(this).val('');
    });
    $("#promocode").mask("9999").blur(function () {
        if ($(this).mask() == '') $(this).val('');
    });
});

function show_basket() {
    $(".layout").show();
//	$(".layout").activity({segments: 12, width:6, space: 12, length: 30, color: '#f4722b', speed: 1.5});
    $.ajax({
        url: '/template/basket',
        success: function(data){
            $(".layout").activity(false);

            $(".windows").html(data);
            var Top_modal_window = $(document).scrollTop() + $(window).height()/2-$(".order_popup").height()/2;
            var Left_modal_window = $(document).width()/2-$(".order_popup").width()/2;
            $(".order_popup").css({"top":Top_modal_window+"px","display":"block", "left": Left_modal_window+"px" });

        }
    });
}

function show_position_info(position_id) {
    $(".waiting").show();
    // $(".waiting").activity({segments: 12, width:6, space: 12, length: 30, color: '#f4722b', speed: 1.5});
    $.ajax({
        url: '/template/position_info',
        data: "position_id="+position_id,
        success: function(data){
            // $(".waiting").activity(false);
            $(".layout").show();
            $(".waiting").hide();

            $(".windows_info").html(data);
            var Top_modal_window = $(document).scrollTop() + $(window).height()/2-$(".prod_popup").height()/2;
            var Left_modal_window = $(document).width()/2-$(".prod_popup").width()/2;
            $(".prod_popup").css({"top":Top_modal_window+"px","display":"block", "left": Left_modal_window+"px" });

        }
    });
}

function show_window(template, callback) {
    $.ajax({
        url: '/template/window/',
        data: "template="+template,
        success: function(data){
            $(".layout").show();
            $(".windows").html(data);
            var Top_modal_window = $(document).scrollTop() + $(window).height()/2-$(".delivery_popup").height()/2;
            var Left_modal_window = $(document).width()/2-$(".delivery_popup").width()/2;
            $(".delivery_popup").css({"top":Top_modal_window+"px","display":"block", "left": Left_modal_window+"px" });
            callback(data);

        }
    });
}

function show_login_form(){
    var template = "login";

    $.ajax({
        url: '/template/window/',
        data: "template="+template,
        success: function(data){
            $(".layout").show();
            $(".windows").html(data);
            var Top_modal_window = $(document).scrollTop() + $(window).height()/2-$(".auth_popup").height()/2;
            var Left_modal_window = $(document).width()/2-$(".auth_popup").width()/2;
            $(".auth_popup").css({"top":Top_modal_window+"px","display":"block", "left": Left_modal_window+"px" });
            $("#login_phone").mask("+7? (999) 999 99 99").blur(function () {
                if ($(this).mask() == '') $(this).val('');
            });
        }
    });
}

function show_recovery_form(){
    var template = "recovery";
    $.ajax({
        url: '/template/window/',
        data: "template="+template,
        success: function(data){
            $(".layout").show();
            $(".windows").html(data);
            var Top_modal_window = $(document).scrollTop() + $(window).height()/2-$(".reg_popup").height()/2;
            var Left_modal_window = $(document).width()/2-$(".reg_popup").width()/2;
            $(".reg_popup").css({"top":Top_modal_window+"px","display":"block", "left": Left_modal_window+"px" });
            $("#recovery_phone").mask("+7? (999) 999 99 99").blur(function () {
                if ($(this).mask() == '') $(this).val('');
            });
        }
    });
}

function close_form() {
    $(".popup").html("");
    $(".layout").hide();
    $(".windows").html("");
    $(".windows_info").html("");
}

function close_windows_info(){
    $(".layout").hide();
    $(".windows_info").html("");
}

function open_surform() {
    $('.surimg').hide();
    $(".surform").show();
    $("#error_code").html("");
}
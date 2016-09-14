$(document).ready(function() {
	$("._fone").click(function() {
		$("._flex").css({"border-bottom": "none"});
		$(this).css({"border-bottom": "2px solid #e7a169"});
		// $(".order_al").fadeIn("fast");
		$(".order_al").css({"display":"block"});
	});
	$("._ftwo").click(function() {
		var jj=$("._nocheck").text()
		var m="";
		for (var i =0;i<jj.length/3;i++) {
			 m+="未确认";
		}
		if(jj==m){
			$("._flex").css({
				"border-bottom": "none",
			});
			$(this).css({
				"border-bottom": "2px solid #e7a169",
			});
			$("._check").css({"display":"block"});
			$("._pay,._evaluate").css({"display":"none"});
			// $("._check").fadeIn("200");
			// $("._pay,._evaluate").fadeOut("fast");
		}
	});
	$("._fthree").click(function() {
		var jj=$("._nopay").text()
		var n="";
		for (var i =0;i<jj.length/3;i++) {
			 n+="未付款";
		}
		if(jj==n){
			$("._flex").css({
				"border-bottom": "none",
			});
			$(this).css({
				"border-bottom": "2px solid #e7a169",
			});
			$("._pay").css({"display":"block"});
			$("._check,._evaluate").css({"display":"none"});
			// $("._pay").fadeIn("200");
			// $("._check,._evaluate").fadeOut("fast");
		}
	});
	$("._ffour").click(function() {
		var jj=$("._checkdowm").text()
		var k="";
		for (var i =0;i<jj.length/3;i++) {
			 k+="已确认";
		}
		if(jj==k){
			$("._flex").css({
				"border-bottom": "none",
			});
			$(this).css({
				"border-bottom": "2px solid #e7a169",
			});
			$("._evaluate").css({"display":"block"});
			$("._check,._pay").css({"display":"none"});
			// $("._evaluate").fadeIn("200");
			// $("._check,._pay").fadeOut("fast");
		}
	});
});
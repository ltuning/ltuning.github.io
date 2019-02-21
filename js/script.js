var recipient;
jQuery(function(f){
    var element = f('#brand');
    f(window).scroll(function(){
    	element['fade'+ (f(this).scrollTop() > 200 ? 'In': 'Out')](500);  
	});
});


$(document).ready(function() { 
//$('[data-toggle="popover"]').popover({html:'true'});

// <-------КАРТА
	ymaps.ready(init);
    var map, 
    	metka;

    function init(){     
        map = new ymaps.Map ("map", {
            center: [44.584844, 33.484443],
            zoom: 16,
        });

        metka = new ymaps.Placemark([44.584844, 33.484443], 
        	{ hintContent: 'Перетяжка салона автомобиля', 
        	  iconContent: 'Лёгкий тюнинг' }, 
        	  { preset: 'twirl#redStretchyIcon' });    
    
    map.behaviors.enable('scrollZoom');	
    map.geoObjects.add(metka);
    // Ползунок изменения масштаба
	map.controls.add('zoomControl', {
	    float: 'none',
	    position: { left: 10, top: 44 }
	});
	}
	
	$('.know-more').popover({
	placement: function (context, source)
	{
		if ($(window).width() < '768')
		{
			return "bottom";
		}
		return "left";
	}, html:'true'
	});
	
	var wow = new WOW();
	wow.init();

	$("#kokoko").hide();

    $("a.fancyimage").fancybox(); 

	$("#konsul").submit(function(event){
		event.preventDefault();
		submitForm();
	});


	$("#bs-example-navbar-collapse-1").on("click","a", function (event) {
	    //отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),
		//узнаем высоту от начала страницы до блока на который ссылается якорь
		top = $(id).offset().top;
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1000);
	});


	$(".navbar li>a").click(function() {
    //скрывать меню
    	$('.navbar-collapse').removeClass('in');
  	});
	
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

    $('#callModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the modal
		  var recipient = button.data('whatever') // Extract info from data-* attributes
		  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
		  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
		  var modal = $(this)
		  modal.find('.modal-title').text(recipient)
		 // modal.find('.modal-body input').val(recipient)
	});

	$("#phonemessage3").inputmask({"mask": "+7 (999) 999-9999"});
	$("#phonemessage2").inputmask({"mask": "+7 (999) 999-9999"});
	$("#phonemessage").inputmask({"mask": "+7 (999) 999-9999"});
	//$(".cl-name").inputmask({ "mask": "a", "repeat": 15, "greedy": false });

	$(".zayava").on("click", function(){
		var phone = $("#phonemessage").val();
		var regex = /\+7 \(\d{3}\) \d{3}\-\d{4}/;
		if (phone.search(regex) == -1){
			
			$('#phonemessage').addClass("form-error");
			return false;
		}
		$('#phonemessage').removeClass("form-error");
		return true;
	});
	$(".konsul").on("click", function(){
		var phone = $("#phonemessage3").val();
		var regex = /\+7 \(\d{3}\) \d{3}\-\d{4}/;
		if (phone.search(regex) == -1){
			$('#phonemessage3').addClass("form-error");
			return false;
		}
		
		return true;
	});
	$(".ocenka-btn").on("click", function(){
		var phone = $("#phonemessage2").val();
		var regex = /\+7 \(\d{3}\) \d{3}\-\d{4}/;
		if (phone.search(regex) == -1){
			$('#phonemessage2').addClass("form-error");
			return false;
		}
		$('#phonemessage2').addClass("form-error");
		return true;
	});

	$("#messageform").submit(function(){
		var form = $(this);
		var error = false;

		$("#namemessage").focus(function () {
			$('#namemessage').removeClass("form-error");
		});
		$("#phonemessage").focus(function () {
			$('#phonemessage').removeClass("form-error");
		});				

		form.find('input').each( function(){
			if ($('#namemessage').val() == '') {
				$('#namemessage').addClass("form-error");
				
				error = true;
			}

			if ($('#phonemessage').val() == '') {
				$('#phonemessage').addClass("form-error");
				
				error = true;
			}				
		});

		if (!error) {
			var data = form.serialize();
			$.ajax({
			   type: 'POST',
			   url: 'php/form.php',
			   dataType: 'json',
			   data: data,
		       beforeSend: function(data) {
		            form.find('button[type="submit"]').attr('disabled', 'disabled');
		          },
		       success: function(data){
		       		if (data['error']) {
		       			alert(data['error']);
		       		} else {
		       			 $('#namemessage, #phonemessage').val('');
		       			 $('#alert-message').show('fast').delay(3000).hide('fast', function() {		       			 	
		       			 	$.fancybox.close();
		       			 });
		       		}
		         },
		       error: function (xhr, ajaxOptions, thrownError) {
		            alert(xhr.status);
		            alert(thrownError);
		         },
		       complete: function(data) {
		            form.find('button[type="submit"]').prop('disabled', false);
		         }
		                  
			     });
		}
		return false;
	});

	$("#messageform3").submit(function(){
		var form = $(this);
		var error = false;

		$("#namemessage3").focus(function () {
			$('#namemessage3').removeClass("form-error");
		});
		$("#phonemessage3").focus(function () {
			$('#phonemessage3').removeClass("form-error");
		});			

		form.find('input').each( function(){
			if ($('#namemessage3').val() == '') {
				$('#namemessage3').addClass("form-error");
				
				error = true;
			}

			if ($('#phonemessage3').val() == '') {
				$('#phonemessage3').addClass("form-error");
				
				error = true;
			}

			if ($('#emailmessage3').val() == '') {
				$('#emailmessage3').addClass("form-error");
				
				error = true;
			}	

			if ($('#messagemessage3').val() == '') {
				$('#messagemessage3').addClass("form-error");
				
				error = true;
			}				
		});

		if (!error) {
			var data = form.serialize();
			$.ajax({
			   type: 'POST',
			   url: 'php/form3.php',
			   dataType: 'json',
			   data: data,
		       beforeSend: function(data) {
		            form.find('button[type="submit"]').attr('disabled', 'disabled');
		          },
		       success: function(data){
		       		if (data['error']) {
		       			alert(data['error']);
		       		} else {;
		       			 $('#namemessage3, #phonemessage3').val('');
		       			 $('#alert-message3').show('fast').delay(3000).hide('fast');
		       		}
		         },
		       error: function (xhr, ajaxOptions, thrownError) {
		            alert(xhr.status);
		            alert(thrownError);
		         },
		       complete: function(data) {
		            form.find('button[type="submit"]').prop('disabled', false);
		         }
		                  
			     });
		}
		return false;
	});	

	$("#messageform2").submit(function(){
		var form = $(this);
		var error = false;

		$("#namemessage2").focus(function () {
			$('#namemessage2').removeClass("form-error");
		});
		$("#phonemessage2").focus(function () {
			$('#phonemessage2').removeClass("form-error");
		});		

		form.find('input').each( function(){
			if ($('#namemessage2').val() == '') {
				$('#namemessage2').addClass("form-error");
				
				error = true;
			}

			if ($('#phonemessage2').val() == '') {
				$('#phonemessage2').addClass("form-error");
				
				error = true;
			}						
		});

		if (!error) {
			var data = form.serialize();
			$.ajax({
			   type: 'POST',
			   url: 'php/form2.php',
			   dataType: 'json',
			   data: data,
		       beforeSend: function(data) {
		            form.find('button[type="submit"]').attr('disabled', 'disabled');
		          },
		       success: function(data){
		       		if (data['error']) {
		       			alert(data['error']);
		       		} else {;
		       			 $('#namemessage2, #phonemessage2').val('');
		       			 $('#alert-message2').show('fast').delay(3000).hide('fast');
		       		}
		         },
		       error: function (xhr, ajaxOptions, thrownError) {
		            alert(xhr.status);
		            alert(thrownError);
		         },
		       complete: function(data) {
		            form.find('button[type="submit"]').prop('disabled', false);
		         }
		                  
			     });
		}
		return false;
	});	

});
	
function PopUpHide(){
    $('[data-toggle="popover"]').popover('hide');
}

function submitForm(){
	// Переменные с данными из формы
	var tema = $("#kokoko").val();
	var name = $(".name-text").val();
	alert(tema);
	var message = $(".message-text").val();

	$.ajax({
		type: "POST",
		url: "php/form-process.php",
		data: "&tema="+ tema + "&name="+ name + "&message="+ message,
		//data: "&message="+ message,
		success : function(text){
			if(text == "success"){
				formSuccess();
			}
		}
	});
}

/** Fancybox **/

$(document).ready(function() {
	$(".fancybox").fancybox({
		padding: [10,10,10,10]
	});
});
var buttons7Click = Array.prototype.slice.call( document.querySelectorAll( '#btn-click button' ) ),
	buttons9Click = Array.prototype.slice.call( document.querySelectorAll( 'button.btn-8g' ) ),
	totalButtons7Click = buttons7Click.length,
	totalButtons9Click = buttons9Click.length;

	buttons7Click.forEach( function( el, i ) { el.addEventListener( 'click', activate, false ); } );
	buttons9Click.forEach( function( el, i ) { el.addEventListener( 'click', activate, false ); } );

	function activate() {
	var self = this, activatedClass = 'btn-activated';

	if( classie.has( this, 'btn-7h' ) ) {
		// if it is the first of the two btn-7h then activatedClass = 'btn-error';
		// if it is the second then activatedClass = 'btn-success'
		activatedClass = buttons7Click.indexOf( this ) === totalButtons7Click-2 ? 'btn-error' : 'btn-success';
	}
	else if( classie.has( this, 'btn-8g' ) ) {
		// if it is the first of the two btn-8g then activatedClass = 'btn-success3d';
		// if it is the second then activatedClass = 'btn-error3d'
		activatedClass = buttons9Click.indexOf( this ) === totalButtons9Click-2 ? 'btn-success3d' : 'btn-error3d';
	}

	if( !classie.has( this, activatedClass ) ) {
		classie.add( this, activatedClass );
		setTimeout( function() { classie.remove( self, activatedClass ) }, 1000 );
	}}
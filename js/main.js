$(function () {
	
	
 	
	var body = $('body.page_home'),
		$menu = $('#menu'),
		$resultOut = $('#results-content');

	

	//SCROLL ANIMATE MENU
	/*$('html, body').animate({
		scrollTop: 0
	});
		*/    
    $(window).scroll(function () {
        if ($(this).scrollTop() > 610) {
            body.addClass("afix");
        } else {
            body.removeClass("afix");
        }
    });

   /* $menu.find( 'a' ).on( 'click', goPage);
    $('#up-arrow').on( 'click', goPage);
    
    function goPage(){
		
		var href = $(this).attr( 'href' );
		
		$('html, body').animate({
			scrollTop: $( href ).offset().top
		});
		
		return false;
    }*/


	//LOAD WORKS
	
	function getWorks(callback){
		$.ajax({
    			    
		  url : 'data/works.json',
		  dataType : 'json',
  	

   		}).done(callback);
	}

	function WorkTemplate(work) {
	 
	  
	  var templateHtml = $.trim( $('#workTemplate').html() );

	 
 	   switch(work.type) {
 	   	case 'multimedia': 
 	   		work.rel = 'shadowbox;width=480;height=340;';
 	   		break;
 	   	case 'diseno':
 	   		work.rel = 'shadowbox';
 	   		break;
 	   	case 'sitio':
 	   		work.rel = '';
 	   		break;
 	   	
 	   	default:
 	   		work.rel = 'shadowbox';
 	   		break;
 	   }
	 
	  var template = Handlebars.compile( templateHtml );

	 	
	  return template(work);
	  

	 
	}

	function WorkListTemplate(works) {
	  var html = '';

	  for (var i = 0; i < works.length; i++) {
	    var work = works[i];
	    html += WorkTemplate(work);
	  }

	  return html;


	}

	function fillWorksInfo(jsonData) {
	  if (jsonData.error) {
	    return onError();
	  }

	  var html = WorkListTemplate(jsonData);
	  $resultOut.html( html );

	   $('#works-gallery').find('img[data-src]').bind("inview", function() {
		    
		    var $this = $(this);
		    
		    $this.attr("src", $this.attr("data-src"));
		    // Remove it from the set of matching elements in order to avoid that the handler gets re-executed
		    $this.removeAttr("data-src");


	  });
	 
	 initPagination();
	 Shadowbox.init({ skipSetup: true });
	 Shadowbox.setup(); 
	  
	}
	
	 getWorks(fillWorksInfo);
	

	    
	 //EVENTS FILTER WORKS
	$('div.tabs').find('input:radio').on('click',function(){
		console.log(this);
		var result =  $('.result');
		$("div.pagination").jPages("destroy");
	      
	      currentPage = 1;
	      var selector = ".result";
	      
	      result.show();
	      
	      var sitio = $('input.sitio');
	      var diseno = $('input.diseno');
	      var multimedia = $('input.multimedia');
	     
	      if(sitio.is(':checked')){
	      	selector += '.sitio';
	      }
	       if(diseno.is(':checked')){
	      	selector += '.diseno';
	      }
	      if(multimedia.is(':checked')){
	     	 selector += '.multimedia';
	      }
	      result.hide();

	      $(selector).show();

	     //console.log(this);
	      
	     initPagination();

	});
	

	function initPagination()
	{
	  
	  $("div.pagination").jPages({
        containerID  : "results-content",
        perPage      : 18,
        startPage    : 1,
        startRange   : 1,
        midRange     : 5,
        endRange     : 1,
        previous     : false,
        next         : false,
        links        : "blank"
      });

	}

//DEVICES ANIMATION HOME

	var duration = 11000, 
       step = 1; 
       steps = 4, 
  
   setInterval( function() {

    	 	$('.dispositivo').attr('data-animation-step',step = ++step > steps ? 1 : step);
  
  }, duration / steps );

//FORM CONTACT VALIDATION

 $("#contact-form").validate({

	 	messages:
	 	{
	 		name:{
	 			required:'Este campo es requerido!'
	 		},
	 		email:{
	 			required:'Este campo es requerido!',
	 			email:'Formato de email inválido!'
	 		},
	 		comments:{
	 			required:'Este campo es requerido!'
	 		}
	 		
	 	},
	 	rules: {
	 		
		    comments:{
		    	required: true
		    }

		  },

		  submitHandler: function(form) {

		    var contactForm = $('#contact-form'),
		    	formInput =  contactForm.serializeArray(),
			 	url = "helpers/contact.php",
			 	mensaje = $('.mensaje');
				
			$.post(url, formInput, function(data){
						
						limpiaForm(contactForm);

						

						if(data === "ok")
						{
							$('<span></span>',{
								class: 'ok',
								text: 'Información enviada correctamente'
							}).appendTo(mensaje);
						}	
						else
						{
							$('<span></span>',{
								class: 'error',
								text: 'A ocurrido un error. intentalo nuevamente'
							}).appendTo(mensaje);
						}
							


						setTimeout(function(){  
					        mensaje.fadeOut(200,function() {

							    mensaje.find('span').remove();
							    mensaje.show();
							    
							  })
					        ;}, 2000);  
					});
		   // form.submit();

		  }

		 });
function limpiaForm(miForm) {
	 	
		 // recorremos todos los campos que tiene el formulario
		 $(":input", miForm).each(function() {
		 var type = this.type;
		 var tag = this.tagName.toLowerCase();
		 //limpiamos los valores de los campos…
		if (type == 'text' || type == 'password'  || type == 'email' || tag == 'textarea')
		this.value = "";
		 // excepto de los checkboxes y radios, le quitamos el checked
		 // pero su valor no debe ser cambiado
		 else if (type == 'checkbox' || type == 'radio')
		this.checked = false;
		 // los selects le ponesmos el indice a -
		 else if (tag == 'select')
		this.selectedIndex = -1;
		 });
	}




});

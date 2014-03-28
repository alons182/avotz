define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        validate          	= require('validate'),
        utils 				= require('utils');

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
        







});
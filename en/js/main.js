$(document).on("ready", inicio);

function inicio () 
{
	$('#slideshow').before('<div id="slideshow-nav">').cycle({     fx:     'fade',     speed:  'fast',     timeout: 3000, slideResize: 0,     pager:  '#slideshow-nav' });

	$('form#contactenos').on("submit", enviar); 

	$(".btn_submit").on("click", suscribir);

  	$('input:radio').on('click',filterChange);
	
  	pagination();
  
  //filtrosTrabajos();


}
function pagination()
{
  $("div.pagination").jPages({
                        containerID  : "results-content",
                        perPage      : 12,
                        startPage    : 1,
                        startRange   : 1,
                        midRange     : 5,
                        endRange     : 1,
                        previous     : false,
                        next         : false,
                        links        : "blank"
                      });
}


function filterChange()
        {
                    $("div.pagination").jPages("destroy");
                      //var offroad = $(this);
                      currentPage = 1;
                      var selector = ".result";
                      $('.result').show();
                      
                      var sitio = $('input.sitio');
                      var diseno = $('input.diseno');
                      var multimedia = $('input.multimedia');
                      //var category = $('select.sort').val();
                      //filter aplied
                      //if(category != ""){
                      //selector += '.' + category;
                      //}
                      if(sitio.is(':checked')){
                      selector += '.sitio';
                      }
                       if(diseno.is(':checked')){
                      selector += '.diseno';
                      }
                      if(multimedia.is(':checked')){
                      selector += '.multimedia';
                      }
                      $('.result').hide();

                      $(selector).show();

                     
                      
                     pagination();
                     // resizeContainer();
        }

// function filtrosTrabajos()
// {
//     var container = $('div.results-content');
//     var currentPage = 1;
//     var numPages = 0;
//     var numResults = $('.result:visible').length;
       

    
//         resizeContainer();
        
//         $('input:radio').on('click',filterChange);
//         $('select.sort').on('change',filterChange);
        
//         $('li.left-btn a').on('click', atras_pag);
//         $('li.right-btn a').on('click', adelante_pag);

//         function resizeContainer()
//         {
           
//             numResults = $('.result:visible').length;
//             numPages = Math.floor(numResults / 6);
//             if(numResults % 6 != 0){
//               numPages++;
//             }
//             var containerWidth = numPages * 100;
//             container.css({'margin-left' : '0px', 'width' : '' + containerWidth + '%'});
//         }

//         function filterChange()
//         {
                    
//                       //var offroad = $(this);
//                       currentPage = 1;
//                       var selector = ".result";
//                       $('.result').show();
                      
//                       var sitio = $('input.sitio');
//                       var diseno = $('input.diseno');
//                       //var category = $('select.sort').val();
//                       //filter aplied
//                       //if(category != ""){
//                       //selector += '.' + category;
//                       //}
//                       if(sitio.is(':checked')){
//                       selector += '.sitio';
//                       }
//                        if(diseno.is(':checked')){
//                       selector += '.diseno';
//                       }
//                       $('.result').hide();
//                       $(selector).show();
//                       resizeContainer();
//         }

//         function atras_pag(e)
//         {
                       
//                       var resultados_width = $('.resultados').width();

//                       e.preventDefault();

//                       if(currentPage != 1){

//                       var scrollAmount = parseInt(container.css('margin-left').replace('px', '')) + resultados_width;
//                       var string = scrollAmount + 'px';
                      
//                       container.css('margin-left','' + scrollAmount + 'px');

//                       currentPage--;
//                     }
//         }

//         function adelante_pag(e)
//         {
                    
                   
                    
//                       e.preventDefault();
//                       //debugger;
//                       var resultados_width = $('.resultados').width();
//                       if(currentPage < numPages){
//                       var scrollAmount = parseInt(container.css('margin-left').replace('px', '')) - resultados_width;
//                       var string = scrollAmount + 'px';
                       
//                       container.css('margin-left','' + scrollAmount + 'px');
//                       currentPage++;
//                       }
//         } 
//         $('.resultados').bind( 'resize', function(e) {
//             console.log("cambio");
//             //  var resultados_width = $('.resultados').width();
//             // if( resultados_width < 900 && resultados_width > 400 )
//             // {
//             //   currentPage=1;
//             //   containerWidth = 200;
//             //   container.css({'margin-left' : '0px', 'width' : '' + containerWidth + '%'});
//             // }else 
//             // {
//             //   currentPage=1;
//             //   numPages=1;
//             //   containerWidth = 100;
//             //   container.css({'margin-left' : '0px', 'width' : '' + containerWidth + '%'});
//             // }
//             // debugger;
//             // numResults = $('.result:visible').length;
//             // numPages = Math.floor(numResults / 10);
//             // if(numResults % 10 != 0){
//             //   numPages++;
//             // }
//             // var containerWidth = numPages * 100;
//             // container.css({'margin-left' : '0px', 'width' : '' + containerWidth + '%'});
            
           
//             //filtrosTrabajos();
//             //resizeContainer();
//           }); 

// }

function enviar()
{
	$('form#contactenos .error').remove();
	var hasError = false;
	$('.requiredField').each(function() {
				if($.trim($(this).val()) == '') {
					var labelText = $(this).prev('label').text();
					$(this).parent().append('<span class="error">Olvido su '+labelText+'.</span>');
					$(this).addClass('inputError');
					hasError = true;
				} else if($(this).hasClass('email')) {
					var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					if(!emailReg.test($.trim($(this).val()))) {
						var labelText = $(this).prev('label').text();
						$(this).parent().append('<span class="error">Lo siento! su '+labelText+' es invalido.</span>');
						$(this).addClass('inputError');
						hasError = true;
					}
				}
	});
	if(!hasError) {
				var formInput = $(this).serialize();
				$.post($(this).attr('action'),formInput, function(data){
					$('form#contactenos').slideUp("fast", function() {				   
						$(this).before('<p class="tick">Tu correo ha sido enviado. Gracias!</p>');
					});
				});
	}
			
	return false;	
}

function suscribir()
{
	var email = $("#emailsuscription").val();
			validacion_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;

	if(email == "" || !validacion_email.test(email)){
		    $("#emailsuscription").focus();	
		    return false;
		}else{
			$('.ajaxgif').removeClass('hidden');
			var datos = '&email=' + email;
			$.ajax({
	    		type: "POST",
	    		url: "mc/store-address.php",
	    		data: datos,
	    		success: function() {
					$('.ajaxgif').hide();
	      			$('.msg').text('Registrado! Verifica tu email para confirmar').addClass('msg_ok').animate({ 'right' : '130px' }, 300);	
	    		},
				error: function() {
					$('.ajaxgif').hide();
	      			$('.msg').text('Hubo un error!').addClass('msg_error').animate({ 'right' : '130px' }, 300);					
				}
	   		});
	 		return false;	
		}
}







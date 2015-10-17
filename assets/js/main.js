
;(function ($) {


	  var body 		= $('body.page_home'),
		  menu 		= $('#menu'),
		  btnMovil 	= $('#btn_nav');


        //POPUP
        
       /* if(body.length > 0 ){
            $.colorbox({
                href:"/popup.html"//,
                //width: 650,
                });
        }*/
       /* $('.btn-regalo').stickyfloat({ duration: 400,offsetY: 180 });*/
	    /*$('.btn-regalo').colorbox({
            href:"/popup.html"//,
            //width: 650,
            });*/
       /*$('.btn-regalo').magnificPopup({
        type: 'iframe', 
        src: '/popup.html'
      });*/
    if(body.length > 0 ){
       $.magnificPopup.open({
          items: {
            src: '/popup.html'
          },
          type: 'iframe',
         
          // You may add options here, they're exactly the same as for $.fn.magnificPopup call
          // Note that some settings that rely on click event (like disableOn or midClick) will not work here
        }, 0);
     }
      
      $('.gallery-clases').colorbox({rel:'gallery-clases'});
      $('.gallery-inauguracion').colorbox({rel:'gallery-inauguracion'});
	 // NAV MOBILE
	    btnMovil.click(function(){
	        menu.toggle();

	    });

        menu.find(".parent").hoverIntent({
        over: function() {
                  $(this).find(">.submenu").slideDown(200 );
                },
        out:  function() {
                  $(this).find(">.submenu").slideUp(200);
                },
        timeout: 200

        });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            body.addClass("afix");
        } else {
            body.removeClass("afix");
        }
    });



	//DEVICES ANIMATION HOME

	var duration = 11000,
       step = 1;
       steps = 4,

   	setInterval( function() {

            $('.dispositivo').attr('data-animation-step',step = ++step > steps ? 1 : step).find('.pantalla a[data-img='+step+']').show().siblings('a').hide();


  	}, duration / steps );


    //SERVICES

    $('div#services-info').find('article.service a').on('click',function(){

        localStorage.setItem('selectedWork', $(this).data('service'));

    });

     $('#about a.code_qr').colorbox();
     var $result = $('#last-post');

        function getLastPost(callback){
            //ajax
                $.ajax({

                  url : 'https://www.avotz.com/blog/helpers/get_posts.php',
                  dataType : 'jsonp',


                }).done(callback);
        }

        function postListTemplate(posts) {
              var templateHtml = $.trim( $('#postTemplate').html() );


              var template = Handlebars.compile( templateHtml );


              return template(posts);

            }


       function fillPostInfo(jsonData) {
              if (jsonData.error) {
                return onError();
              }
            var posts = $.map(jsonData ,function(obj, index){
                return {
                    post_title : obj.post_title,
                    post_date : obj.post_date,
                    post_link : obj.guid,
                    post_author : obj.post_author_name,
                }
            });

            console.log(jsonData);
             var html = postListTemplate(posts);


              $result.html( html );

            }

        getLastPost(fillPostInfo);

        $('.date-post').timeago();


        //FORM VALIDATION
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

      //PRESENTATIONS

      var $resultOutPresentations = $('#last-presentations');




      function getLastPresentations(callback){
          //ajax
              $.ajax({

                url : '/data/presentations.json',
                dataType : 'json',


              }).done(callback);
      }

      function presentationsListTemplate(posts) {
            var templateHtml = $.trim( $('#presentationTemplate').html() );


            var template = Handlebars.compile( templateHtml );


            return template(posts);

          }


     function fillPresentationInfo(jsonData) {
            if (jsonData.error) {
              return onError();
            }


           var html = presentationsListTemplate(jsonData);

           $resultOutPresentations.html( html );

          }

      getLastPresentations(fillPresentationInfo);

      //WORKS

      var $resultOutWorks 			= $('#results-content');


  //LOAD WORKS

    function getWorks(callback){

      $.ajax({

        url : '/data/works.json',
        dataType : 'json',


         }).done(callback);
    }

    function WorkTemplate(work) {


      var templateHtml = $.trim( $('#workTemplate').html() );


        switch(work.type) {
          case 'multimedia':
            work.rel = 'multimedia';
            break;
          case 'diseno':
            work.rel = 'diseno';
            break;
          case 'sitio':
            work.rel = '';
            break;

          default:
            work.rel = 'diseno';
            break;
        }

      var template = Handlebars.compile( templateHtml );


      return template(work);



    }

    function WorkListTemplate(works) {
      var html = '';

      for (var i = 0; i < works.length; i++) {
        
        if (i == 16 ) {

          html += $.trim( $('#workTemplateMiddle').html() );
        }

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
      $resultOutWorks.html( html );

       $('#works-gallery').find('img[data-src]').bind("inview", function() {

          var $this = $(this);

          $this.attr("src", $this.attr("data-src"));
          // Remove it from the set of matching elements in order to avoid that the handler gets re-executed
          $this.removeAttr("data-src");


      });



     //initPagination();

     $('article.diseno a').colorbox({rel:'diseno'});
     $("article.multimedia a").colorbox({iframe:true, innerWidth:640, innerHeight:390});

    }

       getWorks(fillWorksInfo);
    /*initWorks();

     function initWorks(){

        debugger
        if(localStorage.getItem('selectedWork'))
             {

                 var selected = '.'+ localStorage.getItem('selectedWork');

                   getWorks(filterWorks(localStorage.getItem('selectedWork')));
                 // localStorage.removeItem('selectedWork');
                  console.log('selectedwork');
             }
             else
                  getWorks(fillWorksInfo);

     }*/




     //EVENTS FILTER WORKS
    $('div.tabs').find('input:radio').on('click',function(){

      filterWorks($(this).data('selected'));

    });
    $('#select-gallery').on('change',function(){
      filterWorks($(this).val());
    });

    function filterWorks(option){
      //debugger
      var result =  $('.result'),
        selector = ".result",
        selected =   ( localStorage.getItem('selectedWork') ) ? localStorage.getItem('selectedWork') :option;


       // $("div.pagination").jPages("destroy");
          result.hide();

          result.show();

          selector += ( selected === 'all' ) ? '' :'.'+ selected;

          result.hide();

          $(selector).show();

         localStorage.removeItem('selectedWork');

         /*if(option === 'all')
       {

          initPagination();
       }*/


    }


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

    //LIMPIAR FORM

    var limpiaForm  =  function (miForm) {

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


})(jQuery);

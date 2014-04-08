
require.config({

    baseUrl: '/js',

    paths: {
        jquery: 'vendor/jquery-1.11.0.min',
        validate:'vendor/jquery.validate.min',
        inview:'vendor/jquery.inview.min',
        colorbox : 'vendor/jquery.colorbox-min',
        jpages: 'vendor/jPages.min',
        cycle2: 'vendor/jquery.cycle2.min',
        handlebars:'vendor/handlebars-v1.3.0'

       
    },

  
    shim: {
        
        'validate':
        {
            deps: ['jquery'],
            exports: 'validate'
        },
        'inview':
        {
            deps: ['jquery'],
            exports: 'inview'
        },
        'colorbox': {
            deps: ['jquery'],
            exports: 'colorbox'
        },
        'jpages': {
            deps: ['jquery'],
            exports: 'jPages'
        },
        'cycle2': {
            deps: ['jquery'],
            exports: 'cycle2'
        },
        'handlebars': {
            deps: ['jquery'],
            exports: 'Handlebars'
        },
        
    }
});

require(['jquery', 'cycle2','./works','./formvalidation'], function ($) {
	  
	  
	  var body 		= $('body.page_home'),
		  menu 		= $('#menu'),
		  btnMovil 	= $('#btn_nav');


	
	 // NAV MOBILE
	    btnMovil.click(function(){
	        menu.toggle();
	       
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




});


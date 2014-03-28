
require.config({

    baseUrl: './js',

    paths: {
        jquery: 'vendor/jquery-1.10.2.min',
        validate:'vendor/jquery.validate.min',
        inview:'vendor/jquery.inview.min',
        shadowbox : 'vendor/shadowbox/shadowbox',
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
        'shadowbox': {
            deps: ['jquery'],
            exports: 'Shadowbox'
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
        if ($(this).scrollTop() > 610) {
            body.addClass("afix");
        } else {
            body.removeClass("afix");
        }
    });

   
    $('#up-arrow').on( 'click', goPage);
    
    function goPage(){
		
		var href = $(this).attr( 'href' );
		
		$('html, body').animate({
			scrollTop: $( href ).offset().top
		});
		
		return false;
    }


	

	//DEVICES ANIMATION HOME

	var duration = 11000, 
       step = 1; 
       steps = 4, 
  
   	setInterval( function() {

    	 $('.dispositivo').attr('data-animation-step',step = ++step > steps ? 1 : step);
  
  	}, duration / steps );




});


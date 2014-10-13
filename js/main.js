
require.config({

    baseUrl: '/js',

    paths: {
        jquery: 'vendor/jquery-1.11.0.min',
        validate:'vendor/jquery.validate.min',
        inview:'vendor/jquery.inview.min',
        colorbox : 'vendor/jquery.colorbox-min',
        jpages: 'vendor/jPages.min',
        cycle2: 'vendor/jquery.cycle2.min',
        handlebars:'vendor/handlebars-v1.3.0',
        timeago:'vendor/jquery.timeago'
        
        

       
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
         'timeago': {
            deps: ['jquery'],
            exports: 'timeago'
        }
       
        
    }
});

require(['jquery', 'cycle2','./works','./presentations','./formvalidation','timeago'], function ($) {
	  
	  
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
     var $result = $('#last-post');

        function getLastPost(callback){
            //ajax
                $.ajax({
                            
                  url : 'http://www.avotz.com/blog/helpers/get_posts.php',
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

   

});


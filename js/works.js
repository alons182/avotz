define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Handlebars          = require('handlebars'),
        jPages            	= require('jpages'),
        validate            = require('validate'),
        inview				= require('inview'),
        Shadowbox    		= require('shadowbox'),
        $resultOut 			= $('#results-content');


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
				
				filterWorks($(this).data('selected'));
				
				
			});
			$('#select-gallery').on('change',function(){
				filterWorks($(this).val());
			});

			function filterWorks(option){
				var result =  $('.result'),
					selector = ".result",
					selected =  option;

				$("div.pagination").jPages("destroy");
			      
			      //currentPage = 1;
			      	      
			      result.show();
			      
			      selector += ( selected === 'all' ) ? '' :'.'+ selected;
			      
			      result.hide();

			      $(selector).show();
			    	      
			     initPagination();
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

			


	

});
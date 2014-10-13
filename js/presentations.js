define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Handlebars          = require('handlebars'),
        $resultOut 			= $('#last-presentations');


		 //presentations
   

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
             
             $resultOut.html( html );
              
            }
            
        getLastPresentations(fillPresentationInfo); 

        //$('.date-post').timeago();
	

});
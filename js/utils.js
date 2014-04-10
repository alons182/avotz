
define(function (require) {

    "use strict";

    var $                   = require('jquery');
       
   
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

   

    return {
			limpiaForm : limpiaForm
		}
	
});
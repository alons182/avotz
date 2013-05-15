<?php 
error_reporting(E_ALL ^ E_NOTICE); // hide all basic notices from PHP

//If the form is submitted
if(isset($_POST['submitted'])) {
  
  // require a name from user
  if(trim($_POST['contactName']) === '') {
    $nameError =  'Forgot your name!'; 
    $hasError = true;
  } else {
    $name = trim($_POST['contactName']);
  }
  
  // need valid email
  if(trim($_POST['email']) === '')  {
    $emailError = 'Forgot your email address.';
    $hasError = true;
  } else if (!preg_match("/^[[:alnum:]][a-z0-9_.-]*@[a-z0-9.-]+\.[a-z]{2,4}$/i", trim($_POST['email']))) {
    $emailError = 'Correo invalido.';
    $hasError = true;
  } else {
    $email = trim($_POST['email']);
  }
    
  // we need at least some content
  if(trim($_POST['comments']) === '') {
    $commentError = 'Forgot to post a message!';
    $hasError = true;
  } else {
    if(function_exists('stripslashes')) {
      $comments = stripslashes(trim($_POST['comments']));
    } else {
      $comments = trim($_POST['comments']);
    }
  }
    
  // upon no failure errors let's email now!
  if(!isset($hasError)) {
    
    $emailTo = 'alons182@hotmail.com';
    $subject = 'Submitted message from '.$name;
    $sendCopy = trim($_POST['sendCopy']);
    $body = "Name: $name \n\nEmail: $email \n\nComments: $comments";
    $headers = 'From: ' .' <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $email;

    mail($emailTo, $subject, $body, $headers);
        
        // set our boolean completion value to TRUE
    $emailSent = true;
  }
}

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Avotz Web Works | Contact us</title>
		<meta name="description" content="Avotz web works are dedicated to creating functional websites with designs according to what you need to expose their customers">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

		<link rel="stylesheet" href="css/normalize.min.css">
		<link rel="stylesheet" href="css/main.css">
		<link rel="icon" type="image/png" href="favicon_16x16.ico">
		<link rel="apple-touch-icon" href="apple-touch-icon-iphone.png" /> 
		<link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-ipad.png" /> 
		<link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-iphone4.png" />
		<link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-ipad3.png" />


		<script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
	</head>
	<body class="contacto">
		
		
	   	<header>
			<div class="holder">
		 		<div id="logo"><h1><a href="index.html"><span>avotz</span></a></h1></div>
				<nav id="menu">
					<ul>
						<li><a href="index.html" id="inicio" ><span class="icon-home"></span><span>Home</span></a></li>
					  	<li><a href="services.html" id="servicios"><span class="icon-hammer"></span><span>Services</span></a></li>
					  	<li><a href="works.html" id="trabajos"><span class="icon-briefcase"></span><span>Works</span></a></li>
					  	<li class="last current"><a href="contact.php" id="contactos"><span class="icon-envelop"></span><span>Contact</span></a></li>
					</ul>
				</nav>
			</div>
			

  		</header>
	  	<section id="contenido">
			<div class="holder">
		  		<div id="contenedor-contacto" class="section">
          			<h1>Contact Us</h1>
          			<?php if(isset($emailSent) && $emailSent == true) { ?>
		                <p class="info">Your email has been sent. thanks!</p>
		            <?php } else {?>
		            
			        <div class="desc">
			          
			          
			          <p class="destext">In AVOTZ Webworks, we like to always improve and evacuate any of your questions. So please write in less than 24 hours we will answer!</p>
			        </div>
			        
			        <div id="contacto-form">
			          <?php if(isset($hasError) || isset($captchaError) ) { ?>
			                        <p class="alert">Failed to submit the form</p>
			                    <?php } ?>
			        
			          <form id="contactenos" action="contacto.php" method="post">
			            <div class="formblock">
			              <label class="screen-reader-text">Name</label>
			              <input type="text" name="contactName" id="contactName" value="<?php if(isset($_POST['contactName'])) echo $_POST['contactName'];?>" class="txt requiredField" placeholder="Name:" />
			              <?php if($nameError != '') { ?>
			              <br />  <span class="error"><?php echo $nameError;?></span> 
			              <?php } ?>
			            </div>
			                        
			            <div class="formblock">
			              <label class="screen-reader-text">Email</label>
			              <input type="text" name="email" id="email" value="<?php if(isset($_POST['email']))  echo $_POST['email'];?>" class="txt requiredField email" placeholder="Email:" />
			              <?php if($emailError != '') { ?>
			               <br /> <span class="error"><?php echo $emailError;?></span>
			              <?php } ?>
			            </div>
			                        
			            <div class="formblock">
			              <label class="screen-reader-text">Message</label>
			               <textarea name="comments" id="commentsText" class="txtarea requiredField" placeholder="Message:"><?php if(isset($_POST['comments'])) { if(function_exists('stripslashes')) { echo stripslashes($_POST['comments']); } else { echo $_POST['comments']; } } ?></textarea>
			              <?php if($commentError != '') { ?>
			               <br /> <span class="error"><?php echo $commentError;?></span> 
			              <?php } ?>
			            </div>
			                        
			              <button name="submit" type="submit" class="subbutton">Send</button>
			              <input type="hidden" name="submitted" id="submitted" value="true" />
			          </form>     
			        </div>
			        <?php } ?>
		     
		    	</div>
			</div>
	  	</section>
  		<footer>
	 		<div class="holder">
				<div id="menu-footer">
	  				<h5>Menu</h5>
	  				<nav>
						<ul>
							<li><a href="index.html" id="inicio" ><span>Home</span></a></li>
						  	<li><a href="services.html" id="servicios"><span>Services</span></a></li>
						  	<li><a href="works.html" id="trabajos"><span>Works</span></a></li>
						  	<li class="current"><a href="contact.php" id="contactos"><span>Contact</span></a></li>
						</ul>
	  				</nav>
				</div>
				<div id="informacion">
	  				<h5>Information</h5>
						<address>
					  		Phone: (506) 8703-4552 <br/>
					  		Apdo. Postal: 259 50101 <br/>
					  		Email: <a href="mailto:info@avotz.com">
					  		info@avotz.com</a> <br/>
					  		Liberia, Guanacaste, Costa Rica
					  
					  	</address>
	  
				</div>
				<div id="redes">
	  				<h5>Follow us:</h5>
	  					<nav>
							<ul>
								<li><a href="http://www.facebook.com/AVOTZ" id="facebook" target="_blank" ><span class="icon-facebook" ></span><span>facebook</span></a></li>
							  	<li><a href="http://www.twitter.com/avotz" id="twitter" target="_blank" ><span class="icon-twitter" ></span><span>twitter</span></a></li>
							</ul>
	  					</nav>
				</div>
				<div id="suscripcion">
	  				<h5>Subscribe for more information</h5>
			   
	  					<form id="suscription" method="post">
		   					<input type="text" name="emailsuscription" id="emailsuscription" />
		   
		   					<button type="submit" class="btn_submit" name="suscribite" value="Suscribete">Subscribe</button>

		   
	  					</form>
	  					<div class="ultimo">
							<img src="img/ajax.gif" class="ajaxgif hidden" />
							<div class="msg"></div>
	  					</div>
	  
				</div>
  			</div>
  		</footer>

		
		<script src="js/vendor/jquery-1.9.1.min.js"></script>
		<script src="js/vendor/jquery.cycle.all.js"></script>
		<script src="js/vendor/jPages.min.js"></script>
		<script src="js/main.js"></script>

		 <script>
		 	 var _gaq = _gaq || [];
			  _gaq.push(['_setAccount', 'UA-21485543-1']);
			  _gaq.push(['_setDomainName', 'avotz.com']);
			  _gaq.push(['_trackPageview']);

			  (function() {
			    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			  })();
			// var _gaq=[['_setAccount','UA-21485543-1'],['_setDomainName', 'avotz.com'],['_trackPageview']];
			// (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
			// g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
			// s.parentNode.insertBefore(g,s)}(document,'script'));
		</script>
	</body>
</html>

//Jquery Plugin to stop scrolling side bar (invoked at the end of the document ready section)
  $.fn.followTo = function (pos) {
    var $this = this,
        $window = $(window),
        $window_height = $(document).height();

    $window.scroll(function (e) {
        if ($window.scrollTop() >= $window_height-$this.height()-pos ) {

          $this.css({
              position: 'absolute',
              top: ($window_height-$this.height()-pos),
              zIndex: 0
          });
          
        } else {
          $this.removeAttr('style');
        }
    });
  };


  //On Document Load


jQuery(document).ready(function($) {
				
	//Fix Youtube
  $('iframe').each(function () {/*fix youtube z-index*/
      var url = $(this).attr("src");
      if (url.indexOf("youtube.com") >= 0) {
          if (url.indexOf("?") >= 0) {
              $(this).attr("src", url + "&wmode=transparent");
          } else {
              $(this).attr("src", url + "?wmode=transparent");
          }
      }
  });

  $('ul.nav li.dropdown').hover(function () {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
  }, function () {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
  });

  // tooltip
  $("a[data-rel^='tooltip']").tooltip();
  $('.tooltip').tooltip();
	
  $('#mainslider').flexslider({
    animation: "slide",
    controlNav: "thumbnails"
  });


  // Email Newsletter Script
  $(function() {
    
    // Get the form.
    var form = $('#mail-subscribe-div>form');

    //Event Listener
    $(form).submit(function(e) {
      // Stop the browser from submitting the form.
      e.preventDefault();

       // Serialize the form data.
      var formData = $(form).serialize();
      
      //Ajax reques
      $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
      })
      .done(function (result) {
          var data = JSON.parse(result);
          console.log(data);
          $("#mail-subscribe-div")
                 .html ("Thanks, you have been added to our mailing list!"
                           + "<br><br><br>");
          return false;
        })
      .fail(function(result){
          var data = JSON.parse(result);
          console.log(data);
          $("#mail-subscribe-error")
                   .text ("Sorry, there is something wrong with that e-mail "
                             + "address, please try again.");
      });
      return false;
       //*/
    });
   

  });
   

  $(function() {

    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {

      //Reset the message box
       $(formMessages).addClass('hidden');

      // Stop the browser from submitting the form.
      e.preventDefault();

      // Serialize the form data.
      var formData = $(form).serialize();

      // Submit the form using AJAX.
      $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
      })
      .done(function(response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('alert-error');
        $(formMessages).addClass('alert-success');
        $(formMessages).removeClass('hidden');

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');
      })
      .fail(function(data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('alert-success');
        $(formMessages).addClass('alert-error')
        $(formMessages).removeClass('hidden');

        // Set the message text.
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text('Oops! An error occured and your message could not be sent.');
        }
      });
      //*/

    });

  });

  //Stop sidebar from scrolling over the footer (see plugin at start of file)
  $('.bs-docs-sidebar>ul').followTo(520);
    

});
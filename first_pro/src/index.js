var host='http://localhost:3000/'

$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
        if (e.type === 'keyup') {
              if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
          if( $this.val() === '' ) {
              label.removeClass('active highlight'); 
              } else {
              label.removeClass('highlight');   
              }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
              label.removeClass('highlight'); 
              } 
        else if( $this.val() !== '' ) {
              label.addClass('highlight');
              }
      }
  
  });
 


  $('#signupform').submit(function(e){
    e.preventDefault();
    var o = {};
    var a = $('#signupform').serializeArray();
    for(var i=0;i<a.length;i++){
        o[a[i].name]=a[i].value;
    }
    var formData=JSON.stringify(o);
    $('#alert').hide()
    $.ajax({
        type: "POST",
        url: host+"signup",
        data: formData,
        contentType : "application/json"
      }).done(function(res){
        $('.tab-group a[href="#login"]').click();
      }).fail(function(res){
          errorAlert(res)
      })
      return false;
  })

  

  function errorAlert(err){
    console.log(err)
      $('#alert').show(); 
      $('#alert').html(err);
  }
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });
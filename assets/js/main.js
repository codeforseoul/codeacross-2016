/*
 * Change Navbar color while scrolling
*/

$(window).scroll(function(){
  handleTopNavAnimation();
});

$(window).load(function(){
  handleTopNavAnimation();
});

function handleTopNavAnimation() {
  var top=$(window).scrollTop();

  if(top>10){
    $('#site-nav').addClass('navbar-solid'); 
  }
  else{
    $('#site-nav').removeClass('navbar-solid'); 
  }
}

/*
 * Registration Form
*/

$('#registration-form').submit(function(e){
  e.preventDefault();
  
  var postForm = { //Fetch form data
      'fname'     : $('#registration-form #fname').val(),
      'lname'     : $('#registration-form #lname').val(),
      'email'     : $('#registration-form #email').val(),
      'cell'      : $('#registration-form #cell').val(),
      'address'   : $('#registration-form #address').val(),
      'zip'       : $('#registration-form #zip').val(),
      'city'      : $('#registration-form #city').val(),
      'program'   : $('#registration-form #program').val()
  };

  $.ajax({
      type      : 'POST',
      url       : './assets/php/contact.php',
      data      : postForm,
      dataType  : 'json',
      success   : function(data) {
              if (data.success) {
                $('#registration-msg .alert').html("Registration Successful");
                $('#registration-msg .alert').removeClass("alert-danger");
                $('#registration-msg .alert').addClass("alert-success");
                $('#registration-msg').show();
              }
              else
              {
                $('#registration-msg .alert').html("Registration Failed");
                $('#registration-msg .alert').removeClass("alert-success");
                $('#registration-msg .alert').addClass("alert-danger");
                $('#registration-msg').show();
              }
            }
    });
});

/*
 * SmoothScroll
*/

smoothScroll.init();

var data = [],
    barsCount = 50,
    labels = new Array(barsCount),
    updateDelayMax = 500,
    $id = function(id) {
      return document.getElementById(id);
    },
    random = function(max){ return Math.round(Math.random()*100)},
    helpers = Chart.helpers;

  Chart.defaults.global.responsive = true;

  for (var i = barsCount - 1; i >= 0; i--) {
    data.push(Math.round(Math.random() * 100));
  };

  var ctx = new Chart($id('myChart').getContext('2d'));
  ctx.Bar({
    labels : labels,
    datasets : [{
      fillColor : '#2B303B',
      data : data
    }]
  },{
    showScale : false,
    barShowStroke : false,
    barValueSpacing: 1,
    showTooltips : false,
    onAnimationComplete : function(){
      // Get scope of the hero chart during updates
      var heroChart = this,
        timeout;
      // Stop this running every time the update is fired
      this.options.onAnimationComplete = randomUpdate;
      this.options.animationEasing = 'easeOutQuint';
      randomUpdate();
      function randomUpdate(){
        heroChart.stop();
        clearTimeout(timeout);
        // Get a random bar
        timeout = setTimeout(function(){
          var randomNumberOfBars = Math.floor(Math.random() * barsCount),
            i;
          for (i = randomNumberOfBars - 1; i >= 0; i--) {
            heroChart.datasets[0].bars[Math.floor(Math.random() * barsCount)].value = Math.round(Math.random() * 100);
          };
          heroChart.update();
        },Math.random() * updateDelayMax);
      };
    }
  });

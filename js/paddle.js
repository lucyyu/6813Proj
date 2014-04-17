var paddle = function () {
  var my_blade;
  var my_rubber;
  var my_glue;
  var blade_div_list = [];
  var rubber_div_list = [];
  var glue_div_list = [];

  var create_div = function(img, name, price, brand, category){
    return $('<div class="item" data-dismiss="modal">\n' +
               '<img src="' + img + '" alt="item image">' + 
               '<h3>' + name + '</h3>' + 
               '<span><b>Price</b>: $' + price + '</span><br>' +
               '<span><b>Brand</b>: ' + brand + '</span><br>' +
               '<span><b>Category</b>: ' + category + '</span>' +
               //'<button type="button" class="btn btn-primary select-btn">Choose this one</button>' + 
            '</div>');   
  }

  //Cited from 6.170 Course Note
  var from_to = function (from, to, f) {
      if (from > to) return;
      f(from); from_to(from+1, to, f);
  };

  //Cited from 6.170 Course Note
  var each = function (a, f) {
      from_to(0, a.length-1, function (i) {f(a[i]);});
  };

  //////////////////////////////////////////////////
  //public method
  //////////////////////////////////////////////////

  var that = {};

  that.remove_blade = function() {
    my_blade = null;
  };

  that.remove_rubber = function() {
    my_rubber = null;
  };

  that.remove_glue = function() {
    my_glue = null;
  };

  /*
  * recalculate the total price of all the components, and then update the view.
  */
  that.recalculate_price = function() {
    var price = 0;
    if (my_blade) {
      price = price + my_blade.price;
    };
    if (my_rubber) {
      price = price + my_rubber.price;
    }
    if (my_glue) {
      price = price + my_glue.price;
    }
    $('#total-price').text(price);
  };

  /*
  * fake a paddle recommendation for GR4. Will be removed
  */
  that.predefine_paddle = function() {
    my_blade = blades[0];
    my_rubber = rubbers[0];
    my_glue = glues[0];
    that.add_blade_summary(my_blade);
    that.add_glue_summary(my_glue);
    that.add_rubber_summary(my_rubber);
    that.recalculate_price();
    paintCanvas();
  };

  that.add_blade_summary = function (blade) {
    $('#blade-summary').html('' + blade.name + '<br />$' + blade.price + "<br />Brand: " + blade.brand + "<br />Category: " + blade.category + '<div id="blade-close" class="closebtn">X</div>');
    $('#blade-summary').animate({
        width: 210
    }, 'fast');  

    $("#blade-close").click( function() {
      $('#blade-summary').html("");
      $('#blade-summary').animate({
        width: 15
      }, 'fast');
      that.remove_blade();
      that.recalculate_price();
      paintCanvas();
      return false; 
    });
  }

  that.add_glue_summary = function (glue) {
    $('#glue-summary').html(glue.name + "<br />$" + glue.price + "<br />Brand: " + glue.brand + "<br />Category: " + glue.category + '<div id="glue-close" class="closebtn">X</div>');
    $('#glue-summary').animate({
        width: 210
    }, 'fast');

    $("#glue-close").click( function() {
      $('#glue-summary').html("");
      $('#glue-summary').animate({
        width: 15
      }, 'fast');
      that.remove_glue();
      that.recalculate_price();
      paintCanvas();
      return false; 
    });
  }

  that.add_rubber_summary = function (rubber) {
    $('#rubber-summary').html(rubber.name + "<br />$" + rubber.price + "<br />Brand: " + rubber.brand + "<br />Category: " + rubber.category + '<div id="rubber-close" class="closebtn">X</div>');
    $('#rubber-summary').animate({
        width: 210
    }, 'fast');    

    $("#rubber-close").click( function() {
      $('#rubber-summary').html("");
      $('#rubber-summary').animate({
        width: 15
      }, 'fast');
      that.remove_rubber();
      that.recalculate_price();
      paintCanvas();
      return false; 
    });
  }

  /*
  * initialize the view, add all the items in the item list
  */
  that.initialize_view = function(){
    each(blades, function(blade){
      var div = create_div("img/blade.jpg", blade.name, blade.price, blade.brand, blade.category);
      $("#blade-modal-body").append(div);
      blade_div_list.push({"div": div, "obj": blade})

      div.click(function(){
        my_blade = blade;
        that.add_blade_summary(blade);
        that.recalculate_price();
        paintCanvas(); 
      });
    });

    each(glues, function(glue){
      var div = create_div("img/glue.jpg", glue.name, glue.price, glue.brand, glue.category);
      $("#glue-modal-body").append(div);
      glue_div_list.push({"div": div, "obj": glue})
      
      div.click(function(){
        my_glue = glue;
        that.add_glue_summary(glue);
        that.recalculate_price();
        paintCanvas(); 
      });
    });

    each(rubbers, function(rubber){
      var div = create_div("img/rubber.jpg", rubber.name, rubber.price, rubber.brand, rubber.category);
      $("#rubber-modal-body").append(div);
      rubber_div_list.push({"div": div, "obj": rubber})

      div.click(function(){
        my_rubber = rubber;
        that.add_rubber_summary(rubber);
        that.recalculate_price();
        paintCanvas(); 
      });
    });
  };

  that.rubber_price_query = function( start_price, end_price ){
    each(rubber_div_list, function(pair){
      if (pair.obj.price >= start_price && pair.obj.price <= end_price) {
        pair.div.css("display", "block");
      } else {
        pair.div.css("display", "none");
      }
    });
  };

  that.blade_price_query = function( start_price, end_price ){
    each(blade_div_list, function(pair){
      if (pair.obj.price >= start_price && pair.obj.price <= end_price) {
        pair.div.css("display", "block");
      } else {
        pair.div.css("display", "none");
      }
    });
  };

  that.glue_price_query = function( start_price, end_price ){
    each(glue_div_list, function(pair){
      if (pair.obj.price >= start_price && pair.obj.price <= end_price) {
        pair.div.css("display", "block");
      } else {
        pair.div.css("display", "none");
      }
    });
  };

  Object.freeze(that);

  return that;
};

$(function(){
  Paddle = new paddle();
  Paddle.initialize_view();


  //rubber
  $( "#rubber-slider-range" ).slider({
    range: true,
    min: 0,
    max: 200,
    step:10,

    values: [ 0, 200 ],
    slide: function( event, ui ) {
      $( "#rubber-amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    },
    stop: function( event, ui ) {
      start_price = ui.values[ 0 ];
      end_price = ui.values[ 1 ];
      Paddle.rubber_price_query( start_price, end_price );
    }
  });

  $( "#rubber-amount" ).val( "$" + $( "#rubber-slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#rubber-slider-range" ).slider( "values", 1 ) );

  //blade
  $( "#blade-slider-range" ).slider({
    range: true,
    min: 0,
    max: 200,
    step:10,
    values: [ 0, 200 ],
    slide: function( event, ui ) {
      $( "#blade-amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    },
    stop: function( event, ui ) {
      start_price = ui.values[ 0 ];
      end_price = ui.values[ 1 ];
      Paddle.blade_price_query( start_price, end_price );
    }
  });

  $( "#blade-amount" ).val( "$" + $( "#blade-slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#blade-slider-range" ).slider( "values", 1 ) );

  //glue
  $( "#glue-slider-range" ).slider({
    range: true,
    min: 0,
    max: 60,
    step:10,
    values: [ 0, 60 ],
    slide: function( event, ui ) {
      $( "#glue-amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    },
    stop: function( event, ui ) {
      start_price = ui.values[ 0 ];
      end_price = ui.values[ 1 ];
      Paddle.glue_price_query( start_price, end_price );
    }
  });

  $( "#glue-amount" ).val( "$" + $( "#glue-slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#glue-slider-range" ).slider( "values", 1 ) );

  $( "#submitRecBtn" ).click(function(){
    Paddle.predefine_paddle();
  });
  
});
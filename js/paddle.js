var paddle = function () {
  var my_blade;
  var my_rubber;
  var my_glue;

  var create_div = function(name, price, brand, category){
    return $('<div class="item" data-dismiss="modal">\n' +
               '<img src="img/paddle.png" alt="item image">' + 
               '<span>' + name + '</span><br>' + 
               '<span><b>Price</b>: $' + price + '</span><br>' +
               '<span><b>Brand</b>: ' + brand + '</span><br>' +
               '<span><b>Category</b>: ' + category + '</span>' +
               '<button type="button" class="btn btn-primary select-btn">Choose this one</button>' + 
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

  /*
  * recalculate the total price of all the components, and then update the view.
  */
  var recalculate_price = function() {
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
  }

  //////////////////////////////////////////////////
  //public method
  //////////////////////////////////////////////////

  var that = {};

  /*
  * initialize the view, add all the items in the item list
  */
  that.initialize_view = function(){
    each(blades, function(blade){
      var div = create_div(blade.name, blade.price, blade.brand, blade.category);
      $("#blade-modal-body").append(div);

      div.click(function(){
        my_blade = blade;
        $('#blade-summary').text(blade.name + ", " + blade.price + ", " + blade.brand + ", " + blade.category);
        recalculate_price();
      });
    });

    each(glues, function(glue){
      var div = create_div(glue.name, glue.price, glue.brand, glue.category);
      $("#glue-modal-body").append(div);

      div.click(function(){
        my_glue = glue;
        $('#glue-summary').text(glue.name + ", " + glue.price + ", " + glue.brand + ", " + glue.category);
        recalculate_price();
      });
    });

    each(rubbers, function(rubber){
      var div = create_div(rubber.name, rubber.price, rubber.brand, rubber.category);
      $("#rubber-modal-body").append(div);

      div.click(function(){
        my_rubber = rubber;
        $('#rubber-summary').text(rubber.name + ", " + rubber.price + ", " + rubber.brand + ", " + rubber.category);
        recalculate_price();
      });
    });
  };

  Object.freeze(that);
  return that;
};

$(function(){
  Paddle = new paddle();
  Paddle.initialize_view();
});
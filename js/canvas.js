//performance diamond
var params = {speed:0.65, spin:0.65, control:0.7, weight:0.5, price:0.5}; 
var keys = Object.keys(params); 

//COLOR CODE: speed: green, spin: blue, control: orange, weight: olive, price: black
var variable_colors = {speed: "#8a8a8a", spin: "#8a8a8a", control: "#8a8a8a", weight: "#8a8a8a", price: "#8a8a8a"};     

var radius = 80;     

function paintCanvas(){
	var canvas_p = document.getElementById("paddleCanvas");
    var context_p = canvas_p.getContext("2d");
    context_p.clearRect(0, 0, canvas_p.width, canvas_p.height);

    var raw_paddle_img = document.getElementById("paddle_raw");
    context_p.drawImage(raw_paddle_img, 0, 0, 450, 450);

    var core_img = document.getElementById("paddle_core");
    var blade_img = document.getElementById("paddle_blade");
    var glue_img = document.getElementById("paddle_glue");

    //highting the component upon hovering 
    $("#rubberBtn").mouseenter(function(){
    	//NOTE: http://stackoverflow.com/questions/12387310/html5-drawimage-works-in-firefox-not-chrome
    	//looks like this is recommendated drawImage() method that would work in both Chrome and Firefox
        if (!$("#rubber-summary").text()){
            context_p.drawImage(core_img, 60, -30, 423, 400);
        }
    }).mouseleave(function(){
        if (!$("#rubber-summary").text()){
        	context_p.clearRect(0, 0, canvas_p.width, canvas_p.height); 
        	context_p.drawImage(raw_paddle_img, 0, 0, 450, 450); 
            updatePaddleCanvas();
        }
    });

    $("#bladeBtn").mouseenter(function(){
        if (!$("#blade-summary").text()){
            context_p.drawImage(blade_img, 13, 15, 435, 435);
        }
    }).mouseleave(function(){
        if (!$("#blade-summary").text()){
        	context_p.clearRect(0, 0, canvas_p.width, canvas_p.height); 
        	context_p.drawImage(raw_paddle_img, 0, 0, 450, 450); 
            updatePaddleCanvas();
        }
    });

    $("#glueBtn").mouseenter(function(){
        if (!$("#glue-summary").text()){
            context_p.drawImage(glue_img, 50, -53, 435, 435);
        }
    }).mouseleave(function(){
        if (!$("#glue-summary").text()){
        	context_p.clearRect(0, 0, canvas_p.width, canvas_p.height); 
        	context_p.drawImage(raw_paddle_img, 0, 0, 450, 450); 
            updatePaddleCanvas();
        }
    });   

    $(".alert").css("visibility","visible");
    $(".checkOpponentInfo").css("visibility","hidden");

    updatePaddleCanvas();

    
    function updatePaddleCanvas(){
        if ($("#rubber-summary").text()){// rubber component selected, make highlight persistent
            context_p.drawImage(core_img, 60, -30, 423, 400);
        }
        if ($("#blade-summary").text()){// blade component selected, make highlight persistent
            context_p.drawImage(blade_img, 13, 15, 435, 435);
        }
        if ($("#glue-summary").text()){// glue component selected, make highlight persistent
            context_p.drawImage(glue_img, 50, -53, 435, 435);
        }
    }



    drawPerformanceDiamondBackground(false); 

    //draw real-time performance parameters based on user selection
    if ($("#blade-summary").text() && $("#rubber-summary").text() && $("#glue-summary").text()){

        //change params based on price
        var current_price = parseInt($("#total-price").text());
        if (current_price < 100){
            params = {speed:0.65, spin:0.65, control:0.7, weight:0.5, price:0.5}; 
        }else if (current_price >= 100 && current_price < 133){
            params = {speed:0.74, spin:0.70, control:0.72, weight:0.5, price:0.65}; 
        }else if (current_price >= 134 && current_price < 170){
            params = {speed:0.9, spin:0.85, control:0.74, weight:0.68, price:0.75}; 
        }else {
            params = {speed:0.95, spin:0.90, control:0.99, weight:0.67, price:0.97}; 
        }
        //update text labels
        drawPerformanceDiamondBackground(true); 

        var canvas_d = document.getElementById("diamondCanvas"); 
        var context_d = canvas_d.getContext("2d"); 
        context_d.save()

        var current_angle = Math.PI*54/180;
        context_d.translate(canvas_d.width/2, canvas_d.height/2); 

        context_d.beginPath();
        //store the position of the pins
        var pin_pts = [];
        var targetX = radius*params['speed']*Math.cos(current_angle);
        var targetY = radius*params['speed']*Math.sin(current_angle);
        context_d.moveTo(targetX, targetY);
        pin_pts.push([targetX, targetY]); 
        for (var i = 1; i < 5; i++) {
        	current_angle += Math.PI*72/180; 
        	targetX = radius*params[keys[i]]*Math.cos(current_angle);
        	targetY = radius*params[keys[i]]*Math.sin(current_angle);
        	context_d.lineTo(targetX, targetY);
        	pin_pts.push([targetX, targetY]); 
        }
        context_d.closePath(); 
        //context_d.fillStyle = "rgba(132,132,130,0.6)";
        context_d.fillStyle = "#f1af0f";

        context_d.fill(); 

        context_d.restore();     

        //show opponent button
        $(".alert").css("visibility","hidden");
        $(".checkOpponentInfo").css("visibility","visible");

        //update opponent information message
        var opponent_message = msgs[current_price%msgs.length].text;  
        $("#opponent-text").text(opponent_message);
    }		        
}

function drawPerformanceDiamondBackground(isAllComponentSelected){
    //Draw Performance Diamond
    var canvas_d = document.getElementById("diamondCanvas"); 
    var context_d = canvas_d.getContext("2d"); 
    context_d.clearRect(0, 0, canvas_d.width, canvas_d.height); 

    var slice_angle = 2*Math.PI/5;

    //draw text label based on state
    drawTextLabel(canvas_d, params, variable_colors, isAllComponentSelected); 

    //draw background diamond
    context_d.save(); 
    context_d.translate(canvas_d.width/2, canvas_d.height/2);

    context_d.rotate(-Math.PI/180*54);

    var gradient = context_d.createLinearGradient(0, 0, radius*Math.cos(slice_angle/2), 0);

    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "#dcdcdc"); 

    context_d.fillStyle = gradient; 
    //context_d.strokeStyle = "black"; 

    context_d.beginPath();
    context_d.moveTo(0, 0);
    context_d.lineTo(radius*Math.cos(slice_angle/2), radius*Math.sin(slice_angle/2));
    context_d.lineTo(radius*Math.cos(-slice_angle/2), radius*Math.sin(-slice_angle/2));
    context_d.closePath();
    context_d.fill();

    for (var i=0; i<4; i++){
        context_d.rotate(-Math.PI/180*72);

        context_d.beginPath();
        context_d.moveTo(0, 0);
        context_d.lineTo(radius*Math.cos(slice_angle/2), radius*Math.sin(slice_angle/2));
        context_d.lineTo(radius*Math.cos(-slice_angle/2), radius*Math.sin(-slice_angle/2));
        context_d.closePath();
        context_d.fill();
    }

    context_d.restore(); 
}

function drawTextLabel(canvas, parameters, colors, isAllComponentSelected){
        context_d = canvas.getContext("2d");
        context_d.save();
        context_d.translate(canvas.width/2, canvas.height/2); 
        context_d.font = "12px Arial";
        if (!isAllComponentSelected){
            //speed label
            context_d.fillStyle = colors.speed;
            context_d.fillText("Speed: 0", 30, 80);

            //spin label
            context_d.fillStyle = colors.spin;
            context_d.fillText("Spin: 0", -60, 80);
            

            //control label
            context_d.fillStyle = colors.control;
            context_d.fillText("Control: 0", -130, -20);

            //weight label
            context_d.fillStyle = colors.weight;
            context_d.fillText("Weight: 0", -20, -85);

            //price label
            context_d.fillStyle = colors.price;
            context_d.fillText("Affordability: 0", 77, -20); 

        } else {
            //speed
            var speed_val = parameters.speed;
            var speed_text = "Speed: " + (speed_val>=0.75?"ultra high":"high");
            context_d.fillStyle = colors.speed;
            context_d.fillText(speed_text, 30, 80);  

            //spin
            var spin_val = parameters.spin;
            var spin_text = "Spin: "+ (spin_val>=0.75?"fast":"medium");
            context_d.fillStyle = colors.spin;
            context_d.fillText(spin_text, -90, 80);

            //control
            var control_val = parameters.control;
            var control_text = "" + (control_val>=0.75?"strong":"medium");
            context_d.fillStyle = colors.control;
            context_d.fillText("Control: ", -130, -20);  
            context_d.fillText(control_text, -130, -5);

            //weight
            var weight_val = parameters.weight;
            var weight_text = "Weight: " + (weight_val>=0.75?"heavy":"light");
            context_d.fillStyle = colors.weight;
            context_d.fillText(weight_text, -30, -85);

            //price
            var price_val = parameters.price;
            var price_text = ""+(price_val>=0.75?"high":"medium");
            context_d.fillStyle = colors.price;
            context_d.fillText("Affordability: ", 83, -20);
            context_d.fillText(price_text, 83, -5);       
        }
        context_d.restore(); 
}

$(document).ready(paintCanvas);
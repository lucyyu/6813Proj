function paintCanvas(){
	var canvas_p = document.getElementById("paddleCanvas");
    var context_p = canvas_p.getContext("2d");
    context_p.clearRect(0, 0, canvas_p.width, canvas_p.height);

    var raw_paddle_img = new Image();
    raw_paddle_img.onload = function(){
    	context_p.drawImage(raw_paddle_img, 0, 0, 450, 450);
    }
    raw_paddle_img.src = "img/paddle.png"; 

    //highting the component upon hovering 
    $("#rubberBtn").mouseenter(function(){
    	//NOTE: http://stackoverflow.com/questions/12387310/html5-drawimage-works-in-firefox-not-chrome
    	//looks like this is recommendated drawImage() method that would work in both Chrome and Firefox
        var core_img = new Image();
        core_img.src = "img/core_highlight.png"; 
        core_img.onload = function(){
            context_p.drawImage(core_img, 60, -30, 423, 400);
        }
    }).mouseleave(function(){
    	context_p.clearRect(0, 0, canvas_p.width, canvas_p.height); 
    	context_p.drawImage(raw_paddle_img, 0, 0, 450, 450); 
    });

    $("#bladeBtn").mouseenter(function(){
        var blade_img = new Image();
        blade_img.src = "img/blade_highlight.png"; 
        blade_img.onload = function() {
            context_p.drawImage(blade_img, 13, 15, 435, 435);
        }
    }).mouseleave(function(){
    	context_p.clearRect(0, 0, canvas_p.width, canvas_p.height); 
    	context_p.drawImage(raw_paddle_img, 0, 0, 450, 450); 
    });

    $("#glueBtn").mouseenter(function(){
        var glue_img = new Image();
        glue_img.src = "img/glue_highlight.png"; 
        glue_img.onload = function() {
            context_p.drawImage(glue_img, 50, -53, 435, 435);
        }

    }).mouseleave(function(){
    	context_p.clearRect(0, 0, canvas_p.width, canvas_p.height); 
    	context_p.drawImage(raw_paddle_img, 0, 0, 450, 450); 
    });


    //Draw Performance Diamond
    var params = {speed:0.8, spin:0.7, control:1, weight:0.95, price:0.85}; 

    //COLOR CODE: speed: green, spin: blue, control: orange, weight: olive, price: black
    var variable_colors = {speed: "green", spin: "blue", control: "orange", weight: "olive", price: "red"};		        

    var keys = Object.keys(params); 
    var canvas_d = document.getElementById("diamondCanvas"); 
    var context_d = canvas_d.getContext("2d"); 

    var radius = 80;
    var slice_angle = 2*Math.PI/5;

    context_d.save(); 
    context_d.translate(canvas_d.width/2, canvas_d.height/2);

    //draw text labels for the 5 performance dimensions
    //speed label
    context_d.font = "12px Arial";
    context_d.fillStyle = variable_colors.speed;
    context_d.fillText("Speed", 30, 80);

    //spin label
    context_d.fillStyle = variable_colors.spin;
    context_d.fillText("Spin", -60, 80);

    //control label
    context_d.fillStyle = variable_colors.control;
    context_d.fillText("Control", -125, -20);

    //weight label
    context_d.fillStyle = variable_colors.weight;
    context_d.fillText("Weight", -20, -85);

    //price label
    context_d.fillStyle = variable_colors.price;
    context_d.fillText("Price", 83, -20);	

    context_d.rotate(-Math.PI/180*54);

    var gradient = context_d.createLinearGradient(0, 0, radius*Math.cos(slice_angle/2), 0);

    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "#B6B6B4"); 

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

    //draw real-time performance parameters based on user selection
    if ($("#blade-summary").text() && $("#rubber-summary").text() && $("#glue-summary").text()){
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
        context_d.fillStyle = "rgba(132,132,130,0.6)";
        context_d.fill(); 

        //stroke 5 pins
        for (var i=0; i<pin_pts.length; i++){
        	context_d.beginPath();
        	context_d.arc(pin_pts[i][0], pin_pts[i][1], radius/25, 0, Math.PI*2, false);
        	context_d.fillStyle = variable_colors[Object.keys(variable_colors)[i]];
        	context_d.fill();  
        }	        
    }		        
}

$(document).ready(paintCanvas);
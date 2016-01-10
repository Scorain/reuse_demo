

/* it is a function which can realize number slide up by itself,
this function needs two arguments: a json and a HTML element,
the json has four property(number typeof):initial_val,final_val,speed,frequent 
*/
function numberCopter(json,dom){			
 	(function(){
	    if(json.initial_val<=json.final_val){
	        json.initial_val+=json.speed;
	        dom.innerHTML=json.initial_val;
	        setTimeout(arguments.callee,json.frequent);
	    }else{
	        dom.innerHTML=json.final_val;
	    };
	})();		
};
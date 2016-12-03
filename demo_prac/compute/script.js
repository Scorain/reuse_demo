

window.onload=function(){
	var oInput=document.getElementsByTagName("input");
	var oSpan=document.getElementsByTagName("span");
	var total=0;
	oInput[2].onclick=function(){
		total=parseInt(oInput[0].value)+parseInt(oInput[1].value);
		oSpan[2].innerHTML=total;
	};
	
};
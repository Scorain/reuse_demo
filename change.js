 
function change(obj){
	var graduateValue=0;
	var sum=function(speed){
		graduateValue+=speed;
	};
	var perporty=function(method){
		switch(method){
			case "changeHeight":
				obj.style.height=graduateValue+"px";
				break;
			case "changeWidth":
				obj.style.width=graduateValue+"px";
				break;
			case "changeOpacity":
				obj.style.opacity=graduateValue;
				break;	
            case "changeMarginLeft":
				obj.style.marginLeft=graduateValue+"px";
				break;
            case "changeMarginTop":
				obj.style.marginTop=graduateValue+"px";
				break;				
		}
	};
	var dealProgress=function(method){
	    return function(Fparas,Lparas,granularity,frequentness){
			graduateValue=Fparas;
			if(graduateValue<Lparas){
				(function(){
				    sum(granularity);
				    if(graduateValue<Lparas){
					    perporty(method);
					    setTimeout(arguments.callee,frequentness);
				    } else {
					    graduateValue=Lparas;
					    perporty(method);
				    };
				})();
			} else if(graduateValue>Lparas){
				(function(){
				    sum(-granularity);
				    if(graduateValue>Lparas){
				    	perporty(method);
				    	setTimeout(arguments.callee,frequentness);
				    } else {
				    	graduateValue=Lparas;
				        perporty(method);
				    };
			    })();
		    };
	    };
	};
	obj.changeHeight=dealProgress("changeHeight");
	obj.changeWidth=dealProgress("changeWidth");
	obj.changeOpacity=dealProgress("changeOpacity");	
	obj.changeMarginLeft=dealProgress("changeMarginLeft");
	obj.changeMarginTop=dealProgress("changeMarginTop");
};


/* 
change.js用法说明:
change.js主要用于实现HTML中元素的简单动效，可以为盒模型元素添加如下5种方法:
  1.  changeHeight() ———— 此方法可以改变盒模型元素的高度属性；
  2.  changeWidth() ———— 此方法可以改变盒模型元素的宽度属性；
  3.  changeOpacity() ———— 此方法可以改变元素的不透明度属性；
  4.  changeMarginLeft() ———— 此方法可以改变盒模型元素的左外边距属性；
  5.  changeMarginTop() ———— 此方法可以改变盒模型元素的上外边距属性；
  此5种方法都需要传入4个参数：Fparas,Lparas,granularity,frequentness；其中，Fparas为属性变化前的值，Lparas为属性变化后的值，granularity为属性变化粒度，frequentness为属性变化的帧时长。

例：
  HTML：
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
	  <title>reuse demo</title>
	  <script src="change.js"></script>
	  <script src="show.js"></script>
    </head>
    <body>
      <div id="toBottom_testBox" style="width:200px;height:200px;background-color:red;opacity:1"></div>
	  <div id="toBottom_trigger" style="outline:1px solid green">trigger</div>
    </body>
  </html>  
  
  JS：
  window.onload=function(){
	test();
  };
  function test(){	
	var trigger=document.getElementById("toBottom_trigger");
	var testBox=document.getElementById("toBottom_testBox");
	change(testBox);
	trigger.onclick=function(){testBox.changeHeight(200,500,2,20);};
  };

  
   */
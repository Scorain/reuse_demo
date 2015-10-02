

/* 将对象传入封装方法的函数,其中obj1为动画元素，obj2为触发器  */
function trigger(obj1,obj2){
	/* 声明渐变量 */
	var gradualValue=0;
	/* 声明渐变速率，此处可变 */
	var sum=function(speed){
		gradualValue+=speed;
	};
	/* 声明延迟调用ID */
	var timeroverID=null;
	var timeroutID=null;
	/* 将渐变值赋值给选定的对象样式属性，此函数表达式内可为扩展方法的样式属性赋值 */
	var property=function(method){
		switch(method){
			case "toggleWidth":
				obj1.style.width=gradualValue+"px";
				break;
			case "toggleHeight":
				obj1.style.height=gradualValue+"px";
				break;
			case "toggleMarginLeft":
				obj1.style.marginLeft=gradualValue+"px";
				break;
            case "toggleMarginTop":
				obj1.style.marginTop=gradualValue+"px";
				break;
			case "toggleOpacity":
				obj1.style.opacity=gradualValue;
				break;	
            case "toggle_Opacity":
				obj1.style.opacity=1-gradualValue;
				break;
            case "toggleRotate":
				obj1.style.transform="rotate("+gradualValue+"deg)";
				break;				
            case "toggleScale":
				obj1.style.transform="scale("+gradualValue+")";
				break;								
		};		
	};
	/* 鼠标移入处理程序 */
    var overProgress=function(Fparas,Lparas,granularity,frequentness,method){
		return function(){
			clearTimeout(timeroutID);
		    (function(){
			    if(gradualValue<Lparas){
			        sum(granularity);
			        property(method);
			        timeroverID=setTimeout(arguments.callee,frequentness);
		        } else {
			    	gradualValue=Lparas;
			    	property(method);
			    };
		    }());
        };		
	};	
	/* 鼠标移出处理程序 */
	var outProgress=function(Fparas,Lparas,granularity,frequentness,method){
		return function(){
			clearTimeout(timeroverID);
			(function(){
				if(gradualValue>Fparas){
				    sum(-granularity);
				    property(method);
				    timeroutID=setTimeout(arguments.callee,frequentness);
			    } else {
			    	gradualValue=Fparas;
			    	property(method);
			    };
			}());			
		};
	};
	/* 鼠标触发处理程序 */
	var toggleProgress=function(method){
		return function(Fparas,Lparas,granularity,frequentness){
		    gradualValue=Fparas;
		    obj2.onmouseover=overProgress(Fparas,Lparas,granularity,frequentness,method);
	        obj2.onmouseout=outProgress(Fparas,Lparas,granularity,frequentness,method);
			obj1.onmouseover=overProgress(Fparas,Lparas,granularity,frequentness,method);
	        obj1.onmouseout=outProgress(Fparas,Lparas,granularity,frequentness,method);
		};
	};
	/* 方法公开接口，方法可扩展 */
	return {
		toggleWidth:toggleProgress("toggleWidth"),
		toggleHeight:toggleProgress("toggleHeight"),
		toggleMarginLeft:toggleProgress("toggleMarginLeft"),
		toggleMarginTop:toggleProgress("toggleMarginTop"),
		toggleOpacity:toggleProgress("toggleOpacity"),
		toggle_Opacity:toggleProgress("toggle_Opacity"),
		toggleRotate:toggleProgress("toggleRotate"),
		toggleScale:toggleProgress("toggleScale")		
	};	
};





/* 
trigger.js用法说明:
trigger()需要传入两个对象obj1、obj2，第一个是需要属性改变的元素，第二个是触发元素。
trigger.js主要用于实现HTML中元素的鼠标悬停触发动效，可以为元素添加如下8种方法:
  1.  toggleHeight() ———— 此方法可以触发元素的高度属性；
  2.  toggleWidth() ———— 此方法可以触发元素的宽度属性；
  3.  toggleOpacity() ———— 此方法可以触发元素的不透明度属性；
  4.  toggle_Opacity() ———— 此方法可以触发元素的透明度属性；
  5.  toggleMarginLeft() ———— 此方法可以触发元素的左外边距属性；
  6.  toggleMarginTop() ———— 此方法可以触发元素的上外边距属性；
  7.  toggleScale() ———— 此方法可以触发元素的扩大属性；
  8.  toggleRotate() ———— 此方法可以触发元素的旋转属性；
  此8种方法都需要传入4个参数：Fparas,Lparas,granularity,frequentness；其中，Fparas为属性变化前的值，Lparas为属性变化后的值，granularity为属性变化粒度，frequentness为属性变化的帧时长。

例：
  HTML：
  <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
	    <title>reuse demo</title>
	    <script src="trigger.js"></script>
      </head>
      <body>
        <div style="width:100px;height:100px;background-color:red"></div>
    	<p>trigger</p>
      </body>
    </html>  
  
  JS：
  window.onload=function(){
	test();
  };
  function test(){
	var odiv=document.getElementsByTagName("div")[0];
	var otrigger=document.getElementsByTagName("p")[0];
	trigger(odiv,otrigger).toggle_Opacity(0,1,0.02,20);
  }; 
   */


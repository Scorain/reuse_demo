
/* 将对象传入封装方法的函数  */
function carousel(obj){
	/* 获取列集合 */
	var oli=obj.getElementsByTagName("li");
	/* 声明渐变量 */
	var gradualValue=0;
	/* 设置布局方式，对于滚动方向为左右的方法，lr为真，
	设置列表的布局方式为左浮动 */
	var setFloat=function(lr){
		if(lr){
			for(var i=0;i<oli.length;i++){				
			oli[i].style.float="left";
		    };
		};		    
	};
	/* 设置渐变的样式属性，
	("left","-")向左("left","")向右("top","-")向上("top","")向下 */
	var property=function(marginWhat,orient){
		if(marginWhat=="left"){
			obj.style.marginLeft=orient+gradualValue+"px";
		} else if(marginWhat=="top"){
			obj.style.marginTop=orient+gradualValue+"px";
		};
	};
	/* 只滚动一次 */
	var setStep=function(marginWhat,orient,granularity){
		gradualValue+=granularity;
		property(marginWhat,orient);
	};
	/* 连续滚动 */
	var setSteps=function(steps,delayF,delay){
		if(steps){
		    setTimeout(delayF,delay);
		};
	};
	/* 向左和向上的主程序 */
    var ltProgress=function(lr,marginWhat,orient,steps){
	    return function(divDimension,granularity,frequentness,delay){
		    setFloat(lr);
			(function delayF(){
			    (function(){
		            if(gradualValue<divDimension){
			            setStep(marginWhat,orient,granularity);
						setTimeout(arguments.callee,frequentness);
		            } else {
			            gradualValue=divDimension;
			            property(marginWhat,orient);
				        var separate=obj.removeChild(oli[0]);
						gradualValue=0;
				        property(marginWhat,orient);
				        obj.appendChild(separate);
				        setSteps(steps,delayF,delay);
		            };
		        })();	
			})();		    			
	    };
	};
	/* 向右和向下的主程序 */
	var rbProgress=function(lr,marginWhat,orient,steps){
		return function(divDimension,granularity,frequentness,delay){
			setFloat(lr);
			(function delayF(){
				var separate=obj.removeChild(oli[(oli.length-1)]);
		        gradualValue=-divDimension;
		        property(marginWhat,orient);
		        obj.insertBefore(separate,oli[0]);
				(function(){
					if(gradualValue<0){
				        setStep(marginWhat,orient,granularity);
						setTimeout(arguments.callee,frequentness);
			        } else {
				        gradualValue=0;
				        property(marginWhat,orient);
				        setSteps(steps,delayF,delay);
			        };
				})();
			})();
		};		
	};
	/* 为对象添加方法 */
	obj.leftStep=ltProgress(1,"left","-",0);
	obj.rightStep=rbProgress(1,"left","",0);
	obj.topStep=ltProgress(0,"top","-",0);
	obj.bottomStep=rbProgress(0,"top","",0);
	obj.leftSteps=ltProgress(1,"left","-",1);
	obj.rightSteps=rbProgress(1,"left","",1);
	obj.topSteps=ltProgress(0,"top","-",1);
	obj.bottomSteps=rbProgress(0,"top","",1);	
};



/* 
carousel.js用法：
carousel.js主要用于实现HTML中列表元素的滚动效果，可以为列表添加如下8种方法:
  1.  leftStep() ———— 此方法可以为列表添加向左单次滚动；
  2.  rightStep() ———— 此方法可以为列表添加向右单次滚动；
  3.  topStep() ———— 此方法可以为列表添加向上单次滚动；
  4.  bottomStep() ———— 此方法可以为列表添加向下单次滚动；
  5.  leftSteps() ———— 此方法可以为列表添加向左连续滚动；
  6.  rightSteps() ———— 此方法可以为列表添加向右连续滚动；
  7.  topSteps() ———— 此方法可以为列表添加向上连续滚动；
  8.  bottomSteps() ———— 此方法可以为列表添加向下连续滚动；
  此8种方法都需要传入3个参数：divDimension,granularity,frequentness；其中，divDimension为容器尺寸的值，granularity为属性变化粒度，frequentness为属性变化的帧时长；对于连续滚动的4种方法，还需要一个参数delay，delay为连续滚动中单次滚动间的间歇时间。



 */
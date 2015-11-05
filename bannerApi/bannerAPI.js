/* 横向轮播效果函数，传入参数oul,choul,pnul分别为轮播区、选页区、翻页区<ul>元素 */
var bannerApi=function(oul,choul,pnul){
	var oli=oul.getElementsByTagName("li");
	var choli=choul.getElementsByTagName("li");
	var lr=pnul.getElementsByTagName("li");
	/* 实现动画效果的渐变量 */
	var gValue=0;
	var idLeft=null,idRight=null;
	/* 给渐变量一个速度 */
	var sum=function(speed){
	    gValue+=speed;
	};
	/* 向左翻页效果实现 */
	var toLeft=function(para,granularity,frequent,callback){
	    var separate=null;		
        (function(){
	        clearTimeout(idRight);
            if(gValue<para){
	            sum(granularity);
	            oul.style.marginLeft=-gValue+"px";
	            idLeft=setTimeout(arguments.callee,frequent);
            }else{
	            separate=oul.removeChild(oli[0]);
		        gValue=0;
	            oul.style.marginLeft=gValue+"px";
	            oul.appendChild(separate);
                if(callback){
			        callback();
			        };			
            };	
        })();		
    };
	/* 向右翻页效果实现 */
	var toRight=function(para,granularity,frequent,callback){
        var separate=oul.removeChild(oli[oli.length-1]);
        oul.insertBefore(separate,oli[0]);
        gValue=-para;
        oul.style.marginLeft=gValue+"px";		
        (function(){
	        clearTimeout(idLeft);
	        if(gValue<0){
		        sum(granularity);
		        oul.style.marginLeft=gValue+"px";
		        idRight=setTimeout(arguments.callee,frequent);
	        }else{
		        if(callback){
			        callback();
		        };
	        };
        })();		
    };
	/* 翻页效果点击按钮事件监听 */
	var lrR=function(para,granularity,frequent){
		lr[0].addEventListener("click",function(){
            toRight(para,granularity,frequent);
        },false);
        lr[1].addEventListener("click",function(){
            toLeft(para,granularity,frequent);
        },false);
	};
	/* 选页效果点击按钮事件监听 */
	var choR=function(para,granularity,frequent){
		(function(){
    		for(var i=0;i<choli.length;i++){			
    			choli[i].onclick=(function(i){
    				return function(){
    					var minis=choli[i].index-oli[0].index;
    				    var f=function(n){
    						if(n>0){
    						    if(n==1){
    							    return null;
    						    }else if(n>=2){
    							    return function(){
    									toLeft(para,granularity*n,frequent,f(n-1));
    								};
    						    };							
    						}else if(n<0){
    							if(n==-1){
    							    return null;
    						    }else if(n<=-2){
    							    return function(){
    									toRight(para,granularity*(-n),frequent,f(n+1));
    								};
    						    };	
    						};
    					}; 
    					if(minis>0){
    						toLeft(para,granularity*minis,frequent,f(minis));
    					}else if(minis<0){
    						toRight(para,granularity*(-minis),frequent,f(minis));
    					};
    				};
    			})(i);			
    		};
    	})();
	};
	/* 向左循环实现函数 */
	var cycL=function(para,granularity,frequent,delay){
		var timer=setTimeout(function(){
			toLeft(para,granularity,frequent);
			setTimeout(arguments.callee,delay);
		},delay);		
	};
	/* 向右循环实现函数 */
	var cycR=function(para,granularity,frequent,delay){
		var timer=setTimeout(function(){
			toLeft(para,granularity,frequent);
			setTimeout(arguments.callee,delay);
		},delay);
	};
	/* 轮播页面、选页按钮索引对应 */
	(function(){
        for(var i=0;i<oli.length;i++){
            oli[i].index=i;
            choli[i].index=i;
        };
    })(); 
	/* 方法使用接口 */
	return {
		lrR:function(para,granularity,frequent){
			lrR(para,granularity,frequent);
		},
		choR:function(para,granularity,frequent){
			choR(para,granularity,frequent);
		},
		cycL:function(para,granularity,frequent,delay){
			cycL(para,granularity,frequent,delay);
		},
		cycR:function(para,granularity,frequent,delay){
			cycR(para,granularity,frequent,delay);
		}
	};		
};


/* 使用文档：
bannerApi函数需要传入3个无序列表元素对象，其中oul为页面列表元素、choul为选页按钮列表元素、pnul为翻页按钮元素(oul与choul中的list数量应该相等)

bannerApi函数返回一个对象，有四中接口方法：
    lrR(para,granularity,frequent)---为翻页方法接口，其中para,granularity,frequent分别为页宽、动画粒度和频率；
	choR(para,granularity,frequent)---为选页方法接口，参数意义同上；
	cycL(para,granularity,frequent,delay)---为向左轮播方法接口，前三个参数意义同上，delay是页面间间隔时间。
	cycR(para,granularity,frequent,delay)---为向右轮播方法接口，参数意义同上。
	
	*以上方法接口的参数中，需满足(para%granularity===0);
	
调用语法：
    bannerApi(oul,choul,pnul).method(arguments);	
		
 */
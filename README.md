# reuse_demo
reuse demo

这个库用于存放在学习javaScript过程中我自己写的一些常用效果。



各文件的用法说明：

1.change.js用法说明:
change.js主要用于实现HTML中元素的简单动效，可以为盒模型元素添加如下5种方法:
  1.  changeHeight() ———— 此方法可以改变盒模型元素的高度属性；
  2.  changeWidth() ———— 此方法可以改变盒模型元素的宽度属性；
  3.  changeOpacity() ———— 此方法可以改变元素的不透明度属性；
  4.  changeMarginLeft() ———— 此方法可以改变盒模型元素的左外边距属性；
  5.  changeMarginTop() ———— 此方法可以改变盒模型元素的上外边距属性；
  此5种方法都需要传入4个参数：Fparas,Lparas,granularity,frequentness；其中，Fparas为属性变化前的值，Lparas为属性变化后
  的值，granularity为属性变化粒度，frequentness为属性变化的帧时长。

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
  
  
  
  
  
  
2.carousel.js用法说明：
carousel.js主要用于实现HTML中列表元素的滚动效果，可以为列表添加如下8种方法:
  1.  leftStep() ———— 此方法可以为列表添加向左单次滚动；
  2.  rightStep() ———— 此方法可以为列表添加向右单次滚动；
  3.  topStep() ———— 此方法可以为列表添加向上单次滚动；
  4.  bottomStep() ———— 此方法可以为列表添加向下单次滚动；
  5.  leftSteps() ———— 此方法可以为列表添加向左连续滚动；
  6.  rightSteps() ———— 此方法可以为列表添加向右连续滚动；
  7.  topSteps() ———— 此方法可以为列表添加向上连续滚动；
  8.  bottomSteps() ———— 此方法可以为列表添加向下连续滚动；
  此8种方法都需要传入3个参数：divDimension,granularity,frequentness；其中，divDimension为容器尺寸的值，granularity为属性
  变化粒度，frequentness为属性变化的帧时长；对于连续滚动的4种方法，还需要一个参数delay，delay为连续滚动中单次滚动间的间
  歇时间。
  
例：
  HTML：
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
    	<title>reuse demo</title>
    	<script src="carousel.js"></script>
    </head>
    <body>
      <div style="width:100px;height:100px;margin:50px auto;background-color:black;overflow:hidden">
	      <ul id="oul" style="list-style:none;outline:1px solid yellow;margin:0px;padding:0px;width:200%">
	        <li style="width:50%;height:100px;background-color:red"></li>
	      	<li style="width:50%;height:100px;background-color:green"></li>
	      	<li style="width:50%;height:100px;background-color:blue"></li>
	      	<li style="width:50%;height:100px;background-color:orange"></li>
	      </ul>
  	  </div>
    </body>
  </html>

  JS：
  window.onload=function(){
	    test();
  };
  function test(){	
	    var oul=document.getElementById("oul");
	    carousel(oul);
	    oul.leftSteps(100,2,20,2000);
  };

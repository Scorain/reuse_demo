

window.onload=function(){
	var d1=new Drag("div1");
	d1.init();
	
	var d2=new ChildDrag("div2");
	d2.init();
};
/* 申明拖拽构造函数（类） */
function Drag(id){
	this.obj=document.getElementById(id);
	this.disX=0;
	this.disY=0;
};
/* 拖拽构造函数（类）的初始化 */
Drag.prototype.init=function(){
	var This=this;
	this.obj.onmousedown=function(e){
		This.disX=e.clientX-This.obj.offsetLeft;
        This.disY=e.clientY-This.obj.offsetTop;
        document.onmousemove=function(e){
			This.obj.style.left=e.clientX-This.disX+"px";
			This.obj.style.top=e.clientY-This.disY+"px";
		};
        document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		};		
	};
}; 
/* 申明ChildDrag构造函数（类） */
function ChildDrag(id){
	Drag.call(this,id);
};
/* ChildDrag继承Drag */
extend(ChildDrag.prototype,Drag.prototype);
/*  obj1继承obj2的属性 */
function extend(obj1,obj2){
	for(var attr in obj2){
		obj1[attr]=obj2[attr];
	};
};



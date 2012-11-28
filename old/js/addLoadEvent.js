/*
*addLoadEvent(func);
*添加页面加载完毕时要执行函数。
*每个事件处理函数只能绑定一条命令。
*window.onload只能执行最后绑定的函数，
*此函数提供了一个加载完毕执行任意条函数的解决方案。
*eg.addLoadEvent(abc);
*http://simon.incutio.com
*09-08-13
*/
function addLoadEvent(func){
  var oldonload=window.onload;
  if(typeof window.onload!='function'){
    window.onload=func;
  }else{
    window.onload=function(){
	  oldonload();
	  func();
	}
  }
}/*addLoadEvent() end*/
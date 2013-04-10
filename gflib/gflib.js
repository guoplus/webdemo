
var gflib = gflib || {};

/**
 * 为window.onload事件添加方法
 * window.onload只能执行最后绑定的函数
 * 此函数提供了一个加载完毕执行任意条函数的解决方案。
 * eg.addLoadEvent(abc);
 * http://simon.incutio.com
 * 09-08-13
 */
gflib.ready = function(func){
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload=func;
    }
    else{
        window.onload = function(){
            oldonload();
            func();
        };
    }
};
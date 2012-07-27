/*
* jQuery input event
* input事件不同于keydown与keyup，它不依赖键盘响应，只要值改变都会触发input事件，比如粘贴文字、使用在线软键盘等。
* 更多自定义事件
* 1、hashchange http://benalman.com/projects/jquery-hashchange-plugin/
* 2、outerClick(元素外点击事件) http://blog.moocss.com/code-snippets/mootools-code-snippets/773.html
* 来源：http://bbs.blueidea.com/thread-3031338-1-1.html
* Author: tangbin
* Date: 2011-08-18 15:15
*/
(function ($) {

// IE6\7\8不支持input事件，但支持propertychange事件
if ('onpropertychange' in document) {
  // 检查是否为可输入元素
  var rinput = /^INPUT|TEXTAREA$/,
      isInput = function (elem) {
          return rinput.test(elem.nodeName);
      };
      
  $.event.special.input = {
      setup: function () {
          var elem = this;
          if (!isInput(elem)) return false;
          
          $.data(elem, '@oldValue', elem.value);
          $.event.add(elem, 'propertychange', function (event) {
              // 元素属性任何变化都会触发propertychange事件
              // 需要屏蔽掉非value的改变，以便接近标准的onput事件
              if ($.data(this, '@oldValue') !== this.value) {
                  $.event.trigger('input', null, this);
              };
              
              $.data(this, '@oldValue', this.value);
          });
      },
      teardown: function () {
          var elem = this;
          if (!isInput(elem)) return false;
          $.event.remove(elem, 'propertychange');
          $.removeData(elem, '@oldValue');
      }
  };
};

// 声明快捷方式：$(elem).input(function () {});
$.fn.input = function (callback) {

};

})(jQuery);
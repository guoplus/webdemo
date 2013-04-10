/**
 * @fileOverview 星标打分组件。
 * @author zhangxingyegwssi(a)126.com
 * @version 2.0.0
 */

/**
 * 星标打分。
 *
 * @class 星标打分。
 * @version 2.0.0
 */
var star_rate = star_rate || {};

/**
 * 初始化打分组件。
 *
 * @methodOf star_rate
 * @param {String} sWrapId 放置打分内容的容器id。
 * @param {Array} aItem 打分数据。
 * @returns {star_rate.init-ins} 打分组件实例。
 * @example
 * var data = [{id:"id1",title:"服务态度",tip:"很不满意::不满意::一般::满意::非常满意"},
 *             {id:"id2",title:"完成质量",tip:"很不满意::不满意::一般::满意::非常满意"}];
 * var s = star_rate.init('star_id',data);
 * // 初始化s后，根据需要，可以调用s的方法。
 * @see 参考 star_rate.init-ins
 */
star_rate.init = function(sWrapId,aItem){

    /**
     * 克隆对象
     *
     * @param obj
     * @return {*}
     */
    function clone(obj) {
        var o;
        if (typeof obj == "object") {
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var j in obj) {
                        o[j] = clone(obj[j]);
                    }
                }
            }
        } else {
            o = obj;
        }
        return o;
    }

    /**
     * star_rate.init返回的打分对象。
     *
     * @constructor
     */
    var ins = {
        /**
         * dom结构。
         *
         * @type Array
         * @field
         * @example
         * var d = document.getElementById('_id');
         * aWrap.push(d);
         */
        aWrap : null,
        /**
         * 打分数据。
         *
         * @type Array
         * @field
         * @example
         * var s = {id:"id1",title:"服务态度",tip:"很不满意::不满意::一般::满意::非常满意",score:1};
         * aItem.push(s);
         */
        aItem : null,
        /**
         * 回调函数。
         *
         * @type Object
         * @field
         * @example
         * var f = function(){}
         * aCallback['set'] = f;
         */
        oCallback : null,

        /**
         * 返回dom对象
         *
         * @param {String|Object} soD dom元素id或者dom元素对象
         * @private
         * @function
         * @returns {Object} dom元素对象
         * @example
         * var d = ins._$("d");
         */
        _$ : function(soD){
            if(!soD){
                return null;
            }
            var dom = null;
            if(typeof soD == 'string'){
                dom = document.getElementById(soD);
            }
            else{
                dom = soD;
            }

            return dom;
        },

        /**
         * 生成星标打分dom对象
         *
         * @param {Array} aItem 打分数据
         * @private
         * @function
         * @returns {Object} 星标打分dom对象
         * @see 参数示例见 star_rate.init-ins._init
         */
        _genDom : function(aItem){
            if(!aItem){
                return null;
            }

            this.aItem = [];
            this.aWrap = [];

            var df = document.createDocumentFragment();

            for(var i= 0,len=aItem.length;i<len;i++){
                var oc = clone(aItem[i]);
                this.aItem.push(oc);
                //
                var d = document.createElement('div');
                d.className = "star_rate";
                d.innerHTML = "<span class=\"title\">"+aItem[i]['title']+"</span>"
                    +"<ul>"
                    +"    <li><a href=\"javascript:;\">1</a></li>"
                    +"    <li><a href=\"javascript:;\">2</a></li>"
                    +"    <li><a href=\"javascript:;\">3</a></li>"
                    +"    <li><a href=\"javascript:;\">4</a></li>"
                    +"    <li><a href=\"javascript:;\">5</a></li>"
                    +"</ul>"
                    +"<span class=\"tip\"></span>"
                    +"<p class=\"tip_h\"></p>";
                df.appendChild(d);
                this.aWrap.push(d);
            }

            return df;
        },

        /**
         * 初始化打分组件。
         *
         * @private
         * @function
         * @param {String} sWrapId 放置打分内容的容器id。
         * @param {Array} aItem 打分数据。
         * @see 参数示例见 star_rate.init
         */
        _init : function(sWrapId,aItem){
            if(!sWrapId || !aItem){
                return;
            }
            var wrapDom = this._$(sWrapId);
            if(!wrapDom){
                return;
            }

            // 生成文档结构
            var doms = this._genDom(aItem);
            if(!doms){
                return;
            }
            wrapDom.appendChild(doms);

            //
            var _ins = this;

            // 设置事件响应
            for(var wi = 0,wlen=_ins.aWrap.length;wi<wlen;wi++){
                // 获取dom
                var oDiv = _ins.aWrap[wi];
                var oUl = oDiv.getElementsByTagName("ul")[0];
                var oP = oDiv.getElementsByTagName("p")[0]; // 悬浮提示
                var aLi = oUl.getElementsByTagName("li"); // 星星
                // 数据
                var oItem = _ins.aItem[wi];
                // 提示信息
                var sTip = oItem['tip'];
                var aTip = null;
                if(sTip){
                    aTip = sTip.split('::');
                    if(aTip.length!=5){
                        aTip = null;
                    }
                }
                // 其他数据
                var iScore = oItem['score'];
                if(!iScore){
                    iScore = 0;
                }
                var sId = oItem['id'];

                // 添加事件
                for (var i = 0; i < aLi.length; i++){
                    aLi[i].score = i+1;
                    aLi[i].sId = sId;
                    aLi[i].oP = oP;
                    aLi[i].oUl = oUl;

                    // 鼠标移过显示分数
                    aLi[i].onmouseover = function (){
                        // 显示
                        var oS = {id:this.sId,score:this.score};
                        var aS = [oS];
                        _ins.show(aS);
                        // 显示浮层
                        // 计算浮动层位置
                        this.oP.style.left = this.oUl.offsetLeft + this.score * this.offsetWidth + "px";
                        this.oP.style.display = "block";
                    };

                    // 鼠标离开后恢复上次评分
                    aLi[i].onmouseout = function (){
                        // 显示
                        _ins.show();
                        // 隐藏浮动层
                        this.oP.style.display = "none";
                    };

                    // 点击后进行评分处理
                    aLi[i].onclick = function (){
                        // 设置
                        var oS = {id:this.sId,score:this.score};
                        var aS = [oS];
                        _ins.set(aS);
                        // 显示
                        _ins.show();
                        // 隐藏浮动层
                        this.oP.style.display = "none";
                    };
                }
            }
        },

        /**
         * 设置分数。
         *
         * @function
         * @param {Array} aItem
         * @example
         * var s = [{id:"id1",score:3},{id:"id2",score:4}];
         * ins.set(s);
         */
        set : function(aItem){
            var _ins = this;
            if(!aItem){
                return;
            }

            var aItemOri = _ins.aItem;
            if(!aItemOri){
                return;
            }

            for(var ai = 0,alen = aItem.length;ai<alen;ai++){
                var oItem = aItem[ai];
                var s = oItem['score'];
                if(!s){
                    s = 0;
                }
                for(var aj = 0,ajlen = aItemOri.length;aj<ajlen;aj++){
                    var oItemOri = aItemOri[aj];
                    if(oItem['id']==oItemOri['id']){
                        oItemOri['score'] = s;
                        break;
                    }
                }
            }

            // 回调
            if(_ins.oCallback && _ins.oCallback['set']){
                _ins.oCallback['set'](_ins);
            }
        },

        /**
         * 显示分数。
         *
         * @function
         * @param {Array|null} aItem
         * @example
         * var s = [{id:"id1"},{id:"id2"}];
         * ins.show(s);
         * 或者
         * var s = [{id:"id1",score:3},{id:"id2",score:4}];
         * ins.show(s);
         * 或者
         * ins.show();
         */
        show : function(aItem){
            var _ins = this;
            if(!aItem){
                aItem = _ins.aItem;
            }

            var aItemOri = _ins.aItem;

            for(var ai = 0,alen = aItem.length;ai<alen;ai++){
                var oItem = aItem[ai];
                var wi = -1; // dom索引
                // 获得dom序号
                for(var aj = 0,ajlen = aItemOri.length;aj<ajlen;aj++){
                    if(oItem['id']==aItemOri[aj]['id']){
                        wi = aj;
                        break;
                    }
                }
                if(wi < 0){
                    continue;
                }
                //
                // 获取dom
                var oDiv = _ins.aWrap[wi];
                var oUl = oDiv.getElementsByTagName("ul")[0];
                var oSpan = oDiv.getElementsByTagName("span")[1]; // 提示
                var oP = oDiv.getElementsByTagName("p")[0]; // 悬浮提示
                var aLi = oUl.getElementsByTagName("li"); // 星星
                // 数据
                var oItemOri = aItemOri[wi];
                // 提示信息
                var sTip = oItemOri['tip'];
                var aTip = null;
                if(sTip){
                    aTip = sTip.split('::');
                    if(aTip.length!=5){
                        aTip = null;
                    }
                }
                // 其他数据
                var iScore = oItem['score'];
                if(!iScore){
                    iScore = oItemOri['score'];
                }
                if(!iScore){
                    iScore = 0;
                }

                // 星星
                for (var si = 0; si < aLi.length; si++){
                    if(si < iScore){
                        aLi[si].className = "on";
                    }
                    else{
                        aLi[si].className = "";
                    }
                }

                // 浮动层
                var s = '';
                if(aTip){
                    s = aTip[iScore-1];
                }
                oP.innerHTML = "<em><b>" + iScore + "</b> 分 " + s + "</em>";

                // 提示
                if(iScore>0){
                    oSpan.innerHTML = "<strong>" + (iScore) + " 分</strong> " + s;
                }
                else{
                    oSpan.innerHTML = "";
                }
            }

        },

        /**
         * 设置回调函数。
         *
         * @function
         * @param {Object} oFunc
         * @example
         * function do_action(ins){
         *     //参数ins是打分组件的实例对象
         * }
         * var cb = {act:"set",func:do_action};
         * ins.setCallback(cb);
         */
        setCallback : function(oFunc){
            var act = oFunc['act'];
            if(!act || (typeof act != 'string')){
                return;
            }
            this.oCallback = this.oCallback || {};

            this.oCallback[act] = oFunc['func'];
        }

    };

    ins._init(sWrapId, aItem);

    return ins;
};



var UTILS = (function(){
    var _utils = {},
        UA = navigator.userAgent,
        isAndroid = UA.match(/android/ig),
        isPad = UA.match(/ipad/ig),
        isPhone = UA.match(/iphone/ig),
        isWeixin = UA.match(/MicroMessenger/ig);

    _utils.detectUA = function(){
        if(isAndroid) return "isAndroid";
        if(isPad) return "isPad";
        if(isPhone) return "isPhone";
        if(isWeixin) return "isWeixin";
        return "notAPW";
    };

    _utils.getParameter = function(param){
        var reg,value;
        if(param && typeof param === "string"){
            reg = new RegExp('[&,?]' + param + '=([^\\&]*)','i');
            value = reg.exec(location.search);
            return value ? value[1] : "";
        }
    };

    /*  倒计时方法
    *@params opts {
    *     timeLen: 倒计时时长,
    *     timer: 计时器，
    *     durCb: 倒计时阶段回调，
    *     overCb: 倒计时结束回调
    * }
     */
    _utils.startCountDown = function(opts){
        var opts = opts || {},
            startTime = +new Date(),
            timeLen = opts.timeLen || 61,
            timer = opts.timer || null,
            localTime;
        timer = setInterval(function(){
            localTime = timeLen - parseInt((new Date().getTime()-startTime)/1000);
            if(localTime<0){
                clearInterval(timer);
                opts.overCb && opts.overCb();
            }else{
                opts.durCb && opts.durCb(localTime);
            }
        },1000);
    };

    /*  字符创打印方法
     *@params opts {
     *     string: 要打印的字符串,
     *     delay: 字符间间隔时间，
     *     spanClass: 字符容器类名,
     *     ele: 字符串容器
     * }
     *       callback 打印结束回调
     */
    _utils.stringEffect = function(opts,callback){
        var _opts,delay,string,len,Span,ele,
            i = 0,
            timer = null;
        if(toString.call(opts) === '[object Function]'){
            callback = callback ? callback : opts;
        };
        _opts = (toString.call(opts) === '[object Object]')? opts : {};
        delay = (toString.call(_opts.delay) === '[object Number]')? _opts.delay : 1000;
        string = (toString.call(_opts.string) === '[object String]')? _opts.string : "参数错误或不完整";
        ele = (/HTML\w*Element\]$/.test(toString.call(_opts.ele)))? _opts.ele : document.body;
        len = string.length;
        timer = setInterval(function(){
            if( !(len-i) ){
                clearInterval( timer );
                (toString.call(callback) === '[object Function]') && callback();
                return;
            } else {
                Span = document.createElement("span");
                Span.innerHTML = string.charAt(i);
                if(_opts.spanClass){
                    Span.setAttribute("class",opts.spanClass);
                };
                i++;
            };
            ele.appendChild(Span);
            Span = null;
        },delay);
    };


    /*
    * 掩码方法：
    * phone：手机号掩码
    * idcard: 身份证掩码
    * creditcard: 银行卡号掩码
    * */
    _utils.maskCode = (function(){
        var regPhone = /(\d{3})\d*(\d{4})/i,
            regIdcard = /(\d{6})\d*(\d{4})/i,
            regCreditcard = /(\d{12})\d*(\d{3})/i,
            checkNum = function( numStr ){
                if( !(typeof(numStr) === "string" || typeof(numStr) === "number") ){
                    return;
                };
                return numStr = ""+ numStr;
            },
            lenNum = function( numStr,len ){
                if( numStr.length !== len ){
                    return false;
                };
                return true;
            };
        return {
            phone: function( num ){
                numStr = checkNum( num );
                if( lenNum( numStr,11 ) ){
                    return numStr.replace(regPhone,"$1***$2");
                };
            },
            idcard: function( num ){
                numStr = checkNum( num );
                if( lenNum( numStr,18 ) ){
                    return numStr.replace(regIdcard,"$1********$2");
                };
            },
            creditcard: function( num ){
                numStr = checkNum( num );
                if( lenNum( numStr,19 ) ){
                    return numStr.replace(regCreditcard,"$1********$2");
                };
            }
        };
    })();

    _utils.msg = (function(){
        var tmpPC = '<div class="_t_m_l_" style="' +
                'position:absolute;' +
                'width:50%;' +
                'line-height:50px;' +
                'font-size:24px;' +
                'font-weight:bold;' +
                'text-align:center;' +
                'left:25%;' +
                'top:100px;' +
                'overflow: hidden;' +
                'border-radius:10px;' +
                '"></div>',
            tmpPHONE = '<div class="_t_m_l_" style="' +
                'position:absolute;' +
                'width:80%;' +
                'line-height:5rem;' +
                'font-size:3.5rem;' +
                'font-weight:bold;' +
                'text-align:center;' +
                'left:10%;' +
                'top:8rem;' +
                'overflow:hidden;' +
                'border-radius:0.8rem;' +
                '"></div>',
            bgTYPE = {
                inform: "green",
                warming: "yellow",
                error: "red"
            },
            tmpl,
            container = document.createElement("div"),
            showMess = function(media_type,bg_type,str){
                document.body.appendChild(container);
                container.innerHTML = media_type;
                tmpl = document.getElementsByClassName("_t_m_l_")[0];
                tmpl.style.backgroundColor = bg_type;
                tmpl.innerHTML = str;
            },
            hideMess = function(){
               document.body.removeChild(container);
            };
        return {
            pcInfo: function( str,delay ){
                showMess(tmpPC,bgTYPE.inform,str);
                setTimeout(hideMess,delay||3000);
            },
            pcWarm: function( str,delay ){
                showMess(tmpPC,bgTYPE.warming,str);
                setTimeout(hideMess,delay||3000);
            },
            pcError: function( str,delay ){
                showMess(tmpPC,bgTYPE.error,str);
                setTimeout(hideMess,delay||3000);
            },
            phoneInfo: function( str,delay ){
                showMess(tmpPHONE,bgTYPE.inform,str);
                setTimeout(hideMess,delay||3000);
            },
            phoneWarm: function( str,delay ){
                showMess(tmpPHONE,bgTYPE.warming,str);
                setTimeout(hideMess,delay||3000);
            },
            phoneError: function( str,delay ){
                showMess(tmpPHONE,bgTYPE.error,str);
                setTimeout(hideMess,delay||3000);
            }
        }
    })();

    _utils.getParameter = function(param){
        var reg = new RegExp('[?,&]' + param + '=([^\\&]*)','i'),
            value = reg.exec( location.search );
        return value ? value[1] : "";
    };

    _utils.sessionStorageData = function(key,value){
        if( !window.sessionStorage ) return null;
        var getItemValue = function(){
            var data = sessionStorage.getItem(key);
            try {
                data = JSON.parse(data);
            } catch(e) {
                console.log(e.message);
            };
            return data;
        };
        switch( Object.prototype.toString.call(value) ){
            case '[object Undefined]':
                return getItemValue();
            case '[object Null]':
                sessionStorage.removeItem(key);
                break;
            default:
                sessionStorage.setItem( key,JSON.stringify(value) );
                break;
        };
    };




    return _utils;
})()
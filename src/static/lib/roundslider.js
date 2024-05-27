/*! roundSlider v1.4.1 | (c) 2015-2020, Soundar | MIT license | http://roundsliderui.com/licence.html */
!function(c,r,o){"use strict";var h="roundSlider";function l(t,e){this.id=t.id,this.control=c(t),this.options=c.extend({},this.defaults,e)}c.fn[h]=function(t){return function(t,e){for(var i=0;i<this.length;i++){var s=this[i],a=c.data(s,h);if(a){if(c.isPlainObject(t))"function"==typeof a.option?a.option(t):s.id&&r[s.id]&&"function"==typeof r[s.id].option&&r[s.id].option(t);else if("string"==typeof t&&"function"==typeof a[t]){if(("option"===t||0===t.indexOf("get"))&&e[2]===o)return a[t](e[1]);a[t](e[1],e[2])}}else{var n=new l(s,t);n._saveInstanceOnElement(),n._saveInstanceOnID(),!1!==n._raise("beforeCreate")?(n._init(),n._raise("create")):n._removeData()}}return this}.call(this,t,arguments)},l.prototype={pluginName:h,version:"1.4.1",options:{},control:null,defaults:{min:0,max:100,step:1,value:null,radius:85,width:18,handleSize:"+0",startAngle:0,endAngle:"+360",animation:!0,showTooltip:!0,editableTooltip:!0,readOnly:!1,disabled:!1,keyboardAction:!0,mouseScrollAction:!1,lineCap:"butt",sliderType:"default",circleShape:"full",handleShape:"round",startValue:null,svgMode:!1,borderWidth:1,borderColor:null,pathColor:null,rangeColor:null,beforeCreate:null,create:null,start:null,drag:null,change:null,stop:null,tooltipFormat:null},keys:{UP:38,DOWN:40,LEFT:37,RIGHT:39},_props:function(){return{numberType:["min","max","step","radius","width","borderWidth","startAngle","startValue"],booleanType:["animation","showTooltip","editableTooltip","readOnly","disabled","keyboardAction","mouseScrollAction","svgMode"],stringType:["sliderType","circleShape","handleShape","lineCap"]}},_init:function(){if(this.options.svgMode){var t=function(){};this._appendSeperator=t,this._refreshSeperator=t,this._updateSeperator=t,this._appendOverlay=t,this._checkOverlay=t,this._updateWidth=t}if(this._isBrowserSupport=this._isBrowserSupported(),this._isKO=!1,this._isAngular=!1,this.control.is("input")){this._isInputType=!0,this._hiddenField=this.control,this.control=this.$createElement("div"),this.control.insertAfter(this._hiddenField),this.options.value=this._hiddenField.val()||this.options.value;var e=this;this._checkKO()&&setTimeout(function(){e._checkKO()},1),this._checkAngular()}this._bindOnDrag=!1;var i=this._dataElement().attr("data-updateon");"string"==typeof i?"drag"==i&&(this._bindOnDrag=!0):this._isAngular&&(this._bindOnDrag=!0),this._onInit()},_onInit:function(){this._initialize(),this._update(),this._render()},_initialize:function(){var t=this.browserName=this.getBrowserName();t&&this.control.addClass("rs-"+t),this._isBrowserSupport&&(this._isReadOnly=!1,this._checkDataType(),this._refreshCircleShape())},_render:function(){this.container=this.$createElement("div.rs-container"),this.innerContainer=this.$createElement("div.rs-inner-container"),this.container.append(this.innerContainer);var t="rs-control "+(this.options.svgMode?"rs-svg-mode":"rs-classic-mode");if(this.control.addClass(t).empty().append(this.container),this._isBrowserSupport)this._createLayers(),this._createOtherLayers(),this._setContainerClass(),this._setRadius(),this._setProperties(),this._setValue(),this._updateTooltipPos(),this._bindControlEvents("_bind");else{var e=this.$createElement("div.rs-msg");e.html("function"==typeof this._throwError?this._throwError():this._throwError),this.control.empty().addClass("rs-error").append(e),this._isInputType&&this.control.append(this._dataElement())}},_update:function(){this._validateSliderType(),this._updateStartEnd(),this._validateStartEnd(),this._handle1=this._handle2=this._handleDefaults(),this._analyzeModelValue(),this._validateModelValue()},_createLayers:function(){if(this.options.svgMode)return this._createSVGElements(),this._setSVGAttributes(),this._setSVGStyles(),void this._moveSliderRange(!0);this.block=this.$createElement("div.rs-block rs-outer rs-border"),this.innerContainer.append(this.block);var t,e=this.options.width,i=this._start;t=this.$createElement("div.rs-path rs-transition"),this._rangeSlider||this._showRange?(this.block1=t.clone().addClass("rs-range-color").rsRotate(i),this.block2=t.clone().addClass("rs-range-color").css("opacity","0").rsRotate(i),this.block3=t.clone().addClass("rs-path-color").rsRotate(i),this.block4=t.addClass("rs-path-color").css({opacity:"1","z-index":"1"}).rsRotate(i-180),this.block.append(this.block1,this.block2,this.block3,this.block4).addClass("rs-split")):this.block.append(t.addClass("rs-path-color")),this.lastBlock=this.$createElement("span.rs-block").css({padding:e}),this.innerBlock=this.$createElement("div.rs-inner rs-bg-color rs-border"),this.lastBlock.append(this.innerBlock),this.block.append(this.lastBlock)},_createOtherLayers:function(){this._appendHandle(),this._appendSeperator(),this._appendOverlay(),this._appendHiddenField()},_setProperties:function(){this._updatePre(),this._setHandleShape(),this._addAnimation(),this._appendTooltip(),this.options.showTooltip||this._removeTooltip(),this.options.disabled?this.disable():this.options.readOnly&&this._readOnly(!0),this.options.mouseScrollAction&&this._bindScrollEvents("_bind")},_updatePre:function(){this._prechange=this._predrag=this.options.value},_setValue:function(){if(this._rangeSlider)this._setHandleValue(1),this._setHandleValue(2);else{this._showRange&&this._setHandleValue(1);var t="default"==this.options.sliderType?this._active||1:parseFloat(this.bar.children().attr("index"));this._setHandleValue(t)}},_appendTooltip:function(){0===this.container.children(".rs-tooltip").length&&(this.tooltip=this.$createElement("span.rs-tooltip rs-tooltip-text"),this.container.append(this.tooltip),this._tooltipEditable(),this._updateTooltip())},_removeTooltip:function(){0!=this.container.children(".rs-tooltip").length&&this.tooltip&&this.tooltip.remove()},_tooltipEditable:function(){var t=this.options,e=this.tooltip;e&&t.showTooltip&&this[t.editableTooltip?(e.addClass("edit"),"_bind"):(e.removeClass("edit"),"_unbind")](e,"click",this._editTooltip)},_editTooltip:function(t){var e=this.tooltip;if(e.hasClass("edit")&&!this._isReadOnly){var i=2*parseFloat(e.css("border-left-width")),s=this.input=this.$createElement("input.rs-input rs-tooltip-text").css({height:e.outerHeight()-i,width:e.outerWidth()-i});e.html(s).removeClass("edit").addClass("hover"),s.focus().val(this._getTooltipValue(!0)),this._bind(s,"blur",this._focusOut),this._bind(s,"change",this._focusOut)}},_focusOut:function(t){if("change"==t.type){var e=this.input.val().replace("-",",");","==e[0]&&(e="-"+e.slice(1).replace("-",",")),this.options.value=e,this._analyzeModelValue(),this._validateModelValue(),this._setValue(),this.input.val(this._getTooltipValue(!0))}else this.tooltip.addClass("edit").removeClass("hover"),this._updateTooltip();this._raiseEvent("change")},_setHandleShape:function(){var t=this.options.handleShape,e=this._handles();e.removeClass("rs-handle-dot rs-handle-square"),"dot"==t?e.addClass("rs-handle-dot"):"square"==t?e.addClass("rs-handle-square"):this.options.handleShape="round"},_setHandleValue:function(t){this._active=t;var e=this["_handle"+t];"min-range"!=this.options.sliderType&&(this.bar=this._activeHandleBar()),this._changeSliderValue(e.value,e.angle)},_setAnimation:function(){this.options.animation?this._addAnimation():this._removeAnimation()},_addAnimation:function(){this.options.animation&&this.control.addClass("rs-animation")},_removeAnimation:function(){this.control.removeClass("rs-animation")},_setContainerClass:function(){var t=this.options.circleShape;"full"==t||"pie"==t||0===t.indexOf("custom")?this.container.addClass("full "+t):this.container.addClass(t.split("-").join(" "))},_setRadius:function(){var t,e,i=this.options,s=i.radius,a=2*s,n=i.circleShape,r=0,o=t=a,h=e=a,l="full"==n||"pie"==n||0===n.indexOf("custom");if(i.svgMode&&!l){var d=this._handleBars();"none"!=i.lineCap?(r="butt"===i.lineCap?i.borderWidth/2:i.width/2+i.borderWidth,-1!=n.indexOf("bottom")&&d.css("margin-top",r+"px"),-1!=n.indexOf("right")&&d.css("margin-right",-r+"px")):c.each(d,function(t,e){e.style.removeProperty("margin-top"),e.style.removeProperty("margin-right")})}if(0===n.indexOf("half"))switch(n){case"half-top":case"half-bottom":t=(o=s)+r;break;case"half-left":case"half-right":e=(h=s)+r}else 0===n.indexOf("quarter")&&(o=h=s,t=e=s+r);this.container.css({height:o,width:h}),this.control.css({height:t,width:e}),0!==r?this.innerContainer.css({height:t,width:e}):this.innerContainer.removeAttr("style"),i.svgMode&&(this.svgContainer.height(a).width(a),this.svgContainer.children("svg").height(a).width(a))},_border:function(t){return t?parseFloat(this._startLine.children().css("border-bottom-width")):this.options.svgMode?2*this.options.borderWidth:2*parseFloat(this.block.css("border-top-width"))},_appendHandle:function(){!this._rangeSlider&&this._showRange||this._createHandle(1),(this._rangeSlider||this._showRange)&&this._createHandle(2)},_appendSeperator:function(){this._startLine=this._addSeperator(this._start,"rs-start"),this._endLine=this._addSeperator(this._start+this._end,"rs-end"),this._refreshSeperator()},_addSeperator:function(t,e){var i=this.$createElement("span.rs-seperator rs-border"),s=(this.options.width,this._border(),this.$createElement("span.rs-bar rs-transition "+e).append(i).rsRotate(t));return this.container.append(s),s},_refreshSeperator:function(){var t=this._startLine.add(this._endLine),e=t.children().removeAttr("style"),i=this.options,s=i.width+this._border();"round"==i.lineCap&&"full"!=i.circleShape?(t.addClass("rs-rounded"),e.css({width:s,height:s/2+1}),this._startLine.children().css("margin-top",-1).addClass("min-range"==i.sliderType?"rs-range-color":"rs-path-color"),this._endLine.children().css("margin-top",s/-2).addClass("rs-path-color")):(t.removeClass("rs-rounded"),e.css({width:s,"margin-top":this._border(!0)/-2}).removeClass("rs-range-color rs-path-color"))},_updateSeperator:function(){this._startLine.rsRotate(this._start),this._endLine.rsRotate(this._start+this._end)},_createHandle:function(t){var e,i=this.$createElement("div.rs-handle rs-move"),s=this.options;"round"!=(e=s.handleShape)&&i.addClass("rs-handle-"+e),i.attr({index:t,tabIndex:"0"});var a,n=(a=(a=this._dataElement()[0].id)?a+"_":"")+"handle"+("range"==s.sliderType?"_"+(1==t?"start":"end"):"");i.attr({role:"slider","aria-label":n});var r=this._handleDefaults(),o=this.$createElement("div.rs-bar rs-transition").css("z-index","7").append(i);return o.addClass("range"==s.sliderType&&2==t?"rs-second":"rs-first"),o.rsRotate(r.angle),this.container.append(o),this._refreshHandle(),this.bar=o,1!=(this._active=t)&&2!=t&&(this["_handle"+t]=r),this._bind(i,"focus",this._handleFocus),this._bind(i,"blur",this._handleBlur),i},_refreshHandle:function(){var t,e,i=this.options,s=i.handleSize,a=i.width,n=!0,r=this.isNumber;if("string"==typeof s&&r(s))if("+"===s.charAt(0)||"-"===s.charAt(0))s=a+parseFloat(s);else if(s.indexOf(",")){var o=s.split(",");r(o[0])&&r(o[1])&&(e=parseFloat(o[0]),t=parseFloat(o[1]),n=!1)}n&&(t=e=r(s)?parseFloat(s):a);var h=(a+this._border()-e)/2;this._handles().css({height:t,width:e,margin:-t/2+"px 0 0 "+h+"px"})},_defaultValue:function(){var t=this.options,e=t.startValue;return this.isNumber(e)?this._limitValue(e):t.min},_handleDefaults:function(){var t=this._defaultValue();return{angle:this._valueToAngle(t),value:t}},_handleBars:function(){return this.container.children("div.rs-bar")},_handles:function(){return this._handleBars().find(".rs-handle")},_activeHandleBar:function(t){return t=t!=o?t:this._active,c(this._handleBars()[t-1])},_handleArgs:function(t){var e=this["_handle"+(t=t!=o?t:this._active)];return{element:this._activeHandleBar(t).children(),index:t,isActive:t==this._active,value:e?e.value:null,angle:e?e.angle:null}},_dataElement:function(){return this._isInputType?this._hiddenField:this.control},_raiseEvent:function(t){var e=this["_pre"+t],i=this.options.value;if(e!==i)return this["_pre"+t]=i,"change"==t&&this._updatePre(),this._updateTooltip(),("change"==t||this._bindOnDrag&&"drag"==t)&&this._updateHidden(),this._raise(t,{value:i,preValue:e,handle:this._handleArgs()})},_elementDown:function(t){if(!this._isReadOnly)if(c(t.target).hasClass("rs-handle"))this._handleDown(t);else{var e=this._getXY(t),i=this._getCenterPoint(),s=this._getDistance(e,i),a=(this.block||this.svgContainer).outerWidth()/2;if(a-(this.options.width+this._border())<=s&&s<=a){var n,r,o=this.control.find(".rs-handle.rs-focus");0!==o.length&&t.preventDefault();var h=this._getAngleValue(e,i);if(n=h.angle,r=h.value,this._rangeSlider){if(1==o.length){var l=parseFloat(o.attr("index"));this._invertRange||(1==l&&n>this._handle2.angle?l=2:2==l&&n<this._handle1.angle&&(l=1)),this._active=l}else this._active=this._handle2.angle-n<n-this._handle1.angle?2:1;this.bar=this._activeHandleBar()}this._changeSliderValue(r,n),this._raiseEvent("change")}}},_handleDown:function(t){t.preventDefault();var e=c(t.target);e.focus(),this._removeAnimation(),this._bindMouseEvents("_bind"),this.bar=e.parent(),this._active=parseFloat(e.attr("index")),this._handles().removeClass("rs-move"),this._raise("start",{value:this.options.value,handle:this._handleArgs()})},_handleMove:function(t){t.preventDefault();var e,i,s=this._getXY(t),a=this._getCenterPoint(),n=this._getAngleValue(s,a,!0);e=n.angle,i=n.value,this._changeSliderValue(i,e),this._raiseEvent("drag")},_handleUp:function(t){this._handles().addClass("rs-move"),this._bindMouseEvents("_unbind"),this._addAnimation(),this._raiseEvent("change"),this._raise("stop",{value:this.options.value,handle:this._handleArgs()})},_handleFocus:function(t){if(!this._isReadOnly){var e=c(t.target);this._handles().removeClass("rs-focus"),e.addClass("rs-focus"),this.bar=e.parent(),this._active=parseFloat(e.attr("index")),this.options.keyboardAction&&(this._bindKeyboardEvents("_unbind"),this._bindKeyboardEvents("_bind")),this.control.find("div.rs-bar").css("z-index","7"),this.bar.css("z-index","8")}},_handleBlur:function(t){this._handles().removeClass("rs-focus"),this.options.keyboardAction&&this._bindKeyboardEvents("_unbind")},_handleKeyDown:function(t){if(!this._isReadOnly){var e=t.keyCode,i=this.keys;if(27==e&&this._handles().blur(),35<=e&&e<=40){37<=e&&e<=40&&this._removeAnimation();var s,a,n=this["_handle"+this._active];t.preventDefault(),e==i.UP||e==i.RIGHT?s=this._round(this._limitValue(n.value+this.options.step)):e==i.DOWN||e==i.LEFT?s=this._round(this._limitValue(n.value-this._getMinusStep(n.value))):36==e?s=this._getKeyValue("Home"):35==e&&(s=this._getKeyValue("End")),a=this._valueToAngle(s),this._changeSliderValue(s,a),this._raiseEvent("drag")}}},_handleKeyUp:function(t){this._addAnimation(),this._raiseEvent("change")},_getMinusStep:function(t){var e=this.options,i=e.min,s=e.max,a=e.step;if(t!=s)return a;var n=(s-i)%a;return 0==n?a:n},_getKeyValue:function(t){var e=this.options,i=e.min,s=e.max;return this._rangeSlider?"Home"==t?1==this._active?i:this._handle1.value:1==this._active?this._handle2.value:s:"Home"==t?i:s},_elementScroll:function(t){if(!this._isReadOnly){t.preventDefault();var e,i,s,a,n=t.originalEvent||t;0!=(a=n.wheelDelta?n.wheelDelta/60:n.detail?-n.detail/2:0)&&(this._updateActiveHandle(t),i=(e=this["_handle"+this._active]).value+(0<a?this.options.step:-this._getMinusStep(e.value)),i=this._limitValue(i),s=this._valueToAngle(i),this._removeAnimation(),this._changeSliderValue(i,s),this._raiseEvent("change"),this._addAnimation())}},_updateActiveHandle:function(t){var e=c(t.target);e.hasClass("rs-handle")&&e.parent().parent()[0]==this.control[0]&&(this.bar=e.parent(),this._active=parseFloat(e.attr("index"))),this.bar.find(".rs-handle").hasClass("rs-focus")||this.bar.find(".rs-handle").focus()},_bindControlEvents:function(t){this[t](this.control,"mousedown",this._elementDown),this[t](this.control,"touchstart",this._elementDown)},_bindScrollEvents:function(t){this[t](this.control,"mousewheel",this._elementScroll),this[t](this.control,"DOMMouseScroll",this._elementScroll)},_bindMouseEvents:function(t){this[t](c(document),"mousemove",this._handleMove),this[t](c(document),"mouseup",this._handleUp),this[t](c(document),"mouseleave",this._handleUp),this[t](c(document),"touchmove",this._handleMove),this[t](c(document),"touchend",this._handleUp),this[t](c(document),"touchcancel",this._handleUp)},_bindKeyboardEvents:function(t){this[t](c(document),"keydown",this._handleKeyDown),this[t](c(document),"keyup",this._handleKeyUp)},_changeSliderValue:function(t,e){var i=this._oriAngle(e),s=this._limitAngle(e),a=this._active;if(this._rangeSlider||this._showRange){var n="min-range"==this.options.sliderType,r=1==a&&i<=this._oriAngle(this._handle2.angle)||2==a&&i>=this._oriAngle(this._handle1.angle),o=this._invertRange;if(n||r||o){if(this["_handle"+a]={angle:e,value:t},this.options.value=this._rangeSlider?this._handle1.value+","+this._handle2.value:t,this.bar.rsRotate(s),this._updateARIA(t),this.options.svgMode)return void this._moveSliderRange();var h=this._oriAngle(this._handle2.angle)-this._oriAngle(this._handle1.angle),l="1",d="0";h<=180&&!(h<0&&-180<h)&&(l="0",d="1"),this.block2.css("opacity",l),this.block3.css("opacity",d),(1==a?this.block4:this.block2).rsRotate(s-180),(1==a?this.block1:this.block3).rsRotate(s)}}else this["_handle"+a]={angle:e,value:t},this.options.value=t,this.bar.rsRotate(s),this._updateARIA(t)},_createSVGElements:function(){var t=this.$createSVG("svg"),e="path.rs-transition ",i={fill:"transparent"};this.$path=this.$createSVG(e+"rs-path",i),this.$range=this._showRange?this.$createSVG(e+"rs-range",i):null,this.$border=this.$createSVG(e+"rs-border",i),this.$append(t,[this.$path,this.$range,this.$border]),this.svgContainer=this.$createElement("div.rs-svg-container").append(t),this.innerContainer.append(this.svgContainer)},_setSVGAttributes:function(){var t=this.options,e=t.radius,i=t.borderWidth,s=t.width,a=t.lineCap,n=e-i/2,r=n-s-i,o=this._start,h=this._end,l=o+h,d=this.$drawPath(e,n,o,l,r,a);this.$setAttribute(this.$border,{d:d}),c(this.$border).css("stroke-width",i);var u=e-i-s/2;this.svgPathLength=this.$getArcLength(u,h);var p={d:this.$drawPath(e,u,o,l),"stroke-width":s,"stroke-linecap":a};this.$setAttribute(this.$path,p),this._showRange&&(this.$setAttribute(this.$range,p),"round"==a||"square"==a?this.$range.setAttribute("stroke-dashoffset","0.01"):this.$range.removeAttribute("stroke-dashoffset"))},_setSVGStyles:function(){var t=this.options,e=t.borderColor,i=t.pathColor,s=t.rangeColor;e&&c(this.$border).css("stroke",e),i&&c(this.$path).css("stroke",i),this._showRange&&s&&c(this.$range).css("stroke",s)},_moveSliderRange:function(t){if(this._showRange){var e=this._start,i=this._end,s=this._handle1.angle,a=this._handle2.angle;t&&(s=a=this._handleDefaults().angle);var n=[];if((s-=e)<=(a-=e))n.push(0);else{"min-range"==this.options.sliderType&&n.push(0);var r=s;s=a,a=r}var o=s/i*this.svgPathLength;n.push(o);var h=(a-s)/i*this.svgPathLength;n.push(h,this.svgPathLength),this.$range.style.strokeDasharray=n.join(" ")}},_isPropsRelatedToSVG:function(t){return this._hasProperty(t,["radius","borderWidth","width","lineCap","startAngle","endAngle"])},_isPropsRelatedToSVGStyles:function(t){return this._hasProperty(t,["borderColor","pathColor","rangeColor"])},_hasProperty:function(t,e){return"string"==typeof t?-1!==e.indexOf(t):Object.keys(t).some(function(t){return-1!==e.indexOf(t)})},_updateARIA:function(t){var e=this.options,i=e.min,s=e.max;if(this.bar.children().attr({"aria-valuenow":t}),"range"==e.sliderType){var a=this._handles();a.eq(0).attr({"aria-valuemin":i}),a.eq(1).attr({"aria-valuemax":s}),1==this._active?a.eq(1).attr({"aria-valuemin":t}):a.eq(0).attr({"aria-valuemax":t})}else this.bar.children().attr({"aria-valuemin":i,"aria-valuemax":s})},_checkKO:function(){var t=this._dataElement().data("bind");if("string"==typeof t&&"object"==typeof ko){var e=ko.dataFor(this._dataElement()[0]);if(void 0===e)return!0;for(var i,s=t.split(","),a=0;a<s.length;a++){var n=s[a].split(":");if("value"==c.trim(n[0])){i=c.trim(n[1]);break}}i&&(this._isKO=!0,ko.computed(function(){this.option("value",e[i]())},this))}},_checkAngular:function(){if("object"==typeof angular&&"function"==typeof angular.element&&(this._ngName=this._dataElement().attr("ng-model"),"string"==typeof this._ngName)){this._isAngular=!0;var i=this;this._scope().$watch(this._ngName,function(t,e){i.option("value",t)})}},_scope:function(){return angular.element(this._dataElement()).scope()},_getDistance:function(t,e){return Math.sqrt((t.x-e.x)*(t.x-e.x)+(t.y-e.y)*(t.y-e.y))},_getXY:function(t){return-1==t.type.indexOf("mouse")&&(t=(t.originalEvent||t).changedTouches[0]),{x:t.pageX,y:t.pageY}},_getCenterPoint:function(){var t=this.block||this.svgContainer,e=t.offset();return{x:e.left+t.outerWidth()/2,y:e.top+t.outerHeight()/2}},_getAngleValue:function(t,e,i){var s=-Math.atan2(t.y-e.y,e.x-t.x)/(Math.PI/180);return s<this._start&&(s+=360),s=this._checkAngle(s,i),this._processStepByAngle(s)},_checkAngle:function(t,e){var i=this._oriAngle(t),s=this["_handle"+this._active].angle,a=this._oriAngle(s);if(i>this._end){if(!e)return s;t=this._start+(a<=this._end-a?0:this._end)}else if(e){var n=this._handleDragDistance;if(this.isNumber(n)&&Math.abs(i-a)>n)return s}return t},_processStepByAngle:function(t){var e=this._angleToValue(t);return this._processStepByValue(e)},_processStepByValue:function(t){var e,i,s,a,n=this.options,r=n.min,o=n.max,h=n.step,l=o<r;return e=t-(t-r)%(h=l?-h:h),i=this._limitValue(e+h),s=this._limitValue(e-h),a=l?t<=e?e-t<t-i?e:i:s-t<t-e?e:s:e<=t?t-e<i-t?e:i:t-s<e-t?e:s,{value:a=this._round(a),angle:this._valueToAngle(a)}},_round:function(t){var e=this.options.step.toString().split(".");return e[1]?parseFloat(t.toFixed(e[1].length)):Math.round(t)},_oriAngle:function(t){var e=t-this._start;return e<0&&(e+=360),e},_limitAngle:function(t){return t>360+this._start&&(t-=360),t<this._start&&(t+=360),t},_limitValue:function(t){var e=this.options,i=e.min,s=e.max,a=s<i;return(!a&&t<i||a&&i<t)&&(t=i),(!a&&s<t||a&&t<s)&&(t=s),t},_angleToValue:function(t){var e=this.options,i=e.min,s=e.max;return this._oriAngle(t)/this._end*(s-i)+i},_valueToAngle:function(t){var e=this.options,i=e.min;return(t-i)/(e.max-i)*this._end+this._start},_appendHiddenField:function(){this._hiddenField=this._hiddenField||this.$createElement("input"),this._hiddenField.attr({type:"hidden",name:this._dataElement()[0].id||""}),this.control.append(this._hiddenField),this._updateHidden()},_updateHidden:function(){var t=this.options.value;this._hiddenField.val(t),(this._isKO||this._isAngular)&&this._hiddenField.trigger("change"),this._isAngular&&(this._scope()[this._ngName]=t)},_updateTooltip:function(){this.tooltip&&!this.tooltip.hasClass("hover")&&this.tooltip.html(this._getTooltipValue()),this._updateTooltipPos()},_updateTooltipPos:function(){this.tooltip&&this.tooltip.css(this._getTooltipPos())},_getTooltipPos:function(){var t,e=this.options.circleShape,i=this.tooltip.outerHeight(),s=this.tooltip.outerWidth();if("full"==e||"pie"==e||0===e.indexOf("custom"))return{"margin-top":-i/2,"margin-left":-s/2};if(-1==e.indexOf("half"))return{};switch(e){case"half-top":case"half-bottom":t={"margin-left":-s/2};break;case"half-left":case"half-right":t={"margin-top":-i/2}}return t},_getTooltipValue:function(t){var e=this.options.value;if(this._rangeSlider){var i=e.split(",");return t?i[0]+" - "+i[1]:this._tooltipValue(i[0],1)+" - "+this._tooltipValue(i[1],2)}return t?e:this._tooltipValue(e)},_tooltipValue:function(t,e){var i=this._raise("tooltipFormat",{value:t,handle:this._handleArgs(e)});return null!=i&&"boolean"!=typeof i?i:t},_validateStartAngle:function(){var t=this.options.startAngle;return(t=(this.isNumber(t)?parseFloat(t):0)%360)<0&&(t+=360),this.options.startAngle=t},_validateEndAngle:function(){var t=this.options,e=t.startAngle,i=t.endAngle;return i=this.isNumber(i)?("string"!=typeof i||"+"!==i.charAt(0)&&"-"!==i.charAt(0)||(i=e+parseFloat(i)),parseFloat(i)):360,(i%=360)<=e&&(i+=360),i},_refreshCircleShape:function(){var t=this.options.circleShape,e=["half-top","half-bottom","half-left","half-right","quarter-top-left","quarter-top-right","quarter-bottom-right","quarter-bottom-left","pie","custom-half","custom-quarter"];if(-1==e.indexOf(t)){var i=["h1","h2","h3","h4","q1","q2","q3","q4","3/4","ch","cq"].indexOf(t);t=-1!=i?e[i]:"half"==t?"half-top":"quarter"==t?"quarter-top-left":"full"}this.options.circleShape=t},_appendOverlay:function(){var t=this.options.circleShape;"pie"==t?this._checkOverlay(".rs-overlay",270):"custom-half"!=t&&"custom-quarter"!=t||(this._checkOverlay(".rs-overlay1",180),"custom-quarter"==t&&this._checkOverlay(".rs-overlay2",this._end))},_checkOverlay:function(t,e){var i=this.container.children(t);0==i.length&&(i=this.$createElement("div"+t+" rs-transition rs-bg-color"),this.container.append(i)),i.rsRotate(this._start+e)},_checkDataType:function(){var t,e,i,s=this.options,a=this._props();for(t in a.numberType)i=s[e=a.numberType[t]],this.isNumber(i)?s[e]=parseFloat(i):s[e]=this.defaults[e];for(t in a.booleanType)i=s[e=a.booleanType[t]],s[e]="false"!=i&&!!i;for(t in a.stringType)i=s[e=a.stringType[t]],s[e]=(""+i).toLowerCase()},_validateSliderType:function(){var t=this.options.sliderType.toLowerCase();this._rangeSlider=this._showRange=!1,"range"==t?this._rangeSlider=this._showRange=!0:t=-1!=t.indexOf("min")?(this._showRange=!0,"min-range"):"default",this.options.sliderType=t},_updateStartEnd:function(){var t=this.options,e=t.circleShape,i=t.startAngle,s=t.endAngle;"full"!=e&&(-1!=e.indexOf("quarter")?s="+90":-1!=e.indexOf("half")?s="+180":"pie"==e&&(s="+270"),this.options.endAngle=s,"quarter-top-left"==e||"half-top"==e?i=0:"quarter-top-right"==e||"half-right"==e?i=90:"quarter-bottom-right"==e||"half-bottom"==e?i=180:"quarter-bottom-left"!=e&&"half-left"!=e||(i=270),this.options.startAngle=i)},_validateStartEnd:function(){this._start=this._validateStartAngle(),this._end=this._validateEndAngle();var t=this._start<this._end?0:360;this._end+=t-this._start},_parseModelValue:function(t){return this.isNumber(t)?parseFloat(t):this._defaultValue()},_analyzeModelValue:function(){var t,e=this.options,i=e.value;i instanceof Array&&(i=i.toString());var s="string"==typeof i?i.split(","):[i];if(1==s.length&&this.isNumber(s[0])?s=[e.min,s[0]]:2<=s.length&&!this.isNumber(s[1])&&(s[1]=e.max),this._rangeSlider)t=[this._parseModelValue(s[0]),this._parseModelValue(s[1])].toString();else{var a=s.pop();t=this._parseModelValue(a)}this.options.value=t},_validateModelValue:function(){var t=this.options,e=t.value;if(this._rangeSlider){var i=e.split(","),s=parseFloat(i[0]),a=parseFloat(i[1]);if(s=this._limitValue(s),a=this._limitValue(a),!this._invertRange){var n=t.min;t.max<n?s<a&&(s=a):a<s&&(a=s)}this._handle1=this._processStepByValue(s),this._handle2=this._processStepByValue(a),this.options.value=this._handle1.value+","+this._handle2.value}else{var r=this._showRange?2:this._active||1;this["_handle"+r]=this._processStepByValue(this._limitValue(e)),this._showRange&&(this._handle1=this._handleDefaults()),this.options.value=this["_handle"+r].value}},$createElement:function(t){var e=t.split(".");return c(document.createElement(e[0])).addClass(e[1]||"")},$createSVG:function(t,e){var i=t.split("."),s=document.createElementNS("http://www.w3.org/2000/svg",i[0]);return i[1]&&s.setAttribute("class",i[1]),e&&this.$setAttribute(s,e),s},$setAttribute:function(t,e){for(var i in e){var s=e[i];if("class"===i){var a=t.getAttribute("class");a&&(s+=" "+a)}t.setAttribute(i,s)}return t},$append:function(e,t){return t.forEach(function(t){t&&e.appendChild(t)}),e},isNumber:function(t){return"number"==typeof(t=parseFloat(t))&&!isNaN(t)},getBrowserName:function(){var t="",e=r.navigator.userAgent;return r.opr&&opr.addons||r.opera||0<=e.indexOf(" OPR/")?t="opera":"undefined"!=typeof InstallTrigger?t="firefox":0<e.indexOf("MSIE ")||0<e.indexOf("Trident/")?t="ie":r.StyleMedia?t="edge":-1!=e.indexOf("Safari")&&-1==e.indexOf("Chrome")?t="safari":(r.chrome&&r.chrome.webstore||-1!=e.indexOf("Chrome"))&&(t="chrome"),t},_isBrowserSupported:function(){for(var t=["borderRadius","WebkitBorderRadius","MozBorderRadius","OBorderRadius","msBorderRadius","KhtmlBorderRadius"],e=0;e<t.length;e++)if(document.body.style[t[e]]!==o)return!0},_throwError:function(){return"This browser doesn't support the border-radious property."},_raise:function(t,e){var i=this.options,s=i[t],a=!0;return(e=e||{value:i.value}).id=this.id,e.control=this.control,e.options=i,s&&(e.type=t,"string"==typeof s&&(s=r[s]),c.isFunction(s)&&(a=!1!==(a=s.call(this,e))&&a)),this.control.trigger(c.Event(t,e)),a},_bind:function(t,e,i){c(t).bind(e,c.proxy(i,this))},_unbind:function(t,e,i){c(t).unbind(e,c.proxy(i,this))},_getInstance:function(){return c.data(this._dataElement()[0],h)},_saveInstanceOnElement:function(){c.data(this.control[0],h,this)},_saveInstanceOnID:function(){var t=this.id;t&&void 0!==r[t]&&(r[t]=this)},_removeData:function(){var t=this._dataElement()[0];c.removeData&&c.removeData(t,h),t.id&&"function"==typeof r[t.id]._init&&delete r[t.id]},_destroyControl:function(){this._isInputType&&this._dataElement().insertAfter(this.control).attr("type","text"),this.control.empty().removeClass("rs-control").height("").width(""),this._removeAnimation(),this._bindControlEvents("_unbind")},_updateWidth:function(){this.lastBlock.css("padding",this.options.width)},_readOnly:function(t){this._isReadOnly=t,this.container.removeClass("rs-readonly"),t&&this.container.addClass("rs-readonly")},_get:function(t){return this.options[t]},_set:function(t,e,i){var s=this._props();if(-1!=c.inArray(t,s.numberType)){if(!this.isNumber(e))return;e=parseFloat(e)}else-1!=c.inArray(t,s.booleanType)?e="false"!=e&&!!e:-1!=c.inArray(t,s.stringType)&&(e=e.toLowerCase());if(i||this.options[t]!=e){switch(this.options[t]=e,t){case"startAngle":case"endAngle":this._validateStartEnd(),this._updateSeperator(),this._appendOverlay();case"min":case"max":case"step":case"value":this._analyzeModelValue(),this._validateModelValue(),this._setValue(),this._updatePre(),this._updateHidden(),this._updateTooltip();break;case"startValue":var a=this.options;a.svgMode&&"min-range"==a.sliderType&&(this._handle1=this._handleDefaults(),this._moveSliderRange());break;case"radius":this._setRadius(),this._updateTooltipPos();break;case"width":this._removeAnimation(),this._updateWidth(),this._setRadius(),this._refreshHandle(),this._updateTooltipPos(),this._addAnimation(),this._refreshSeperator();break;case"borderWidth":this._setRadius(),this._refreshHandle();break;case"handleSize":this._refreshHandle();break;case"handleShape":this._setHandleShape();break;case"animation":this._setAnimation();break;case"showTooltip":this.options.showTooltip?this._appendTooltip():this._removeTooltip();break;case"editableTooltip":this._tooltipEditable(),this._updateTooltipPos();break;case"disabled":this.options.disabled?this.disable():this.enable();break;case"readOnly":this.options.readOnly?this._readOnly(!0):this.options.disabled||this._readOnly(!1);break;case"mouseScrollAction":this._bindScrollEvents(this.options.mouseScrollAction?"_bind":"_unbind");break;case"lineCap":this._setRadius(),this._refreshSeperator();break;case"circleShape":this._refreshCircleShape(),"full"==this.options.circleShape&&(this.options.startAngle=0,this.options.endAngle="+360");case"sliderType":this._destroyControl(),this._onInit();break;case"svgMode":var n=this.control,r=this.options;this.destroy(),n[h](r)}return this}},option:function(t,e){if(this._getInstance()&&this._isBrowserSupport){if(c.isPlainObject(t)){if(t.min!==o||t.max!==o){t.min!==o&&(this.options.min=t.min,delete t.min),t.max!==o&&(this.options.max=t.max,delete t.max);var i=this.options.value;t.value!==o&&(i=t.value,delete t.value),this._set("value",i,!0)}for(var s in t)this._set(s,t[s])}else if(t&&"string"==typeof t){if(e===o)return this._get(t);this._set(t,e)}return this.options.svgMode&&t&&(this._isPropsRelatedToSVG(t)&&(this._setSVGAttributes(),this._moveSliderRange()),this._isPropsRelatedToSVGStyles(t)&&this._setSVGStyles()),this}},getValue:function(t){if("range"==this.options.sliderType&&this.isNumber(t)){var e=parseFloat(t);if(1==e||2==e)return this["_handle"+e].value}return this._get("value")},setValue:function(t,e){if(this.isNumber(t)){if(this.isNumber(e)){var i=this.options.sliderType;if("range"==i){var s=parseFloat(e),a=parseFloat(t);1==s?t=a+","+this._handle2.value:2==s&&(t=this._handle1.value+","+a)}else"default"==i&&(this._active=e)}this._set("value",t)}},disable:function(){this.options.disabled=!0,this.container.addClass("rs-disabled"),this._readOnly(!0)},enable:function(){this.options.disabled=!1,this.container.removeClass("rs-disabled"),this.options.readOnly||this._readOnly(!1)},destroy:function(){this._getInstance()&&(this._destroyControl(),this._removeData(),this._isInputType&&this.control.remove())}},c.fn.rsRotate=function(t){var e=this,i="rotate("+t+"deg)";return e.css("-webkit-transform",i),e.css("-moz-transform",i),e.css("-ms-transform",i),e.css("-o-transform",i),e.css("transform",i),e},l.prototype.$polarToCartesian=function(t,e,i){var s=(i-180)*Math.PI/180;return[t+e*Math.cos(s),t+e*Math.sin(s)].join(" ")},l.prototype.$drawArc=function(t,e,i,s,a){var n=s-i==360,r=Math.abs(i-s)<=180?"0":"1",o=a?1:0,h=a?s:i,l=[];if(n){var d=(i+s)/2,u=this.$polarToCartesian(t,e,d),p=this.$polarToCartesian(t,e,h);l.push("A",1,1,0,0,o,u,"A",1,1,0,0,o,p)}else{p=this.$polarToCartesian(t,e,h);l.push("A",e,e,0,r,o,p)}return l.join(" ")},l.prototype.$drawPath=function(t,e,i,s,a,n){var r=this.$polarToCartesian(t,e,i),o=["M "+r,this.$drawArc(t,e,i,s,!0)];if(a){var h=this.$polarToCartesian(t,a,s),l=this.$drawArc(t,a,i,s,!1);"none"==n?o.push("M "+h,l):"round"==n?o.push("A 1, 1, 0, 0, 1, "+h,l,"A 1, 1, 0, 0, 1, "+r):"butt"!=n&&"square"!=n||o.push("L "+h,l,"L "+r,"Z")}return o.join(" ")},l.prototype.$getArcLength=function(t,e){return void 0===e&&(e=360),2*Math.PI*t*(e/360)},c.fn[h].prototype=l.prototype}(jQuery,window);
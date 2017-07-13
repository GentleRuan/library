// 根据传递的参数选择器内容，返回查找到的页面DOM元素
// 参数：
// 	selector:选择器，可取以下值
// 		#id
// 		.className
// 		tagName
//	context:查找元素的上下文，即 DOM 元素对象，默认为 document
function $(selector, context){
	context = context || document;
	if (selector.indexOf("#") === 0) // 根据id查找元素
		return document.getElementById(selector.slice(1));
	if (selector.indexOf(".") === 0) // 根据类名查找元素
		return getByClassName(selector.slice(1), context);
		// return context.getElementsByClassName(selector.slice(1));
	return context.getElementsByTagName(selector); // 根据元素名查找
}

// 解决 getElementsByClassName 兼容问题
function getByClassName(className, context) {
	context = context || document;
	if (document.getElementsByClassName) // 浏览器支持使用 getElementsByClassName
		return context.getElementsByClassName(className);

	/* 不支持使用 getElementsByClassName */
	// 保存查找到的元素的数组
	var result = [];
	// 查找 context 后代的所有元素
	var allTags = context.getElementsByTagName("*");
	// 遍历所有的元素
	for(var i = 0, len = allTags.length; i < len; i++) {
		// 获取当前遍历元素使用的所有 class 类名
		var classNames = allTags[i].className.split(" ");
		// 遍历当前元素的所有类名，和待查找的类名比较
		for (var j = 0, l = classNames.length; j < l; j++) {
			if (classNames[j] == className) { // 当前所在遍历的元素是要查找出来的其中一个
				result.push(allTags[i]);
				break;
			}
		}
	}
	// 返回查找结果
	return result;
}

// 返回指定element元素的CSS属性attr的属性值

	function css(element, attr, value) {
 		return window.getComputedStyle 
 			? getComputedStyle(element)[attr]
 			: element.currentStyle[attr];
	}

// 获取指定元素在文档中的绝对定位，返回定位坐标对象
// 该对象有 top 与 left 两个属性
// 也可用于设置元素在文档中的绝对定位，传递定位坐标对象

function offset(element, coordinates) {
	if (typeof coordinates === "undefined") { // 获取坐标
		var _top = 0, _left = 0;
		while (element !== null) {
			_top += element.offsetTop;
			_left += element.offsetLeft;
			element = element.offsetParent;
		}
	
		return {
			top:_top,
			left:_left
		};
	} else if (typeof coordinates === "object") { // 设置坐标
		var parent = element.offsetParent;
		var _top = 0, _left = 0;
		while (parent !== null) {
			_top += parent.offsetTop;
			_left += parent.offsetLeft;
			parent = parent.offsetParent;
		}
		element.style.top = coordinates.top - _top + "px";
		element.style.left = coordinates.left - _left + "px";
	}
}

/*// 递归
function offset(element, coordinates) {
	if (typeof coordinates === "undefined") { // 获取坐标
		var _top = 0, _left = 0;
		while (element !== null) {
			_top += element.offsetTop;
			_left += element.offsetLeft;
			element = element.offsetParent;
		}
	
		return {
			top:_top,
			left:_left
		};
	} else if (typeof coordinates === "object") { // 设置坐标
		var curr = offset(element.offsetParent); // 递归获取父元素在文档中定位坐标
		element.style.top = coordinates.top - curr.top + "px";
		element.style.left = coordinates.left - curr.left + "px";
	}
}*/
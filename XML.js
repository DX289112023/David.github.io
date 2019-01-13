// 创建
function createXHR() {
	// 检查原生 XHR 对象是否存在
	if (typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	} else if (typeof ActiveXObject != "undefined") {
		if (typeof arguments.callee.activeXString != "string") {
			var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'],i,len;
			for (i = 0, len = versions.length; i < len; i++) {
				try {
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				} catch (ex) {
					// 跳过
				}
			}
		}

		return new ActiveXObject(arguments.callee.activeXString);
	} else {
		throw new Error("NO XHR object available.");
	}
}

// 同步如下：
var xhr = createXHR();	// 定义

// 第一个要调用的方法（启动一个请求以备发送）。1.请求类型，2.请求的URL，3.false 同步，true 异步
xhr.open("get", "example.php", false);
// 发送特定请求，请求分派到服务器。接收一个参数，如果不通过请求主体发生，则传入 null。
xhr.send(null);

/*
	收到响应后，响应的数据会自动填充 XHR 对象的属性。
	xhr.responseText: 作为响应主体返回的文本
	xhr.status: 响应的 HTTP 状态
*/

// 同步时 304:缓存
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
	alert(xhr.responseText);
} else {
	alert("Request was unsuccessful: " + xhr.status);
}

/*
	异步：检测 readyState 属性，表示请求/响应的当前活动阶段
	0: 未初始化。未调用 open()。
	1: 启动。以调用 open()，但未调用 send()。
	2: 发送。调用了 send()，但未收到响应。
	3: 接收。接收到部分。
	4: 完成。接收到全部，可以做客户端使用。
*/

// 异步如下：
var xhr = createXHR();
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
			alert(xhr.responseText);
		} else {
			alert("Request was unsuccessful: " + xhr.status);
		}
	}
};
// 必须在 open() 之前指定 onreadystatechange 才能确保浏览器兼容性。
xhr.open("get", "example.txt", true);
// 发送自定义请求头部信息，必须在 open() 之后 send() 之前。
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);
xhr.abort(); // 在接受到响应之前可取消异步请求。

// 获取相应的响应头部信息
var myHeader = xhr.getResponseHeader("MyHeader");
// 获取包含所有头部信息的长字符串
var allHeaders = xhr.getAllResponseHeaders();


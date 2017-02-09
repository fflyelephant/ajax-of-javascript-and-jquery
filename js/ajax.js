//创建XMLHttpRequest or ActiveXObject
function createRequest()
{
	var httpRequest = null;
	try
	{
		// Support XMLHttpRequest
		// For Mazilla or Safari or IE7
		httpRequest = new XMLHttpRequest();
	}
	catch (e)
	{
		var __XMLHTTPS = new Array( "MSXML2.XMLHTTP.5.0",
									"MSXML2.XMLHTTP.4.0",
									"MSXML2.XMLHTTP.3.0",
									"MSXML2.XMLHTTP",
									"Microsoft.XMLHTTP" );
		var __Success = false;
		for (var i = 0; i < __XMLHTTPS.length && __Success == false; i+=1)
		{
			try
			{
				httpRequest = new ActiveXObject(__XMLHTTPS[i]);
				__Success = true;
			}
			catch (e) { }
			if (!__Success)
			{
				this.onError("Browser do not support Ajax.");
			}
		}
	}
	return httpRequest;
}

//使用JavaScript的ajax就只能返回responseText和responseXML两种数据，只有请求这两种类型的数据[局限]
function getContent(){
	var request = createRequest();
	if(request){
		request.onreadystatechange = function(){
			if(request.readyState == 4 && request.status==200){
				//将example.txt内容显示在dom中
				alert(request.responseXML);//返回对象[object XMLDocument],responseText 直接返回TXT文件的内容
				showText(request.responseXML);
			}
		};
		
		request.open("GET","./files/example.xml",true);
		request.send();
	}
	else{
		alert("browser do not support ajax!");
	}
}

function showText(Text){
	var node_body = document.getElementsByTagName("body")[0];
	var node_p = document.createElement("p");
	var node_p_text = document.createTextNode(Text);
	node_p.appendChild(node_p_text);
	node_body.appendChild(node_p);
}

function getContent_JQ(){
	//上面是下面的简写方式
	$.getJSON("./files/example.json",function(data){
		//alert(Object.prototype.toString.call(data));
		alert(typeof data);
	});

	$.ajax({
		type: "GET",
		url: "./files/example.xml",
		dataType:"xml",//text,json,html,jsonp,xml,script[Jquery 的ajax可请求的数据类型就比JavaScript的ajax多多了]
		success:function(data){
			alert(data.name);
		}
	});
}

/* 总结
1:JavaScript的ajax 只能请求text or xml 类型的数据
2:Jquery的ajax可请求包括json在内的多种数据类型
3:请求类型与返回实际值
 --请求 			 返回
 --text                   txt文件内容
 --json                   [object Object]<获取json文件访问的直接是JS对象了>
 --html 		  html文件内容
 --xml                    [object XMLDocument]<需要DOMParser()解析为DOM结构再使用DOM的方法访问>
 --script                 脚本内容
4:测试程序请求的是本地文件，所以只有在非webkit内核浏览器才能运行(如Firefox)
*/

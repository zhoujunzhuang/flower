
//主体内容
ajax("get","js/content.json",'',function(arr){
	var content = document.querySelector('.content');
	
	var str = '';
	var str1 = '';
	var str2 = '';
	var str3 = '';
	for (var i=0;i<arr.length;i++) {
		for(var j=1;j<arr[i].title.length;j++){
				str2+= `
				<li>
					<a href="##">
						<img src="${arr[i].title[j].img}" data-id="${arr[i].title[j].id}"/>
						<span>${arr[i].title[j].txt1}</span>
						<span>${arr[i].title[j].txt2}</span>
					</a>
				</li>
				`
		}
		
		for(var j=0;j<1;j++){
				str1+= `
				<div class="hd">
					<a href="##" class="more">${arr[i].title[j].p1}<i class="iconfont icon-jiantou1"></i></a>
					<div>
						<a href="##">${arr[i].title[j].p2}</a>
						<span>${arr[i].title[j].p3}</span>
					</div>
				</div>
				<div class="bd">
					<div class="banner">
						<img src="${arr[i].title[j].img1}"/>
						<a href="##">${arr[i].title[j].p4}<i class="iconfont icon-jiantou1"></i></a>
					</div>
				 
				`
		}
		
		str+=`
			<div class="floor f1">
				${str1}
				<ul>
					${str2}
				</ul>
				</div>
			</div>	
			`
		str2='';
		str1 = '';
	}
	content.innerHTML=str;

	var oContent =document.querySelector('.content');
	console.log(oContent)
	oContent.onclick=function(e){
		var e=e||event;
		var target = e.target||e.srcElement;
		if(target.tagName=="IMG"){
			var id = target.getAttribute("data-id");
			location.href="html/particulars.html?"+id;
		}
	}
})


//轮播
var slider = document.getElementById('slider');
var oUl = document.querySelector('#slider>ul');
var oLi =oUl.getElementsByTagName('li');
var circle = document.getElementById('circle');
var oSpan = document.querySelectorAll('#circle>span');
var iNow = 0;
var next = 0;
var timer = null;

for(var i=0;i<oSpan.length;i++){
	oSpan[i].index = i;
	//当鼠标移入的时候让所有的图片透明度都为0 同时所有的小按钮className都为空
	oSpan[i].onmouseover = function(){
		for(var j=0;j<oSpan.length;j++){
			oSpan[j].className = '';
			move(oLi[j],{"opacity":0});
		}
		//只有当前的小圆点的className为active  图片为显示
		this.className = 'span1';
		move(oLi[this.index],{"opacity":100});
		//因为运动原理全程用iNow和next贯穿   这个时候this.index要跟next保持同步
		if(this.index==0){

			iNow=0;
		}
		next=this.index;
		
	}
}

//移入关闭定时器
slider.onmouseover = function(){
	clearInterval(timer)
}
//移出调用轮播函数
slider.onmouseout = function(){
	autoPlay()
}

autoPlay()
//自动轮播
function autoPlay(){
	timer = setInterval(function(){
		//如果到了最后一张 就让next为0 然后在开始++
		if(next==oLi.length-1){
			next=0
		}else{
			next++;
		}
		toImg()
	},3000)
}

//轮播原理
function toImg(){
	//第一张图片隐藏 下一张图片显示
	move(oLi[iNow],{"opacity":0});
	move(oLi[next],{"opacity":100});

	//让所有的小圆点的样式都为空只有当前next的小圆点为active
	for(var i=0;i<oSpan.length;i++){
		oSpan[i].className = '';
	}
	oSpan[next].className = 'active';
	//iNow和next实时方生变化 inow要跟着next的脚步
	iNow=next;
}

	var logo = document.querySelector('.logo');
	logo.onclick = function(){
		location.href ="index.html";
	}

















	




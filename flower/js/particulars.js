//导航的下拉
	var all =document.getElementById('all');
	var single = document.getElementById('single');
	single.onmouseover=all.onmouseover = function(){
		single.style.display = 'block';
	}
	single.onmouseout=all.onmouseout = function(){
		single.style.display = 'none';
	}
	
	var logo = document.querySelector('.logo');
	logo.onclick = function(){
		location.href ="../index.html";
	}
	

	var url = location.href
	var arr =url.split('?')
	var id = arr[1]
	var str = '';
	if(getCookie('name')){
		var obj = JSON.parse(getCookie('name'))
	}else{
		var obj = {}
	}
	
	//商品详情
	var wrapper = document.getElementById('wrapper')
	ajax('get','../js/particulars.json','',function(data){
		for (var i=0;i<data.length;i++) {
			if(id==data[i].id){
				str=`
				<div class="wrapper">
					<div class="wra_t">
						你当前的位置：
						<a href="##">首页</a>>
						<a href="##">鲜花用途</a>>
						${data[i].name}		
					</div>
					<div class="wra_z">
						<div class="item-l">
							<div class="pic_1" id="pic_1">
								<div id="shadow">
								</div>
								<img src="${data[i].img}" id="pic"/>
							</div>
							<div id="max">
								<img src="${data[i].img}" id="maximg" />
							</div>
							<div class="item-t" >					
								<a href="##" class="prev" id="prev"></a>
								<a href="##" class="next" id="next"></a>				
									<ul>
										<li>
											<img src="${data[i].img}" class="select " data-url = "${data[i].img}"/>
										</li>										
									</ul>					
							</div>
						</div>
						<div class="item-info">
							<div class="info-1">
								<h3>${data[i].name}</h3>
								<p>${data[i].p1}</p>
							</div>
							<div class="info-2">
								<ul>
									<li>
										<i>商品货号</i> <span class="sp1">${data[i].id2}</span>
									</li>
									<li>
										<i>市场价</i> <span class="op">￥${data[i].op}</span>
									</li>
									<li>
										<i>本店价</i> 
										<b>
											￥${data[i].cp}
										</b>
										<span class="mem">高级会员购买享有折扣</span>
									</li>
									<li>
										可使用 <span class="red">500&nbsp;</span>积分
									</li>
									<li>
										<i>促&nbsp;&nbsp;销</i><span class="or">[优惠活动] 购物金额满200元，省20元</span>
									</li>
									<li>
										<i>销&nbsp;&nbsp;量</i><span class="sp1">最近售出<span class="red">0</span>件（<span class="red">已有 0 人评价</span>）</span>
									</li>
									<li class="skunum_li">
										<i>数&nbsp;&nbsp;&nbsp;量</i>
										<input type="button" value="-"/ id="sub">
										<input type="text" value="1"/ id="txt">
										<input type="button" value="+"/ id="add">
										<span class="sp1">件 &nbsp;&nbsp;(65535件)</span>
									</li>
									<li>
										<a href="##" class="a1" id="buy">立即购买</a>
										<a class="a1" id="shopping">加入购物车</a>
										<a href="##" class="a2" >收藏</a>
										<a href="##" class="a3">去手机购买</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="wra_b">
						<ul class="ul_1">
							<li><a href="" class="a4">商品详情</a></li>
							<li><a href="" class="a4">评价详情（0）</a></li>
						</ul>				
						<table class="tab" cellspacing="0" width="1000">
							<tr>
								<th>产品名称 :</th>
								<td>${data[i].name}</td>
							</tr>
							<tr>
								<th>材料:</th>
								<td>33朵红玫瑰搭配相思梅</td>
							</tr>
							<tr>
								<th>包装:</th>
								<td>黑色牛皮纸圆形包装</td>
							</tr>
							<tr>
								<th>花语:</th>
								<td>你的轻柔像阵微风，让我从容不迫，想让你知道，我对你始终一往情深。</td>
							</tr>
							<tr>
								<th>附送:</th>
								<td>精美贺卡（代写贺卡留言）</td>
							</tr>
						</table>	
						<div class="pic_img">
							<p><img src="${data[i].img}"/></p>
							<p><img src="../img/imgs/20170729204802_35348.jpg" /></p>
							<p><img src="../img/imgs/20170727184959_75511.jpg" /></p>
							<p><img src="../img/imgs/20170726231512_33562.jpg" /></p>
							<p><img src="../img/imgs/20170726231424_32637.jpg"></p>
							<p><img src="../img/imgs/20170726182457_21247.jpg"></p>
							<p><img src="../img/imgs/20170726030821_66867.jpg"></p>						
						</div>					
					</div>
					`
			}
			
			
		}
		wrapper.innerHTML=str;	
		
	//商品放大镜		
		var oPic1 = document.getElementById("pic_1")		
		var oPic = document.getElementById('pic');
		var oShadow = document.getElementById('shadow');
		var oMax = document.getElementById('max');
		var oMaximg = document.getElementById('maximg');
		var oPrev = document.getElementById('prev');
		var oNext = document.getElementById('next');
		var oSelect = document.querySelectorAll('.select')
	
		for (var i=0;i<oSelect.length;i++) {
			oSelect[i].onmouseover = function(){
				var url = this.getAttribute("data-url");
				console.log(url)
				oPic.src=url;
				oMaximg.src=url;
			}
		}
		
		oPic1.onmouseover = function(){
			oShadow.style.display = "block";
			oMax.style.display = "block";
			oPic1.onmousemove = function(e){
				var e = e||event;
				var i=document.documentElement.scrollTop||document.body.scrollTop;
				var left = e.clientX-offset(oPic).l-oShadow.offsetWidth/2;
				var top = e.clientY-offset(oPic).t-oShadow.offsetHeight/2+i;		
				
				if(left<0){
					left=0;
				}
				if(left>oPic.offsetWidth-oShadow.offsetWidth){
					left=oPic.offsetWidth-oShadow.offsetWidth
				}
				if(top<0){
					top=0;
				}
				if(top>oPic.offsetHeight-oShadow.offsetHeight){
					top=oPic.offsetHeight-oShadow.offsetHeight;
				}
				
				oShadow.style.left=left+'px';
				oShadow.style.top=top+'px';
				oMaximg.style.left=-2*left+'px';
				oMaximg.style.top=-2*top+'px';
			}
		}
		oPic1.onmouseout = function(){
			oShadow.style.display = "none";
			oMax.style.display = "none";
			
		}	
			
	//点击加入购物车保存cookie	
		var oShopping =document.getElementById('shopping');
		var oTxt = document.getElementById('txt');
	
		oShopping.onclick=function(){			
			if(!obj[id]){
				obj[id]=Number(oTxt.value);
			}else{
				obj[id]+=Number(oTxt.value);			
			}
			setCookie('name',JSON.stringify(obj),7);
			location.href='shoppingcar.html';
		}			
		
	//商品个数的加减
		
		var oSub = document.getElementById('sub');
		var oAdd = document.getElementById('add');

		oSub.onclick = function(){
			if(this.nextElementSibling.value>1){
				this.nextElementSibling.value--;	
			}
		}
		
		oAdd.onclick = function(){
			this.previousElementSibling.value++;
		}
	})

	
	
	
	
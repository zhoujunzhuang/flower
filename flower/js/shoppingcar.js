//cookie
var oNum = document.getElementById('num');
var price = 0;
if(getCookie('name')){
	var qnum = 0;
	var cookie = JSON.parse(getCookie('name'));
	for(var i in cookie){
		qnum += cookie[i];
	}
	oNum.innerHTML=qnum;
}

ajax('get','../js/particulars.json','',function(data){
	var oUl = document.querySelector('.list>ul')
	var str='';
	var oPr = document.getElementById('pr');
	for (var i in data) {		
		for(var k in cookie){
			if(k==data[i].id){
				str+=`				
					<li>
						<input type="checkbox" class="check"/>
						<img src="${data[i].img}" data-id="${data[i].id}"/>
						<p>${data[i].name}</p>
						<p class="price">￥${data[i].cp}</p>
						<input type="button" value="-"/ class="sub">
						<input type="text" value="${cookie[k]}"/ class="txt">
						<input type="button" value="+"/ class="add">
						<p class="total">￥${data[i].cp.substring(0,3)*cookie[k]}元</p>
						<span class="delete">删除</span>
					</li>
				`	
			price +=data[i].cp.substring(0,3)*cookie[k];
			}
		}
		oPr.innerHTML='￥'+price+'元';
		oUl.innerHTML=str
	}
	var odel = document.getElementById('del');
	odel.onclick = function(){
		setCookie('name',cookie,-1);
		location.reload(true)
	}
		
	//点击商品加减  总价的变换显示
	var oSub = document.querySelectorAll('.sub');
	var oTxt = document.querySelectorAll('.txt');
	var oAdd = document.querySelectorAll('.add');
	var oTotal = document.querySelectorAll('.total');
	
	for (var i=0;i<oSub.length;i++) {
		oSub[i].onclick = function(){
			if(this.nextElementSibling.value>=1){
				this.nextElementSibling.value--;	
				this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML='￥'+Number(this.nextElementSibling.value)*this.previousElementSibling.innerHTML.substring(1,4)+'元';
				var tot=0;
				for (var j=0;j<oTotal.length;j++) {
					tot+=Number(parseInt(oTotal[j].innerHTML.substring(1)))
					oPr.innerHTML='￥'+tot+'元';
				}
				var pNum = 0;
				for (var k=0;k<oTxt.length;k++) {
					pNum+=Number(oTxt[k].value)					
					oNum.innerHTML=pNum;
				}
				var id = this.previousElementSibling.previousElementSibling.previousElementSibling;
				id = id.getAttribute("data-id");
				newcook(id,this.nextElementSibling.value)				
			}
		}
	}
	
	
	for (var i=0;i<oAdd.length;i++) {
		oAdd[i].onclick = function(){
			this.previousElementSibling.value++;
			this.nextElementSibling.innerHTML='￥'+Number(this.previousElementSibling.value)*this.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML.substring(1,4)+'元';
			var tot=0;
			for (var j=0;j<oTotal.length;j++) {
				tot+=Number(parseInt(oTotal[j].innerHTML.substring(1)))
				oPr.innerHTML='￥'+tot+'元';
			}
			var pNum = 0;
			for (var k=0;k<oTxt.length;k++) {
				pNum+=Number(oTxt[k].value)					
				oNum.innerHTML=pNum;
			}
			var id = this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
			id = id.getAttribute("data-id");
			newcook(id,this.previousElementSibling.value)
		}
	}
	
	//删除当前购物车商品
	var oDelete =document.querySelectorAll('.delete');
		for (var o=0;o<oDelete.length;o++) {
			oDelete[o].onclick = function(){
				
				var id = this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
				id =id.getAttribute("data-id")
				this.parentNode.remove();
				delete cookie[id];
				setCookie('name',JSON.stringify(cookie),7)
				location.reload()
			}
		}
	
	//全选 反选
	var oAll = document.getElementById('all');
	var oCheck = document.querySelectorAll('.check');
	oAll.onclick = function(){
		if(oAll.checked){
			for(var i=0;i<oCheck.length;i++){
				oCheck[i].checked = 'checked';
			}
		}else{
			for(var i=0;i<oCheck.length;i++){
				oCheck[i].checked = '';
			}
		}
	}
	
	for (var i=0;i<oCheck.length;i++) {
		oCheck[i].onclick = function(){
			var bstop = true
			for (var j=0;j<oCheck.length;j++) {
				if(oCheck[j].checked==false){
					bstop = false;
					break;
				}
			}
			if(bstop==true){
				oAll.checked = 'checked';
			}else{
				oAll.checked = '';
			}
		}
	}
		
	
})


function newcook(id,val){			
			if(!cookie[id]){
				cookie[id] = Number(val);
			}else{
				cookie[id] = Number(val);			
			}
			setCookie('name',JSON.stringify(cookie),7);
		}	
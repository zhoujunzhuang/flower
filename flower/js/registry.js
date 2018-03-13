var oUser = document.getElementById('user');
var oEmail = document.getElementById('email');
var oPass = document.getElementById('pass');
var oNewPass = document.getElementById('newpass');
var oCap = document.getElementById('cap');
var oCaps = document.getElementById('caps');
var registry =document.querySelector('.registry')
var logo = document.getElementById('logo');

//用户名
oUser.onfocus = function(){
	this.onblur = function(){
		var vUser = oUser.value;
		if(!/^[a-zA-Z]{5,16}$/.test(vUser)){
			this.nextElementSibling.style.display='block';
			this.parentNode.style.border = '1px solid #ff6a00'
		}else{
			this.nextElementSibling.style.display='none';
			this.parentNode.style.border = '1px solid #ccc';
			
		}
	}
}
//邮箱
oEmail.onfocus =function(){
	this.onblur = function(){
		var vEmail = oEmail.value;
		if(!/^\w+@\w+\.(com|cn)$/.test(vEmail)){
			this.nextElementSibling.style.display='block';
			this.parentNode.style.border = '1px solid #ff6a00'
		}else{
			this.nextElementSibling.style.display='none';
			this.parentNode.style.border = '1px solid #ccc';
		}
	}
}
//密码
oPass.onfocus = function(){
	this.onblur = function(){
		var vPass = oPass.value;
		if(!/^\w{6}/.test(vPass)){
			this.nextElementSibling.style.display='block';
			this.parentNode.style.border = '1px solid #ff6a00'
		}else{
			this.nextElementSibling.style.display='none';
			this.parentNode.style.border = '1px solid #ccc';
		}
	}
}
//确认密码
oNewPass.onfocus = function(){
	this.onblur = function(){
		var vNewPass = oNewPass.value;
		var vPass = oPass.value;
		if(vNewPass==vPass){
			this.nextElementSibling.style.display='none';
			this.parentNode.style.border = '1px solid #ccc';
		}else{			
			this.nextElementSibling.style.display='block';
			this.parentNode.style.border = '1px solid #ff6a00'
		}
	}
}



//随机获取验证码
function auth1Code(){
	var str = '';
	for(var i=0;i<4;i++){
		var num = parseInt(48+Math.random()*(122-47));
		if(num>=58&&num<=64||num>=91&&num<=96){
			i--;
		}else{
			str+=String.fromCharCode(num);
		}
	}
	return str;
}
function firstCode(){
	oCaps.value = auth1Code();
}
firstCode()

oCaps.onclick = function(){
	oCaps.value = auth1Code();
}
//判断验证码是否输入正确
oCap.onfocus =	 function(){
	this.onblur = function(){
		var vCap = oCap.value;
		var vCaps = oCaps.value;
		console.log(this.nextElementSibling)
		if(!(vCap==vCaps)){				
			this.nextElementSibling.style.display = 'block';
		}else{				
			this.nextElementSibling.style.display = 'none';				
		}			
	}
}

registry.onclick = function(){
	alert("注册成功")
}

logo.onclick = function(){
	location.href = "../index.html"
}




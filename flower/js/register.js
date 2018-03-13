var oUser = document.getElementById('user');
var oPass = document.getElementById('pass');
var oCap = document.getElementById('cap');
var oCaps = document.getElementById('caps');
var register = document.querySelector('.register');
var logo = document.getElementById('logo');

//判断用户名是否为空
oUser.onfocus = function(){
	this.onblur = function(){
		var vUser = oUser.value;
		if(vUser==''){
			this.nextElementSibling.style.display = 'block'
		}else{
			this.nextElementSibling.style.display = 'none'
		}
	}
}
//判断密码是否为空
oPass.onfocus = function(){
	this.onblur = function(){
		var vPass = oPass.value;
		if(vPass==''){
			this.nextElementSibling.style.display = 'block'
		}else{
			this.nextElementSibling.style.display = 'none'
		}
	}
}
//随机生成验证码
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

register.onclick = function(){
	alert("登录成功");
	location.href = "../index.html"
}


logo.onclick = function(){
	location.href = "../index.html"
}

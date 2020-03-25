//var btnx = document.querySelector(".x") ; 
var btnadd= document.querySelector("#add") ; 
var input = document.querySelector("input") ; 
var ul = document.querySelector("ul") ; 

var createTask =()=>{
	var input = document.querySelector("input") ;
	var task =document.createElement('span') ;
	task.classList.add('task'); 
	task.textContent= input.value ;
	return(task)
}


	
function createDeleteBtn(){
	var  btnx = document.createElement('button') ;
	btnx.classList.add('x'); 
	btnx.textContent='x' ; 
	btnx.addEventListener("click",function(){
		btnx.parentElement.remove() ;	
	});
	return(btnx) ; 
}

function createListElement(){
		if(input.value!==""){
			var li=document.createElement('li') ; 
			li.classList.add('list-item'); 
			li.addEventListener("click",function(){
				li.style.cssText='background-color: rgb(16, 117, 2); '
			})
	
	
			var task=createTask(); 
			var btnx=createDeleteBtn() ; 
	
			li.appendChild(task) ; 
			li.appendChild(btnx) ; 
			ul.appendChild(li) ; 
			input.value="" ; }
}



btnadd.addEventListener("click",createListElement) ;

input.addEventListener("keypress",function(e){
	if(e.keyCode===13)
		createListElement(); 
}) ;


var sortbtn = document.querySelector("#sort") ; 
sortbtn.addEventListener("click",function(){
	var list = document.querySelectorAll(".list-item") ; 
	var tab = Array.from(list) ; 

	function compare(a,b){
		var task1 = a.firstElementChild.innerText; 
		var task2 = b.firstElementChild.innerText; 
		if(task1<task2)
			return(-1);
		else if (task1>task2)
			return(1);
		return 0 ; 	
	}
	tab.sort(compare); 
	console.log(tab) ;
	tab.forEach(e=>ul.appendChild(e)) ;
});
	


	



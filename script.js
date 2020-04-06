


//la methode shuffle remplie la matrice avec une solution au hasard a chaque appel

function shuffle(matrix){

	// obtenir une matrice sudoku remplie :  
	for(var i=0 ; i<9 ; i++){
		for(var j=0 ; j<9 ;j++)
			matrix[i*9 + j ]= (i*3 + Math.floor(i/3) + j) % 9 + 1;
	}
	

	//echanger entre les valeurs n1 et n2 dans toute la matrice: (40 itération au hasard) 
	for(var i=0;i<40 ; i++){
		var n1 = Math.ceil( Math.random()*9 ) ; 
		var n2 ; 
		do{
			n2= Math.ceil( Math.random()*9 ) ;
		}while(n2==n1) ;
		for(var j=0 ; j<81 ;j++){
			if(matrix[j]==n1)
				matrix[j]=n2 ; 
			else if(matrix[j]==n2)
				matrix[j]=n1 ; 
		}
	}

	//echanger entre 2 colonnes qui ont le meme rang dans les  carrés 3x3  du sudoku (40 iterations)
	for(var i=0; i<40 ; i++){
		var s1 = Math.floor(Math.random()*9) ;
		var x =Math.floor(Math.random()*3) ; 
		for(var row=0 ; row<9; row++){

			var tmp = matrix[row*9 + s1] ;
			matrix[row*9 + s1]= matrix[row*9 + (s1+x*3)%9] ; 
			matrix[row*9 + (s1+x*3)%9]= tmp ; 
		}
	}

	//echanger entre 2 colonnes appartenant au meme carré 3x3 du sudoku 
	for(var i=0 ; i<40 ; i++){
		var col = Math.floor(Math.random()*9) ;
		var debutcol=3*Math.floor(col/3) ; 
		var col2 = debutcol + Math.floor(Math.random()*3) ; 
		for(var row=0 ; row<9 ; row++){
			var tmp = matrix[row*9+col] ; 
			matrix[row*9+col]=  matrix[row*9+col2] ;
			matrix[row*9+col2]=tmp ;
		} 
	}

}


function maskBoard(matrix,mask){
	var i, j, k;
		for(i = 0; i < 81; i++)
			mask[i] = matrix[i];

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				// for each 3x3 subsquare, pick 5 random cells
				// and mask them.
				for (var k = 0; k < 5; k++) {
					var c;
					do {
						c = Math.floor(Math.random() * 9);
					}
					while(mask[(i * 3 + Math.floor(c / 3)) * 9 + j * 3 + c % 3] == 0);

					mask[(i * 3 + Math.floor(c / 3)) * 9 + j * 3 + c % 3] = 0;
				}
			}
		}
}



function firstEmpty(mask){
	for(var t= 0;t<81 ;t++)
		if (mask[t]==0){
			return t ; 
		}
	return -1  ;	
}


function safe(i,cell,mask){
	var irow = Math.floor(cell/9) ; 
	var icol =cell%9 ; 
	//safe in column :
	for(var row=0 ;row<9;row++){
		if(mask[icol+row*9]==i)
			return false ; 
	}
	//safe in row:
	for(var col=0 ;col<9 ; col++){
		if(mask[irow*9 + col]==i)
			return false  ; 
	}
	//safe in square: 
	var r= irow- irow%3 ; 
	var c= icol- icol%3 ;  
	for(var row=r ; row<r+3 ; row++){
		for(var col=c ;col<c+3 ; col++){
			if(mask[row*9+col]==i)
				return false ;
		}
	}
	return true ; 		

}

function solve(mask){
	
	var cell = firstEmpty(mask) ; 
	if(cell==-1){
		return true ; 
	}
	else {	
		for(var i=1 ; i<=9;i++){
				if(safe(i,cell,mask)){
					mask[cell]= i ; 
					if(solve(mask)) {
						return true ;
					} 
					else{
						mask[cell]= 0 ; 
					}
				}
		}
	}	
	return false ; 
}



//affiche la matrice 
function printMatrix(matrix){
	var s="" ; 
	for(var i=0 ;i<81 ;i++){
		s =matrix[i]+" "+s;
		if(i%9==8){
			console.log(s) ;
			s=""; 
		}
	}
}

// generate a new puzzle: 
function generateGrid(){
	var matrix = Array(81) ; 
	var mask = Array(81) ; 
	shuffle(matrix) ; 
	maskBoard(matrix,mask) ; 
	return mask ;  
}

//show the passed sudoku into screen
function showGrid(mask){
	var list = document.querySelectorAll("input") ;
	var table = Array.from(list) ;
	for(i=0 ;i <81 ;i++){
		if(mask[i]==0){
			 table[i].value ="" ;
			 table[i].classList.remove('initVal') ;
			 table[i].readOnly=false ;  
			 continue ; 
		}
		else {
			table[i].readOnly=true ; 
			table[i].classList.add('initVal') ; 
		}
		table[i].value = mask[i] ;
	}
}
//generate a new sudoku( with masked values) and show it on screen: 
function displayGrid(){
	var mask = generateGrid(); 
	showGrid(mask);
	initTimer();
}

//event listener for the generate button
var newGridBtn = document.querySelector("#newGrid") ; 
newGridBtn.addEventListener("click",displayGrid) ;


//lit la matrice initiale (les cases de classe InitVal) :
function getInitialGrid(){
	var mask = Array(81)  ;
	var list = document.querySelectorAll("input") ;
	var table = Array.from(list) ;
	for(i=0 ; i<81 ;i++){
		mask[i]= table[i].value ;
		if(table[i].value==undefined)
			mask[i]=0 ; 
		if(!table[i].classList.contains('initVal')){ // ne considere pas l'input de l'utilisateur 
			mask[i]=0 ;                             // seulement ceux qui sont de la classe initVal sont les valeurs intiales 
		}
	}
	return mask ; 	
}

//the diffirence between getGrid and getInitialGrid is that this function get the whole displayed grid 
//(useful to check if it's a solution)
function getGrid(){
	var mask = Array(81)  ;
	var list = document.querySelectorAll("input") ;
	var table = Array.from(list) ;
	for(i=0 ; i<81 ;i++){
		mask[i]= table[i].value ;
		if(table[i].value==undefined)
			mask[i]=0 ; 
	}
	return mask ; 	
}	


//solve the Sudoku displayed on the grid:  
function solveGrid(){
	var mask = getInitialGrid(); 
	solve(mask) ; 
	//showGrid(mask) ; Didn't use the showGrid funct because it displays them with the initVal class 
	var list = document.querySelectorAll("input") ;
	var table = Array.from(list) ;
	for(i=0 ;i <81 ;i++){
		if(mask[i]==0){
			 table[i].value ="" ;
			 continue ; 
		}
		table[i].value = mask[i] ;
	}	
}
//event listener for the solver button : 
var solverBtn = document.querySelector("#solver");
solverBtn.addEventListener("click",solveGrid) ;


function check(){
	var mask = getGrid() ;
	for(var i=0 ; i<81 ;i++){
		var tmp = mask[i] ; 
		mask[i] = 0 ;  
		if( !safe(tmp,i,mask) || tmp==0){
			window.alert("Not Solved!") ; 	 
			return ;  
		}
		mask[i]=tmp ;
	}
	window.alert("Good Job! ") ;
	
}

var checkBtn = document.querySelector('#check') ; 
checkBtn.addEventListener('click',check) ;  


// function to draw the empty board:
function drawEmptyBoard(){
	var table = document.querySelector("table") ; 
	for(var i=0 ; i<9 ;i++){
		var tr = document.createElement('tr') ;
		for(var j=0 ; j<9 ; j++){
			var td = document.createElement('td') ; 
			var input = document.createElement('input') ; 
			input.setAttribute('maxlength','1'); 
			if(j%9==2 || j%9==5 ){	
				td.classList.add("right");
			}	
			if(i==2 || i==5 ){
				td.classList.add("bottom");	
			}
			td.appendChild(input) ; 
			tr.appendChild(td) ; 

		}
		table.appendChild(tr);
	}
}
function loadBoard(){
	drawEmptyBoard(); 
	displayGrid(); 
}
//listener to draw the board onload: 
window.addEventListener("load",loadBoard) ; 
window.addEventListener("load",startTimer) ; 

function initTimer(){
	var seconde = document.querySelector('#sec') ;
	var minute = document.querySelector('#min') ;
	var hour =document.querySelector('#hour') ;
	seconde.textContent="00";
	hour.textContent="00";
	minute.textContent="00"; 
}
function startTimer(){
	var x= setInterval(IncrementTimer,1000) ; 
	return x; 
}
function IncrementTimer(){
	var seconde = document.querySelector('#sec') ;
	var sec = parseInt(seconde.textContent,10); 
	sec=sec+1 ; 
	sec =sec.toString(); 
	if(sec<10){
		sec= "0"+sec ; 
	}
	
	if(sec>59){
		sec="00" ; 
		var minute = document.querySelector('#min') ;
		var min = parseInt(minute.textContent,10) ;
		min=min+1 ; 
		min = min.toString(); 
		if(min<10){
			min = "0"+min ; 	
		}
		if(min>59){
			min="00" ;
			var hour =document.querySelector('#hour') ;
			var h = parseInt(hour.textContent,10);
			h=h+1 ; 
			h=h.toString() ;
			if(h<10)
				h="0"+h ; 
			hour.textContent=h ;
		}


		minute.textContent=min ;
	} 
	seconde.textContent=sec ;
		 
}


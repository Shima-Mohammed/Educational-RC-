/**********************when all content is loaded*******************/
$(window).on("load",function(){
	$(".con-loader").fadeOut("slow"); // hide loader section 
	
});
/**********************************************************/
/***********************variables**************************/
var myAudio = document.getElementById("myAduio") ; // get audio tag 

var allQuestions = 
[
 {'id':0 , 'result'  : 2  , done : 'false'} ,
 {'id':1 , 'result'  : 3  , done : 'false'} ,
 {'id':2 , 'result'  : 5 , done : 'false'} ,
 {'id':3 , 'result'  : 4 , done : 'false'} ,
 {'id': 4 , 'result'  : 1 , done : 'false'} 
] ;// array of objects (every object represent a question  id represent the question number  , result include the correct result , done represent if the question is solved or not )

var aud= document.getElementById('aud') ; // get instructions audio tag 
var dur= document.getElementById('dur') ; // get range input filed 
var counter = 0 ; // variable that will include number of unsolved question  


/*****************************************************************/
/******************************document .ready*******************/
$(function(){

/*******************************************************audios functions**************************************/
/****************************display myAudio*****************/
 displayMyAduio = function (audioName)
{   
	$("#myAduio source").attr("src","audio/"+audioName) ;//reset audio src  
	myAudio.load(); // use to update audio element after changing the source  
	myAudio.play(); // play the audio 
	if(aud.currentTime > 0 && !aud.ended) // detect if  another audio is playing
		{
			$("#display").removeClass("dis"); //hide display icon   
	        $("#pause").addClass("dis"); // show pause icon 
			aud.pause() ; // pause another audio 
		}
}
/****************************display instructions audio ************/
displayAudio = function ()
{
	aud.play() ;//play the audio  
	$("#pause").removeClass("dis") ;  
	$("#display").addClass("dis");
	if(myAudio.currentTime > 0 && !myAudio.ended) //detect if  another audio is playing 
		{
			
			myAudio.pause(); // stop another audio 
		}
}
/****************************display rang input as audio****************/
// Set max value when you know the duration
aud.onloadedmetadata = () => dur.max = aud.duration ; 
// update audio position when move range  
dur.onchange = () => aud.currentTime = dur.value ; 
// update range input when currentTime updates
aud.ontimeupdate = () => dur.value = aud.currentTime ; 
/*****************when instructions audio is paused *****************************/ 
pauseAudio =function()
{
		 $("#pause").addClass("dis") ; //display pause icon 
	     $("#display").removeClass("dis"); // remove play icon 
		 aud.pause();//pause instructions audio	
}	
/***********************when instructions audio is ended ***********************/
$("#aud").on("ended",function(){
$("#pause").addClass("dis") ;  //display pause icon
$("#display").removeClass("dis"); //remove play icon 
dur.value = 0 ; //reset range input value to zero 
});	
/***************************************************************************************************************/	

/*************************show numbers list*****************************************/
showNumbersList = function(ele)
{
	$(".numbers").each(function(){
		$(this).css("visibility","hidden"); // hide all numbers list 
	});
	$(ele).parent().children(".numbers").css("visibility","visible"); // show secific numbers list   
}
/*********************************hidden numbers when click anyWhere**************************/

$(document.body).click( function() {
$(".numbers").css("visibility","hidden");
});

$(".con-result").click( function(e) {
    e.stopPropagation(); // this stops the event from bubbling up to the body
});
/*****************************check user input *******************************/	
$(".numbers div").click(function(){
		$(this).parents(".con-items").children(".con-result").text($(this).text()); // set text in con-result div 
		$(this).parent().css("visibility","hidden") ; // hide number list 
		if($(this).hasClass("correct"))//check if user input is false or not 
		{
			var getId = $(this).parents(".con-question-details").attr("id"); // get question id 
			allQuestions[Number(getId)].done ="true"; // change state of question 
			checkAllInputs();
			$(this).parents(".con-items").siblings().children("img")//style image 
				.css({
				opacity:"0.5", 
				pointerEvents:"none"
			});
			
			$(this).parents(".con-items")//style con-items
				.css({
				opacity:"0.7", 
				pointerEvents:"none"
			});
			$(this).parent().siblings()//style con-result 
				.css({
				border:"4px solid #eee",
				background:"#eee" ,
				color:"#0fa0c5"
			});
			$(this).parent().css("visibility","hidden") ; //hide number list 
			displayMyAduio('successAudio.mp3') ; // display success audio 
			
		  }//end of if
		else
		{
			$this = $(this);
			$this.parents(".con-items").children(".con-result").css({
				border:"2px solid red" , 
				color:"red"
			}); 
			setTimeout(function(){
			$this.parents(".con-items").children(".con-result").text("").css("border","2px solid black");},400) ; 
			displayMyAduio('errorAudio.wav') ; //display error audio 
		}
		
		
	});//set numbers and check 
/***********************************check all inputs******************/
checkAllInputs = function ()
{
	counter = 0 ; //reset counter to 0 
	for(let i=0 ; i<allQuestions.length ; i++) //loop on allQuestion array  
	{
		if(allQuestions[i].done === "false"){counter += 1 ;} //check if there is question didn't slove 
	}
	if(counter === 0) // if all of question is solved 
	{
	 $(".see-result").css({
		opacity:"0.5" , 
		pointerEvents:'none'
	}); // change opacity of see-result 
	}
}	
/******************************show all result *****************************/ 
showAllResult = function ()
{
	$(".numbers").css("visibility","hidden");
	$(".see-result").css("opacity","0.5");
	$(".see-result").css("pointerEvents","none");
	var conResultArray = document.getElementsByClassName("con-result"); // get all element has class "con-result"
	for(let i = 0 ; i <conResultArray.length ; i++)
		{
			var selec = conResultArray[i];
			var textVal = allQuestions[i].result ; 
			console.log(selec);
			$(selec).text(textVal);
			
			
			/*conResultArray[i].innerHTML = allQuestions[i].result ; */
			
		}
	$(".con-result").parent().siblings().children("img").css({
		opacity:"0.5",
		pointerEvents:"none" , 
		touchAction: "none"
	});
	$(".con-result").css({
		background:"#eee" , 
		border:"2px solid #eee" , 
		color:"#0fa0c5"
	});
	$(".con-result").parent().css({
		opacity:"0.7" , 
		pointerEvents:'none'
	});
	
	if(myAudio.currentTime > 0 && !myAudio.ended)
		{
			 myAudio.pause(); 
	         myAudio.currentTime = 0;
			
		}
	
}
/***************************restart************************************************/ 
restart = function()
{
	$(".see-result").css({
		pointerEvents:"visible" , 
		opacity: "1"
	});
	$(".con-result").text("");
	$(".con-result").parent().siblings().children("img").css({
		opacity:"1",
		pointerEvents:"visible"
	});
	$(".con-result").css({
		background:"white" , 
		border:"2px solid black"
	});
	$(".con-result").parent().css({
		opacity:"1" , 
		pointerEvents:'visible'
	});
	$(".head .con-image ").css({
		pointerEvents :"visible"
	}) ; 
	if(aud.currentTime > 0 && !aud.ended)
		{
			 aud.pause();
			 dur.value = 0 ;
	         aud.currentTime = 0;
			$("#display").removeClass("dis"); 
	         $("#pause").addClass("dis");
		}
	if(myAudio.currentTime > 0 && !myAudio.ended)
		{
			 myAudio.pause(); 
	         myAudio.currentTime = 0;
			
		}
	for(let i=0 ; i<allQuestions.length ; i++)
		{
			allQuestions[i].done = "false";
		}
}
/******************************************************************************************/	



	
	
	
	
	
	
	
	
	
	
	
	
	
	
});// end of document.ready
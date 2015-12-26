/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.



	var winningNumber = generateWinningNumber();
	var playerGuess;
	var guessArr =[];
	var maxGuess = 5;




	/* **** Guessing Game Functions **** */

	// Generate the Winning Number

	function generateWinningNumber(){
		// add code here
		return Math.floor(Math.random()*100 + 1);
	}



	// Fetch the Players Guess
	//check for click
	$('#guess').on('click',playersGuessSubmission);

	function playersGuessSubmission(event){
		event.preventDefault();
		playerGuess = parseInt(document.getElementById("value").value);

		if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > 100 ) {
			alert("Please enter a number between 1 and 100");
		} else{
			guessArr.push(playerGuess);
			checkGuess();
		}
	}

	function guessRepeat(num){
		for(i=0;i<guessArr.length-1;i++){
			if(num === guessArr[i]){
				return true;	
			}
		}
		return false;
	}

	
	// Check if the Player's Guess is the winning number 

	function checkGuess(){
		if(playerGuess === winningNumber){
			$('#guessCount').text("Congratulation! You Won!");
			$('#win').css("display", "block");
			hideStuff();	
		} else if(guessRepeat(playerGuess) === true){
			$('#guessCount').text("You submitted a duplicate, guess again")
			guessArr.pop();
		}else if (guessArr.length != maxGuess){
			$('#guessCount').text("You have " + (maxGuess - guessArr.length) + " guesses remaining");	
			guessMessage();
		} else{
			$('#guessCount').text("Game Over. Hit Restart to play again")
			hideStuff();
			$('#lose').css("display", "block");
		}

	}
	// hides elements/buttons when there is a win or loss
	function hideStuff() {
		$('#value').hide();
		$('#lowOrhigh').hide();
		$('#guess').hide();
		$('#hint').hide();
		$("#hintHelp").hide();	
		$("#main").hide();
	}	



	// Determine if the next guess should be a lower or higher number

	function lowerOrHigher(){
		// add code here
		if(playerGuess < winningNumber){
			return 'Your guess is Lower';
		} else {
			return 'Your guess is Higher';
		}
	}

	function guessMessage(){
		var a = lowerOrHigher();
		var b ="";
		var diff = Math.abs(winningNumber - playerGuess);
		if(diff>20){
			b = "and more than 20 digits from the number";
		}else if(diff<20 && diff >10){
			b = "and between 10-20 digits from the number";
		} else{
			b = "and within 10 digits of the number";
		}

		$('#lowOrhigh').text(a+ " "+ b);

	}



	// Create a provide hint button that provides additional clues to the "Player"

	$('#hint').click(function provideHint(event){

		event.preventDefault();
		var top = winningNumber +3;
		if(top > 100){
			top = 100;
		}
		var bottom = winningNumber -3;
		if(bottom < 0){
			bottom = 0;
		}
		$("#hintHelp").text("The number is between " + bottom + " and "+ top);
		$('#hint').remove();
	});

	// Allow the "Player" to Play Again

	$("#restart").on('click',function playAgain(event){
		event.preventDefault();
		location.reload();
	});

	$(document).keypress(function(e) {
    	if (e.which === 13) {
        playersGuessSubmission(e);
    	}
	});



	/* **** Event Listeners/Handlers ****  */




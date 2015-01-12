$(document).ready(function () {


	var DEBUG_MODE = true;

	var debug = function(msg) {
		if (DEBUG_MODE = true) {
			console.log('DEBUG:', msg);
		}
	}

	var curCategory = 0;
	var curAnswerOut = '';
	var curQuestion = null;
	var numCorrect = 0;

	$('.category').click(function () {
		curCategory = Number($(this).attr('id').substr(9));
		debug('cat' + curCategory + 'question1');
		curQuestion = window['cat' + curCategory + 'question1'];
		debug(curQuestion);
		loadQuestion();		

		debug('curCategory: ' + curCategory);
		$('#home').addClass('exitLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass();
			$('#home').css('display', 'none');
			showQuestion();
		});		
	});

	function showQuestion() {
		$('#question-frame').css('display', 'block');	
		$('#question-board').css('display', 'block');
		$('#question-board').addClass('enterBottom').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('enterBottom');
			curAnswerOut = 0;
    		sendNextAnswer();
		});
	}
	function sendNextAnswer() {
		if (curAnswerOut != 4) {
			$('#answer-' + curAnswerOut).css('display', 'block');		
			$('#answer-' + curAnswerOut).addClass('enterLeftFast').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass('enterLeftFast');
				sendNextAnswer()
			});			
			curAnswerOut++;
		}
	}
	function convertToLetter(number) {
		letterArray = ['A', 'B', 'C', 'D'];
		return letterArray[number];
	}

	function loadQuestion() {
		$('#question').text(curQuestion.question);
			for (var i = 0; i < 4; i++) {
			$('#answer-' + i + '-text').text(convertToLetter(i) + '. ' + curQuestion.answers[i]);
		}
		$('#question-image').attr('src', 'images/question_images/cat' + curQuestion.category + 'q' + curQuestion.questionNum + '.jpg');
	}
	$('.answer').click(function () {
		var playerAnswer = Number($(this).attr('id').substr(7));
		var dialogMessage = '';
		if (playerAnswer == curQuestion.correctAnswerIndex) {
			numCorrect++;
			dialogMessage = 'Correct!';
			if(curQuestion.questionNum == 2) {
				dialogMessage = 'Correct!'; 
			}
			else {
				dialogMessage = '<h2>Correct!</h2>';
			}			
		}
		else {
			if(curQuestion.questionNum == 2) {
				dialogMessage = 'Sorry, The answer is: ' + convertToLetter(curQuestion.correctAnswerIndex) + '. ' + 
				curQuestion.answers[curQuestion.correctAnswerIndex];
			}
			else {
				dialogMessage = 'Sorry, The answer is: <h3>' + convertToLetter(curQuestion.correctAnswerIndex) + '. ' +
				curQuestion.answers[curQuestion.correctAnswerIndex] + '</h3>';
			}
		}
		if(curQuestion.questionNum == 2) {
			dialogMessage = dialogMessage + '<h2>Your final score: ' + numCorrect + '/10 </h2>';
			numCorrect = 0;
		}
		else {
			dialogMessage = dialogMessage + 'Your current score: ' + numCorrect + '/10';
		}
		$('#message').html(dialogMessage);
		hideQuestion();	
	});

	function hideQuestion() {
		$('#question-frame').addClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass('fadeOut');
			$(this).css('display', 'none');
			$(this).children().css("display", "none");
			showDialog();
		});	
	}

	function showDialog() {
		debug('showDialog');
		$('#dialog').css('display', 'block');
		$('#dialog').addClass('fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass('fadeIn');
		});			
	}

	$('#dialog-next').click(function() {
		if(curQuestion.questionNum == 2) {
			curQuestion = null;
			$('#dialog').addClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass('fadeOut');
				$(this).css('display', 'none');
				showCategories();
			});
		}
		else {
			curQuestion = window['cat' + curCategory + 'question' + (curQuestion.questionNum + 1)];
			loadQuestion();
			$('#dialog').addClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass('fadeOut');
				$(this).css('display', 'none');
				showQuestion();
			});
		}
	});

	$('#home-button').click(function() {
		$('#dialog').addClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('fadOut');
		});			
		$('#dialog').css('display', 'none');
		$('#question-frame').css('display', 'none');
		$('#question-frame').children().css("display", "none");
		numCorrect = 0;	
		showCategories();
	});

	function showCategories() {
		$('#home').css('display', 'block');
		$('#home').addClass('fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('fadeIn');
		});			
	}
});
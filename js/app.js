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
			$('#home-button').css('display', 'block');
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
	function loadQuestion() {
		$('#question').text(curQuestion.question);
		letterArray = ['A', 'B', 'C', 'D'];
		for (var i = 0; i < 4; i++) {
			$('#answer-' + i + '-text').text(letterArray[i] + '. ' + curQuestion.answers[i]);
		}
		$('#question-image').attr('src', 'images/question_images/cat' + curQuestion.category + 'q' + curQuestion.questionNum + '.jpg');
	}
	$('.answer').click(function () {
		var playerAnswer = Number($(this).attr('id').substr(7));
		var dialogMessage = '';
		if (playerAnswer == curQuestion.correctAnswerIndex) {
			numCorrect++;
			dialogMessage = 'Correct!';
		}
		else {
			dialogMessage = 'Sorry, The answer is: <br /><br />' + 
			curQuestion.answers[curQuestion.correctAnswerIndex];
		}
		if(curQuestion.questionNum == 2) {
			dialogMessage = dialogMessage + '<h2>Your final score: ' + numCorrect + '/10 </h2>';
		}
		else {
			dialogMessage = dialogMessage + '<br /><br /> Your current score: ' + numCorrect + '/10';
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

	function showCategories() {
		$('#home').css('display', 'block');
		$('#home').addClass('enterLeftSlow').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('enterLeftSlow');
		});				
	}
});
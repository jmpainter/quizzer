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

	$('.category').click(function () {
		curCategory = Number($(this).attr('id').substr(9));
		debug('cat' + curCategory + 'question1');
		curQuestion = window['cat' + curCategory + 'question1'];
		debug(curQuestion);
		loadQuestionBoard();		

		debug('curCategory: ' + curCategory);
		$('#home').addClass('exitLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass();
			$('#home').css('display', 'none');
			showQuestionBoard('exitLeft');
		});		
	});
	function showQuestionBoard() {
		$('#question-board').css('display', 'block');
		$('#question-board').addClass('enterBottom').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('enterBottom');
			$('#home-button').css('display', 'block');
			curAnswerOut = 'a';
    		sendNextAnswer();
		});
	}
	function sendNextAnswer() {
		var nextLetter = String.fromCharCode(curAnswerOut.charCodeAt(0) + 1);
		if (curAnswerOut != 'e') {
			$('#answer-' + curAnswerOut).css('display', 'block');		
			$('#answer-' + curAnswerOut).addClass('enterLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass('enterLeft');
				sendNextAnswer()
			});			
			curAnswerOut = nextLetter;
		}
	}
	function loadQuestionBoard() {
		$('#question').text(curQuestion.question);
		$('#answer-a-text').text(curQuestion.answerA);
		$('#answer-b-text').text(curQuestion.answerB);
		$('#answer-c-text').text(curQuestion.answerC);
		$('#answer-d-text').text(curQuestion.answerD);
	}

	$('.answer').click(function () {
		alert(this.id);
	});	
});
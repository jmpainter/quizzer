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
	var categoryData = null;
	var numCorrect = 0;
	var numQuestions = 12;

	$('.category').click(function () {
		curCategory = Number($(this).attr('id').substr(9));
		debug('cat' + curCategory + 'question1');
		loadCategoryData();
	});

	function loadCategoryData() {
		$.getJSON( "ajax/cat" + curCategory + ".json", function( data ) {
			categoryData = data;
			debug(categoryData);
			curQuestion = categoryData[0];
			debug(curQuestion);
			loadQuestion();				
			$('#home').addClass('exitLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass();
				$('#home').css('display', 'none');
				showQuestion();
			});
		});
	}

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
			$('#answer-' + i + '-text').text(convertToLetter(i) + '. ' + curQuestion.answers[i].answer);
		}
		$('#question-image').attr('src', 'images/question_images/cat' + curQuestion.category + 'q' + curQuestion.id + '.jpg');
	}
	$('.answer').click(function () {
		var playerAnswer = Number($(this).attr('id').substr(7));
		var dialogMessage = '';
		var playerAnswer = curQuestion.answers[playerAnswer];
		var correctAnswer = getCorrectAnswer(curQuestion.answers);

		if ( playerAnswer  == correctAnswer ) {
			numCorrect++;
			dialogMessage = 'Correct!';
			if(curQuestion.id == numQuestions) {
				dialogMessage = 'Correct!'; 
			}
			else {
				dialogMessage = '<h2>Correct!</h2>';
			}			
		}
		else {
			if(curQuestion.id == numQuestions) {
				dialogMessage = 'Sorry, the answer is: ' + convertToLetter(correctAnswer.id) + '. ' + 
				correctAnswer.answer;
			}
			else {
				dialogMessage = 'Sorry, the answer is: <h3>' + convertToLetter(correctAnswer.id) + '. ' +
				correctAnswer.answer + '</h3>';
			}
		}
		if(curQuestion.id == numQuestions) {
			dialogMessage = dialogMessage + '<h2>Your final score: ' + numCorrect + '/' + numQuestions + ' </h2>';
			numCorrect = 0;
		}
		else {
			dialogMessage = dialogMessage + 'Your current score: ' + numCorrect + '/' +  numQuestions;
		}
		$('#message').html(dialogMessage);
		hideQuestion();	
	});

	function getCorrectAnswer(answers) {
		var correctAnswer;
		$.each( answers, function( index ) {
			if(answers[index].correct == true) {
				correctAnswer = answers[index];
			}
  		});	
  		return correctAnswer;
	}

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
		if(curQuestion.id == numQuestions) {
			curQuestion = null;
			$('#dialog').addClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass('fadeOut');
				$(this).css('display', 'none');
				showCategories();
			});
		}
		else {
			curQuestion = categoryData[curQuestion.id + 1];
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
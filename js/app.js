$(document).ready(function () {


	var DEBUG_MODE = true;

	var debug = function(msg) {
		if (DEBUG_MODE = true) {
			console.log('DEBUG:', msg);
		}
	}

	$('.category').click(function () {
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
    		showAnswers();
		});
	}
	function showAnswers() {
		$('#answer-a').css('display', 'block');		
		$('#answer-a').addClass('enterLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass('enterLeft');
			$('#answer-b').css('display', 'block');		
			$('#answer-b').addClass('enterLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$(this).removeClass('enterLeft');
				$('#answer-c').css('display', 'block');		
				$('#answer-c').addClass('enterLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
					$(this).removeClass('enterLeft');
					$('#answer-d').css('display', 'block');		
					$('#answer-d').addClass('enterLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
						$(this).removeClass('enterLeft');
					});						
				});				
			});
		});
	}
});
$(document).ready(function () {
	$('.category').click(function () {
		$('#home').addClass('exitLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass();
			$('#home').css("display", "none");
			showQuestionBoard();
		});		
	});
	function showQuestionBoard() {
		//$('#question-board').css("display", "block");
		$('#question-board').addClass('enterBottom').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$('#question-board').removeClass();
		});
	}
});
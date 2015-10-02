$(function() {
	var output = $('#output');
	var input = $('#input');
	
	var runButton = $('#runButton');
	
	runButton.click(function() {
		output.html("");
		var code = $('#code').val();
		//alert(code);
		var scanner = new Scanner(code);
		
		while(scanner.hasNext()) {
			var token = scanner.token();
			scanner.scan();
			appendText('<' + token.kind + ': "' + token.string + '" >');
		}
	});
	
	$('#checkButton').click(function() {
		var code = $('#code').val();
		var parser = new Parser(new Scanner(code));

		output.html('');
		
		parser.setErrorHandler(function(index, exp, act) {
			appendText('[ ' + index + ': ' + exp + ' , ' + act.kind + ': ' + act.string + ' ]');
		});
		
		var valid = parser.validate();
		$('#code').addClass(valid ? 'green' : 'red');
		$('#code').removeClass(valid ? 'red' : 'green');
	});
	
	var appendText = function(text) {
		var textElement = $('<p>').text(text).show();
		output.append(textElement);
	};
});
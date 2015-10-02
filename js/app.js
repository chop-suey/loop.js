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
		parser.setErrorHandler(function(index, exp, act) {
			output.html('');
			appendText('[ ' + index + ': ' + exp + ' , ' + act + ' ]');
		});
		alert(parser.validate());
	});
	
	var appendText = function(text) {
		var textElement = $('<p>').text(text).show();
		output.append(textElement);
	};
});
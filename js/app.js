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
			var token = scanner.next();
			appendText('<' + token.kind + ': "' + token.string + '" >');
		}
	});
	
	var appendText = function(text) {
		var textElement = $('<p>').text(text).show();
		output.append(textElement);
	};
});
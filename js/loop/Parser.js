/*
Language Definition:

P = 	xi := xj + c 		// assignment
	|	xi := xj - c		// assignment
	|	P; P				// pp
	|	LOOP xi DO P END	// loop
*/
function Parser(scanner) {
	var errorHandler;
	var check = function(expected) {
		var valid = false;
		if(scanner.token().kind === expected) {
			valid = true;
		} else if (errorHandler){
			errorHandler(scanner.getIndex(), expected, scanner.token());
		}
		scanner.scan();
		return valid;
	}
	
	var assignment = function() {
		var valid = true;
		var kind = scanner.token().kind;
		
		valid &= check('VAR');
		valid &= check('ASSIGNMENT');
		valid &= check('VAR');
		valid &= check('OPERATOR');
		valid &= check('NUMBER');
		
		return valid;
	};
	
	var p = function() {
		var valid = false;
		var kind = scanner.token().kind;
		if(kind === 'VAR') {
			valid = assignment();
		} else if(kind === 'LOOP') {
			valid = loop();
		}
		kind = scanner.token().kind;
		if(kind === 'SEPARATOR') {
			valid &= check('SEPARATOR');
			valid &= p();
		}
		return valid;
	};
	
	var loop = function() {
		var valid = true;
		valid &= check('LOOP');
		valid &= check('VAR');
		valid &= check('DO');
		valid &= p();
		valid &= check('END');
		return valid;
	};
	
	this.setErrorHandler = function(handler) {
		errorHandler = handler;
	}
	
	this.validate = function() {
		var valid = true;
		valid &= p();
		valid &= check('EOF');
		return valid;
	};
}
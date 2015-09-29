function Scanner(source) {
	var that = this;
	var i = 0;
	var tokens = [];
	
	this.hasNext = function() {
		return i < tokens.length;
		// return true if there is a next token in this scanner
	};

	this.next = function() {
		if(i < tokens.length) {
			return tokens[i++];
		} else {
			return new Token('', 'NONE');
		}
		// get the next token provided by this scanner and increment the token pointer
	};

	this.get = function(index) {
		// get token for a certain index
	};

	this.getTokenCount = function() {
		return tokens.length;
	};
	
	var parse = function() {
		while(i < source.length) {
			switch(source[i]) {
				case ' ':
				case '\n':
				case '\t':
					break;
				case 'x':
					extractVar(); 
					break;
				case ';':
					tokens.push(new Token(';', 'SEPARATOR'));
					break;
				case '+':
					tokens.push(new Token('+', 'ADD'));
					break;
				case '-':
					tokens.push(new Token('-', 'SUBTRACT'));
					break;
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					extractConstant();
					break;			
				case ':':
					if(source[++i] === '=') {
						tokens.push(new Token(':=', 'SEPARATOR'));
					} else {
						tokens.push(new Token(source[i], 'NONE'));
					}
					break;
				case 'L':
					extractKeyword('LOOP');
					break;
				case 'D':
					extractKeyword('DO');
					break;
				case 'E':
					extractKeyword('END');
					break;
				default: 
					tokens.push(new Token(source[i], 'NONE'));
					break;
			}
			i++;
		}
		i = 0;
	};
	
	var push = function(token, kind) {
		tokens.push(new Token(token, kind));
	};
	
	var extractConstant = function() {
		var number = source[i];
		
		var la = source[i + 1];
		
		while(la >= '0' && la <= '9') {
			number += la;
			la = source[++i + 1];
		}
		push(parseInt(number), 'NUMBER');
	};
	
	var extractVar = function() {
		var done = false;
		var name = 'x';

		while(!done) {
			switch(source[i + 1]) {
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					name += source[++i];
					break;
				default:
					done = true;
					break;
			}
		}
		if(name.length > 1) {
			tokens.push(new Token(name, 'VAR'));
		} else {
			tokens.push(new Token(name, 'NONE'));
		}
	};
	
	var extractKeyword = function(keyword) {
		var candidate = getTokenCandidate();
		if(candidate === keyword) {
			tokens.push(new Token(keyword, 'KEYWORD'));
		} else {
			tokens.push(new Token(candidate, 'NONE'))
		}
	};
	
	var getTokenCandidate = function() {
		var done = false;
		var candidate = source[i++];
		
		while(!done) {
			switch(source[i]) {
				case '\t':
				case '\n':
				case ' ':
				case ':':
				case ';':
					done = true;
					break;
				default:
					candidate += source[i++];
					break;
			}
		}
		return candidate;
	}
	
	parse(source);
}
(function() {
  try {
    var a = new Uint8Array(1);
    return; //no need
  } catch(e) { }

  function subarray(start, end) {
    return this.slice(start, end);
  }

  function set_(array, offset) {
    if (arguments.length < 2) offset = 0;
    for (var i = 0, n = array.length; i < n; ++i, ++offset)
      this[offset] = array[i] & 0xFF;
  }

// we need typed arrays
  function TypedArray(arg1) {
    var result;
    if (typeof arg1 === "number") {
      result = new Array(arg1);
      for (var i = 0; i < arg1; ++i)
        result[i] = 0;
    } else
      result = arg1.slice(0);
    result.subarray = subarray;
    result.buffer = result;
    result.byteLength = result.length;
    result.set = set_;
    if (typeof arg1 === "object" && arg1.buffer)
      result.buffer = arg1.buffer;

    return result;
  }

  window.Uint8Array = TypedArray;
  window.Uint32Array = TypedArray;
  window.Int32Array = TypedArray;
})();


(function() {
  if ("response" in XMLHttpRequest.prototype ||
    "mozResponseArrayBuffer" in XMLHttpRequest.prototype ||
    "mozResponse" in XMLHttpRequest.prototype ||
    "responseArrayBuffer" in XMLHttpRequest.prototype)
    return;
  Object.defineProperty(XMLHttpRequest.prototype, "response", {
    get: function() {
      return new Uint8Array( new VBArray(this.responseBody).toArray() );
    }
  });
})();

(function() {
  if ("btoa" in window)
    return;

  var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  window.btoa = function(chars) {
    var buffer = "";
    var i, n;
    for (i = 0, n = chars.length; i < n; i += 3) {
      var b1 = chars.charCodeAt(i) & 0xFF;
      var b2 = chars.charCodeAt(i + 1) & 0xFF;
      var b3 = chars.charCodeAt(i + 2) & 0xFF;
      var d1 = b1 >> 2, d2 = ((b1 & 3) << 4) | (b2 >> 4);
      var d3 = i + 1 < n ? ((b2 & 0xF) << 2) | (b3 >> 6) : 64;
      var d4 = i + 2 < n ? (b3 & 0x3F) : 64;
      buffer += digits.charAt(d1) + digits.charAt(d2) + digits.charAt(d3) +      digits.charAt(d4);
    }
    return buffer;
  };
})();

var MyXEL = (function (MyXEL, $, undefined) {

  MyXEL.pack = function (format) {
    //  discuss at: http://phpjs.org/functions/pack/

    var formatPointer = 0,
        argumentPointer = 1,
        result = '',
        argument = '',
        i = 0,
        r = [],
        instruction, quantifier, word, precisionBits, exponentBits, extraNullCount;

    // vars used by float encoding
    var bias, minExp, maxExp, minUnnormExp, status, exp, len, bin, signal, n, intPart, floatPart, lastBit, rounded, j,
        k, tmpResult;

    while (formatPointer < format.length) {
      instruction = format.charAt(formatPointer);
      quantifier = '';
      formatPointer++;
      while ((formatPointer < format.length) && (format.charAt(formatPointer)
        .match(/[\d\*]/) !== null)) {
        quantifier += format.charAt(formatPointer);
        formatPointer++;
      }
      if (quantifier === '') {
        quantifier = '1';
      }

      // Now pack variables: 'quantifier' times 'instruction'
      switch (instruction) {
        case 'a':
        // NUL-padded string
        case 'A':
          // SPACE-padded string
          if (typeof arguments[argumentPointer] === 'undefined') {
            throw new Error('Warning:  pack() Type ' + instruction + ': not enough arguments');
          } else {
            argument = String(arguments[argumentPointer]);
          }
          if (quantifier === '*') {
            quantifier = argument.length;
          }
          for (i = 0; i < quantifier; i++) {
            if (typeof argument[i] === 'undefined') {
              if (instruction === 'a') {
                result += String.fromCharCode(0);
              } else {
                result += ' ';
              }
            } else {
              result += argument[i];
            }
          }
          argumentPointer++;
          break;
        case 'h':
        // Hex string, low nibble first
        case 'H':
          // Hex string, high nibble first
          if (typeof arguments[argumentPointer] === 'undefined') {
            throw new Error('Warning: pack() Type ' + instruction + ': not enough arguments');
          } else {
            argument = arguments[argumentPointer];
          }
          if (quantifier === '*') {
            quantifier = argument.length;
          }
          if (quantifier > argument.length) {
            throw new Error('Warning: pack() Type ' + instruction + ': not enough characters in string');
          }

          for (i = 0; i < quantifier; i += 2) {
            // Always get per 2 bytes...
            word = argument[i];
            if (((i + 1) >= quantifier) || typeof argument[i + 1] === 'undefined') {
              word += '0';
            } else {
              word += argument[i + 1];
            }
            // The fastest way to reverse?
            if (instruction === 'h') {
              word = word[1] + word[0];
            }
            result += String.fromCharCode(parseInt(word, 16));
          }
          argumentPointer++;
          break;

        case 'c':
        // signed char
        case 'C':
          // unsigned char
          // c and C is the same in pack
          if (quantifier === '*') {
            quantifier = arguments.length - argumentPointer;
          }
          if (quantifier > (arguments.length - argumentPointer)) {
            throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
          }

          for (i = 0; i < quantifier; i++) {
            result += String.fromCharCode(arguments[argumentPointer]);
            argumentPointer++;
          }
          break;

        case 's':
        // signed short (always 16 bit, machine byte order)
        case 'S':
        // unsigned short (always 16 bit, machine byte order)
        case 'v':
          // s and S is the same in pack
          if (quantifier === '*') {
            quantifier = arguments.length - argumentPointer;
          }
          if (quantifier > (arguments.length - argumentPointer)) {
            throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
          }

          for (i = 0; i < quantifier; i++) {
            result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
            result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
            argumentPointer++;
          }
          break;

        case 'n':
          // unsigned short (always 16 bit, big endian byte order)
          if (quantifier === '*') {
            quantifier = arguments.length - argumentPointer;
          }
          if (quantifier > (arguments.length - argumentPointer)) {
            throw new Error('Warning: pack() Type ' + instruction + ': too few arguments');
          }

          for (i = 0; i < quantifier; i++) {
            result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
            argumentPointer++;
          }
          break;

        case 'i':
        // signed integer (machine dependent size and byte order)
        case 'I':
        // unsigned integer (machine dependent size and byte order)
        case 'l':
        // signed long (always 32 bit, machine byte order)
        case 'L':
        // unsigned long (always 32 bit, machine byte order)
        case 'V':
          // unsigned long (always 32 bit, little endian byte order)
          if (quantifier === '*') {
            quantifier = arguments.length - argumentPointer;
          }
          if (quantifier > (arguments.length - argumentPointer)) {
            throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
          }

          for (i = 0; i < quantifier; i++) {
            result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
            result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
            result += String.fromCharCode(arguments[argumentPointer] >> 16 & 0xFF);
            result += String.fromCharCode(arguments[argumentPointer] >> 24 & 0xFF);
            argumentPointer++;
          }

          break;
        case 'N':
          // unsigned long (always 32 bit, big endian byte order)
          if (quantifier === '*') {
            quantifier = arguments.length - argumentPointer;
          }
          if (quantifier > (arguments.length - argumentPointer)) {
            throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
          }

          for (i = 0; i < quantifier; i++) {
            result += String.fromCharCode(arguments[argumentPointer] >> 24 & 0xFF);
            result += String.fromCharCode(arguments[argumentPointer] >> 16 & 0xFF);
            result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
            result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
            argumentPointer++;
          }
          break;

        case 'f':
        // float (machine dependent size and representation)
        case 'd':
          // double (machine dependent size and representation)
          // version original by IEEE754
          precisionBits = 23;
          exponentBits = 8;
          if (instruction === 'd') {
            precisionBits = 52;
            exponentBits = 11;
          }

          if (quantifier === '*') {
            quantifier = arguments.length - argumentPointer;
          }
          if (quantifier > (arguments.length - argumentPointer)) {
            throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
          }
          for (i = 0; i < quantifier; i++) {
            argument = arguments[argumentPointer];
            bias = Math.pow(2, exponentBits - 1) - 1;
            minExp = -bias + 1;
            maxExp = bias;
            minUnnormExp = minExp - precisionBits;
            status = isNaN(n = parseFloat(argument)) || n === -Infinity || n === +Infinity ? n : 0;
            exp = 0;
            len = 2 * bias + 1 + precisionBits + 3;
            bin = new Array(len);
            signal = (n = status !== 0 ? 0 : n) < 0;
            n = Math.abs(n);
            intPart = Math.floor(n);
            floatPart = n - intPart;

            for (k = len; k;) {
              bin[--k] = 0;
            }
            for (k = bias + 2; intPart && k;) {
              bin[--k] = intPart % 2;
              intPart = Math.floor(intPart / 2);
            }
            for (k = bias + 1; floatPart > 0 && k; --floatPart) {
              (bin[++k] = ((floatPart *= 2) >= 1) - 0);
            }
            for (k = -1; ++k < len && !bin[k];) {
            }

            if (bin[(lastBit = precisionBits - 1 + (k = (exp = bias + 1 - k) >= minExp && exp <= maxExp ? k + 1 :
              bias + 1 - (exp = minExp - 1))) + 1]) {
              if (!(rounded = bin[lastBit])) {
                for (j = lastBit + 2; !rounded && j < len; rounded = bin[j++]) {
                }
              }
              for (j = lastBit + 1; rounded && --j >= 0;
                   (bin[j] = !bin[j] - 0) && (rounded = 0)) {
              }
            }

            for (k = k - 2 < 0 ? -1 : k - 3; ++k < len && !bin[k];) {
            }

            if ((exp = bias + 1 - k) >= minExp && exp <= maxExp) {
              ++k;
            } else {
              if (exp < minExp) {
                if (exp !== bias + 1 - len && exp < minUnnormExp) { /*"encodeFloat::float underflow" */
                }
                k = bias + 1 - (exp = minExp - 1);
              }
            }

            if (intPart || status !== 0) {
              exp = maxExp + 1;
              k = bias + 2;
              if (status === -Infinity) {
                signal = 1;
              } else if (isNaN(status)) {
                bin[k] = 1;
              }
            }

            n = Math.abs(exp + bias);
            tmpResult = '';

            for (j = exponentBits + 1; --j;) {
              tmpResult = (n % 2) + tmpResult;
              n = n >>= 1;
            }

            n = 0;
            j = 0;
            k = (tmpResult = (signal ? '1' : '0') + tmpResult + bin.slice(k, k + precisionBits)
              .join(''))
              .length;
            r = [];

            for (; k;) {
              n += (1 << j) * tmpResult.charAt(--k);
              if (j === 7) {
                r[r.length] = String.fromCharCode(n);
                n = 0;
              }
              j = (j + 1) % 8;
            }

            r[r.length] = n ? String.fromCharCode(n) : '';
            result += r.join('');
            argumentPointer++;
          }
          break;

        case 'x':
          // NUL byte
          if (quantifier === '*') {
            throw new Error('Warning: pack(): Type x: \'*\' ignored');
          }
          for (i = 0; i < quantifier; i++) {
            result += String.fromCharCode(0);
          }
          break;

        case 'X':
          // Back up one byte
          if (quantifier === '*') {
            throw new Error('Warning: pack(): Type X: \'*\' ignored');
          }
          for (i = 0; i < quantifier; i++) {
            if (result.length === 0) {
              throw new Error('Warning: pack(): Type X:' + ' outside of string');
            } else {
              result = result.substring(0, result.length - 1);
            }
          }
          break;

        case '@':
          // NUL-fill to absolute position
          if (quantifier === '*') {
            throw new Error('Warning: pack(): Type X: \'*\' ignored');
          }
          if (quantifier > result.length) {
            extraNullCount = quantifier - result.length;
            for (i = 0; i < extraNullCount; i++) {
              result += String.fromCharCode(0);
            }
          }
          if (quantifier < result.length) {
            result = result.substring(0, quantifier);
          }
          break;

        default:
          throw new Error('Warning:  pack() Type ' + instruction + ': unknown format code');
      }
    }
    if (argumentPointer < arguments.length) {
      throw new Error('Warning: pack(): ' + (arguments.length - argumentPointer) + ' arguments unused');
    }

    return result;
  };

  MyXEL.strtr = function (str, from, to) {
    //  discuss at: http://phpjs.org/functions/strtr/
    // original by: Brett Zamir (http://brett-zamir.me)
    //    input by: uestla
    //    input by: Alan C
    //    input by: Taras Bogach
    //    input by: jpfle
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //  depends on: krsort
    //  depends on: ini_set
    //   example 1: $trans = {'hello' : 'hi', 'hi' : 'hello'};
    //   example 1: strtr('hi all, I said hello', $trans)
    //   returns 1: 'hello all, I said hi'
    //   example 2: strtr('äaabaåccasdeöoo', 'äåö','aao');
    //   returns 2: 'aaabaaccasdeooo'
    //   example 3: strtr('ääääääää', 'ä', 'a');
    //   returns 3: 'aaaaaaaa'
    //   example 4: strtr('http', 'pthxyz','xyzpth');
    //   returns 4: 'zyyx'
    //   example 5: strtr('zyyx', 'pthxyz','xyzpth');
    //   returns 5: 'http'
    //   example 6: strtr('aa', {'a':1,'aa':2});
    //   returns 6: '2'

    var fr = '',
        i = 0,
        j = 0,
        lenStr = 0,
        lenFrom = 0,
        tmpStrictForIn = false,
        fromTypeStr = '',
        toTypeStr = '',
        istr = '';
    var tmpFrom = [];
    var tmpTo = [];
    var ret = '';
    var match = false;

    // Received replace_pairs?
    // Convert to normal from->to chars
    if (typeof from === 'object') {
      // Not thread-safe; temporarily set to true
      tmpStrictForIn = this.ini_set('phpjs.strictForIn', false);
      from = this.krsort(from);
      this.ini_set('phpjs.strictForIn', tmpStrictForIn);

      for (fr in from) {
        if (from.hasOwnProperty(fr)) {
          tmpFrom.push(fr);
          tmpTo.push(from[fr]);
        }
      }

      from = tmpFrom;
      to = tmpTo;
    }

    // Walk through subject and replace chars when needed
    lenStr = str.length;
    lenFrom = from.length;
    fromTypeStr = typeof from === 'string';
    toTypeStr = typeof to === 'string';

    for (i = 0; i < lenStr; i++) {
      match = false;
      if (fromTypeStr) {
        istr = str.charAt(i);
        for (j = 0; j < lenFrom; j++) {
          if (istr == from.charAt(j)) {
            match = true;
            break;
          }
        }
      } else {
        for (j = 0; j < lenFrom; j++) {
          if (str.substr(i, from[j].length) == from[j]) {
            match = true;
            // Fast forward
            i = (i + from[j].length) - 1;
            break;
          }
        }
      }
      if (match) {
        ret += toTypeStr ? to.charAt(j) : to[j];
      } else {
        ret += str.charAt(i);
      }
    }

    return ret;
  };

  MyXEL.timeSince = function (age) {
    var date = (1385294400 * 1000) + (age * 1000);

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  MyXEL.calculateBytesInString = function (str) {
    var s = str.length;
    for (var i=str.length-1; i>=0; i--) {
      var code = str.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) s++;
      else if (code > 0x7ff && code <= 0xffff) s+=2;
      if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
    }
    return s;
  };

  Number.prototype.formatMoney = function(c){
    c = Number(c);
    var n = this,
        d = ".",
        t = ",",
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };

  MyXEL.getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
  };

  return MyXEL;
}(MyXEL || {}, jQuery));

jQuery.fn.selectText = function(){
  var doc = document;
  var element = this[0];
  if (doc.body.createTextRange) {
    var range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
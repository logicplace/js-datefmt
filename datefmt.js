/*
Date Formater, PHP-like date object extension
See: http://php.net/manual/en/function.date.php
Implements:
*) Day: d D j l N S w
*) Month: F m M n t
*) Year: L o Y y
*) Time: a A g G h H i s
*) Timezone: O P T Z
*) Full Date/Time: c r U
Unimplemented:
*) Day: z
*) Week: W
*) Time: B u
*) Timezone: e I
Note:
B - Don't understand this
u - Don't understand this
e - Need a database for this..
T - Pretty ugly way of doing it.

Copyright (c) 2010 Wa (logicplace.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var WeekdayNum2ShName = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
var WeekdayNum2Name = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var MonthNum2ShName = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var MonthNum2Name = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var MonthNum2NumDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

function ZeroPad(x,amt){
	x = x.toString();
	while(x.length < amt)x = "0"+x;
	return x;
}

function IsLeapYear(year){
	return (year % 400 == 0 || (year % 4 == 0 && year % 100 == 0))?1:0;
}

function datefmt(fmt){
	var next_esc = false,ret = "";
	for(var i=0;i<fmt.length;i++){
		var c = fmt.charAt(i);
		if(next_esc){
			ret += c;
			next_esc = false;
		}
		else switch(c){
			case '\\': next_esc = true; break;
			
			//Day
			case 'd': ret += ZeroPad(this.getDate(),2); break;
			case 'D': ret += WeekdayNum2ShName[this.getDay()]; break;
			case 'j': ret += this.getDate(); break;
			case 'l': ret += WeekdayNum2Name[this.getDay()]; break;
			case 'N':
				var N = this.getDay();
				ret += (N?N:"7");
				break;
			case 'S':
				var digit0 = this.getDate();
				digit0 = digit0-(Math.floor(digit0/10)*10);
				     if(digit0 == 1)ret += "st";
				else if(digit0 == 2)ret += "nd";
				else if(digit0 == 3)ret += "rd";
				else ret += "th";
				break;
			case 'w': ret += this.getDay(); break;
			case 'z': break; //unimplimented
			
			//Week
			case 'W': break; //unimplimented
			
			//Month
			case 'F': ret += MonthNum2Name[this.getMonth()]; break;
			case 'm': ret += ZeroPad(this.getMonth()+1,2); break;
			case 'M': ret += MonthNum2ShName[this.getMonth()]; break;
			case 'n': ret += this.getMonth()+1; break;
			case 't':
				var mon = this.getMonth();
				if(mon == 1 && IsLeapYear(this.getFullYear()))ret += "29";
				else ret += MonthNum2NumDays[mon];
				break;
			
			//Year
			case 'L': ret += IsLeapYear(this.getFullYear()); break;
			case 'o':
			case 'Y': ret += this.getFullYear(); break;
			case 'y':
				var year = this.getFullYear();
				ret += year-(Math.floor(year/100)*100);
				break;
			
			//Time
			case 'a': ret += (this.getHours() >= 12)?"pm":"am"; break;
			case 'A': ret += (this.getHours() >= 12)?"PM":"AM"; break;
			case 'B': break; //unimplimented
			case 'g':
				var hours = this.getHours()%12;
				ret += (hours?hours:"12");
				break;
			case 'G': ret += this.getHours(); break;
			case 'h':
				var hours = this.getHours()%12;
				ret += (hours?ZeroPad(hours,2):"12");
				break;
			case 'H': ret += ZeroPad(this.getHours(),2); break;
			case 'i': ret += ZeroPad(this.getMinutes(),2); break;
			case 's': ret += ZeroPad(this.getSeconds(),2); break;
			case 'u': break; //unimplimented
			
			//Timezone
			case 'e': break; //unimplimented
			case 'I': break; //unimplimented
			case 'O':
			case 'P':
				var hrdif = -(this.getTimezoneOffset()/60);
				ret += ((hrdif<0)?'-':'+')+ZeroPad(Math.abs(hrdif),2)+(c=='P'?':':'')+"00";
				OP=0;
				break;
			case 'T': ret += this.toString().match(/\(([^)]+)\)$/)[1]; break;
			case 'Z': ret += -(this.getTimezoneOffset()*60); break;
			
			//Full Date/Time
			case 'c': ret += this.format("Y-d-mTH:i:sP"); break;
			case 'r': ret += this.format("D, d M Y H:i:s O"); break;
			case 'U': ret += Math.floor(this.getTime()/1000); break;
			default: ret += c;
		}
	}
	return ret;
}

//Export function if this is require'd by Node.JS
if(typeof(exports) != "undefined"){
	module.exports = datefmt;
}
else {
	Date.prototype.format = datefmt;
}

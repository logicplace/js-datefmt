Date.prototype.format = require("./datefmt");

var ops = [
	["Day"           ,"dDjlNSwz"],
	["Week"          ,"W"],
	["Month"         ,"FmMnt"],
	["Year"          ,"LoYy"],
	["Time"          ,"aABgGhHisu"],
	["Timezone"      ,"eIOPTZ"],
	["Full Date/Time","crU"]
];

/* CREDITS: http://jsperf.com/string-repeat/2 */
function repeat(str,num) {
	var i = 1,result = str;
	for (; i < num; ++i)result += str;
	return result;
}

function center(str,len,chr){
	var slen = len-str.length,
	    llen = Math.floor(slen / 2),
	    rlen = slen-llen;
	return repeat(chr,llen)+str+repeat(chr,rlen);
}

var now = new Date(1304768705290);

for(var i=0;i<ops.length;i++){
	var tops = ops[i][1],tofmt="";
	console.log("=="+center(ops[i][0],16," ")+"==");
	for(var j=0;j<tops.length;j++){
		var fmtOpt = tops.charAt(j);
		tofmt += "\n\\"+fmtOpt+") "+fmtOpt;
	}
	console.log(now.format(tofmt.substr(1)));
}

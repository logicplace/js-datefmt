<?php
$ops = array(
	array("Day"           ,"dDjlNSwz"),
	array("Week"          ,"W"),
	array("Month"         ,"FmMnt"),
	array("Year"          ,"LoYy"),
	array("Time"          ,"aABgGhHisu"),
	array("Timezone"      ,"eIOPTZ"),
	array("Full Date/Time","crU")
);

function center($str,$len,$chr){
	$slen = strlen($str);
	$llen = (int)($slen / 2);
	$rlen = $slen-$llen;
	return str_repeat($chr,$llen).$str.str_repeat($chr,$rlen);
}

$now = 1304768705.29;

foreach($ops as $op){
	$tops = $op[1];$tofmt="";
	print("==".center($op[0],16," ")."==");
	for($j=0;$j<strlen($tops);$j++){
		$tofmt .= "\n\\".$tops{$j}.") ".$tops{$j};
	}
	print(date($tofmt."\n",$now));
}


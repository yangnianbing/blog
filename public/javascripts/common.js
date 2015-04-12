/**
 * New node file
 */
$(document).ready(function(){
		$("pre").addClass("prettyprint");
		 prettyPrint(); 
});

function load(eleId, url){
	$("#"+eleId).load(url);
}
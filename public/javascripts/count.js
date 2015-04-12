/**
 * New node file
 */
function updateReadCount(){
	var id = $("#blogId").val();
	$.post('/count/readCount/'+id+"?"+new Date().toDateString());
}

updateReadCount();
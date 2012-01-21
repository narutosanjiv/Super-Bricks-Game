/*
	99Lime.com HTML KickStart by Joshua Gatcke
	kickstart.js
*/

$(document).ready(function(){
	
	/*---------------------------------
		CSS Helpers
	-----------------------------------*/
	$('input[type=checkbox]').addClass('checkbox');
	$('input[type=radio]').addClass('radio');
	$('input[type=file]').addClass('file');
	$('[disabled=disabled]').addClass('disabled');
	$('table').find('tr:even').addClass('alt');
	$('ul').find('li:first').addClass('first');
	$('ul').find('li:last').addClass('last');
	$('hr').before('<div class="clear">&nbsp;</div>');
	$('.col_1,.col_2,.col_3,.col_4,.col_5,.col_6,.col_7,.col_8,.col_9,.col_10,.col_11,.col_12').wrapInner('<div class="inner">');
	
});
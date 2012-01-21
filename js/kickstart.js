/*
	99Lime.com HTML KickStart by Joshua Gatcke
	kickstart.js
*/

$(document).ready(function(){

	/*---------------------------------
		SuperFish - Dropdowns
	-----------------------------------*/
	$('ul.sf-menu').superfish({
		dropShadows: false
	});
	
	
	/*---------------------------------
		ScrollTo/LocalScroll
	-----------------------------------*/
	$.localScroll({
		filter: ':not(.tabs>li>a)',
		lazy: true,
		hash: true
	});
	
	/*---------------------------------
		Slideshow/Liteslider
	-----------------------------------*/
	$('.slideshow').each(function(){
		$(this).css('width', $(this).attr('width'))
		.css('height',$(this).attr('height'))
		.bxSlider({
			speed: 500,
			auto: true,
			infiniteLoop: false,
			controls: false,
			wrapperClass: 'slideshow-wrap',
			autoControls: true,
			pager: true
		});
	});
	$('.bx-pager,.bx-auto').addClass('slideshow-buttons');
	
	/*---------------------------------
		Snippet Syntax Highlighting
	-----------------------------------*/
	$('pre.html').snippet("html",{style:"zellner"});
	$('pre.css').snippet("css",{style:"zellner"});
	$('pre.js').snippet("javascript",{style:"zellner"});
	$('pre.php').snippet("php",{style:"zellner"});
	
	/*---------------------------------
		HTML5 Placeholder Support
	-----------------------------------*/
	/*$('input, textarea').placeholder();*/
	
	/*---------------------------------
		Fancybox Lightbox
	-----------------------------------*/
	$('.gallery').each(function(i){
		$(this).find('a').attr('rel', 'gallery'+i)
		.fancybox({
			overlayOpacity: 0.2,
			overlayColor: '#000'
		});
	});
	
	/*---------------------------------
		Tabs
	-----------------------------------*/
	// tab setup
	$('.tab-content').addClass('clearfix').hide();
	$('ul.tabs').each(function(){
		var current = $(this).find('li.current');
		if(current.length < 1) { $(this).find('li:first').addClass('current'); }
		current = $(this).find('li.current a').attr('href');
		$(current).show();
	});
	
	// tab click
	$('ul.tabs a').live('click', function(e){
		e.preventDefault();
		var tabs = $(this).parents('ul.tabs').find('li');
		var tab_next = $(this).attr('href');
		var tab_current = tabs.filter('.current').find('a').attr('href');
		$(tab_current).hide();
		tabs.removeClass('current');
		$(this).parent().addClass('current');
		$(tab_next).show();
		return false;
	});
	
	/*---------------------------------
		Image Style Helpers
	-----------------------------------*/
	$('img.style1, img.style2, img.style3').each(function(){
		$(this).wrap('<span>');
		$(this).parent('span')
			.attr('class', 'img-wrap '+$(this).attr('class'))
			.css('background-image','url('+$(this).attr('src')+')')
			.css('background-position','center center')
			.css('background-repeat','no-repeat')
			.css('height', $(this).height())
			.css('width', $(this).width());
		$(this).attr('class','').hide();
	});
	
	/*---------------------------------
		Image Caption
	-----------------------------------*/
	$('img.caption').each(function(){
		$(this).wrap('<div class="caption">');
		$(this).parents('div.caption')
			.attr('class', 'caption '+$(this).attr('class'))
			.css('width', $(this).width()+'px');
		if($(this).attr('alt')){ 
			$(this).parents('div.caption')
			.append('<span>'+$(this).attr('alt')+'</span>');
		}
	});
	
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
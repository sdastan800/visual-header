jQuery(function($) {
 	jQuery(document).ready(function($) {
		"use strict";
	 
 /*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																			 Isset
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  
	function isset(variable){
		if(variable  === "undefined"){
			return '';
		}else if(variable  === undefined){
			return '';
		}else if(variable  === null){
			return '';
		}else if(variable  === 0){
			return 0;
		}else if(variable  === '0'){
			return '0';
		}else{
			return variable;
		}
		
 	}
	
 /*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																			settingEmptyAndZero
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  	
	 function settingEmptyAndZero(obj) {
	  for (var key in obj) {
		if (obj[key] === null || obj[key] === undefined ||  obj[key] === 'undefined' || obj[key] === '') {
		  delete obj[key];
		} else if ($.type(obj[key]) === 'object') {
		  settingEmptyAndZero(obj[key]);
		  var sum = Object.values(obj[key]).reduce(function(acc, val) {
			return acc + val;
		  }, 0);
		  if (sum === 0) {
			delete obj[key];
		  }
		}
	  }
	  return obj;
	}
	
 /*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																			Message
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  
 	function remove_add_error_loading(){
			var output ='';
 			output ='<div class="hb_message hb-errored">';
			output+= hb_text.error;
  			output+= '</div>';
		 $('.hb-mouse-wait').append(output);
		  setTimeout(function(){ $('.hb-mouse-wait').remove() }, 2000);
 	}
 
	function mouse_wait_start(){
		$('.hb_panel').append('<div class="hb-mouse-wait"></div>');
		setTimeout(function(){ $('.hb-mouse-wait').addClass('hb-active-wait'); }, 1);
	}
	 
	
	
	function mouse_wait_end(){
		$('.hb-mouse-wait').removeClass('hb-active-wait');
		  setTimeout(function(){
 			$('.hb-mouse-wait').remove();
			}, 300);
	}	
 
	 
	function header_default(){
			var output ='';
 			output ='<div class="hb_message hb-header-defaulted">';
  			output+= hb_text.defaulted;
  			output+= '</div>';
		 $('body').append(output);
		  setTimeout(function(){ $('.hb_message').remove() }, 2000);
 	}
	function header_created(){
			var output ='';
 			output ='<div class="hb_message hb-header-imported">';
 			output+= hb_text.imported;
   			output+= '</div>';
		 $('body').append(output);
		  setTimeout(function(){ $('.hb_message').remove() }, 2000);
 	} 
	
	function header_saveed(){
			var output ='';
 			output ='<div class="hb_message hb-header-imported">';
 			output+= hb_text.saved;
   			output+= '</div>';
		 $('body').append(output);
		  setTimeout(function(){ $('.hb_message').remove() }, 2000);
 	} 
	
	
  		
 	function hb_deactive_remove(classes){
		   classes.removeClass('hb_active');
  		setTimeout(function(){
			classes.remove();
 		}, 210);
 	}	 				
 
	
	
	$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
		remove_add_error_loading();
	  });
	  
	  
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																			Confirm
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/
	function myConfirm(message, callback) {
		var confirmBox = $('<div class="hb_confirmbox"><div class="hb_confirmbox_middle"><span>' + message + '</span><a class="hb_yes hb_btn">Yes</button><a class="hb_no hb_btn">No</button></div></div>');
		confirmBox.on('click', '.hb_yes ', function(e) {
			callback(true);
			confirmBox.remove();
		});
		confirmBox.on('click', '.hb_no ', function(e) {
			callback(false);
			confirmBox.remove();
		});
		confirmBox.appendTo('body');
	}
 
	 
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																	OutLine
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  
 
	function hb_output_online() {
		 var navbar =  [];
 		 var element =  [];
		 
  		var header_option = $(document).find('.hb_data_json[data-row=header]').html();
		var dropdown_option = $(document).find('.hb_data_json[data-row=dropdown]').html();
		var	mobbar_option = $(document).find('.hb_data_json[data-row=mobbar]').html();
 
  		$('.hb_navbar_item').each(function() {
			var key = $(this).attr('data-key');
 			var id = $(this).attr('data-id');
			var option = $(this).children('.hb_data_json[data-row=navbar]').html();
			var navbar_key  = {};
			  navbar_key[key] = {'id' : id  , 'option':encodeURIComponent(option)};
			 navbar.push(navbar_key); 
 		});
 		 
		$('.hb_element_item').each(function() {
			var key = $(this).attr('data-key');
			var childern = $(this).attr('data-childern');
			var option = $(this).children('.hb_data_json[data-row=element]').html();
 			var id = $(this).attr('data-id');
 		 
 			var element_key  = {};
			  element_key[key] = {'id' : id  ,'childern' : childern  , 'option':encodeURIComponent(option)};
			 element.push(element_key); 
			 
 		});
 
 
		return {
 			'header':isset(encodeURIComponent(header_option)),
			'dropdown':isset(encodeURIComponent(dropdown_option)),
			'mobbar':isset(encodeURIComponent(mobbar_option)),
			
			 'navbar':isset(encodeURIComponent(JSON.stringify(settingEmptyAndZero(navbar)))),
			 'element':isset(encodeURIComponent(JSON.stringify(settingEmptyAndZero(element)))),
		};

   		 
 	}

/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																	Customize
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  
	function update_customize(new_val) {
		if (typeof wp !== 'undefined' && typeof wp.customize !== 'undefined' && typeof wp.customize('hb_builder_json') !== 'undefined') {
			   var my_customize_obj = wp.customize('hb_builder_json'); 
      		  my_customize_obj.set(new_val);
		}
    }
	
	 function hb_customize_height() {
    var item2Height = $('.hb_customize').outerHeight();
    $(':root').css('--item2-height', item2Height + 'px');
  }
  hb_customize_height();  
  $(window).on('resize load', hb_customize_height);
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																	Builder_json
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  
	function hb_builder_json() {
		setTimeout(function(){
  		    $('#hb_builder_json').val(JSON.stringify(settingEmptyAndZero(hb_output_online())));
			
			 if(isset(hb_builder_js['hb_post_id'])){
 				$('#_customize-input-hb_builder_json').val(JSON.stringify(settingEmptyAndZero(hb_output_online())));
 				update_customize($('#_customize-input-hb_builder_json').val());
				hb_customize_height();  
			 }
		},300);
	 }

/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Desktop & Mobile Layout
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  
	$(document).on('click', '.hb_desktop_layout', function(e) {
			$('.hb_builder').removeClass('hb_mobile_active');
			$('.hb_builder').addClass('hb_desktop_active');
			$('.wp-full-overlay').addClass('preview-desktop ');
			$('.wp-full-overlay').removeClass('preview-mobile');

	});
	$(document).on('click', '.hb_mobile_layout', function(e) {
			$('.hb_builder').addClass('hb_mobile_active');
			$('.hb_builder').removeClass('hb_desktop_active');
			$('.wp-full-overlay').addClass('preview-mobile');
			$('.wp-full-overlay').removeClass('preview-desktop');
	}); 

 
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Sotable
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  
	function hb_sortable() {
  		$('.hb_element_list').sortable({
			opacity: 0.6,
			connectWith: ".hb_element_list",
			update: function() {
				var key = $(this).parents('.hb_column_item').data('key');
				$(this).find('.hb_element_item').attr('data-childern',key);
 				hb_builder_json();
 			}
		});
		
	};
	hb_sortable();
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	frontend
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
  	$(document).on('click', '.hb_frontend_new', function(e) {
			e.preventDefault(); 
			mouse_wait_start();
			var hb_builder_json= $('[id=hb_builder_json]').val();
			 var post_title= $('[name=post_title]').val();
 			 $('input,select,textarea,button').each(function(index, element) {
				$(this).val('');
			});
 			var href = $(this).attr('href');
			var home_url = $(this).attr('home-url');
		 
			$.ajax({
				type: 'POST',
				url:hb_builder_js.ajaxurl,
				data: {
					'action': 'hb_create_post',  
					'hb_builder_json': hb_builder_json,
				 },
				success: function(data) {
					 if(data.length){
							mouse_wait_end();
							 var numbers  = data.match(/[0-9]+/);
 							var url = '&url='+encodeURIComponent(home_url+'?p='+numbers);
							window.location.replace(href+'&hb_post_id='+numbers+url);
					 } else{
							remove_add_error_loading();
					}
	  
				}
			}); 
	});	 
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Builder Custoize
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
 if(isset(hb_builder_js['hb_post_id'])){
  		$.ajax({
			url:hb_builder_js.ajaxurl,
			type: 'POST',
			data : {
				action : 'hb_builder_customize',
				hb_builder_js,
   			},
			success:function(data) {
			 	if(data.length){
 					$('.wp-customizer').append(data); 
					$('#_customize-input-hb_builder_json').val(JSON.stringify(settingEmptyAndZero(hb_output_online())));
					  hb_customize_height();  
 					hb_sortable();
 						
 				} else{
					remove_add_error_loading();
 				}
			} 
		});
			
		$.ajax({
			url:hb_builder_js.ajaxurl,
			type: 'POST',
			data : {
				action : 'hb_background_perview',
			},
			success:function(data) {
			 	if(data.length){
					$('.wp-full-overlay').before(data); 
 						
 				} else{
					remove_add_error_loading();
 				}
 			} 
		});
		
			 
	 }
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																		Background Perview
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
	$(document).on('click', '.hb_background_perview a', function(e) {
		
		$(this).parent().find('.hb_background_active').removeClass('hb_background_active');
 		var bg = $(this).attr('data-bg');
		var iframe = $('#customize-preview').find('iframe');
 		var iframeContent = iframe.contents();
 	 	iframeContent.find('body').attr('hb-background',bg);
		
  	});
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																		Builder_save
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
	$(document).on('click', '.hb_builder_save', function(e) {
		mouse_wait_start();
		$.ajax({
			url:hb_builder_js.ajaxurl,
			type: 'POST',
			data : {
				action : 'hb_builder_save',
				hb_builder_js,
				hb_builder_json:JSON.stringify(settingEmptyAndZero(hb_output_online())),
			},
			success:function(data) {
				if(data.length){
					mouse_wait_end();
					header_saveed();
				} else{
					remove_add_error_loading();
				}	
			}
		});
  	});
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																			Has Tabs
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  
	function hb_has_tabs(hb_options_header) {
 	 	 var tab = {};
		$.each(hb_options_header, function(i, option) {
			if(option['group'] != undefined && option['group'] != '') {
			var dass = option['group'];
				if(tab[dass] == undefined) {
					tab[dass] = option['group'];
				}
			} else {
				var general = hb_text.general;
				var dass =  hb_text.general;
				if(tab[dass] == undefined) {
					tab[dass] = general;
				}
			 }
			});
 		return tab;
	}
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																		Options Tabs
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
    var  options_tabs = function(classes, settings) {
		var hb_options_header = settings.option;
		var html='';
 			
			var array_tab = hb_has_tabs(hb_options_header);
			var count_tab = 0;
			html  = '<div class="hb_title_tabs">';
			
			$.each(array_tab, function(key, tabs) {
				count_tab++;
				var tab_active = count_tab === 1 ? 'hb_layout_active' : '';
				html += '<a class="hb_tab_' + key + ' ' + tab_active + '" data-id="' + key + '">' + tabs + '</a>';
			});
				
			html += '</div>';
			
		 
		return html;
  	};
/*************************************************************************************************************************************************************************
	--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																Options Content
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
  	var options_content = function(classes, settings) {
		var data_value='';
		var value='';
		if(isset(settings.json)){
			data_value =settings.json.html();
 				if(isset(data_value)){
 					value = JSON.parse(data_value);
 				}
		}
		
		var hb_options_header = settings.option;
		var html='';
		
  			var array_tab = hb_has_tabs(hb_options_header);
			var count_container = 0;

 			$.each(array_tab, function(key, tabs){
  
				count_container++;
				var group_active = count_container === 1 ? 'hb_layout_group_active' : '';
				html+= '<header class="hb_options_warp ' + group_active + '" data-tab="' + key + '">';
			 	
				
		 		$.each(hb_options_header, function(index, option){
					var general = option.group ?option.group : 'General';
					 if(key === general && option.name && option.id && option.type){
						html+=$('body').hb_options_functions(value,option);
					 }
 				}); 
				
 				html += '</header>'; 
 			
		});
		 
		 
		 return html;
 		 
	};
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																			Header Call Back
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
  	var header_callback = function(classes, settings) {
	 
 		$(document).off('click', '.hb_options[data-id='+settings.id+'] .hb_options_update').on('click', '.hb_options[data-id='+settings.id+'] .hb_options_update', function(e) {
   			var data_option =  JSON.stringify(settingEmptyAndZero($(this).parents('.hb_options').serializeJSON()));		
  			var data_key= $(this).parents('.hb_options').attr('data-key');
   			$('.hb_data_json[data-row='+data_key+']').html('');
			$('.hb_data_json[data-row='+data_key+']').append(data_option);
			
 
			hb_builder_json();
 		 	hb_deactive_remove(classes);
   		});
 	};

	
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																	Option Button
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
	var options_button = function(classes, settings) {
		var html='<a class="hb_btn hb_options_cancel">'+hb_text.cancel+'</a>';
 		 html+='<a class="hb_btn hb_options_update">'+hb_text.update+'</a>';
		return html;	
 	};
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Header Options
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
  	$(document).on('click', ".hb_header_options,.hb_dropdown_options,.hb_mobbar_options", function(e) {
      	var data_id = $(this).attr('data-id');
       	var data_json = $('.hb_data_json[data-row='+data_id+']');
     	var data_name = $(this).text();
 		 $('body').hb_options({
				id:data_id,
				key:data_id,
				name:data_name,
				json:data_json,
				option:hb_settings[data_id],
				tabs:options_tabs,
				content:options_content,
				button:options_button,
 				callback:header_callback,
 		  });
    }); 
	
	
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																				Library 
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 

  
	/*--------------------------------------------------------------------------- Library Button ---------------------------------------------------------------------------*/
	 
	var library_button = function(classes, settings) {
		var html='<a class="hb_btn hb_options_cancel">'+hb_text.cancel+'</a>';
 		 html+='<a class="hb_btn hb_model_add">'+hb_text.hb_import+'</a>';
		return html;	
 			
 	};
	
	/*--------------------------------------------------------------------------- Library Callback ---------------------------------------------------------------------------*/ 
 
   	var library_callback = function(classes, settings) {
			classes.addClass('hb_active_loading');
 			$.ajax({
					url:hb_builder_js.ajaxurl,
					type: 'POST',
					data : {
						action : 'hb_library',
 					},
					success:function(data) {
						
						if(data.length){
 							classes.find('.hb_options_content').append(data);
							 classes.removeClass('hb_active_loading');

  						} else{
							remove_add_error_loading();
						}
					  
					} 
			});
			$(document).off('click', '.hb_options[data-id=library] .hb_model_add').on('click', '.hb_options[data-id=library] .hb_model_add', function(e) {
				var data_id = $('.hb_options[data-id=library]').find('.selected').attr('data-id');
				mouse_wait_start();
 			 
				$.ajax({
					url:hb_builder_js.ajaxurl,
					type: 'POST',
					data : {
						action : 'hb_builder',
						id :data_id,
						library :true,
						hb_builder_js,
					},
					success:function(data) {
 						if(data.length){
							$('.hb_panel').html('');
							$('.hb_panel').append(data);
							mouse_wait_end();
							hb_sortable();
						} else{
							remove_add_error_loading();
						}
					 } 
				});
					  
			});
	};
	
	/*--------------------------------------------------------------------------- Library  ---------------------------------------------------------------------------*/ 

	$(document).on('click', ".hb_library", function(e) {
      	var data_id = $(this).attr('data-id');
     	var data_name = $(this).text();
 		 $('body').hb_options({
				id:'library',
				key:'library',
				name:hb_text.import_library,
				json:'',
 				button:library_button,
 				callback:library_callback,
    	});
    });		
 
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																				Import
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 

	/*----------------------------------------------------------------------------Import Content ---------------------------------------------------------------------------*/ 
	
  	var import_content = function(classes, settings) {
 		var html ='<span>'+hb_text.import_json+'</span>';
		html+= '<textarea id="hb_header_import" name="header_import"></textarea>';
 		 return html;
 		 
	};	 
	
	/*----------------------------------------------------------------------------Import Button ---------------------------------------------------------------------------*/ 
	
 	var import_button = function(classes, settings) {
		var html='<a class="hb_btn hb_options_cancel">'+hb_text.cancel+'</a>';
		html+='<a class="hb_btn hb_model_add">'+hb_text.hb_import+'</a>';
 		return html; 
   	}; 
	
	/*----------------------------------------------------------------------------Import CallBack ---------------------------------------------------------------------------*/ 
	
	$(document).on('click', '.hb_options[data-id=import] .hb_model_add ', function(e) {
		mouse_wait_start();
 		var data_option =$(this).parents('.hb_options').find('#hb_header_import').val();
 
		$.ajax({
			url:hb_builder_js.ajaxurl,
			type: 'POST',
			data : {
				action : 'hb_builder',
				option :data_option,
				json :true,
				hb_builder_js,
 			},
			success:function(data) {
			 	if(data.length){
					$('.hb_panel').html('');
					$('.hb_panel').append(data);
 					mouse_wait_end();
					hb_builder_json();
					hb_sortable();
   				} else{
					remove_add_error_loading();
				}
					  
				} 
			});
		  
		});
  
	
	/*----------------------------------------------------------------------------Import Action ---------------------------------------------------------------------------*/ 
	
	$(document).on('click', ".hb_import_header", function(e) {
      	var data_id = $(this).attr('data-id');
     	var data_name = $(this).text();
 		 $('body').hb_options({
				id:'import',
				key:'import',
				name:hb_text.import_header,
				json:'',
 				content:import_content,
				button:import_button,
  		  });
    });	
	 
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																				Export
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
  
 	/*----------------------------------------------------------------------------Export Content ---------------------------------------------------------------------------*/ 
 
  	var export_content = function(classes, settings) {
 		var html ='<span>'+hb_text.export_json+'</span>';
		html+= '<textarea name="header_export">'+JSON.stringify(settingEmptyAndZero(hb_output_online()))+'</textarea>';
		 
		 return html;
 		 
	};	 
  	/*----------------------------------------------------------------------------Export Header ---------------------------------------------------------------------------*/ 
	var export_button = function(classes, settings) {
		var html='<a class="hb_btn hb_options_cancel">'+hb_text.cancel+'</a>';
 		return html;	
 	};
 	/*----------------------------------------------------------------------------Export Header ---------------------------------------------------------------------------*/ 
	
	$(document).on('click', ".hb_export_header", function(e) {
      	var data_id = $(this).attr('data-id');
     	var data_name = $(this).text();
 		 $('body').hb_options({
				id:'export',
				key:'export',
				name:hb_text.export_header,
				json:'',
 				content:export_content,
				button:export_button,
 		  });
    });	
	
 	/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																	 header Options
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
		$(document).on('click', '.hb_make_it_default', function(e) {
					
		var header_item =$(this).parents('.hb_builder');
		var	data_key =  $('input[id=post_name]').val();
		var	this_class =$(this);
 
				mouse_wait_start();
				
  				$.ajax({
					url:hb_builder_js.ajaxurl,
					type: 'POST',
					data : {
						action : 'hb_header_default',
						key :data_key,
					},
					success:function(data) {
						if(data.length){
  							mouse_wait_end();
							
 							this_class.addClass('hb_is_default');
							header_default();
						} else{
							remove_add_error_loading();
						}
					} 
				}); 
		 
 		
	});
 
	/*************************************************************************************************************************************************************************
	--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																		 Navbar Options
	--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	**************************************************************************************************************************************************************************/ 
 
  	var navbar_callback = function(classes, settings) {
	 
 		$(document).off('click', '.hb_options[data-id=navbar] .hb_options_update').on('click', '.hb_options[data-id=navbar] .hb_options_update ', function(e) {
			var data_option =  JSON.stringify(settingEmptyAndZero($(this).parents('.hb_options').serializeJSON()));	
			var data_key= $(this).parents('.hb_options').attr('data-key');
   			$('.hb_navbar_item[data-key='+data_key+']').find('.hb_data_json[data-row=navbar]').html('');
			$('.hb_navbar_item[data-key='+data_key+']').find('.hb_data_json[data-row=navbar]').append(data_option);
 		 	hb_deactive_remove(classes);
			hb_sortable();
			hb_builder_json();
			
  		});
 		
	};

	
	
	
  	$(document).on('click', ".hb_navbar_options", function(e) { 
       	var data_id = 'navbar';
       	var data_key = $(this).parents('.hb_navbar_item').attr('data-key');
        var data_json = $('.hb_navbar_item[data-key='+data_key+']').find('.hb_data_json[data-row=navbar]');
     	var data_name = $(this).parent().attr('data-name');
 		 $('body').hb_options({
				id:data_id,
				key:data_key,
				name:data_name,
				json:data_json,
				option:hb_settings.navbar,
				tabs:options_tabs,
				content:options_content,
				button:options_button,
 				callback:navbar_callback,
 		  });
     
	});		
 
 
	/*************************************************************************************************************************************************************************
	--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																		 Option Button
	--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	**************************************************************************************************************************************************************************/ 
 
      var  add_element_content = function(classes, settings) {
				
			var hb_options_header = settings.option;
				var  html='';
				$.each(hb_options_header, function(index, header){
						
							html += '<li class="hb_model_item" data-id="'+index+'"  >';
 							html += '<div class="hb_model_image"  >';
							html +='<img src="'+header.img+'" />';
							html +='</div>';
 							html +='<span>'+header.name+'</span>';
 							html += '</li>';
				});
		 	return html;
		 };
		   	var add_element_button = function(classes, settings) {
 		return '<a class="hb_btn hb_model_add">'+hb_text.addelement+'</a>';
			
 			
 	};
	/*************************************************************************************************************************************************************************
	--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
															 Add Element CallBack
	--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	**************************************************************************************************************************************************************************/ 
		 
      var  add_element_callback = function(classes, settings) {

			$(document).off('click', '.hb_options[data-id=element] .hb_model_add').on('click', '.hb_options[data-id=element] .hb_model_add', function(e) {
			 
					var data_key = Math.floor(Math.random() * 9999999999);
					var data_childern = $(this).parents('.hb_options[data-id=element]').attr('data-key');
					var data_id = $('.hb_options[data-id=element]').find('.selected').attr('data-id');
					var data_name = $('.hb_options[data-id=element]').find('.selected').find('span').html();
					
					var hb_options_header = settings.option;
					
				 
					 var value_default ={};
 					var data_option = hb_options_header[data_id]['options'];
					  jQuery.each(data_option, function(index, option) {
						if (option['default']) {
						  value_default[option['id']] = option['default'];
						}
					  
 
					  }); 
				 
					var elemenet='<li class="hb_element_item" data-key="'+data_key+'"  data-id="'+data_id+'"  data-childern="'+data_childern+'">';
						elemenet+='<hb_data_json class="hb_data_json"  data-row="element">'+JSON.stringify(settingEmptyAndZero(value_default))+'</hb_data_json>';
						elemenet+='<div class=" hb_element_title" data-name="'+data_name+' '+hb_text.option+'">';
						elemenet+='<span class="hb_element_name">'+data_name+'</span>';
						 
						elemenet+='<div class="hb_element_title_bottom">';
							elemenet+='<a class="hb_element_options"></a>';
							elemenet+='<a class="hb_element_duplicate"></a>';
							elemenet+='<a class="hb_element_remove"></a>';
						elemenet+= '</div>';	
						elemenet+= '</div>';	
					 elemenet+='</li>';
					$('.hb_column_item[data-key='+data_childern+']  .hb_element_list').append(elemenet);
					
  		  		 	hb_deactive_remove(classes);
					hb_sortable();
					hb_builder_json();
							 
			});
		 };
	
	
	// Element Select
	$(document).on('click', '.hb_add_element', function(e) {
		$('#hb_model_element').attr('data-childern', $(this).parents('.hb_column_item').attr('data-key'));
		var data_key=$(this).parents('.hb_column_item').attr('data-key');
  		 
		 $('body').hb_options({
				id:'element',
				key:data_key,
				name:hb_text.addelement,
 				option:hb_settings.element,
 				type:'model',
				content:add_element_content,
				button:add_element_button,
 				callback:add_element_callback,
  		  });
		  
		  
 	}); 
 	 
	
 
		  
	$(document).on("click",".hb_options .hb_model_item", function() {
		$(this).parents('.hb_options_content').find('.selected').removeClass('selected');
		$(this).addClass('selected');
	}); 
 
 
   	 
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																	 Eelement Options
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 

	/*************************************************************************************************************************************************************************
	--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																		 Navbar Options
	--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	**************************************************************************************************************************************************************************/ 
 
  	var element_callback = function(classes, settings) {
	 
 		$(document).on('click', '.hb_options[data-id='+settings.id+'] .hb_options_update ', function(e) {
			var data_option =  JSON.stringify(settingEmptyAndZero($(this).parents('.hb_options').serializeJSON()));	
			var data_key= $(this).parents('.hb_options').attr('data-key');
   			$('.hb_element_item[data-key='+data_key+']').find('.hb_data_json[data-row=element]').html('');
			$('.hb_element_item[data-key='+data_key+']').find('.hb_data_json[data-row=element]').append(data_option);
			hb_deactive_remove(classes);
			hb_sortable();
			hb_builder_json();
  		});
 		
	};


 	$(document).on('click','.hb_element_options', function() {
		var data_id = $(this).parents('.hb_element_item').attr('data-id');
		var data_key = $(this).parents('.hb_element_item').attr('data-key');
        var data_json = $('.hb_element_item[data-key='+data_key+']').find('.hb_data_json[data-row=element]');
     	var data_name = $(this).parent().parent().attr('data-name');
  		 $('body').hb_options({
				id:data_id,
				key:data_key,
				name:data_name,
				json:data_json,
				option:hb_settings.element[data_id]['options'],
				tabs:options_tabs,
				content:options_content,
				button:options_button,
 				callback:element_callback,
 		  });
	});	
 
  	 
 
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																	 Duplicate
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
	function hb_duplicate(row,key,adress) {	
		$(adress).attr('data-key',key).attr('id',"hb_"+row+"_"+ key);
 	}
		

	jQuery(document).on("click",".hb_element_duplicate",function(){
   
   		var duplicate = $(this).parents(".hb_element_item").addClass('hb_duplicate').clone();
		$(this).parents('.hb_duplicate').removeClass('hb_duplicate');
		$(this).parents(".hb_element_item").after(duplicate);
 		var element_key = Math.floor(Math.random() * 9999999999);
  		hb_duplicate('element',element_key,'.hb_duplicate');
 		$('.hb_duplicate').removeClass('hb_duplicate');
		hb_sortable();
		hb_builder_json();

	}); 
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																	 Remove
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
			 
	$(document).on('click', '.hb_element_remove', function(e) {
		e.preventDefault();
		var this_element=$(this);
		myConfirm("Are You Sure You Want To Remove This Element?", function(result){
			if(result){
				this_element.parents('.hb_element_item').animate({ opacity: 0 }, 200, function() {
					$(this).remove();
					hb_builder_json();
					
				});
 

			}
		}); 		
			
 
	});
/*************************************************************************************************************************************************************************
		--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
																					 Canel and Close 
		--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		**************************************************************************************************************************************************************************/  
		$(document).on('click', '.hb_options_cancel,.hb_options_close', function() {
		 var  classes = $(this).parents('.hb_options');
		   classes.removeClass('hb_active');
			setTimeout(function(){
				classes.remove();
			}, 200);
 		});
		
 	$(document).on("click",'.hb_radio_selected label',function(){
		$(this).parent().parent().find('[checked]').each(function() {
			$(this).removeAttr("checked");
		});
		$(this).find('input').attr("checked","checked");
	});
 			 
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																	 Image Rmoeve and Upload
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/ 
 
 
	$(document).on( 'click', '.hb_image_remove',function(event) {
			var image_rand = Math.floor(Math.random() * 9999999999);
			$(this).parents('.hb_options_setting').find('input').val('').attr('value','');
			$(this).parent().remove();

		
	});


 
	$(document).on( 'click', '.hb_image_upload',function(event) {
		var data_this= $(this);
		var name= $(this).attr('data-name');
		var imageFrame;
		event.preventDefault();
  		var options, attachment;
		var hb_options_upload = data_this.parents('.hb_options_image');
		var $self = $(event.target);
		var $div = $self.closest(hb_options_upload);
			
 		if ( imageFrame ) {
			imageFrame.open();
			return;
		}
  		imageFrame = wp.media({
			title: hb_text.choose,
			multiple: false,
			library: {
				type: 'image'
			},
			button: {
				text:hb_text.uploader_button
			}
		});
			
 		imageFrame.on( 'select', function() {
			var	selection = imageFrame.state().get('selection');
			if ( ! selection )
				return;
 				selection.each( function( attachment ) {
				console.log(attachment);
			var id = attachment.attributes.id;

				if(attachment.attributes.sizes.medium){	
					var medium_url = attachment.attributes.sizes.medium.url;
				}else{
					 var medium_url = attachment.attributes.sizes.full.url;
				}
				
				data_this.parent().find('.hb_image_item_medium').remove();

 				data_this.parent().find('.hb_image_item').find('input').val(id);
				
 
  				var data='<div class="hb_image_item_medium"><span class="hb_image_remove"></span><img  src="'+medium_url+'"/></div>';
 				
 
 				$(data_this).parent().find('.hb_image_item').append(data);
			});
		});
			
 		imageFrame.open();
	});
  
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																	Checkbox
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  
	jQuery(document).on("click",'.hb_options [type="checkbox"]',function(){
		if($(this).is(':checked')) {
			$(this).val(1);
 
		}else{
			$(this).val('');
							 
	
		}
	});
 

 
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																	Title TABS
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  
	jQuery(document).on("click" ,'.hb_title_tabs a' ,function(){
		$(this).parent().find('.hb_layout_active').removeClass('hb_layout_active');
		$(this).addClass('hb_layout_active');
		var value = $(this).attr('data-id');
		$(this).parents('.hb_icon,.hb_options_middle,.hb_model_middle').find('.hb_layout_group_active').removeClass('hb_layout_group_active');
		$(this).parents('.hb_icon,.hb_options_middle,.hb_model_middle').find('[data-tab="'+value+'"]').addClass('hb_layout_group_active');
 			
	});
		 
  
			
 
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																	Title TABS
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  
	$(document).on('change keyup mousedown input','.hb_options_number  input[type="range"]',function(e) {
 	   var value = $(this).val();
  	  $(this).parent().find('[type="number"]').val(value).attr('value',value);
		
 	});
 
 
/*************************************************************************************************************************************************************************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 																	Title TABS
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************/  
	$(document).on('change keyup mousedown','.hb_options_number  input[type="number"]',function(e) {
	   var value = $(this).val();
		 if(  value === 'undefined' || value === null ||  value === '' ){
			 value=0;
		 }
		$(this).parent().find('[type="range"]').val(value).attr('value',value);	 
 
 
	});
	
 	
  
	});
});
 
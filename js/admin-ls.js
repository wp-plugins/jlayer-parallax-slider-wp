/**
 * @fileOverview jLayer Slideshow Editor
 * @author <a href="mailto:unizoewp@gmail.com">Unizoe Web Solutions</a>
 * @version 1.0
 */
/**
 *Adds slides to current slider
 *@param {Array} Array of slides object
 *@memberOf window
 */window.send_slides_to_slider=function(slides){
    jQuery.each(slides,function(k,v){
        var s_unq=1;
        jQuery(".sp-slider-contents").find(".ls-slide").each(function(){
            if(jQuery(this).attr("href")=="#"+v.id){
                s_unq=0;
            }
        })
        if(s_unq){
            jQuery(".sp-slider-contents").append('<a href="#'+v.id+'" class="ls-slide">'+v.name+'<span class="ti-icon ti-ls-edit">C</span><span class="ti-icon ti-ls-delete">x</span></a>');
        }
    })
    tb_remove();
}
function rgb2hex(rgb){
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
}
/**
 * Returns slide icon by id
 * @param {Number} key id of font
 * @function
 */
var getSlideName=function(key){
    jQuery.post(window.location.href,{
        'ti_get_slide':1,
        'sp-admin':1,
        'id':key
    },function(resp){
        resp=jQuery.parseJSON(resp);
        jQuery("#slide-"+key).html(resp.name+'<span class="ti-icon ti-ls-edit">C</span><span class="ti-icon ti-ls-delete">x</span>');
        if(!resp){
            jQuery("#slide-"+key).remove();
        }
    });
}
/**
*
*HTML for preview
*/
var imgHTML='<td><img src="" class="sp-ls-elem-img" /><a href="#" class="sp-ls-remove-elem">'+admin_ls_text.txt_remove+'</a></td>\
                            <td class="ti-bl-cell"><input type="text" class="sp-ls-item-left small-input" value="0"/></td>\
                            <td><input type="text" class="sp-ls-item-top small-input" value="0" /></td>\
                            <td><input type="text" class="sp-ls-item-duration small-input" value="1200"/></td>\
                            <td><input type="text" class="sp-ls-item-delay small-input" value="500"></td>\
                            <td><select class="sp-ls-item-direction">\
                                    <option value="random">'+admin_ls_text.txt_random+'</option>\
                                    <option value="top">'+admin_ls_text.txt_top+'</option>\
                                    <option value="right">'+admin_ls_text.txt_right+'</option>\
                                    <option value="bottom">'+admin_ls_text.txt_bottom+'</option>\
                                    <option value="left">'+admin_ls_text.txt_left+'</option>\
                                </select></td>\
                            <td><select class="sp-ls-item-easing">\
                                    <option value="swing">Default</option>\
                                    <option value="easeInQuad">easeInQuad</option>\
                                    <option value="easeOutQuad">easeOutQuad</option>\
                                    <option value="easeInOutQuad">easeInOutQuad</option>\
                                    <option value="easeInCubic">easeInCubic</option>\
                                    <option value="easeOutCubic">easeOutCubic</option>\
                                    <option value="easeInOutCubic">easeInOutCubic</option>\
                                    <option value="easeInQuart">easeInQuart</option>\
                                    <option value="easeOutQuart">easeOutQuart</option>\
                                    <option value="easeInOutQuart">easeInOutQuart</option>\
                                    <option value="easeInQuint">easeInQuint</option>\
                                    <option value="easeOutQuint">easeOutQuint</option>\
                                    <option value="easeInOutQuint">easeInOutQuint</option>\
                                    <option value="easeInSine">easeInSine</option>\
                                    <option value="easeOutSine">easeOutSine</option>\
                                    <option value="easeInOutSine">easeInOutSine</option>\
                                    <option value="easeInExpo">easeInExpo</option>\
                                    <option value="easeOutExpo">easeOutExpo</option>\
                                    <option value="easeInOutExpo">easeInOutExpo</option>\
                                    <option value="easeInCirc">easeInCirc</option>\
                                    <option value="easeOutCirc">easeOutCirc</option>\
                                    <option value="easeInOutCirc">easeInOutCirc</option>\
                                    <option value="easeInElastic">easeInElastic</option>\
                                    <option value="easeOutElastic">easeOutElastic</option>\
                                    <option value="easeInOutElastic">easeInOutElastic</option>\
                                    <option value="easeInBack">easeInBack</option>\
                                    <option value="easeOutBack">easeOutBack</option>\
                                    <option value="easeInOutBack">easeInOutBack</option>\
                                    <option value="easeInBounce">easeInBounce</option>\
                                    <option value="easeOutBounce">easeOutBounce</option>\
                                    <option value="easeInOutBounce">easeInOutBounce</option>\
                                </select></td>\
                            <td class="ti-bl-cell"><input type="text" class="sp-ls-item-rotation-times small-input" value="0"></td>\
                            <td><input type="text" class="sp-ls-item-rotation-duration small-input" value="2000"></td>\
                            <td><select class="sp-ls-item-rotation-easing">\
                                    <option value="easeInQuad">easeInQuad</option>\
                                    <option value="easeOutQuad">easeOutQuad</option>\
                                    <option value="easeInOutQuad">easeInOutQuad</option>\
                                    <option value="easeInCubic">easeInCubic</option>\
                                    <option value="easeOutCubic">easeOutCubic</option>\
                                    <option value="easeInOutCubic">easeInOutCubic</option>\
                                    <option value="easeInQuart">easeInQuart</option>\
                                    <option value="easeOutQuart">easeOutQuart</option>\
                                    <option value="easeInOutQuart">easeInOutQuart</option>\
                                    <option value="easeInQuint">easeInQuint</option>\
                                    <option value="easeOutQuint">easeOutQuint</option>\
                                    <option value="easeInOutQuint">easeInOutQuint</option>\
                                    <option value="easeInSine">easeInSine</option>\
                                    <option value="easeOutSine">easeOutSine</option>\
                                    <option value="easeInOutSine">easeInOutSine</option>\
                                    <option value="easeInExpo">easeInExpo</option>\
                                    <option value="easeOutExpo">easeOutExpo</option>\
                                    <option value="easeInOutExpo">easeInOutExpo</option>\
                                    <option value="easeInCirc">easeInCirc</option>\
                                    <option value="easeOutCirc">easeOutCirc</option>\
                                    <option value="easeInOutCirc">easeInOutCirc</option>\
                                    <option value="easeInElastic">easeInElastic</option>\
                                    <option value="easeOutElastic">easeOutElastic</option>\
                                    <option value="easeInOutElastic">easeInOutElastic</option>\
                                    <option value="easeInBack">easeInBack</option>\
                                    <option value="easeOutBack">easeOutBack</option>\
                                    <option value="easeInOutBack">easeInOutBack</option>\
                                    <option value="easeInBounce">easeInBounce</option>\
                                    <option value="easeOutBounce">easeOutBounce</option>\
                                    <option value="easeInOutBounce">easeInOutBounce</option>\
                                </select>\
                                </select>\
                             </td>\
                            <td><input type="text" class="sp-ls-item-rotation-delay small-input" value="500"></td>';
/**
* Handles Document Ready function of jLayer Editor
* @description The scope of the function is to handle user and custom events in the editor
* @function
* @name tijLayerReady
*/
jQuery(document).ready(function($){
    
    $("#ti-add-ls-slides").live("click",function(evt){
        evt.preventDefault();
        window.curr_font=jQuery(this).parents(".sp-admin-font");
        var data={
            'sp-admin':1,
            'sp-get-ls-slides':1,
            'page':'sp-slider-ls',
            'KeepThis':true,
            'TB_iframe':true,
            'height':'200',
            'width':'600'
        }
        url='admin.php?'+jQuery.param(data);
        
        tb_show("Choose Slides",url);
    })
    //Saving a slide
    $("#ti-save-slide").live("click",function(evt){
        evt.preventDefault();
        var sdata={};
        sdata.elems=Array();
        $(".ls-slide-box-items").find('tbody').find('tr').each(function(){
            sdata.elems.push(lsGetObj($(this)));
        });
        sdata.name=$("#ls-slide-name").val();
        sdata.id=$("#ls-slide-id").val();
        sdata.ti_save_slide=1;
        $.post(window.location.href,{
            slide:JSON.stringify(sdata),
            ti_save_slide:1,
            'sp-admin':1
        },function(resp){
            window.location.reload();
        })
    })
    //load slide for editing
    $(".ti-edit-slide").live("click",function(evt){
        var id=$(this).siblings(".ti-slide-id").val();
        $.post(window.location.href,{
            'ti_get_slide':1,
            'sp-admin':1,
            'id':id
        },function(resp){
            var hform=jQuery("#sp-ls-slide-form");
            jQuery("#ls-slides").find(".ls-slide-area").html(hform.parent().html());
            jQuery(document).trigger("saInitForm");
            hform.remove();
            jQuery("#sp-ls-slide-form").find(".sp-update").hide();
            jQuery("#sp-ls-slide-form").find("tbody").bind("sortstop",function(){
                checkItems(jQuery("#sp-ls-slide-form").find("table"));
            })
            tiEditSlides(jQuery.parseJSON(resp),id);
        })
        evt.preventDefault();
    })
    $(".ti-delete-slide").live("click",function(evt){
        window.curr_slide_id=$(this).siblings(".ti-slide-id").val();
        $.prompt(admin_ls_text.slide_conf,{
            buttons: {
                Ok: true, 
                Cancel: false
            },
            callback: function(e,v,m,f){
                if(v==true){
                    $.post(window.location.href,{
                        'ti_delete_slide':1,
                        'sp-admin':1,
                        'id':window.curr_slide_id
                    },function(resp){
                        window.location.reload();
                    })
                    evt.preventDefault();
                }
            }
        });

    //        $.post(window.location.href,{
    //            'ti_delete_slide':1,
    //            'sp-admin':1,
    //            'id':id
    //        },function(resp){
    //            window.location.reload();
    //        })
    //        evt.preventDefault();
    })
    jQuery("#ls-ajax-slider").live("click",function(evt){
        evt.preventDefault();
        lsAjaxSlider($(this).parents("form"));
    });
    jQuery("#sp-ls-slider-form").live("submit",function(evt){
        evt.preventDefault();
        lsAjaxSlider($(this));
    })
    /*
     *Stores a slider as per data provided by form
     *@param {Object} form jQuery object for form\
     */
    var lsAjaxSlider=function(form){
        var slider={};
        slider.name=form.find("#sp-ls-slider-name").val();
        slider.width=form.find("#sp-ls-slider-width").val();
        slider.id=form.find("#ls-slider-id").val();
        slider.height=form.find("#sp-ls-slider-height").val();
        slider.delay=form.find("#sp-ls-slider-delay").val();
        if(form.find("#sp-ls-slider-vidauto").is(":checked")){
            slider.vidAutoplay=1
        }else{
            slider.vidAutoplay=0
        }
        slider.slides=Array();
        jQuery(".sp-slider-contents").find(".ls-slide").each(function(){
            id=$(this).attr("href").replace("#", "");
            slider.slides.push(id);
        });
        var p_data={
            'ls_add_slider':1,
            'sp-admin':1,
            'slider':JSON.stringify(slider)
        };
        $.post(window.location.href,p_data,function(resp){
            window.location.reload();
        })
        
    }
    jQuery(".ti-edit-slider").live("click",function(event){
        event.preventDefault();
        var data={
            'ti_get_slider':1,
            'id':$(this).attr("href").replace("#",""),
            'sp-admin':1
        }
        jQuery.post(window.location.href,data,function(resp){
            var hform=jQuery("#sp-ls-slider-form");
            slider=jQuery.parseJSON(resp);
            jQuery("#ls-sliders").find(".ls-slider-area").html(hform.parent().html());
            $("#sp-ls-slider-name").val(slider.name);
            $("#sp-ls-slider-width").val(slider.width);
            $("#sp-ls-slider-delay").val(slider.delay);
            if(slider.vidAutoplay){
                $("#sp-ls-slider-vidauto").attr("checked","checked");
            }else{
                $("#sp-ls-slider-vidauto").attr("checked",false);
            }
            $("#ls-slider-id").val(slider.id);
            $("#sp-ls-slider-height").val(slider.height);
            jQuery.each(slider.slides,function(k,v){
                jQuery(".sp-slider-contents").append('<a href="#'+v+'" id="slide-'+v+'" class="ls-slide">'+getSlideName(v)+'</a>');
            })
            jQuery(document).trigger("saInitForm");
            hform.remove();
            jQuery("#sp-ls-slider-form").find(".sp-update").hide();
        })
    })
    $(".ti-delete-slider").live("click",function(evt){
        window.curr_slider_id=$(this).attr("href").replace("#","");
        $.prompt(admin_ls_text.slider_conf,{
            buttons: {
                Ok: true, 
                Cancel: false
            },
            callback: function(e,v,m,f){
                if(v==true){
                    $.post(window.location.href,{
                        'ti_delete_slider':1,
                        'sp-admin':1,
                        'id':window.curr_slider_id
                    },function(resp){
                        window.location.reload();
                    })
                    evt.preventDefault();
                }
            }
        });
    });
    //edit text
    $(".caption-text").live("click",function(evt){
        evt.preventDefault();
        var id_re=/ls\-elem\-(\d+)/;
        id=$(this).attr("id").match(id_re);
        id=id[1];
        tb_show("Edit text", "#TB_inline?height=550&width=620&inlineId=ls-admin-text-edit", "");
        $("#TB_window").find("#ti-text-edit").val($(this).text());
        $("#TB_window").find("#ti-font-size-edit").val($(this).css('font-size').replace('px', ''));
        attr=$(this).attr("class").match(/font\-([a-zA-Z]*)\s/);
        $("#TB_window").find("#ti-font-family-edit").val(attr[1]);
        $("#TB_window").find("#ti-font-color-edit").val(rgb2hex($(this).css('color')));
        $("#TB_window").find("#ti-elem-id").val(id);
        setLsBg();
    });
    //edit text
    $(".link-anchor").live("click",function(evt){
        evt.preventDefault();
        var id_re=/ls\-elem\-(\d+)/;
        id=$(this).parents('.slide-item').attr("id").match(id_re);
        id=id[1];
        tb_show("Edit Link", "#TB_inline?height=550&width=620&inlineId=ls-admin-link-edit", "");
        $("#TB_window").find("#ti-label-edit").val($(this).text());
        $("#TB_window").find("#ti-link-edit").val($(this).attr("href"));
        $("#TB_window").find(".ls-elem-id").val(id);
        setLsBg();
    });
    $("#ti-update-link").live("click",function(evt){
        evt.preventDefault();
        id=$("#TB_window").find(".ls-elem-id").val();
        $("#ls-elem-"+id).find('.link-anchor').text($("#TB_window").find("#ti-label-edit").val());
        $("#ls-elem-"+id).find('.link-anchor').attr('href',$("#TB_window").find("#ti-link-edit").val());
        tb_remove();
    })
    $("#ti-update-text").live("click",function(evt){
        evt.preventDefault();
        id=jQuery("#ti-elem-id").val();
        var elem_id=id;
        window.edit_area=$(".ls-slide-box");
        var text = $("#TB_window").find("#ti-text-edit").val();
        var font_size = $("#TB_window").find("#ti-font-size-edit").val();
        var font_family=$("#TB_window").find("#ti-font-family-edit").val();
        var color = $("#TB_window").find("#ti-font-color-edit").val();
        $("#ls-elem-"+id).remove();
        window.edit_area.append('<div id="ls-elem-'+id+'" class="slide-item caption-text font-'+font_family+'" style="font-size:'+font_size+'px;line-height:'+font_size+'px;color:'+color+';">'+text+'</div>');
        checkItems($("#ls-row-"+id).parents("table"));
        $("#ls-elem-"+elem_id).css({
            'left':$("#ls-row-"+elem_id).find(".sp-ls-item-left").val()+"px",
            'top':$("#ls-row-"+elem_id).find(".sp-ls-item-top").val()+"px"
        });
        $(".slide-item").draggable();
        $(".caption-text").resizable();
        tb_remove();
    })
    jQuery("#add-slider").live("click",function(){
        var hform=jQuery("#sp-ls-slider-form");
        jQuery("#ls-sliders").find(".ls-slider-area").html(hform.parent().html());
        jQuery(document).trigger("saInitForm");
        hform.remove();
        jQuery("#sp-ls-slider-form").find(".sp-update").hide();
    });
    jQuery("#ls-add-video").live("click",function(event){
        event.preventDefault();
    });
    var setLsBg=function(){
        if(jQuery('#TB_window').find('.sp-ls-bg-picker').length||jQuery('#TB_window').find('.sp-ls-title-picker').length||jQuery('#TB_window').find('.sp-ls-title-picker-edit').length){
            var picker=jQuery('#TB_window').find('.sp-ls-bg-picker');
            if(picker.length){
                var f=jQuery.farbtastic(picker);
                f.linkTo(picker.siblings(".sp-ls-bg-color"));
                f.linkTo(function(color){
                    jQuery("#ti-bg-color").val(color);
                    jQuery("#ti-bg-color").css({
                        'background-color':color
                    });
                });
            }
            picker=jQuery('#TB_window').find('.sp-ls-title-picker');
            if(picker.length){
                t=jQuery.farbtastic(picker);
                t.linkTo(picker.siblings(".sp-ls-title-color"));
                t.linkTo(function(color){
                    jQuery("#ti-font-color").val(color).css({
                        'background-color':color
                    });;
                });
            }
            picker=jQuery('#TB_window').find('.sp-ls-title-picker-edit');
            if(picker.length){
                t=jQuery.farbtastic(picker);
                t.linkTo(picker.siblings(".sp-ls-title-color-edit"));
                t.linkTo(function(color){
                    jQuery("#ti-font-color-edit").val(color).css({
                        'background-color':color
                    });;
                });
            }
        }else{
            setTimeout(function(){
                setLsBg();
            }, 100)
        }
    }
    jQuery("#ls-slide-background").live("click",function(evt){

        setLsBg();

    });
    jQuery("#ls-slide-title").live("click",function(evt){
        
        setLsBg();

    });
    jQuery("#ti-add-background").live("click",function(evt){
        evt.preventDefault();
        var color=$("#TB_window").find("#ti-bg-color").val();
        var clen= $("#TB_window").find(".ls-slide-box").siblings('.ls-slide-box-items').find("tbody").find('tr').length+1;
        $(".ls-slide-box").append('<div class="ti-background" id="ls-elem-'+clen+'" style="background-color:'+color+'"></div>');
        $(".ls-slide-box").siblings('.ls-slide-box-items').find("tbody").append('<tr id="ls-row-'+clen+'" class="bg"></tr>');
        $("#ls-row-"+clen).append(imgHTML);
        var td_preview=$("#ls-row-"+clen).find(".sp-ls-elem-img").parent();
        td_preview.find("img").remove();
        td_preview.prepend('<span class="ti-icon ti-preview">$</span>');
        $("#ls-elem-"+clen).css({
            'top':0,
            'left':0
        });
        $("#ls-row-"+clen).addClass("ti-bg");
        checkItems($("#ls-row-"+clen).parents("table"));
        $(".slide-item").draggable();
        $("#ls-row-"+clen).find(".sp-ls-item-delay").val('0');
        $("#ls-row-"+clen).parents("table").find("tbody").sortable();
        $("#ls-row-"+clen).parents("table").find("tbody").disableSelection()
        tb_remove();
        jQuery("#ls-slide-background").removeClass("thickbox");
    });
    
    jQuery("#ti-insert-text").live("click",function(event){
        event.preventDefault();
        window.edit_area=$(".ls-slide-box");
        var text = $("#TB_window").find("#ti-text").val();
        var font_size = $("#TB_window").find("#ti-font-size").val();
        var font_family=$("#TB_window").find("#ti-font-family").val();
        var color = $("#TB_window").find("#ti-font-color").val();
        var clen= window.edit_area.siblings('.ls-slide-box-items').find("tbody").find("tr").length+1;
        window.edit_area.append('<div id="ls-elem-'+clen+'" class="slide-item caption-text font-'+font_family+'" style="font-size:'+font_size+'px;line-height:'+font_size+'px;color:'+color+';">'+text+'</div>');
        window.edit_area.siblings('.ls-slide-box-items').find("tbody");
        window.edit_area.siblings('.ls-slide-box-items').find("tbody").append('<tr id="ls-row-'+clen+'" class="text"></tr>');
        $("#ls-row-"+clen).append(imgHTML);
        var td_preview=$("#ls-row-"+clen).find(".sp-ls-elem-img").parent();
        td_preview.find("img").remove();
        td_preview.prepend('<span class="ti-icon ti-preview">A</span>');
        //td_preview.prepend('<div style="font-size:'+font_size+'px;color:#'+color+';line-height:'+font_size+'px;" class="ti-slide-preview">'+text+'</div>');
        $("#ls-elem-"+clen).css({
            'top':0,
            'left':0
        });
        checkItems($("#ls-row-"+clen).parents("table"));
        $(".slide-item").draggable();
        $(".caption-text").resizable();
        $("#ls-row-"+clen).parents("table").find("tbody").sortable();
        $("#ls-row-"+clen).parents("table").find("tbody").disableSelection()
        tb_remove();
    })
    jQuery("#ti-insert-link").live("click",function(event){
        event.preventDefault();
        window.edit_area=$(".ls-slide-box");
        var label = $("#TB_window").find("#ti-label").val();
        var url = $("#TB_window").find("#ti-link").val();
        var clen= window.edit_area.siblings('.ls-slide-box-items').find("tbody").find("tr").length+1;
        window.edit_area.append('<div id="ls-elem-'+clen+'" class="slide-item slide-link"><a class="link-anchor" href="'+url+'" target="_blank">'+label+'</a></div>');
        window.edit_area.siblings('.ls-slide-box-items').find("tbody");
        window.edit_area.siblings('.ls-slide-box-items').find("tbody").append('<tr id="ls-row-'+clen+'" class="link"></tr>');
        $("#ls-row-"+clen).append(imgHTML);
        var td_preview=$("#ls-row-"+clen).find(".sp-ls-elem-img").parent();
        td_preview.find("img").remove();
        td_preview.prepend('<span class="ti-icon ti-preview">-</span>');
        //td_preview.prepend('<div style="font-size:'+font_size+'px;color:#'+color+';line-height:'+font_size+'px;" class="ti-slide-preview">'+text+'</div>');
        $("#ls-elem-"+clen).css({
            'top':0,
            'left':0
        });
        checkItems($("#ls-row-"+clen).parents("table"));
        $(".slide-item").draggable();
        $("#ls-row-"+clen).parents("table").find("tbody").sortable();
        $("#ls-row-"+clen).parents("table").find("tbody").disableSelection()
        tb_remove();
    })
    jQuery("#ti-insert-video").live("click",function(event){
        event.preventDefault();
        var type=$("#TB_window").find("#ti-vid-url").siblings(".ti-video-type").val();
        var width=$("#TB_window").find("#ti-vid-width").val();
        var height=$("#TB_window").find("#ti-vid-height").val();
        var vid_id=$("#TB_window").find("#ti-vid-url").siblings(".ti-video-id").val();
        window.edit_area=$(".ls-slide-box");
        frame_html='';
        switch(type){
            case "Youtube":
                frame_html='<iframe src="http://www.youtube.com/embed/'+vid_id+'?wmode=transparent" width="'+width+'" height="'+height+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                break;
            case "Vimeo":
                frame_html='<iframe src="http://player.vimeo.com/video/'+vid_id+'?portrait=0&color=c8b3df" width="'+width+'" height="'+height+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                break;
        }
        frame_html+='<input type="hidden" class="ti-video-id" value="'+vid_id+'"/>';
        frame_html+='<input type="hidden" class="ti-video-type" value="'+type+'"/>';
        $.post(window.location.href,{
            'type':type, 
            'id':vid_id, 
            'ls_get_video':1
        },function(data){
        }
        );
        var clen= window.edit_area.siblings('.ls-slide-box-items').find("tbody").find("tr").length+1;
        window.edit_area.append('<div id="ls-elem-'+clen+'" class="ti-video-handle slide-item" style="width:'+width+'px; height:'+height+'px;">'+frame_html+'</div>');
        window.edit_area.siblings('.ls-slide-box-items').find("tbody");
        window.edit_area.siblings('.ls-slide-box-items').find("tbody").append('<tr id="ls-row-'+clen+'" class="video"></tr>');
        $("#ls-row-"+clen).append(imgHTML);
        var td_preview=$("#ls-row-"+clen).find(".sp-ls-elem-img").parent();
        td_preview.find("img").remove();
        //td_preview.prepend('<div class="ti-slide-preview"><h2>'+type +' video</h2></div>');
        td_preview.prepend('<span class="ti-icon ti-preview">v</span>');
        $("#ls-elem-"+clen).css({
            'top':0,
            'left':0
        });
        checkItems($("#ls-row-"+clen).parents("table"));
        $(".slide-item").draggable();
        $("#ls-row-"+clen).parents("table").find("tbody").sortable();
        $("#ls-row-"+clen).parents("table").find("tbody").disableSelection()
        tb_remove();
    })
    jQuery("#add-slide").live("click",function(){
        var hform=jQuery("#sp-ls-slide-form");
        jQuery("#ls-slides").find(".ls-slide-area").html(hform.parent().html());
        jQuery(document).trigger("saInitForm");
        hform.remove();
        jQuery("#sp-ls-slide-form").find(".sp-update").hide();
        jQuery("#sp-ls-slide-form").find("tbody").bind("sortstop",function(){
            checkItems(jQuery("#sp-ls-slide-form").find("table"));
        })
        checkItems(jQuery("#sp-ls-slide-form").find("table"));
    });
    jQuery('#ls-slide-settings').live('click',function(evt) {
        $("#ti-slide-width").val($(".ls-slide-box").width());
        $("#ti-slide-height").val($(".ls-slide-box").height());
    });
    jQuery('#ti-save-slider').live("click",function(event){
        event.preventDefault();
        $(".ls-slide-box").width($("#ti-slide-width").val());
        $(".ls-slide-box").height($("#ti-slide-height").val());
        tb_remove();
    })
    jQuery("#ti-vid-url").live("focusout",function(){
        url=$(this).val();
        if(!$(this).siblings(".ti-video-type").length){
            $(this).after('<input type="hidden" class="ti-video-type"/>');
        }
        if(!$(this).siblings(".ti-video-id").length){
            $(this).after('<input type="hidden" class="ti-video-id"/>');
        }
        type=$(this).siblings(".ti-video-type");
        id=$(this).siblings(".ti-video-id");
        match=url.match(/v\=((?:(?!&).)*)/);
        if(match){
            $(".sp-video-logo").css({
                'opacity':'0.2'
            });
            $("#ti-youtube-icon").css({
                'opacity':'1'
            });
            type.val("Youtube");
            id.val(match[1]);
        }
        match=url.match(/vimeo\.com\/((?:(?!\/).)*)/);
        if(match){
            $(".sp-video-logo").css({
                'opacity':'0.2'
            });
            $("#ti-vimeo-icon").css({
                'opacity':'1'
            });
            type.val("Vimeo");
            id.val(match[1]);
        }
    })
    jQuery(".ls-slide").find(".ti-ls-delete").live("click",function(evt){
        evt.preventDefault();
        $(this).parent().remove();
    })
    if($("#ls-add-img").length){
        jQuery('#ls-add-img').live('click',function(evt) {
            /* prevent form submission */
            evt.preventDefault();
            window.edit_area=$(this).parent().siblings(".ls-slide-box");
            tb_show('','media-upload.php?type=image&amp;TB_iframe=true');
            return false;
        });
        
        // send url back to plugin editor
        window.send_to_editor = function(html) {
            var re_attach_id=/wp-image-(\d*)/;
            var res=html.match(re_attach_id);
            var re_attach_href=/href\=\"(.*?)\"/;
            var res_hr=html.match(re_attach_href);
            var clen=window.edit_area.siblings('.ls-slide-box-items').find("tbody").find("tr").length+1;
            window.edit_area.append('<img class="sp-ls-slide-img slide-item" src="'+res_hr[1]+'" id="ls-elem-'+clen+'" alt="Slider Element"/>');
            window.edit_area.siblings('.ls-slide-box-items').find("tbody");
            window.edit_area.siblings('.ls-slide-box-items').find("tbody").append('<tr id="ls-row-'+clen+'" class="img"></tr>');
            $("#ls-row-"+clen).append(imgHTML);
            $("#ls-row-"+clen).append('<input type="hidden" class="sp-ls-img-id" value="'+res[1]+'"/>');
            $("#ls-row-"+clen).find(".sp-ls-elem-img").attr("src",res_hr[1]);
            $("#ls-elem-"+clen).css({
                'top':0,
                'left':0
            });
            checkItems($("#ls-row-"+clen).parents("table"));
            $(".sp-ls-slide-img").draggable();
            $("#ls-row-"+clen).parents("table").find("tbody").sortable();
            $("#ls-row-"+clen).parents("table").find("tbody").disableSelection()
            tb_remove();
        }
    }
    $(".slide-item").live("drag",function(){
        var pos=$(this).position();
        var cid=$(this).attr("id");
        var id_re=/ls\-elem\-(\d+)/;
        var mat=cid.match(id_re);
        cid=mat[1];
        var row=$("#ls-row-"+cid);
        row.find(".sp-ls-item-left").val(pos.left);
        row.find(".sp-ls-item-top").val(pos.top);
    })
    $(".sp-ls-remove-elem").live("click",function(evt){
        evt.preventDefault();
        var cid=$(this).parents("tr").attr("id");
        var id_re=/ls\-row\-(\d+)/;
        var mat=cid.match(id_re);
        cid=mat[1];
        var table=$("#ls-row-"+cid).parents("table");
        $("#ls-row-"+cid).remove();
        $("#ls-elem-"+cid).remove();
        checkItems(table);
    });
    $(".layer-admin-table").find("tbody").live("sortstop",function(){
        var i=0;
        $(this).find("tr").each(function(){
            id="#ls-elem-"+$(this).attr("id").replace(/ls\-row\-/,'');
            zind=i*20
            i++;
            $(id).css('z-index',zind);
        })
    })
});
/**
 *Check for current elements in a slide and hides/shows elements table based on elements
 *@function
 */
var checkItems=function(elem){
    if(!elem.find("tbody").find("tr").length){
        elem.hide();
    }else{
        elem.show();
    }
    if(elem.find(".ti-bg").length){
        jQuery("#ls-slide-background").removeClass("thickbox");
    }else{
        jQuery("#ls-slide-background").addClass("thickbox");
    }
    //    for(j=0;j<elem.find("tbody").find("tr").length;j++){
    //        crow=elem.find("tbody").find("tr").eq(j);
    //        id=crow.attr("id").replace('ls-row-', '');
    //        lselem=jQuery("#ls-elem-"+id);
    //        console.log("before "+lselem.attr("id")+" row "+crow.attr("id"));
    //        lselem.attr("id","ls-elem-"+(j+1));
    //        console.log("after "+lselem.attr("id")+" row "+crow,"tried ls-elem-"+(j+1));
    //        jQuery(this).attr("id","ls-row-"+(j+1));
    //        
    //    }
    i=0;
    
    elem.find("tbody").find("tr").each(function(){
        i++;
        id=jQuery(this).attr("id").replace('ls-row-', '');
        lselem=jQuery("#ls-elem-"+id);
        lselem.attr("id","ls-elem-tmp-"+i);
        jQuery(this).attr("id","ls-row-"+i);
    });
    jQuery('#sp-ls-slide-form').find(".ti-background,.slide-item").each(function(){
        id=jQuery(this).attr("id").replace('tmp-', '');
        jQuery(this).attr("id",id);
    })
    
}

/**
 * Creates a string from JSON Object
 * JSON Stringify 
 * code from
 * http://www.sitepoint.com/blogs/2009/08/19/javascript-json-serialization/
 * @param {Object} obj JSON object
 * @returns {String} JSON encoded String
 * @function
 */
JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n];
            t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};
/**
 * Returns JSON object from a row representing a slider item
 * @param {Object} obj jQuery row object
 * @function
 */
var lsGetObj=function(obj){
    var ret={};
    var id=obj.attr("id").match(/ls\-row\-(\d+)/);
    id=id[1]
    ret.left=obj.find(".sp-ls-item-left").val();
    ret.top=obj.find(".sp-ls-item-top").val();
    ret.delay=obj.find(".sp-ls-item-delay").val();
    ret.duration=obj.find(".sp-ls-item-duration").val();
    ret.direction=obj.find(".sp-ls-item-direction").val();
    ret.easing=obj.find(".sp-ls-item-easing").val();
    ret.r_times=obj.find(".sp-ls-item-rotation-times").val();
    ret.r_easing=obj.find(".sp-ls-item-rotation-easing").val();
    ret.r_delay=obj.find(".sp-ls-item-rotation-delay").val();
    ret.r_duration=obj.find(".sp-ls-item-rotation-duration").val();
    var type=obj.attr("class").match(/.*(bg|img|text|video|link).*/);
    type=type[1];
    switch(type){
        case 'img':
            ret.type='image';
            ret.image=jQuery("#ls-elem-"+id).attr("src");
            ret.image_id=obj.find(".sp-ls-img-id").val();
            break;
        case 'video':
            ret.type='video';
            ret.video=jQuery("#ls-elem-"+id).find(".ti-video-id").val();
            ret.video_type=jQuery("#ls-elem-"+id).find(".ti-video-type").val();
            ret.video_width=jQuery("#ls-elem-"+id).find("iframe").attr("width");
            ret.video_height=jQuery("#ls-elem-"+id).find("iframe").attr("height");
            ;
            break;
        case 'text':
            ret.type='text';
            ret.text=jQuery("#ls-elem-"+id).text();
            ret.text_size=jQuery("#ls-elem-"+id).css("font-size");
            ret.color=jQuery("#ls-elem-"+id).css("color");
            ret.width=jQuery("#ls-elem-"+id).width();
            ret.height=jQuery("#ls-elem-"+id).height();
            if(jQuery("#ls-elem-"+id).hasClass('font-sansation')){
                ret.font_family='sansation'
            }
            if(jQuery("#ls-elem-"+id).hasClass('font-opensans')){
                ret.font_family='opensans'
            }
            if(jQuery("#ls-elem-"+id).hasClass('font-ballpark')){
                ret.font_family='ballpark'
            }
            break;
        case 'bg':
            ret.type='bg';
            ret.background_color=jQuery("#ls-elem-"+id).css("background-color");
            break;
        case 'link':
            ret.type="link";
            ret.label=jQuery("#ls-elem-"+id).find("a").text();
            ret.href=jQuery("#ls-elem-"+id).find("a").attr("href")
            break;
    }
    return ret;
}
/**
 * Parses and loads a slide for editing
 * @param {Object} obj Slide JSON object
 * @param {id} id Id of the slide
 * @function
 */
var tiEditSlides=function(obj,id){
    $=jQuery;
    $("#ls-slide-name").val(obj.name);
    $("#ls-slide-id").val(id);
    window.edit_area=$(".ls-slide-box");
    jQuery.each(obj.elems,function(key,val){
        var clen= window.edit_area.siblings('.ls-slide-box-items').find("tbody").find("tr").length+1;
        switch(val.type){
            case 'video':
                frame_html='';
                switch(val.video_type){
                    case "Youtube":
                        frame_html='<iframe src="http://www.youtube.com/embed/'+val.video+'?wmode=transparent" width="'+(val.hasOwnProperty('video_width')?val.video_width:'400')+'" height="'+(val.hasOwnProperty('video_height')?val.video_height:'400')+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                        break;
                    case "Vimeo":
                        frame_html='<iframe src="http://player.vimeo.com/video/'+val.video+'?portrait=0&color=c8b3df" width="'+(val.hasOwnProperty('video_width')?val.video_width:'400')+'" height="'+(val.hasOwnProperty('video_height')?val.video_height:'400')+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                        break;
                }
                frame_html+='<input type="hidden" class="ti-video-id" value="'+val.video+'"/>';
                frame_html+='<input type="hidden" class="ti-video-type" value="'+val.video_type+'"/>';
                window.edit_area.append('<div id="ls-elem-'+clen+'" class="ti-video-handle slide-item" style="width:'+(val.hasOwnProperty('video_width')?val.video_width:'400')+'px; height:'+(val.hasOwnProperty('video_height')?val.video_height:'400')+'px;">'+frame_html+'</div>');
                window.edit_area.siblings('.ls-slide-box-items').find("tbody");
                window.edit_area.siblings('.ls-slide-box-items').find("tbody").append('<tr id="ls-row-'+clen+'" class="video"></tr>');
                $("#ls-row-"+clen).append(imgHTML);
                var td_preview=$("#ls-row-"+clen).find(".sp-ls-elem-img").parent();
                td_preview.find("img").remove();
                //td_preview.prepend('<div class="ti-slide-preview"><h2>'+type +' video</h2></div>');
                td_preview.prepend('<span class="ti-icon ti-preview">v</span>');
                $("#ls-elem-"+clen).css({
                    'top':0,
                    'left':0
                });
                checkItems($("#ls-row-"+clen).parents("table"));
                $(".slide-item").draggable();
                $("#ls-row-"+clen).parents("table").find("tbody").sortable();
                $("#ls-row-"+clen).parents("table").find("tbody").disableSelection()
                break;
            case 'text':
                window.edit_area.append('<div id="ls-elem-'+clen+'" class="slide-item caption-text font-'+val.font_family+'" style="font-size:'+val.text_size+';line-height:'+val.text_size+';color:'+val.color+';width:'+val.width+'px;height:'+val.height+'px;">'+val.text+'</div>');
                window.edit_area.siblings('.ls-slide-box-items').find("tbody");
                window.edit_area.siblings('.ls-slide-box-items').find("tbody").append('<tr id="ls-row-'+clen+'" class="text"></tr>');
                $("#ls-row-"+clen).append(imgHTML);
                td_preview=$("#ls-row-"+clen).find(".sp-ls-elem-img").parent();
                td_preview.find("img").remove();
                td_preview.prepend('<span class="ti-icon ti-preview">A</span>');
                //td_preview.prepend('<div style="font-size:'+font_size+'px;color:#'+color+';line-height:'+font_size+'px;" class="ti-slide-preview">'+text+'</div>');
                $("#ls-elem-"+clen).css({
                    'top':0,
                    'left':0
                });
                checkItems($("#ls-row-"+clen).parents("table"));
                $(".slide-item").draggable();
                $(".caption-text").resizable();
                $("#ls-row-"+clen).parents("table").find("tbody").sortable();
                $("#ls-row-"+clen).parents("table").find("tbody").disableSelection();
                break;
            case 'image':
                window.edit_area.append('<img class="sp-ls-slide-img slide-item" src="'+val.image+'" id="ls-elem-'+clen+'" alt="Slider Element"/>');
                window.edit_area.siblings('.ls-slide-box-items').find("tbody");
                window.edit_area.siblings('.ls-slide-box-items').find("tbody").append('<tr id="ls-row-'+clen+'" class="img"></tr>');
                $("#ls-row-"+clen).append(imgHTML);
                $("#ls-row-"+clen).append('<input type="hidden" class="sp-ls-img-id" value="'+val.image_id+'"/>');
                $("#ls-row-"+clen).find(".sp-ls-elem-img").attr("src",val.image);
                $("#ls-elem-"+clen).css({
                    'top':0,
                    'left':0
                });
                checkItems($("#ls-row-"+clen).parents("table"));
                $(".sp-ls-slide-img").draggable();
                $("#ls-row-"+clen).parents("table").find("tbody").sortable();
                $("#ls-row-"+clen).parents("table").find("tbody").disableSelection()
                break;
            case 'bg':
                $(".ls-slide-box").append('<div class="ti-background" id="ls-elem-'+clen+'" style="background-color:'+val.background_color+'"></div>');
                $(".ls-slide-box").siblings('.ls-slide-box-items').find("tbody").append('<tr id="ls-row-'+clen+'" class="bg"></tr>');
                $("#ls-row-"+clen).append(imgHTML);
                td_preview=$("#ls-row-"+clen).find(".sp-ls-elem-img").parent();
                td_preview.find("img").remove();
                td_preview.prepend('<span class="ti-icon ti-preview">$</span>');
                $("#ls-elem-"+clen).css({
                    'top':0,
                    'left':0
                });
                $("#ls-row-"+clen).addClass("ti-bg");
                checkItems($("#ls-row-"+clen).parents("table"));
                $("#ls-row-"+clen).find(".sp-ls-item-delay").val('0');
                $(".slide-item").draggable();
                $("#ls-row-"+clen).parents("table").find("tbody").sortable();
                $("#ls-row-"+clen).parents("table").find("tbody").disableSelection()
                break;
            case 'link':
                window.edit_area.append('<div id="ls-elem-'+clen+'" class="slide-item slide-link"><a href="'+val.href+'" class="link-anchor">'+val.label+'</a></div>');
                window.edit_area.siblings('.ls-slide-box-items').find("tbody").append('<tr id="ls-row-'+clen+'" class="link"></tr>');
                $("#ls-row-"+clen).append(imgHTML);
                td_preview=$("#ls-row-"+clen).find(".sp-ls-elem-img").parent();
                td_preview.find("img").remove();
                td_preview.prepend('<span class="ti-icon ti-preview">-</span>');
                $("#ls-elem-"+clen).css({
                    'top':0,
                    'left':0
                });
                checkItems($("#ls-row-"+clen).parents("table"));
                $(".slide-item").draggable();
                $("#ls-row-"+clen).parents("table").find("tbody").sortable();
                $("#ls-row-"+clen).parents("table").find("tbody").disableSelection()
                break;
        }
        //setting values of element
        $("#ls-row-"+clen).find(".sp-ls-item-left").val(val.left);
        $("#ls-row-"+clen).find(".sp-ls-item-top").val(val.top);
        $("#ls-row-"+clen).find(".sp-ls-item-delay").val(val.delay);
        $("#ls-row-"+clen).find(".sp-ls-item-duration").val(val.duration);
        $("#ls-row-"+clen).find(".sp-ls-item-direction").val(val.direction);
        $("#ls-row-"+clen).find(".sp-ls-item-easing").val(val.easing);
        $("#ls-row-"+clen).find(".sp-ls-item-rotation-times").val(val.r_times);
        $("#ls-row-"+clen).find(".sp-ls-item-rotation-easing").val(val.r_easing);
        $("#ls-row-"+clen).find(".sp-ls-item-rotation-delay").val(val.r_delay);
        $("#ls-row-"+clen).find(".sp-ls-item-rotation-duration").val(val.r_duration);
        $("#ls-elem-"+clen).css({
            'top':val.top+"px",
            'left':val.left+"px"
        });
        $("#add-slide").remove();
    })
}
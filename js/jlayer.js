/*
 * jQuery jLayer Parallax Slider v 1.0
 * http://unizoe.com/products/jlayer-parallax/
 *
 * Copyright 2011, Rajesh Kumar Sharma
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * March 2010
 */
(function( $ ){
    window.jl_steps=15;
    /**
     * Loads and setsup a layer slider on element passed.
     * @namespace jLayer Parallax Slider
     * @param {object} elem Element to setup jlayer slider
     * @config {object} e jQuery object to setup jLayer eg. $(this)
     * @config {object} bullets jQuery object for corresponding bullets
     * @param {Object}  options Options for jlayer Slider
     * @config {Object} delay Delay between autoplay
     */
    var jlayer=function(elem,options){
        window.layer_count=0;
        $.data(elem,options);
        window.jlayer_slider_started=0;
        /*
        * Displays defined slide from slider
        * @param {object} elem Element to setup jlayer slider
        * @config {object} e jQuery object to setup jLayer eg. $(this)
        * @config {object} bullets jQuery object for corresponding bullets
        * @param {Number} idx Index of the slide to be displayed
        */
        var showLayer=function(elem,idx){
            clearAnimations(elem);
            jLayerAutoPause(elem.e);
            if(elem.e.find(".layer").length<2){
                return false;
            }
            var layer=elem.e.find(".layer").eq(idx);
            if(elem.e.find(".c-layer").find('.video').find('iframe').length){
                jLayerPauseVideos(elem.e.find(".c-layer").find('.video'));
            }
            if(elem.e.find(".c-layer").length){
                exitLayer(elem);
            }
            var elements=layer.find(".anim");
            layer.addClass("c-layer");
            if(elem.e.find(".ti-loading-slider").length){
                elements.each(function(){
                    var obj=$.parseJSON($("#"+$(this).attr('id')+"-anim").val());
                    $(this).css('top' , obj.top+"px");
                    $(this).css('left' , obj.left+"px");
                });
                setBullet(elem.bullets,elem.e);
                layer.trigger("jAnimSlideFinish");
                return false;
            }
            var slider={
                'width':elem.e.width(),
                'height':elem.e.height()
            };
            elements.each(function(){
                var obj=$.parseJSON($("#"+$(this).attr('id')+"-anim").val());
                this.__layer=obj;
                var dir=getDir(obj.dir);
                var animDir="";
                switch(dir){
                    case 'left':
                        $(this).css('left','-'+($(this).width()+100)+"px");
                        $(this).css('top' , obj.top+"px");
                        animDir="left";
                        break;
                    case 'top':
                        $(this).css('top','-'+($(this).height()+100)+"px");
                        $(this).css('left' , obj.left+"px");
                        animDir="top";
                        break;
                    case 'bottom':
                        $(this).css('top',(slider.height+$(this).height()+100)+"px");
                        $(this).css('left' , obj.left+"px");
                        animDir="top";
                        break;
                    case 'right':
                        $(this).css('left',(slider.width+$(this).width()+100)+"px");
                        $(this).css('top' , obj.top+"px");
                        animDir="left";
                        break;
                }
                obj_pos=$(this).position();
                jLayerCSS($(this),{
                    'type':'rotation'
                },0);
                if(obj.r_times){
                    jLayerAnimate({
                        'elem':$(this),
                        'start':0,
                        'end':parseInt(obj.r_times)*360,
                        'delay':parseInt(obj.r_delay),
                        'duration':parseInt(obj.r_duration),
                        'type':'rotate',
                        'transition':obj.r_easing,
                        'step':0//try to remove later
                    });
                }
                if($(this).hasClass("rotate-ac")){
                    jLayerAnimate({
                        'elem':$(this),
                        'start':360,
                        'end':0,
                        'delay':parseInt(obj.delay),
                        'duration':parseInt(obj.duration),
                        'type':'rotate',
                        'transition':obj.transition,
                        'step':0//try to remove later
                    });
                }
                if(animDir=="left"){
                    jLayerAnimate({
                        'elem':$(this),
                        'start':obj_pos.left,
                        'end':parseInt(obj.left),
                        'delay':parseInt(obj.delay),
                        'duration':parseInt(obj.duration),
                        'type':animDir,
                        'transition':obj.transition,
                        'step':0//try to remove later
                    });
                }else{
                    jLayerAnimate({
                        'elem':$(this),
                        'start':obj_pos.top,
                        'end':parseInt(obj.top),
                        'delay':parseInt(obj.delay),
                        'duration':parseInt(obj.duration),
                        'transition':obj.transition,
                        'type':animDir,
                        'step':0//try to remove later
                    });
                }
            });
            setBullet(elem.bullets,elem.e);
        }
        /*
         *Animates a slider based on options provided
         *@param {Object} options Animation parameters
         *@config {String} elem Id attribute of element
         *@config {Number} start Starting value for animation
         *@config {Number} end Final value for animation
         *@config {Number} delay Delay before starting the animation
         *@config {Number} duration Duration of animation
         *@config {String} transition Easing for animation
         *@config {String} type Type of animations(values rotate,queue or direction of animation)
         *@config {String} elem Id attribute of element
         */
        var jLayerAnimate=function(options){
            setTimeout(function(){
                jLayerAnimateLoop(options);
            }, options.delay)
        }
        window.jLayer_animations=Array();
        window.yt_players=Array();
        var jLayerAnimateLoop=function(options){
            elem=options.elem;
            elem_main=elem.parents(".layer");
            elem.attr("data-anim-"+options.type,"1");
            elem.attr('data-handler-'+options.type,setInterval(function(){
                jLayerAnimateStep(options);
            },window.jl_steps));
            var data=$.data(elem_main[0]);
            data[options.elem+options.type]=elem.attr("data-handler-"+options.type);
            $.data(elem_main[0],data);
            window.jLayer_animations.push(elem.attr("data-handler-"+options.type));
        }
        
        var jLayerAnimateStep=function(options){
            elem=options.elem;
            //calulate increase
            var curr_val=parseInt(elem.attr("data-anim-"+options.type));
            if(!curr_val){
                return false;
            }
            var val='';
            var start=options.start;
            if(options.start<options.end){
                diff=options.end-options.start;
                val=jQuery.easing[options.transition](null, (curr_val*(window.jl_steps)), 0, diff, options.duration);
                val=Math.ceil(val);
                val=options.start+val;
                nval=jQuery.easing[options.transition](null, ((curr_val+1)*(window.jl_steps)), 0, diff, options.duration);
                nval=Math.ceil(nval);
                nval=options.start+nval;
                if((val<=options.end&&nval<options.end)){
                    curr_val++;
                    jLayerCSS(elem,options,val);
                    if(elem.attr("data-anim-"+options.type)){
                        elem.attr("data-anim-"+options.type,curr_val);
                    }
                }else{
                    jLayerCSS(elem,options,options.end);
                    clearInterval(elem.attr('data-handler-'+options.type));
                    elem.attr('data-handler-'+options.type,0);
                    elem.trigger("jAnimFinished");
                }
            }else{
                diff=options.start-options.end;
                val=jQuery.easing[options.transition](null, (curr_val*(window.jl_steps)), 0, diff, options.duration);
                val=Math.ceil(val);
                nval=jQuery.easing[options.transition](null, ((curr_val+1)*(window.jl_steps)), 0, diff, options.duration);
                nval=Math.ceil(nval);
                val=start-val;
                nval=start-nval;
                if((val>options.end&&nval>options.end)){
                    curr_val++;
                    jLayerCSS(elem,options,val);
                    if(elem.attr("data-anim-"+options.type)){
                        elem.attr("data-anim-"+options.type,curr_val);
                    }
                }else{
                    jLayerCSS(elem,options,options.end);
                    clearInterval(elem.attr('data-handler-'+options.type));
                    elem.removeAttr('data-handler-'+options.type);
                    elem.trigger("jAnimFinished");
                }
            }
        }
        /*
         *Clears all current animations on a slider
         *@param {object} elem jQuery object for slideshow
         */
        var clearAnimations=function(elem){
            elem.e.find(".layer").each(function(){
                $.each($.data(this),function(k,v){
                    clearInterval(v); 
                });
                $.data(this,{});
            });
            for( i = 0; i < window.jLayer_animations.length; i++){
                clearInterval(window.jLayer_animations[i]);
            }
            window.jLayer_animations=Array();
        }
        var jLayerCSS=function(elem,options,val){
            switch(options.type){
                case 'rotate':
                    elem.css('-webkit-transform','rotate('+val+'deg)');
                    elem.css('-moz-transform','rotate('+val+'deg)');
                    elem.css('-css-transform','rotate('+val+'deg)');
                    elem.css('-ms-transform','rotate('+val+'deg)');
                    elem.css('transform','rotate('+val+'deg)');
                    break;
                case 'skew':
                    elem.css('-webkit-transform','skew('+val+'deg)');
                    elem.css('-moz-transform','skew('+val+'deg)');
                    elem.css('-css-transform','skew('+val+'deg)');
                    elem.css('-ms-transform','skew('+val+'deg)');
                    elem.css('transform','skew('+val+'deg)');
                    break;
                default:
                    elem.css(options.type,val+"px");
                    break;
            }
        }
        
        var exitLayer=function(elem){
            elem.e.find(".p-layer").removeClass("p-layer");
            var elements=elem.e.find(".c-layer").find('.anim');
            elem.e.find(".c-layer").addClass("p-layer").removeClass("c-layer");
            var zIndexNumber = 1000;
            // Put your target element(s) in the selector below!
            elem.e.find('.anim').each(function(){
                $(this).css('z-index',zIndexNumber);
                    
            });
            elements.each(function(){
                var obj=$.parseJSON($("#"+$(this).attr('id')+"-anim").val());
                if(!$(this).hasClass("bg")){
                    var dir=getDir(obj.dir);
                    var end=0;
                    var pos = {
                        'left':parseInt(obj.left),
                        'top':parseInt(obj.top)
                    };
                    switch(dir){
                        case 'left':
                            end=$(this).outerWidth();
                            jLayerAnimateLoop({
                                'elem':$(this),
                                'start':pos.left,
                                'end':(-end),
                                'delay':0,
                                'duration':parseInt(obj.duration)*2,
                                'type':"left",
                                'transition':obj.transition,
                                'step':0//try to remove later
                            });
                            break;
                        case 'top':
                            end=$(this).outerHeight();
                            jLayerAnimateLoop({
                                'elem':$(this),
                                'start':pos.top,
                                'end':(-end),
                                'delay':0,
                                'duration':parseInt(obj.duration)*2,
                                'type':"top",
                                'transition':obj.transition,
                                'step':0//try to remove later
                            });
                            break;
                        case 'bottom':
                            end=elem.e.height();
                            jLayerAnimateLoop({
                                'elem':$(this),
                                'start':pos.top,
                                'end':end,
                                'delay':0,
                                'duration':parseInt(obj.duration)*2,
                                'type':"top",
                                'transition':obj.transition,
                                'step':0//try to remove later
                            });
                            break;
                        case 'right':
                            end=elem.e.width();
                            jLayerAnimateLoop({
                                'elem':$(this),
                                'start':pos.left,
                                'end':end,
                                'delay':0,
                                'duration':parseInt(obj.duration)*2,
                                'type':"left",
                                'transition':obj.transition,
                                'step':0//try to remove later
                            });
                            break;
                    }
                }
            });
        }
        var setBullet=function(bullets,elem){
            bullets.find(".active").removeClass("active");
            bullets.find("a").eq(elem.find(".layer").index($('.c-layer'))).addClass("active");
        }
        window.layer_queue=Array();
        var getDir=function(dir){
            if(dir=="left"||dir=="right"||dir=="top"||dir=="bottom"){
                return dir;
            }else{
                dir=Math.floor((Math.random()*4)+1);
                switch(dir){
                    case 1:
                        dir="left";
                        break;
                    case 2:
                        dir="right";
                        break;
                    case 3:
                        dir="top";
                        break;
                    case 4:
                        dir="bottom";
                        break;
                }
                return dir;
            }
        }
        /**
         *Listens to vimoe video player events
         */
        var jLayerVideoListner=function(e){
            var data = $.parseJSON(e.data);
            if(data.event=="pause"||data.event=="finish"){
                $(".c-layer").each(function(){
                    if($(this).find(".vim-video").length){
                        jLayerAutoNext($(this).parents(".ti-jlayer-slideshow"));
                    }
                })
            }
            if(data.event=="play"){
                $(".c-layer").each(function(){
                    if($(this).find(".vim-video").length){
                        jLayerAutoPause($(this).parents(".ti-jlayer-slideshow"));
                    }
                })
            }
            
        }
        /* Starts a Slideshow 
         * @param {object} e jQuery element object of the slideshow
         * @param {delay} e delay between slides
         * */
        var jLayerAutoStart=function(e,delay){
            
            //check if timeout is not zero
            var data=$.data(e[0]);
            if(!data.autoplay){
            data.autoplay=setTimeout(function(){
                    jLayerAutoNext(e,data.autoplay)
            }, delay);
            }
                $.data(e[0],data);
            }
        window.jlp=0;
        window.jlr=0;
        /* Pauses a slideshow's autoplay 
         * @param {object} e jQuery element object of the slideshow
         * */
        var jLayerAutoPause=function(e){
            window.jlp++;
            var data=$.data(e[0]);
            clearTimeout(data.autoplay);
            data.autoplay=0;
            $.data(e[0],data);
        }
        
        /*
         * To proceed the slider
         */
        var jLayerAutoNext=function(e){
            var idx=e.find(".layer").index(e.find(".c-layer"))+1;
            var limit=e.find(".layer").length;
            elem={
                e:e,
                bullets:$("#"+e.attr("id")+"-bullets")
            };
            if(idx<limit){
                showLayer(elem,idx);
            }else{
                showLayer(elem,0);
            }
        }
        // Listen for messages from the player
        if (window.addEventListener){
            window.addEventListener('message', jLayerVideoListner, false);
        }
        else {
            window.attachEvent('onmessage', jLayerVideoListner, false);
        }
        var jLayerYTPlay=function(e){
            data=$.data($(e.target.a).parents(".ti-jlayer-slideshow")[0]);
            if($(e.target.a).parents(".c-layer").length&&data.vidAutoplay){
                window.yt_players[$(e.target.a).attr("id")]=e.target;
                e.target.playVideo();
                jLayerAutoPause($(e.target.a).parents(".ti-jlayer-slideshow"));
            }
        }
        var jLayerYTPause=function(e){
            if(e.target){
                window.yt_players[$(e.target.a).attr("id")]=e.target;
            }
            if(e.data==0||e.data==2){
                if($(e.target.a).parents(".c-layer").length){
                jLayerAutoNext($(e.target.a).parents(".ti-jlayer-slideshow"));
            }
        }
            if(e.data==1){
                if(!$(e.target.a).parents(".c-layer").length){
                    //e.target.a.src = e.target.a.src;
                }
                jLayerAutoPause($(e.target.a).parents(".ti-jlayer-slideshow"));
            }
        }
        var jLayerPauseVideos=function(video){
            if(video.length==1){
            f=video.find("iframe");
            if(video.hasClass('vim-video')){
                url = f.attr('src').split('?')[0];
                f[0].contentWindow.postMessage('{"method":"pause"}', url);
            }else{
                    if(window.yt_players[f.attr("id")]){
                        window.yt_players[f.attr("id")].stopVideo();
            }
        }
            }else{
                video.each(function(){
                    f=$(this).find("iframe");
                    if($(this).hasClass('vim-video')){
                        url = f.attr('src').split('?')[0];
                        f[0].contentWindow.postMessage('{"method":"pause"}', url);
                    }else{
                        if(window.yt_players[f.attr("id")]){
                            window.yt_players[f.attr("id")].stopVideo()
                        }
                    }
                });
            }
        }
        var jLayerVideo=function(elem,autoplay){
            //checks current layer for any youtube or vimeo video, if one found play them, set up listners to handle autoplay
            //in case of many videos set simple event listners for pause and stop
            if(elem.find(".c-layer").find(".yt-video,.vim-video").length==1){
                //there is a single video so play it
                if(elem.find(".c-layer").find(".video").hasClass("vim-video")){
                    var f = elem.find(".c-layer").find('iframe'),
                    url = f.attr('src').split('?')[0];
                    f[0].contentWindow.postMessage('{"method":"addEventListener","value":"pause"}', url);
                    f[0].contentWindow.postMessage('{"method":"addEventListener","value":"finish"}', url);
                    f[0].contentWindow.postMessage('{"method":"addEventListener","value":"play"}', url);
                    if(autoplay){
                        f[0].contentWindow.postMessage('{"method":"play"}', url);
                        jLayerAutoPause(elem);
                    }
                    

                }else{
                    if(autoplay){
                        jLayerAutoPause(elem);
                    }
                    var id=elem.find(".c-layer").find('iframe').attr("id");
                    if(!window.yt_players[id]){
                    var hndl=document.getElementById(id);
                    hndl.src = hndl.src;
                    var player=new YT.Player(id,{
                        events: {
                            'onReady': jLayerYTPlay,
                            'onStateChange':jLayerYTPause
                        }
                    });
                    }else{
                        window.yt_players[id].playVideo();
                    }
                    
                }
            }else{
                //multiple videos
                elem.find(".c-layer").find(".video").each(function(){
                    if($(this).hasClass('vim-video')){
                        var f = $(this).find('iframe'),
                        url = f.attr('src').split('?')[0];
                        f[0].contentWindow.postMessage('{"method":"addEventListener","value":"pause"}', url);
                        f[0].contentWindow.postMessage('{"method":"addEventListener","value":"finish"}', url);
                        f[0].contentWindow.postMessage('{"method":"addEventListener","value":"play"}', url);
                    }else{
                        var id=$(this).find('iframe').attr("id");
                        if(!window.yt_players[id]){
                            window.yt_players[id]=false;
                            var hndl=document.getElementById(id);
                            hndl.src = hndl.src;
                            var player=new YT.Player(id,{
                                events: {
                                    'onStateChange':jLayerYTPause
            }
                            });
        }
                    }
                })
            }
        }
        elem.bullets=$("#"+$(elem).attr("id")+"-bullets");
        elem.e=$(elem);
        elem.e.find('.jlayer-text').each(function(){
            setTextWidth($(this));
        })
        elem.e.find(".ti-jlayer-left").live("click",function(event){
            event.preventDefault();
            elem_id=$(this).parents(".ti-jlayer-slideshow").attr("id");
            bullets=$("#"+elem_id+"-bullets").find("li");
            var curr=bullets.index(bullets.find(".active").parent());
            if(curr==0){
                bullets.last().find("a").trigger("click");
            }else{
                //go to before one
                bullets.find(".active").parent().prev().find('a').trigger("click");
            }
        })
        elem.e.find(".ti-jlayer-right").live("click",function(event){
            event.preventDefault();
            elem_id=$(this).parents(".ti-jlayer-slideshow").attr("id");
            bullets=$("#"+elem_id+"-bullets").find("li");
            var curr=bullets.index(bullets.find(".active").parent());
            var total=bullets.length;
            if(curr<(total-1)){
                bullets.find(".active").parent().next().find('a').trigger("click");
              
            }else{
                //go to before one
                bullets.first().find("a").trigger("click");
            }
        })
        elem.bullets.find("a.bullet").live("click",function(event){
            
            if($(this).hasClass("active")){
                //nothing to do already active
                return false;
            }
            var bullets=$(this).parents("ul");
            var id=bullets.attr("id").replace(/\-bullets/,'');
            elem={
                e:$("#"+id),
                bullets:bullets
            };
            showLayer(elem,bullets.find("a.bullet").index($(this)));
            event.preventDefault();
        })
        elem.e.find(".anim").live("jAnimFinished",function(event){
            if(!$(this).hasClass("anim-finished")){
                $(this).addClass("anim-finished");
            }
            if($(this).parents(".c-layer").length){
                if($(this).parent(".layer").find(".anim").length==$(this).parent(".layer").find(".anim-finished").length){
                    $(this).parent(".layer").trigger("jAnimSlideFinish");
                }
            }
            
        })
        elem.e.find(".layer").live("jAnimSlideFinish",function(){
            if(!window.jlayer_slider_started){
                $(this).parents(".ti-jlayer-slideshow").show();
                $(this).parents(".ti-jlayer-slideshow").find(".ti-loading-slider").fadeOut(1000,function(){$(this).remove();});
            }
            data=$.data($(this).parents(".ti-jlayer-slideshow")[0]);
            if(data.hasOwnProperty("autoplay")){
                jLayerAutoPause($(this).parents(".ti-jlayer-slideshow"));
                
            }
            jLayerAutoStart($(this).parents(".ti-jlayer-slideshow"),data.delay);
            jLayerVideo($(this).parents(".ti-jlayer-slideshow"),data.vidAutoplay);
        });
        //        elem.e.find(".c-layer").find(".video").live("mouseenter",function(event){
        //            elem.e.find(".video-focus").removeClass("video-focus")
        //            $(this).addClass("video-focus");
        //            event.preventDefault();
        //        })
        showLayer(elem,0);
    }
    /*
     * Main loader of tile slider
     */
    $.fn.jlayer = function(options) {
        /* Loop through the HTML elements*/
        return this.each(function(key, value){
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('jlayer')) return element.data('jlayer');
            // Pass options to plugin constructor
            var jlayer_o = new jlayer(this, options);
            // Store plugin object in this element's data
            element.data('jlayer', jlayer_o);
        });
    };
    /*
     *Default settings on tileSlider
     */
    $.fn.jlayer.defaults={
    
    };
})(jQuery);
//youtube
var s = document.createElement("script");
s.src = "http://www.youtube.com/player_api"; /* Load Player API*/
var before = document.getElementsByTagName("script")[0];
before.parentNode.insertBefore(s, before);
                    
function onYouTubePlayerAPIReady() {
}
/** Sets width of a text element so that animation effects can be applied to them neatly 
 *  @param Object elem text element
 **/
var setTextWidth=function(elem){
    w=parseInt(elem.css('width').replace('px',''));
    h=parseInt(elem.css('height').replace('px',''));
    for(i=0;i<w;i++){
        w--;
        elem.css({'width':w+"px"});
        if(h<parseInt(elem.css('height').replace('px',''))){
            h=0;
            break;
        }
    }
    w=w+20;
    elem.css({'width':w+"px"});
}
jQuery(document).ready(function(){
    jQuery(".ti-jlayer-slideshow").each(function(){
        jQuery("#"+jQuery(this).attr("id")).jlayer({
            'delay':jQuery(this).find(".ti-delay").val(),
            'vidAutoplay':jQuery(this).find(".ti-autoplay").val()
        });
    })
});
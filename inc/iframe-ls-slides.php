<html>
    <head>
        <title>Layer Slides</title>
        <link rel="stylesheet" type="text/css" href="<?php echo plugins_url('css/jlayer.css', dirname(__FILE__)) ?>"/>
        <link rel="stylesheet" type="text/css" href="<?php echo plugins_url('css/symbols/stylesheet.css', dirname(__FILE__)) ?>"/>
        <link rel="stylesheet" type="text/css" href="<?php echo plugins_url('css/lobster/stylesheet.css', dirname(__FILE__)) ?>"/>
        <style type="text/css">
            .sp-ls-slider-iframe{
                font-weight: normal;
                color: #666;
                line-height: 20px;
                border-bottom: 1px solid #ddd;
            }
            .sp-ls-slider-iframe .ti-icon{
                font-weight: normal;
                line-height: 15px;
                font-size: 20px;
            }
        </style>
    <?php
    add_action('admin_print_scripts','ls_iframe_res');
    function ls_iframe_res(){
        wp_enqueue_script('jquery');
    }
    do_action('admin_print_scripts');?>
    <script type="text/javascript">
        jQuery(document).ready(function($){
            $("#ti-insert-slide").live("click",function(){
                var slides=Array();
                $(".sp-ls-slider-iframe").each(function(){
                    if($(this).find(".curr-slides").is(':checked')){
                        slides.push({'name':$(this).find(".iframe-slide-title").text(),'id':$(this).find(".curr-slides").val()});
                    }
                });
                parent.send_slides_to_slider(slides);
            })
        })
    </script>
</head>
<body class="wrap">
    <div class="ti-admin-icon">c</div><h2 class="sp-admin-title">Layer Sliders</h2>
    <?php
    $slides = get_option('ti_ls_slides', array());
    foreach ($slides as $key => $slide) {
        $slide = get_option($slide, array());
        $elem_c = array('bg' => 0, 'image' => 0, 'video' => 0, 'text' => 0);
        if (is_array($slide->elems)) {
            foreach ($slide->elems as $elem) {
                $elem_c[$elem->type]++;
            }
        }
        ?>
        <div>
            <div class="sp-ls-slider-iframe">
                <input type="hidden" class="ti-slide-id" value="<?php echo $this->slides[$key]; ?>"/>
                <input type="checkbox" class="curr-slides" value="<?php echo $this->slides[$key]; ?>"/>
                <span class="iframe-slide-title"><?php echo $slide->name; ?></span>
                <span class="stat"><span class="ti-icon ti-icon-il">v</span><?php echo $elem_c['video']; ?></span>
                <span class="stat"><span class="ti-icon ti-icon-il">A</span><?php echo $elem_c['text']; ?></span>
                <span class="stat"><span class="ti-icon ti-icon-il">$</span><?php echo $elem_c['bg']; ?></span>
                <span class="stat"><span class="ti-icon ti-icon-il">c</span><?php echo $elem_c['image']; ?></span>
                <span class="sp-clear"></span>
            </div>
        </div>
        <?php
    }
    ?>
    <button class="button blue" id="ti-insert-slide"><i>K</i><?php _e('Insert'); ?></button>
</body>
</html>
<?php
/*
  Plugin Name: jLayer Parallax Slider
  Plugin URI: http://unizoe.com/product/jlayer-wp/
  Description: jLayer Parallax Slider WordPress plugin adds a powerful parallax slider. jLayer Parallax Slider is SEO Optimized and has youtube/vimeo
  video playblack capability.
  Version: 1.0
  Author: Unizoe Web Solutions
  Author URI: http://unizoe.com/
  Copyright 2012  Unizoe Web Solutions.  (email : unizoews@gmail.com)
  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License, version 2, as
  published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */
/**
 * Includes and integrates main jLayer parallax class
 * @package jLayerWP 
 */
require_once(dirname(__FILE__) . '/inc/slider-ls.php');
/**
 * Object of jLayer parallax class
 * @see LayerSlider
 * @global mixed $_GLOBALS["myvar"] 
 * @package jLayerWP 
 */
global $jlayer_wp;
$jlayer_wp = new LayerSlider();
/**
 * @todo Add a resource loader
 * @todo write a custom css
 * @todo shortcode rendering
 * @todo write/port ajax handlers
 */
/**
 * Hooks into wordpress init action
 * @package jLayerWP 
 */
add_action("init", "jLayerWPInit");

/**
 * Starts the update action of the jLayer Parallax Class 
 * @see LayerSlider::updateAdminPage()
 * @return void
 * @package jLayerWP 
 */
function jLayerWPInit() {
    global $jlayer_wp;
    $jlayer_wp->updateAdminPage();
}

add_action("admin_menu", 'jLayerWPMenu');

/**
 * Creates WordPress menu
 * @package jLayerWP 
 * @return void
 */
function jLayerWPMenu() {
    global $jlayer_wp;
    $page = add_submenu_page('themes.php', 'jLayer Parallax Slider', 'jLayer Parallax Slider', 'manage_options', 'jlayer-parallax-slider', array($jlayer_wp, 'getAdminPage'));
    add_action('admin_print_styles', 'jLayerWPRes');
}

/**
 * Includes css and js files in WordPress admin panel
 * @package jLayerWP 
 * @return void jquery-impromptu.4.0.min
 */
function jLayerWPRes() {
    wp_enqueue_style('jlayer-admin', plugins_url('css/jlayer.css', __FILE__));
    wp_enqueue_style('jlayer-font-icons', plugins_url('css/symbols/stylesheet.css', __FILE__));
    wp_enqueue_style('jlayer-sansation-bold', plugins_url('css/sansation-bold/stylesheet.css', __FILE__));
    wp_enqueue_style('jlayer-open-sans-light', plugins_url('css/open-sans-light/stylesheet.css', __FILE__));
    wp_enqueue_style('jlayer-ballpark', plugins_url('css/ballpark/stylesheet.css', __FILE__));
    wp_enqueue_style(array('media-upload', 'thickbox', 'farbtastic'));
    wp_enqueue_script(array('jquery', 'media-upload', 'thickbox', 'jquery-ui-core','jquery-ui-widget','jquery-ui-mouse','jquery-ui-resizable', 'jquery-ui-draggable', 'jquery-ui-sortable', 'farbtastic'));
    wp_enqueue_script('jquery-prompt', plugins_url('js/jquery-impromptu.4.0.min.js', __FILE__));
    wp_enqueue_script('jlayer-admin', plugins_url('js/admin-ls.js', __FILE__));
    $admin_ls_loc = array(
        'txt_remove' => __('Remove'),
        'txt_random' => __('Random'),
        'txt_top' => __('Top'),
        'txt_right' => __('Right'),
        'txt_bottom' => __('Bottom'),
        'txt_left' => __('Left'),
        'slide_conf' => __('Are you sure to delete this slide?'),
        'slider_conf' => __('Are you sure to delete this slider?')
    );
    wp_localize_script('jlayer-admin', 'admin_ls_text', $admin_ls_loc);
}

/**
 * Displays Admin panel page
 * @see LayerSlider
 * @package jLayerWP 
 * @return void
 */
function jLayerWPAdmin() {
    global $jlayer_wp;
    $jlayer_wp->getAdminPage();
}

/**
 * Input Text
 * 
 * prints a input text.
 * <code>
 * sp_admin_text(array('slug' => 'slug-of-element', 'name' => 'Name of Element')) ;
 * </code> 
 * @package twistItAdmin
 * @param array $data data for form element
 * @return void
 */
if (!function_exists('sp_admin_text')) {

    function sp_admin_text($data) {
        ?>
        <p class="sp-form-row">
            <label for="sp-<?php echo $data['slug']; ?>"><?php _e($data['name']); ?></label>
            <input type="text" class="sp-input" id="sp-<?php echo $data['slug']; ?>" name="sp-<?php echo md5($data['slug']); ?>" value="<?php echo((isset($data['value'])) ? $data['value'] : get_option('sp-' . md5($data['slug']), '')); ?>"/>
            <span class="clear"></span></p>
        <?php
    }

}
/**
 * Input Checkbox
 * 
 * prints a input checkbox.
 * <code>
 * sp_admin_checkbox(array('slug' => 'slug-of-element', 'name' => 'Name of Element')) ;
 * </code>
 * @package twistItAdmin
 * @param array $data data for form element
 * @return void
 */
if (!function_exists('sp_admin_checkbox')) {

    function sp_admin_checkbox($data) {
        ?>
        <p class="sp-form-row">
            <label for="sp-<?php echo $data['slug']; ?>"><?php _e($data['name']); ?></label>
            <input type="checkbox" class="sp-input" id="sp-<?php echo $data['slug']; ?>" name="sp-<?php echo md5($data['slug']); ?>" <?php echo((get_option('sp-' . md5($data['slug']), '')) ? 'checked="true"' : ''); ?>/>
            <span class="sp-clear"></span></p>
        <?php
    }

}
/**
 * Returns html for jLayer Parallax Slider
 * @param string $atts shortcode atts
 * @param string $content shortcode content
 * @return html jLayer Parallax Slider
 * @package twistItShortcodes
 */
function jlayer_parallax($atts = null, $content = null) {
    extract(shortcode_atts(array(
                'id' => ''
                    ), $atts));
    $sliders = get_option('ti_ls_sliders', array());
    if (isset($sliders[$id])) {
        $slider = get_option($sliders[$id]);
        $slider_id = uniqid('jlayer-slider-');
        $animations = array();
        ?>
        <div id="<?php echo $slider_id; ?>" class="ti-jlayer-slideshow" style="width:<?php echo $slider->width; ?>px;height:<?php echo $slider->height; ?>px;">
            <a class="ti-jlayer-left" href="#"></a>
            <a class="ti-jlayer-right" href="#"></a>
            <div class="ti-jlayer-vp">
                <?php
                if (is_array($slider->slides)) {

                    $i = 0;
                    foreach ($slider->slides as $slide) {
                        $slide = get_option($slide);
                        $i++;
                        ?>
                        <div class="layer" id="layer<?php echo $i ?>">
                            <?php
                            //Create slider elems and animations elems
                            if (is_array($slide->elems)) {
                                foreach ($slide->elems as $elem) {
                                    $id = uniqid('jlayer-elem-');
                                    switch ($elem->type) {
                                        case 'image':
                                            echo '<img src="' . $elem->image . '" id="' . $id . '" class="anim"/>';
                                            break;
                                        case 'video':
                                            if ($elem->video_type == "Vimeo") {
                                                $elemid = uniqid('ti-vimeo-');
                                                echo '<div  class="anim vim-video video" id="' . $id . '">
                                                            <iframe src="http://player.vimeo.com/video/' . $elem->video . '?api=1&player_id=' . $elemid . '" width="' . (isset($elem->video_width) ? $elem->video_width : '400') . '" height="' . (isset($elem->video_height) ? $elem->video_height : '400') . '" frameborder="0" id="' . $elemid . '" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
                                                        </div>';
                                            } else {
                                                $elemid = uniqid('ti-yt-');
                                                echo '<div  class="anim yt-video video" id="' . $id . '">
                                                            <iframe height="' . (isset($elem->video_height) ? $elem->video_height : '400') . '" id="' . $elemid . '" width="' . (isset($elem->video_width) ? $elem->video_width : '400') . '" src="http://www.youtube.com/embed/' . $elem->video . '?wmode=transparent&enablejsapi=1&&playerapiid=' . $elemid . '" frameborder="0" allowfullscreen></iframe>
                                                        </div>';
                                            }
                                            break;
                                        case 'bg':
                                            echo '<div class="bg anim" id="' . $id . '" style="background-color:' . $elem->background_color . ';height:' . $slider->height . 'px;"></div>';
                                            break;
                                        case 'text':
                                            echo '<div id="' . $id . '" class="anim jlayer-text font-' . $elem->font_family . '" style="color:' . $elem->color . ';font-size:' . $elem->text_size . ';line-height:' . $elem->text_size . '; width:' . $elem->width . 'px;height:' . $elem->height . 'px;">' . $elem->text . '</div>';
                                            break;
                                        case 'link':
                                            echo '<a href="'.$elem->href.'" class="anim" id="'.$id.'">'.$elem->label.'</a>';
                                    }
                                    $animations[] = '<input type="hidden" id="' . $id . '-anim" value=\'{"top":"' . $elem->top . '","left":"' . $elem->left . '","duration":"' . $elem->duration . '", "dir":"' . $elem->direction . '", "delay":"' . $elem->delay . '","transition":"' . $elem->easing . '","r_easing":"' . $elem->r_easing . '","r_times":"' . $elem->r_times . '","r_duration":"' . $elem->r_duration . '","r_delay":"' . $elem->r_delay . '"}\' />';
                                    echo "\n";
                                }
                            }
                            ?>

                        </div>
                        <?php
                    }
                }
                ?>
                 <div class="ti-loading-slider"></div>
                <input type="hidden" class="ti-delay" value="<?php echo $slider->delay; ?>"/>
                <input type="hidden" class="ti-autoplay" value="<?php echo (($slider->vidAutoplay)?'1':'0'); ?>"/>
            </div>
            <div class="animation">
        <?php echo implode("\n", $animations); ?>
            </div>
        </div>

        <ul id="<?php echo $slider_id; ?>-bullets" class="bullets" style="width:<?php echo($i * 22); ?>px;">
            <?php
            while ($i > 0) {
                $i--;
                echo '<li><a href="#" class="bullet"></a></li>';
            }
            ?>
        </ul>
        <?php
    }
}

add_shortcode("jlayer-parallax", 'jlayer_parallax');
/**
 * Enqueues jlayer css and js files
 */
add_action("wp_head", 'jlayer_site_head');

function jlayer_site_head() {
    wp_enqueue_script("jquery", plugins_url("js/jquery.js", __FILE__));
    wp_enqueue_script("jlayer-easing", plugins_url("js/jquery.easing.1.3.js", __FILE__));
    wp_enqueue_script("jlayer-parallax", plugins_url("js/jlayer.js", __FILE__));
    wp_enqueue_style("jlayer-parallax-css", plugins_url("css/jlayer-site.css", __FILE__));
    wp_enqueue_style('jlayer-sansation-bold', plugins_url('css/sansation-bold/stylesheet.css', __FILE__));
    wp_enqueue_style('jlayer-open-sans-light', plugins_url('css/open-sans-light/stylesheet.css', __FILE__));
    wp_enqueue_style('jlayer-ballpark', plugins_url('css/ballpark/stylesheet.css', __FILE__));
}

if (!function_exists("sp_admin_leftmenu")) {

    function sp_admin_leftmenu() {
        echo '';
    }

}
?>
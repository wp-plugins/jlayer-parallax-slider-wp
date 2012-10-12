<div class="update-nag">jLayer Parallax is one of many features of <a href="http://unizoe.com/product/twist-it/">Twist It WordPress Theme</a>.</div>
<div class="wrap">
    <?php sp_admin_leftmenu(); ?>
    <div class="sp-admin-area">
        <?php sp_ls_topmenu(); ?>
        <?php
        $page = 1;
        if (isset($_REQUEST['ti_page'])) {
            $page = $_REQUEST['ti_page'];
        }
        $items = 1;
        $total = count($this->sliders);
        $pages = ceil($total / $items);
        $this->sliders = array_slice($this->sliders, ($items * ($page - 1)), $items);
        if ($pages > 1) {
            ?>
            <div class="pagination pagination-right"><em>Page <?php echo $page . ' of ' . $pages; ?> </em><ul>
                    <?php
                    for ($i = 0; $i < $pages; $i++) {
                        echo '<a href="themes.php?page=jlayer-parallax-slider&tab=sliders&ti_page=' . ($i + 1) . '" class="' . ((($i + 1) == $page) ? 'currentpage' : '') . '">' . ($i + 1) . '</a>';
                    }
                    ?>
                </ul></div>
            <?php
        }
        $key = $items * ($page - 1);
        ?>
        <div class="ti-admin-icon">c</div>
        <h2 class="sp-admin-title"><?php _e('Layer Sliders'); ?><a href="#" class="add-new-h2" id="add-slider">Add New</a></h2>
        <div id="ls-sliders" class="admin-area">
            <div class="sp-ls-sliders">
                <div class="ls-slider-area">
                    <?php
                    $all_sliders=get_option('ti_ls_sliders', array());
                    if (empty($this->sliders)&$page>1) {
                        $this->sliders = array_slice($all_sliders, ($items * ($page - 2)), $items);
                    }
                    if (!empty($this->sliders)) {
                        foreach ($this->sliders as $slider_id) {
                            $slider = get_option($slider_id);
                            ?>
                            <div class="sp-ls-slider">
                                <div class="sp-ls-slider-content">
                                    <div class="sp-ls-slider-control sp-admin-controls">
                                        <a class="ti-icon ti-edit-slider" title="<?php _e('Edit Slider'); ?>" href="#<?php echo $slider_id; ?>">C</a>
                                        <a class="ti-icon ti-delete-slider" title="<?php _e('Delete Slider'); ?>" href="#<?php echo $slider_id; ?>">x</a>
                                    </div>
                                    <span class="ti-icon ti-title-icon">f</span><b><?php echo $slider->name; ?></b>
                                    <span class="sp-clear"></span>
                                </div>
                                <div class="sp-ls-slide-info">
                                    <em class="sp-ls-slide-count"><?php echo count($slider->slides); ?> Slide(s)</em>
                                    <span class="sp-sc-text">[jlayer-parallax id ="<?php echo(array_search($slider_id,$all_sliders)); ?>" /]</span>
                                </div>
                            </div>
                            <?php
                            $key++;
                        }
                    } else {
                        ?>
                        <div class="sp-ls-no-obj"><?php _e("No Sliders Found"); ?></div>
                    <?php }
                    ?></div>
            </div>
        </div>

    </div>
    <div class="sp-hide">
        <div>
            <form id="sp-ls-slider-form" method="post">
                <h3>Add a new layer slider</h3>
                <?php
                sp_admin_text(array('name' => 'Slider Name', 'slug' => 'ls-slider-name', 'value' => '', 'msg' => 'Name of the Slider(for your reference)'));
                sp_admin_text(array('name' => 'Slider Width(in px)', 'slug' => 'ls-slider-width', 'value' => '800', 'msg' => 'Width of the Slider'));
                sp_admin_text(array('name' => 'Slider Height(in px)', 'slug' => 'ls-slider-height', 'value' => '400', 'msg' => 'Height of the Slider'));
                sp_admin_text(array('name' => 'Autoplay Delay(in ms)', 'slug' => 'ls-slider-delay', 'value' => '1500', 'msg' => 'Delay in Autoplay between slides'));
                sp_admin_checkbox(array('name' => 'Video Autoplay', 'slug' => 'ls-slider-vidauto', 'value' => '0', 'msg' => 'If to play videos automatically'));
                ?>
                <p class="sp-form-row">
                    <label>
                        &nbsp;
                    </label>
                    <span class="sp-slider-contents">
                        <a href="#" id="ti-add-ls-slides" class="ti-icon-box"><span class="ti-icon">c</span>Add Slides</a>
                    </span>
                </p>
                <p class="sp-form-row sp-update"><label>&nbsp;</label><input type="submit" value="Save" /></p>
                <p class="sp-form-row sp-add"><label>&nbsp;</label>
                    <button class="button blue" id="ti-ajax-slider"><i>w</i>Save</button>
                    <input type="hidden" name="slider-id" id="ls-slider-id" value="new"/>
                </p>
            </form>
        </div>

    </div>
</div>

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
        $items = 6;
        $total = count($this->slides);
        $pages = ceil($total / $items);
        $this->slides = array_slice($this->slides, ($items * ($page - 1)), $items);
        if ($pages > 1) {
            ?>
            <div class="pagination pagination-right"><em>Page <?php echo $page . ' of ' . $pages; ?> </em><ul>
                    <?php
                    for ($i = 0; $i < $pages; $i++) {
                        echo '<a href="themes.php?page=jlayer-parallax-slider&tab=slides&ti_page=' . ($i + 1) . '" class="' . ((($i + 1) == $page) ? 'currentpage' : '') . '">' . ($i + 1) . '</a>';
                    }
                    ?>
                </ul></div>
            <?php
        }
        $key = $items * ($page - 1);
        ?>
        <div class="ti-admin-icon">c</div>
        <h2 class="sp-admin-title"><?php _e('Layer Slides'); ?><a href="#" class="add-new-h2" id="add-slide">Add New</a></h2>

        <div id="ls-slides" class="admin-area">
            <div class="sp-ls-slides">
                <div class="ls-slide-area">
                    <?php
                    $all_slides = get_option('ti_ls_slides', array());
                    if (empty($this->slides) & $page > 1) {
                        $this->slides = array_slice($all_slides, ($items * ($page - 2)), $items);
                    }
                    if (!empty($this->slides)) {
                        foreach ($this->slides as $slide_id) {
                            $slide = get_option($slide_id, array());
                            $elem_c = array('bg' => 0, 'image' => 0, 'video' => 0, 'text' => 0);
                            if (is_array($slide->elems)) {
                                foreach ($slide->elems as $elem) {
                                    $elem_c[$elem->type]++;
                                }
                            }
                            ?>
                            <div class="sp-ls-slider">
                                <div class="sp-ls-slider-content">
                                    <span class="ti-icon ti-title-icon">c</span><b><?php echo $slide->name; ?></b>
                                    <span class="stat"><span class="ti-icon ti-icon-il">v</span><?php echo $elem_c['video']; ?></span>
                                    <span class="stat"><span class="ti-icon ti-icon-il">A</span><?php echo $elem_c['text']; ?></span>
                                    <span class="stat"><span class="ti-icon ti-icon-il">$</span><?php echo $elem_c['bg']; ?></span>
                                    <span class="stat"><span class="ti-icon ti-icon-il">c</span><?php echo $elem_c['image']; ?></span>
                                    <span class="sp-clear"></span>
                                </div>
                                <div class="sp-ls-slide-info">
                                    <input type="hidden" class="ti-slide-id" value="<?php echo $slide_id; ?>"/>
                                    <a class="ti-edit-slide" href="#"><span class="ti-icon ti-icon-il">C</span>Edit Slide</a>
                                    <a class="ti-delete-slide" href="#"><span class="ti-icon ti-icon-il">x</span>Delete Slide</a>
                                    <span class="sp-clear"></span>
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
        <div id="sp-ls-slide-form">
            <div class="ls-admin-icon-bar">
                <a id="ls-add-img" class="ls-admin-icon" title="Add an Image" href="#">c</a>
                <a id="ls-add-video" class="ls-admin-icon thickbox" title="Add a Video" href="#TB_inline?height=155&width=500&inlineId=ls-admin-video">v</a>
                <a id="ls-slide-title" class="ls-admin-icon thickbox" title="Add Text" href="#TB_inline?height=155&width=500&inlineId=ls-admin-text">s</a>
                <a id="ls-slide-background" class="ls-admin-icon thickbox" title="Add a Background" href="#TB_inline?height=155&width=500&inlineId=ls-admin-background">$</a>
                <a id="ls-slide-link" class="ls-admin-icon thickbox" title="Add a Link" href="#TB_inline?height=155&width=500&inlineId=ls-admin-link">-</a>
                <a id="ls-slide-settings" class="ls-admin-icon thickbox" title="Settings" href="#TB_inline?height=155&width=500&inlineId=ls-admin-settings">d</a>
            </div>
            <div class="ls-slide-info">
                <label for="ls-slide-name">Slide name </label>
                <input type="text" name="ls-slide-name" id="ls-slide-name"/>
                <input type="hidden" name="ls-slide-name" id="ls-slide-id" value="new"/>
                <button class="button blue" id="ti-save-slide"><i>w</i>Save</button>
            </div>
            <div class="ls-slide-box"></div>
            <div class="ls-slide-box-items">
                <div id="ls-admin-video" style="display: none;">
                    <form method="post">
                        <h2>Add a video</h2>
                        <p class="sp-form-row">
                            <label for ="ti-vid-url">Video URL</label>
                            <input type="text" name="ti-vid-url" id="ti-vid-url"/>
                            <span class="sp-video-logo" id="ti-youtube-icon"><img src="<?php echo plugins_url('images/youtube-icon.png', dirname(__FILE__)); ?>" title="YouTube"/></span>
                            <span class="sp-video-logo" id="ti-vimeo-icon"><img src="<?php echo plugins_url('images/vimeo-icon.png', dirname(__FILE__)); ?>" title="Vimeo"/></span>
                        </p>
                        <p class="sp-form-row">
                            <label for ="ti-vid-url">Video Width</label>
                            <input type="text" name="ti-vid-width" id="ti-vid-width"/>
                        </p>
                        <p class="sp-form-row">
                            <label for ="ti-vid-url">Video Height</label>
                            <input type="text" name="ti-vid-height" id="ti-vid-height"/>
                        </p>
                        <p class="sp-form-row">
                            <label>&nbsp;</label>
                            <button class="insert-sc" id="ti-insert-video">Insert</button>
                        </p>
                    </form>
                </div>
                <div id="ls-admin-text" style="display: none;">
                    <form method="post">
                        <h2>Add a Title</h2>
                        <p class="sp-form-row">
                            <label for ="ti-text">Text</label>
                            <textarea name="ti-text" id="ti-text"></textarea>
                        </p>
                        <p class="sp-form-row">
                            <label for ="ti-font-size">Font Size(in Px)</label>
                            <input type="text" name="ti-font-size" id="ti-font-size" value="25"/>
                        </p>
                        <p class="sp-form-row">
                            <label for ="ti-font-family">Font Family</label>
                            <select id="ti-font-family" name="ti-font-family">
                                <option value="sansation">Sensation(for titles)</option>
                                <option value="opensans">OpenSans(for captions/links/etc.)</option>
                                <option value="ballpark">BallPark(for cursive texts.)</option>
                            </select>
                        </p>
                        <p class="sp-form-row">
                            <label for ="ti-font-color">Font Color</label>
                            <input class="sp-ls-title-color" type="text" id="ti-font-color"/>
                            <span class="sp-ls-title-picker"></span>
                        </p>
                        <p class="sp-form-row">
                            <label>&nbsp;</label>
                            <button class="insert-sc" id="ti-insert-text">Insert</button>
                        </p>
                    </form>
                </div>
                <div id="ls-admin-text-edit" style="display: none;">
                    <form method="post">
                        <h2>Edit title</h2>
                        <p class="sp-form-row">
                            <label for ="ti-text-edit">Text</label>
                            <textarea name="ti-text-edit" id="ti-text-edit"></textarea>
                        </p>
                        <p class="sp-form-row">
                            <label for ="ti-font-size-edit">Font Size(in Px)</label>
                            <input type="text" name="ti-font-size-edit" id="ti-font-size-edit" value="25"/>
                        </p>
                        <p class="sp-form-row">
                            <label for ="ti-font-family-edit">Font Family</label>
                            <select id="ti-font-family-edit" name="ti-font-family-edit">
                                <option value="sansation">Sensation(for titles)</option>
                                <option value="opensans">OpenSans(for captions/links/etc.)</option>
                                <option value="ballpark">BallPark(for cursive texts.)</option>
                            </select>
                        </p>
                        <p class="sp-form-row">
                            <label for ="ti-font-color-edit">Font Color</label>
                            <input class="sp-ls-title-color-edit" type="text" id="ti-font-color-edit"/>
                            <span class="sp-ls-title-picker-edit"></span>
                        </p>
                        <p class="sp-form-row">
                            <label>&nbsp;</label>
                            <input class="ti-elem-id" id="ti-elem-id" value="" type="hidden"/>
                            <button class="insert-sc" id="ti-update-text">Update</button>
                        </p>
                    </form>
                </div>
                <div id="ls-admin-link" style="display: none;">
                    <form method="post">
                        <h2>Add a Link</h2>
                        <p class="sp-form-row">
                            <label for ="ti-label">Label</label>
                            <input type="text" name="ti-label" id="ti-label" value=""/>
                        </p>
                        <p class="sp-form-row">
                            <label for ="ti-link">URL</label>
                            <input type="text" name="ti-link" id="ti-link" value="http://"/>
                        </p>
                        <p class="sp-form-row">
                            <label>&nbsp;</label>
                            <button class="insert-sc" id="ti-insert-link">Insert</button>
                        </p>
                    </form>
                </div>
                <div id="ls-admin-link-edit" style="display: none;">
                    <form method="post">
                        <h2>Edit link</h2>
                        <p class="sp-form-row">
                            <label for ="ti-label-edit">Label</label>
                            <input type="text" name="ti-label-edit" id="ti-label-edit" value=""/>
                        </p>
                        <p class="sp-form-row">
                            <label for ="ti-link-edit">URL</label>
                            <input type="text" name="ti-link-edit" id="ti-link-edit" value="http://"/>
                        </p>
                        <p class="sp-form-row">
                            <label>&nbsp;</label>
                            <button class="insert-sc" id="ti-update-link">Update</button>
                            <input type="hidden" class="ls-elem-id" value="0"/>
                        </p>
                    </form>
                </div>

                <div id="ls-admin-background" style="display: none;">
                    <form method="post">
                        <h2>Add background</h2>
                        <p class="sp-form-row">
                            <label for ="ti-bg-color">Background color</label>
                            <input class="sp-ls-bg-color" type="text" id="ti-bg-color"/>
                            <span class="sp-ls-bg-picker"></span>
                        </p>
                        <p class="sp-form-row">
                            <label>&nbsp;</label>
                            <button class="insert-sc" id="ti-add-background">Insert</button>
                        </p>
                    </form>
                </div>
                <div id="ls-admin-settings" style="display: none;">
                    <form method="post">
                        <h2>Slide Settings</h2>
                        <p class="sp-form-row">
                            <label for ="ti-slide-width">Slide Width</label>
                            <input type="text" name="ti-slide-width" id="ti-slide-width"/>
                        </p>
                        <p class="sp-form-row">
                            <label for ="ti-font-size">Slide height</label>
                            <input type="text" name="ti-slide-height" id="ti-slide-height"/>
                        </p>
                        <p class="sp-form-row">
                            <label>&nbsp;</label>
                            <button class="insert-sc" id="ti-save-slider">Save</button>
                        </p>
                    </form>
                </div>
                <h3>Items</h3>
                <table class="layer-admin-table ls-slide-box-rows" cellpading="0" cellspacing="0">
                    <thead>
                        <tr clas="head-row">
                            <th>&nbsp;</th>
                            <th colspan="6">Linear Animations</th>
                            <th colspan="4">Rotations</th>
                        </tr>
                        <tr>
                            <th>Picture</th>
                            <th class="ti-bl-cell">Left</th>
                            <th>Top</th>
                            <th>Duration</th>
                            <th>Delay</th>
                            <th>Direction</th>
                            <th>Transition</th>
                            <th class="ti-bl-cell">Times</th>
                            <th>Duration</th>
                            <th>Easing</th>
                            <th>Delay</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Picture</th>
                            <th class="ti-bl-cell">Left</th>
                            <th>Top</th>
                            <th>Duration</th>
                            <th>Delay</th>
                            <th>Direction</th>
                            <th>Transition</th>
                            <th class="ti-bl-cell">Times</th>
                            <th>Duration</th>
                            <th>Easing</th>
                            <th>Delay</th>
                        </tr>
                    </tfoot>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

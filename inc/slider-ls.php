<?php
/**
 * Layer Slider Editor
 * @package twistItLayerSlider
 */

/**
 * Class to handle layer slider editing
 * @package twistItLayerSlider
 */
class LayerSlider {

    /**
     * all stored sliders
     * @var array 
     */
    public $sliders = array();

    /**
     * all stored slides
     * @var array 
     */
    public $slides = array();

    /**
     * Constructor
     * 
     * Constructor, loads all slides and sliders available in system
     * @package twistItLayerSlider
     * @return void
     */
    public function LayerSlider() {
        $this->sliders = get_option('ti_ls_sliders', array());
        $this->slides = get_option('ti_ls_slides', array());
    }

    /**
     * Add/Update a slider
     * 
     * Adds or Update a slider based on json encoded slider object
     * 
     * Requires: $_REQUEST['slider']//json encoded object
     * @return void
     * @package twistItLayerSlider
     */
    public function addSlider() {
        $slider = json_decode(stripslashes($_REQUEST['slider']));
        if ($slider->id == 'new') {
            $id = uniqid('ti_slider_');
            $sliders = get_option('ti_ls_sliders', array());
            $sliders[] = $id;
            update_option('ti_ls_sliders', $sliders);
            $slider->id = $id;
        } else {
            $id = $slider->id;
        }
        update_option($id, $slider);
    }

    /**
     * Triggered at init by the framework
     * @return void
     * @package twistItLayerSlider
     */
    public function updateAdminPage() {
        if (isset($_REQUEST['ls_add_slider'])) {
            $this->addSlider();
            die();
        }
        if (isset($_REQUEST['ls_get_video'])) {
            $this->getVideoInfo();
            die();
        }
        if (isset($_REQUEST['ti_save_slide'])) {
            $this->saveSlides();
            die();
        }
        if (isset($_REQUEST['ti_get_slide'])) {
            $this->getSlide();
            die();
        }
        if (isset($_REQUEST['ti_get_slider'])) {
            $this->getSlider();
            die();
        }
        if (isset($_REQUEST['ti_delete_slide'])) {
            $this->deleteSlide();
            die();
        }
        if (isset($_REQUEST['ti_delete_slider'])) {
            $this->deleteSlider();
            die();
        }
        if (isset($_REQUEST['sp-get-ls-slides'])) {
            $this->getSlidesIframe();
            die();
        }
    }

    /**
     * Prints a json decoded slider by id
     * 
     * Requires: $_REQUEST['id']
     * @package twistItLayerSlider
     * @return void
     */
    public function getSlider() {
        echo json_encode(get_option($_REQUEST['id']));
    }

    /**
     * Prints a json decoded slide by id
     * 
     * Requires: $_REQUEST['id']
     * @package twistItLayerSlider
     * @return void
     */
    public function getSlide() {
        $slide = get_option($_REQUEST['id']);
        echo json_encode($slide);
    }

    /**
     * Loads Iframe containing all available slides in the system
     * @package twistItLayerSlider
     * @return void
     */
    public function getSlidesIframe() {
        require_once (dirname(__FILE__) . "/iframe-ls-slides.php");
    }

    /**
     * Add/Update a slide
     * 
     * Adds or Update a slider based on json encoded slide object
     * 
     * Requires: $_REQUEST['slide']//json encoded object
     * @package twistItLayerSlider
     * @return void
     */
    public function saveSlides() {
        $slide = json_decode(stripslashes($_POST['slide']));
        if ($slide->id == 'new') {
            $id = uniqid('ti_slide_');
            $slides = get_option('ti_ls_slides', array());
            $slides[] = $id;
            update_option('ti_ls_slides', $slides);
            $slide->id = $id;
        } else {
            $id = $slide->id;
        }
        update_option($id, $slide);
    }

    /**
     * Deletes a slide by id
     * 
     * Requires: $_REQUEST['id']
     * @package twistItLayerSlider
     * @return void
     */
    public function deleteSlide() {
        $slides = get_option('ti_ls_slides', array());
        foreach ($slides as $key => $slide) {
            if ($slide == $_REQUEST['id']) {
                unset($slides[$key]);
                break;
            }
        }
        update_option('ti_ls_slides', $slides);
        return delete_option($_REQUEST['id']);
    }

    /**
     * Deletes a slider by id
     * 
     * Requires: $_REQUEST['id']
     * @package twistItLayerSlider
     * @return void
     */
    public function deleteSlider() {

        $sliders = get_option('ti_ls_sliders', array());
        foreach ($sliders as $key => $slider) {
            if ($slider == $_REQUEST['id']) {
                unset($sliders[$key]);
                break;
            }
        }
        update_option('ti_ls_sliders', $sliders);
        echo $_REQUEST['id'];
        return delete_option($_REQUEST['id']);
    }

    /**
     * Sets admin page based on $_REQUEST['tab']
     * @return void
     * @package twistItLayerSlider
     */
    public function getAdminPage() {
        if (!isset($_REQUEST['tab'])) {
            $this->getSliderPage();
        } else {
            if ($_REQUEST['tab'] == "slides") {
                $this->getSlidePage();
            } else {
                $this->getSliderPage();
            }
        }
    }

    /**
     * Loads the slide editor
     * @package twistItLayerSlider
     * @return void
     */
    public function getSlidePage() {
        require_once (dirname(__FILE__) . "/ls-slides.php");
    }

    /**
     * Loads slider editor
     * @package twistItLayerSlider
     * @return void
     */
    public function getSliderPage() {
        require_once (dirname(__FILE__) . "/ls-sliders.php");
    }

}

/**
 * prints top menu for slider editor
 * 
 * Requires: $_REQUEST['tab']
 * @package twistItAdmin
 * @return void
 */
function sp_ls_topmenu() {
    $current = "";
    if (!isset($_REQUEST['tab'])) {
        $current = "sliders";
    } else {
        if ($_REQUEST['tab'] == "slides") {
            $current = "slides";
        } else {
            $current = "sliders";
        }
    }
    ?>
    <div id="sp-ls-topmenu">
        <a href="themes.php?page=jlayer-parallax-slider&tab=sliders" class="<?php echo(($current == "sliders") ? 'active' : ''); ?>"><?php _e('Sliders'); ?></a>
        <a href="themes.php?page=jlayer-parallax-slider&tab=slides" class="<?php echo(($current == "slides") ? 'active' : ''); ?>"><?php _e('Slides'); ?></a>
        <span class="sp-clear"></span>
    </div>
<?php }
?>

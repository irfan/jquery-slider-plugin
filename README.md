[jQuery Slider Plugin](http://irfandurmus.com/projects/jquery-slider-plugin/)
======================================================================================

Please check [full documentation](http://irfandurmus.com/projects/jquery-slider-plugin/) for other features of this plugin

How to use 
--------------------------------------

### Include jquery, slider.js and slider.css files to your page
	<link rel="stylesheet" type="text/css" src="../min/slider.css" />
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
	<script type="text/javascript" src="../min/slider.js"></script>

### Example HTML

    <div id="sliderContainer">
        <ul class="sliderItems">
            <li><img src="img/turkey.jpg"></img></li>
            <li><img src="img/going_to_base_camp.jpg"></img></li>
            <li><img src="img/climbing.jpg"></img></li>
            <li><img src="img/mountain.jpg"></img></li>
            <li><img src="img/walking.jpg"></img></li>
        </ul>
    </div>


### Basic Usage

    <script type="text/javascript">
        $('#sliderContainer').slider();
    </script> 

### Customizable Options

    {
        method: 'circle',       // type flat or circle
        auto: true,             // if you type true it gonna start automatically when document ready
        showControls: true      // type true or false
        wait: 4000,             // wait before next item
        duration: 100,          // sliding duration

    }

### Example of user defined options

    <script type="text/javascript">
        $(function(){
            $('#sliderContainer').slider({
                wait : 2500,
                method:'flat'
            });
        });
    </script>






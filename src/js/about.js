var app = (function () {

  var dropdownbutton = require('./dropdownbutton.js');
  var slider = require('./slider.js');

  return {
    dropdownbutton : dropdownbutton,
    slider : slider
  }

})();

app.dropdownbutton();
let newslider1 = app.slider('.projects-control-about-1', '.projects-slider-list-about-1', '#previousSlide-1', '#nextSlide-1', '.control-projects-block-main-about-1');
let newslider2 = app.slider('.projects-control-about-2', '.projects-slider-list-about-2', '#previousSlide-2', '#nextSlide-2', '.control-projects-block-main-about-2');
newslider1.start();
newslider2.start();


// module.exports = app;

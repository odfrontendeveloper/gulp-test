var app = (function () {

  var dropdownbutton = require('./dropdownbutton.js');
  var slider = require('./slider.js');

  return {
    dropdownbutton : dropdownbutton,
    slider : slider
  }

})();

app.dropdownbutton();
let newslider = app.slider('.projects-control', '.projects-slider-list', '#previousSlide', '#nextSlide', '.control-projects-block-main');
newslider.start();

// module.exports = app;

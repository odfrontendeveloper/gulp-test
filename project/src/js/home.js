// import createSlider from './slider.js';
// import menuButton from './dropdownbutton.js';
const createSlider = require('./slider.js');

let newslider = createSlider('.projects-control', '.projects-slider-list', '#previousSlide', '#nextSlide', '.control-projects-block-main');
newslider.start();
// menuButton();

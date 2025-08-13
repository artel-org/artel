import loaderAnimation from './components/loader.js';
import removeClass from './components/removeClassNoAnimation.js';
import { useDynamicAdapt } from './dynamicAdapt.js';
import sliderImages from './components/sliderImages.js';
import animationUraborosAndRunis from './components/animationUraborosAndRunis.js';
import phoneMask from './components/phoneMask.js';
import sliders from './components/sliders.js';
import animationHomeSvg from './components/animationHomeSvg.js';
import transformBlockHover from './components/transformBlockHover.js';
import designPage from './components/designPage.js';
import headerFixedHidden from './components/header.js';
import accordionsFn from './components/accordions.js';
import { aboutScroll } from './components/aboutScroll.js';
import { designMenu } from './components/designMenu.js';
import { calculateWork } from './components/calculateWork.js';
import { modalFeedback } from './components/modalFeedback.js';
import { inputDate } from './components/inputDate.js';


import { firstSectionAnimation } from './components/animationEngineering.js';

useDynamicAdapt();
loaderAnimation();
removeClass();

sliderImages();
animationUraborosAndRunis();
phoneMask();
sliders();
animationHomeSvg();
transformBlockHover();
designPage();
headerFixedHidden();
accordionsFn();

aboutScroll();
designMenu();

calculateWork();
modalFeedback();

firstSectionAnimation();
inputDate();
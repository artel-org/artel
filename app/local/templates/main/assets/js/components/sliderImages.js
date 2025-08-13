const sliderImage = () => {
    const sliders = document.querySelectorAll(".slider-drag-image");
    
    if(!sliders) return;

    sliders.forEach(slider=> {
        const img = slider.querySelector(".images .img2");
        const dragLine = slider.querySelector(".slider .drag-line");
        const input = slider.querySelector(".slider input");

        input.oninput = (e) => {
            console.log(e);
            let sliderVal = input.value;
            dragLine.style.left = sliderVal + "%";
            img.style.width = sliderVal + "%";
        }
    });
}

export default sliderImage;
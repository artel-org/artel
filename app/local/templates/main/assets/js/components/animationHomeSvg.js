const animationHomeSvg = () => {
    const parent = document.querySelector(".top-image");

    if(!parent) return;

    const paths = parent.querySelectorAll('svg path');
    
    anime({
        targets: paths,
        duration: 4000,
        delay: 200,
        easing: 'easeInCubic',
        strokeDashoffset: [anime.setDashoffset, 0],
    });
}

export default animationHomeSvg;
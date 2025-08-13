const transformBlockHover = () => {
    const items = document.querySelectorAll(".quality-standards__item");

    const settings = {
        max: 15,
        speed: 500,
        glare: false,
        scale: 1.05,
        transition: true,
    }

    VanillaTilt.init(items,settings);
}

export default  transformBlockHover;
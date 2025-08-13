const phoneMask = () => {
    const element = document.querySelectorAll('.phone-mask');

    if(!element) return;


    element.forEach(item=> {
        const maskOptions = {
            mask: '+{7}(000)000-00-00'
        };
        const mask = IMask(item, maskOptions);
    });


}

export default phoneMask;
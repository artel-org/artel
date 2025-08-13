const headerFixedHidden = () => {
    const headerNode = document.querySelector(".header_hidden");
    
    if(!headerNode) return
    headerNode.style = `--height: ${headerNode.clientHeight}px;`

    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop) {
            headerNode.classList.add("is-hidden");
        } else {
            headerNode.classList.remove("is-hidden");
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });
}

export default headerFixedHidden;
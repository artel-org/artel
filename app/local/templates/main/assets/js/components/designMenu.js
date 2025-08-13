export const designMenu = () => {
    const buttons = document.querySelectorAll(".button-menu");
    const menu = document.querySelector(".design-menu");
    const btnClose = document.querySelector(".design-menu__close-btn");

    if(!buttons || !menu || !btnClose) return;

    buttons.forEach(btn=> {
        btn.addEventListener("click", ()=>{
            menu.classList.add("is-active");
            btnClose.classList.add("is-active");
            btn.classList.add("is-active");

            setTimeout(()=>{
                btnClose.classList.add("is-animate-line");
            }, 1000)
        });
    });

    btnClose.addEventListener("click", ()=> {
        menu?.classList.remove("is-active");
        btnClose?.classList.remove("is-active");
        // btn?.classList.remove("is-active");
        btnClose?.classList.remove("is-animate-line");

        menu?.classList.add('is-back-animate');

        setTimeout(()=>{
            menu?.classList.remove('is-back-animate');
        }, 1000);
    });

    window.addEventListener("click",(e)=>{
        if(e.target === menu) {
            menu?.classList.remove("is-active");
            btnClose?.classList.remove("is-active");
            btn?.classList.remove("is-active");
            btnClose?.classList.remove("is-animate-line");

            menu?.classList.add('is-back-animate');

            setTimeout(()=>{
                menu?.classList.remove('is-back-animate');
            }, 1000);
        }
    });
}
const removeClass = () => {
    const items = document.querySelectorAll(".top-image svg path");

    if(!items) return;
        setTimeout(()=>{ items.forEach(item=>item.classList.remove("no-animation")); }, 2500);
}

export default removeClass;
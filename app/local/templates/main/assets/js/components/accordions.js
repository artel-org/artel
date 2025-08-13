const accordionsFn = () => {
    if(document.querySelector(".budget__info-type-form-label")) {
        const labels = document.querySelectorAll(".budget__info-type-form-label");
        const bodys = document.querySelectorAll(".budget__sheme");

        

        if(labels && bodys) {
            labels.forEach(label=>{
                label.addEventListener("click", ()=> {
                    const attr = String(label.getAttribute("data-btn-id"));
                    const input = label.querySelector("input");

                    if(input.checked) {
                        bodys.forEach(body=>body.classList.remove("is-open"));

                        bodys.forEach(body=> {
                            const attrBody = String(body.getAttribute("data-body-id"));

                            if(attrBody === attr) {
                                body.classList.add("is-open");
                            }
                        })
                    }
                });
            });
        }
    }
}

export default accordionsFn;
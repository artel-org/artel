export const inputDate = () => {
    const elements = document.querySelectorAll(".modal-feedback__parent-date");

    if(!elements) return;

    elements.forEach(el=>{
        if(el.querySelector('input[type="datetime-local"]') || el.querySelector('input[type="date"]')) {
            const input = el.querySelector('input[type="datetime-local"]') || el.querySelector('input[type="date"]');

            el.addEventListener("click",()=>{
                input.showPicker();
            });
        }
    });
}
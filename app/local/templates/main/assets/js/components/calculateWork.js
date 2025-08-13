export const calculateWork = () => {
    // все переменные 
    const items = document.querySelectorAll(".budget__info-size-item"),
        itemsType = document.querySelectorAll(".budget__info-type-form-label"),
        priceNode = document.querySelector(".budget__info-price-number"),
        parent = document.querySelector(".budget");
    
    // проверка на наличие переменных
    if(!items || !itemsType || !priceNode || !parent) return;

    // разбиение чисел на разряды
    const numberWithSpaces = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "р";
    } 
    // задать значение в html
    const setHTMLNode = (str) => {
        priceNode.style.opacity = 0;
        
        setTimeout(()=> {
            priceNode.innerHTML = str;
        }, 500);
        
        setTimeout(()=> {
            priceNode.style.opacity = 1;
        }, 800);
    }
    // объект с значениями
    const values = {
        valSize: null,
        valType: null,
    }
    // основная функция
    const changeValue = (arr) => {
        items.forEach(item=>{
            if(item.querySelector("input").checked) {
                values.valSize = String(item.getAttribute("data-name").trim());
            }
        });

        itemsType.forEach(item=>{
            if(item.querySelector("input").checked) {
                values.valType = String(item.getAttribute("data-name").trim());
            }
        });

        // работа с получеными данными
        if(!values.valSize || !values.valType) return;

        // данные до 100м2
        if(values.valSize === 'el1' && values.valType === 'el1') setHTMLNode(numberWithSpaces(parent.getAttribute("data-100-ob")));
        if(values.valSize === 'el1' && values.valType === 'el2') setHTMLNode(numberWithSpaces(parent.getAttribute("data-100-me")));
        if(values.valSize === 'el1' && values.valType === 'el3') setHTMLNode(numberWithSpaces(parent.getAttribute("data-100-ow")));
        // данные до 500м2
        if(values.valSize === 'el2' && values.valType === 'el1') setHTMLNode(numberWithSpaces(parent.getAttribute("data-500-ob")));
        if(values.valSize === 'el2' && values.valType === 'el2') setHTMLNode(numberWithSpaces(parent.getAttribute("data-500-me")));
        if(values.valSize === 'el2' && values.valType === 'el3') setHTMLNode(numberWithSpaces(parent.getAttribute("data-500-ow")));
        // данные до 1000м2
        if(values.valSize === 'el3' && values.valType === 'el1') setHTMLNode(numberWithSpaces(parent.getAttribute("data-1000-ob")));
        if(values.valSize === 'el3' && values.valType === 'el2') setHTMLNode(numberWithSpaces(parent.getAttribute("data-1000-me")));
        if(values.valSize === 'el3' && values.valType === 'el3') setHTMLNode(numberWithSpaces(parent.getAttribute("data-1000-ow")));
        // данные после 1000м2
        if(values.valSize === 'el4' && values.valType === 'el1') setHTMLNode(numberWithSpaces(parent.getAttribute("data-ot-1000-ob")));
        if(values.valSize === 'el4' && values.valType === 'el2') setHTMLNode(numberWithSpaces(parent.getAttribute("data-ot-1000-me")));
        if(values.valSize === 'el4' && values.valType === 'el3') setHTMLNode(numberWithSpaces(parent.getAttribute("data-ot-1000-ow")));
    }
    // запуск функции
    items.forEach(item=>{
        item.addEventListener("click", ()=> changeValue());
    });
    itemsType.forEach(item=>{
        item.addEventListener("click", ()=> changeValue());
    });
}
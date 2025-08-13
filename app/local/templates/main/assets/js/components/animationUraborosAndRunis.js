const animationUraborosAndRunis = () => {
    const rotateBlock = document.querySelector(".reliable__image-decor"),
        parentNode = document.querySelector(".reliable"),
        items = document.querySelectorAll(".reliable__item"),
        model = document.querySelector("model-viewer");

    if(!rotateBlock) return;
    // функция для удаления всех классов 
    const itemRemoveClass = () => {
        items.forEach(itm=>itm.classList.remove("is-active"));
    }
    // функция для проверки на то какой надо подсветить элемент
    const changeStateItem = (num) => {
        if(window.innerWidth < 992) return;
        itemRemoveClass();

        if(num > 0 && num < 20) {
            items[0].classList.add("is-active");
        }
        else if(num > 20 && num < 60) {
            items[1].classList.add("is-active");
        }
        else if(num > 60 && num < 90) {
            items[2].classList.add("is-active");
        }
        else if(num > 180 && num < 230) {
            items[4].classList.add("is-active");
        }
        else if(num > 230 && num < 290) {
            items[5].classList.add("is-active");
        }
        else if(num > 290) {
            items[0].classList.add("is-active");
        }
    }
    // // Функция для получения текущего значения свойства
    function getCurrentOpacity() {
        const currentSt = window.getComputedStyle(rotateBlock).rotate;

        const currentStNumber = Number(
            currentSt.replaceAll("deg", "").toLocaleLowerCase().trim()
        );

        changeStateItem(currentStNumber);
    }
    // // Проверка значения каждые 100 мс во время анимации
    const intervalId = setInterval(() => {
        getCurrentOpacity();
    }, 500);

    // наведение на блок
    // список анимаций
    const animationList = [
        'rotate1',
        'rotate2',
        'rotate3',
        'rotate4',
        'rotate5',
        'rotate6',
    ];

    const defaultPosition = "-90.39deg 75.93deg 46670m";

    items.forEach((item,key)=> {
        item.addEventListener("mouseover", ()=> {
            
            if(window.innerWidth < 992) return;

            rotateBlock.style.animation = "unset";
            
            setTimeout(()=> {
                rotateBlock.style.rotate = `${item.getAttribute("data-rotate")}deg`;
            }, 50);
        });

        item.addEventListener("mouseout", ()=> {
            if(window.innerWidth < 992) return;
            const rotateValue = window.getComputedStyle(rotateBlock).rotate;

            rotateBlock.style.rotate = `${rotateValue}`;
            rotateBlock.style.animation = `${animationList[key]} 20s linear infinite`;
        });
    });

    // вращение 3д-модели при движении мыши по блоку
    if(!parentNode || !model) return;

    const default3DModelValue = {
        x: -90.39,
        y: 75.93,
        m: '46670m'
    }

    const mouseMoveBlock = (data, parent) => {
        const mouseEventObject = {
            clientX: data.clientX,
            clientY: data.clientY,
        }

        const { top, left, width, height } = parent.getBoundingClientRect();
        const x = mouseEventObject.clientX - left; 
        const y = mouseEventObject.clientY - top;  

        const position = {
            x: Math.round(((x / width) - 0.5) * -50),
            y: Math.round(((y / height) - 0.5) * -50),
        }

        // данные позиционирования от 3д модели

        let newValue = {
            x: default3DModelValue.x + position.x,
            y: default3DModelValue.y + position.y,
        }

        model.setAttribute("camera-orbit", `${newValue.x}deg ${newValue.y}deg ${newValue.m}`)
    }

    parentNode.addEventListener("mousemove", (e)=>mouseMoveBlock(e, parentNode));
}

export default animationUraborosAndRunis;
// export const modalFeedback = () => {
//     const modals = [
//             document?.querySelector(".modal-feedback-user-data"),
//             document?.querySelector(".modal-feedback-save-money"),
//         ],
//         // closeBtn = modal.querySelector(".close-modal"),
//         buttonsOpens = [
//             document?.querySelectorAll(".btn-feedback"),
//             document?.querySelectorAll(".modal-feedback-btn-open"),
//         ]

//     if(!modals || !buttonsOpens) return;

//         const openModal = (modal) => modal.classList.add("is-open");

//         const closeModal = (modal) => {
//             if(modal.classList.contains("is-open")){
//                 modal.classList.remove("is-open");
//                 modal.classList.add('is-back-animate');

//                 setTimeout(()=>{
//                     modal.classList.remove('is-back-animate');
//                 }, 3000);
//             }
//         }

//         // открытие
//         buttonsOpens.forEach(btnArr=> {
//             btnArr.forEach(btn=>{
//                 btn.addEventListener("click",()=>{
//                     if(btn.classList.contains("modal-feedback-btn-open")) {
//                         openModal(modals[1]);
//                     } else {
//                         openModal(modals[0]);
//                     }
//                 });
//             })
//         });
//         // закрытие
//         modals.forEach(modal=>{
//             if(!modal) return;
            
//             const modalCloseBtn = modal.querySelector(".modal-feedback__btn-close");

//             modal.querySelector(".modal-feedback__btn-close").addEventListener("click", ()=>{
//                 closeModal(modal);
//             });
//         })
//         // escape
//         addEventListener("keyup", (e)=>{
//             if(e.code === "Escape" || e.key === "Escape") {
//                 modals.forEach(modal=>{
//                     closeModal(modal);
//                 })
//             }
//         });
//         // клик вне модалки
//         window.addEventListener("click",(e)=>{
//             modals.forEach(modal=>{
//                 if(e.target === modal) {
//                     closeModal(modal);
//                 }
//             })
//         });
// }

export const modalFeedback = () => {
    // массив всех модалок на странице
    // 1. Кнопка/Кнопки открытия
    // 2. Модальное окно
    // 3. Кнопка скрытия
    // 4. Активный класс
    
    const node = [
        [
            document?.querySelectorAll(".btn-feedback"),, 
            document?.querySelector(".modal-feedback-user-data"), 
            document?.querySelector(".modal-feedback-user-data").querySelector(".modal-feedback__btn-close"), 
            "is-open",
        ],
        [
            document?.querySelectorAll(".modal-feedback-btn-open"),
            document?.querySelector(".modal-feedback-save-money"),
            document?.querySelector(".modal-feedback-save-money").querySelector(".modal-feedback__btn-close"),
            "is-open",
        ],
        [
            document?.querySelectorAll(".modal-object-data-btn-open"),
            document?.querySelector(".modal-object-data"),
            document?.querySelector(".modal-object-data").querySelector(".modal-feedback__btn-close"),
            "is-open",
        ]
    ];

    // функция открытия модального окна
    const openModal = (modal, toggleClass) => {
        modal.classList.add("is-open");
    }
    // функция закрытия модального окна
    const closeModal = (modal, toggleClass) => {
        if(modal.classList.contains("is-open")){
            modal.classList.remove("is-open");
            modal.classList.add('is-back-animate');

            setTimeout(()=>{
                modal.classList.remove('is-back-animate');
            }, 3000);
        }
    }

    const closeAnimationModal = (modal) =>{
        if(modal && modal.classList.contains("is-open")){
            modal.classList.remove("is-open");
            modal.classList.add('is-back-animate');

            setTimeout(()=>{
                modal.classList.remove('is-back-animate');
            }, 1000);
        }
    }
    // функция для создания событий у элементов модального окна
    const changeStateModal = (arr, isHidden = false) => {
        // деструктуризация входного массива
        // ===========
        // 1. Кнопка/Кнопки открытия
        // 2. Модальное окно
        // 3. Кнопка скрытия
        // 4. Активный класс
        // 5. Не обязательный параметр
        // ===========
        const [btnOpen, modal, btnClose, activeClass] = arr;


        // открытие окна
        if(btnOpen) {
            btnOpen.forEach(btn=> {
                btn.addEventListener("click", ()=>openModal(modal, activeClass));
            });
        }

        // закрытие окна
        if(btnClose) {
            btnClose.addEventListener("click", ()=>{
                // closeModal(modal,activeClass);
                closeAnimationModal(modal);
            });
            
        }
        
        // проверка параметра для выполнения функционала скрытия модального окна при клике вне него, и при нажатии кнопки ESC
        if(!isHidden) return;
        // скрытие при клике вне блока
        window.addEventListener("click", (event)=> {
            // проверка при клике в любое место на странице
            // если корневой эл. или тот по которому было нажатие соответсвует классу аккордеона
            // тогда оставлять класс, в противном случае класс удаляется
            // if(modal && event.srcElement.classList.value.includes(modal.classList[0])){
            //     closeAnimationModal(modal);
            // }
            
            if(modal){
                event.srcElement.classList.forEach(item=>{
                    if(item === modal.classList[0]) {
                        closeAnimationModal(modal);
                    }
                });
            }
        });

        // скрытие блока по нажатию на кнопку ESC
        window.addEventListener("keydown", (event)=> {
            console.log(event)
            if(event.code === "Escape" || event.keyCode === 27 || event.key === "Escape") {
                closeAnimationModal(modal);
            }
        });
    }

    // вызов функции для навешивания событий на элементы модального окна
    node.forEach(arr=> changeStateModal(arr, true));
}
export const aboutScroll = () => {
    const about = document.querySelector(".about");
    const items = document.querySelectorAll(".tarakan-about");

    if(!about || !items) return;

    // Получаем элемент блока
    const block = about;
    // Получаем высоту блока в пикселях
    const blockHeight = block.offsetHeight;
    // Переменные для отслеживания состояния прокрутки
    let isScrolling;

    // Функция для вычисления прокрутки
    function calculateScroll() {
        // Получаем текущее положение прокрутки
        const scrollTop = window.scrollY || window.pageYOffset;

        // Получаем позицию блока относительно верхней части страницы
        const blockOffsetTop = block.getBoundingClientRect().top + scrollTop;

        // Вычисляем, сколько блока было проскролено
        const scrolled = Math.max(0, scrollTop - blockOffsetTop);

        // Вычисляем процент прокрутки
        const percentScrolled = Math.min((scrolled / blockHeight) * 100, 100);

        // Выводим результаты
        console.log(`Прокручено пикселей: ${scrolled}px`);
        console.log(`Прокручено процентов: ${percentScrolled.toFixed(2)}%`);

        items.forEach(item=> {
            item.style = `--px: ${scrolled}px; --procent: ${percentScrolled}%;`
        });
    }
    // проверка скролит ли пользователь
    function userScrollingState () {
        // Сбрасываем таймер при каждом скролле
        window.clearTimeout(isScrolling);

        // Пользователь скроллит
        console.log('Пользователь скроллит...');
        items.forEach(item=>{
            item.classList.remove("no-animation");
        });
        // Устанавливаем таймер, который сработает через 100ms после последнего скролла
        isScrolling = setTimeout(function() {
            items.forEach(item=>{
                item.classList.add("no-animation");
            });
            // Пользователь прекратил скроллинг
            console.log('Пользователь прекратил скроллить.');
        }, 100);
    }

    // Добавляем обработчик события прокрутки
    window.addEventListener('scroll', ()=>{
        calculateScroll();
        userScrollingState();
    });
}
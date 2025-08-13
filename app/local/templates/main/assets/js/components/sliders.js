const sliders = () =>{
    // массив всех слайдеров
    // для создания простых слайдеров без сложной логики
    const sliders = [
        [
            document.querySelector(".what-doing__slider"),
            {
                direction: 'horizontal',
                loop: true,
                navigation: {
                    nextEl: '.what-doing__slider-btn_next',
                    prevEl: '.what-doing__slider-btn_prev',
                },
                pagination: {
                    el: '.what-doing-pagination',
                },
                slidesPerView: 1.81559,
                spaceBetween: 0,

                breakpoints: {
                    1441: {
                        slidesPerView: 1.81559,
                        spaceBetween: 0,
                    },
                    1000: {
                        slidesPerView: 1.2,
                        spaceBetween: 0,
                    },
                    769: {
                        slidesPerView: 1.2,
                        spaceBetween: 0,
                    },
                    280:{
                        spaceBetween: 10,
                        slidesPerView: 1.1,
                    }
                }
            }
        ],
        [
            document.querySelector(".steps-construction__slider"),
            {
                direction: 'horizontal',
                loop: false,

                navigation: {
                    nextEl: '.what-doing__slider-btn_next',
                    prevEl: '.what-doing__slider-btn_prev',
                },

                slidesPerView: 1.81559,
                spaceBetween: 0,

                breakpoints: {
                    1441: {
                        slidesPerView: 1.81559,
                        spaceBetween: 0,
                    },
                    1000: {
                        slidesPerView: 1.2,
                        spaceBetween: 0,
                    },
                    769: {
                        slidesPerView: 1.2,
                        spaceBetween: 0,
                    },
                    481:{
                        spaceBetween: 0,
                        slidesPerView: 1.1,
                    },
                    280: {
                        spaceBetween: 10,
                        slidesPerView: 1.1,
                    }
                },

                pagination: {
                    el: '.what-doing-pagination',
                },
            }
        ],
    ]
    // функция конструктор для создания сладеров
    const createSlider = (node, options) => {
        if(node && options) {
            const swiper = new Swiper(node, options);
        }
        else {
            console.error("Ошибка генерации слайдера");
        }
    }
    // вызов конструктора для слайдеров
    if(sliders && sliders.length) {
        sliders.forEach(slider=> {
            const sliderNode = slider[0];
            const sliderOptions = slider[1];

            if(sliderNode && sliderOptions) {
                createSlider(sliderNode, sliderOptions);
            }
            else {
                console.error(`Ошибка генерации, нету одной из двух частей слайдера: slider - ${sliderNode}, список опций - ${sliderOptions}`)
            }
        });
    }
    // cлайдеры с доп. функционалом
    if(document.querySelector(".stage-work__pagination") && document.querySelector(".stage-work__slider")) {
        let swiperPagination = new Swiper('.stage-work__pagination', {
            direction: 'horizontal',
            slidesPerView: 5,
            spaceBetween: 0,
            watchSlidesProgress: true,
            loop: false,

            breakpoints: {
                481: {
                    slidesPerView: 5,
                    spaceBetween: 0,
                },
                280: {
                    slidesPerView: "auto",
                    spaceBetween: 20,
                }
            }
        });

        let swiperParent = new Swiper('.stage-work__slider', {
            autoHeight: true,
            direction: 'horizontal',
            loop: false,
            slidesPerView: 1,
            effect: "fade",

            thumbs: {
                swiper: swiperPagination,
            },
        });

    }
    // слайдер с тараканами
    if(document.querySelector(".about-employees__list")) {
        const slider = document.querySelector(".about-employees__list");
        let swiper;

        if(!slider) return; 

        function createSwiper() {
            if (!swiper) {
                swiper = new Swiper(slider, {
                    // Настройки слайдера
                    loop: true,
                    slidesPerView: 5,
                    spaceBetween: 0,
                    // centeredSlides: true,

                    pagination: {
                        el: '.about-employees__list-pagination',
                        clickable: true,
                    },

                    breakpoints: {
                        1151: {
                            slidesPerView: 5,
                            spaceBetween: 0,
                        },
                        769: {
                            slidesPerView: 4,
                            spaceBetween: 0
                        },
                        480:{
                            slidesPerView: 3,
                            spaceBetween: 0
                        },
                        280: {
                            slidesPerView: 1.5,
                            spaceBetween: 32
                        }
                    },
                });
            }
        }

        function destroySwiper() {
            if (swiper) {
                swiper.destroy(true, true);
                swiper = null;
            }
        }

        function handleResize() {
            if (window.innerWidth <= 1440 && slider) {
                document.querySelectorAll(".about-employees__item").forEach(item=>item.classList.add("swiper-slide"));
                setTimeout(() => createSwiper(), 1000);
                swiper?.update();
            } else {
                document.querySelectorAll(".about-employees__item").forEach(item=>item.classList.remove("swiper-slide"));
                destroySwiper();
            }
        }

        // Инициализация при загрузке страницы
        handleResize();

        // Добавление обработчика события изменения размера окна
        window.addEventListener('resize', handleResize);
    }

    if(document.querySelector(".result-work__slider-pagination") &&  document.querySelector(".result-work__slider")){
        let swiperPagination = new Swiper(document.querySelector(".result-work__slider-pagination"), {
                direction: 'horizontal',
                loop: false,
                spaceBetween: 13,
                slidesPerView: 12,

                breakpoints: {
                    769: {
                        spaceBetween: 13,
                        slidesPerView: 12,
                    }, 
                    768: {
                        spaceBetween: 13,
                        slidesPerView: 8,
                    },
                    481:{
                        spaceBetween: 13,
                        slidesPerView: 5,
                    },
                    400: {
                        spaceBetween: 20,
                        slidesPerView: 4,
                    },
                    280:{
                        spaceBetween: 60,
                        slidesPerView: 3,
                    }
                }
        });

        if(!swiperPagination) return;

        let swiperParent = new Swiper(document.querySelector(".result-work__slider"),{
                direction: 'horizontal',
                loop: false,
                allowTouchMove: false,
                slidesPerView: 1,
                navigation:{
                    nextEl: '.result-work__slider-btn_next',
                    prevEl: '.result-work__slider-btn_prev'
                },
                thumbs: {
                    swiper: swiperPagination
                },
                pagination: {
                    el: '.result-work-mobile-pagination',
                    clickable: true,
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
        });

        if(!swiperParent) return;


}}

export default sliders;
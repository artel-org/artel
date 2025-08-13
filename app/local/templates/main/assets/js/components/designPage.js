const designPage = () => {
    const items = document.querySelectorAll(".specialization-links__item");
    // анимация наведения на ссылки и задание нового цвета родителю
    const defaultColor = {
      bg: '#203C99',
      bgBtn: '#2A48AD',
      strokeBtn: '#5A70FF'
    };

    if(items) {
      items.forEach(item=> {
        const parent = item.closest('.specialization-links'); 
        
        item.addEventListener("mouseover", ()=> {
          if(window.innerWidth <= 992) return;
          
          const bg = item.getAttribute("data-bg"),
            bgBtn = item.getAttribute("data-btn-bg"),
            strokeBtn = item.getAttribute("data-btn-stroke");
          if(parent) parent.style = `--bg: ${bg}; --bg-btn: ${bgBtn}; --btn-icon-color: ${strokeBtn};`;
        });

        item.addEventListener("mouseout", ()=> {
          if(window.innerWidth <= 992) return;
          if(parent) parent.style = `--bg: ${defaultColor.bg}; --bg-btn: ${defaultColor.bgBtn}; --btn-icon-color: ${defaultColor.strokeBtn };`;
        });

      });
    }

    const onElementVisible = (selector, callback, callbackTwo = ()=>{}) => {
      const element = selector;
      
      if (!element) {
        console.error('Элемент не обнаружен', selector);
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if(window.innerWidth >992) {
              callback();
            }
            // Отключаем наблюдателя после первого срабатывания
            // observer.unobserve(entry.target);
          } else {
            if(callbackTwo) callbackTwo();
          }
        });
      });

      // Начинаем наблюдение за элементом
      observer.observe(element);
    }
    // эффект отрисовки текста
    if(document.querySelector(".glitchtext")) {
      class TextScramble {
        constructor(el) {
          this.el = el;
          this.chars = "а б в г д е ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я А Б В Г Д Е Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я";
          this.update = this.update.bind(this);
        }
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => (this.resolve = resolve));
            this.queue = [];
            for (let i = 0; i < length; i++) {
              const from = oldText[i] || "";
              const to = newText[i] || "";
              const start = Math.floor(Math.random() * 40);
              const end = start + Math.floor(Math.random() * 40);
              this.queue.push({
                from,
                to,
                start,
                end
              });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        update() {
          let output = "";
          let complete = 0;
          for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
              complete++;
              output += to;
            } else if (this.frame >= start) {
              if (!char || Math.random() < 0.28) {
                char = this.randomChar();
                this.queue[i].char = char;
              }
              output += `<span class="dud">${char}</span>`;
            } else {
              output += from;
            }
          }
          this.el.innerHTML = output;
          if (complete === this.queue.length) {
            this.resolve();
          } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
          }
        }
        randomChar() {
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
      }

      const elements = document.querySelectorAll(".glitchtext");

      elements.forEach(el=> {
        // Пример использования:
        el.style.height = `${el.offsetHeight}px`;
        onElementVisible(el, () => {
          const phrases = [String(el.getAttribute('data-text'))];

          const fx = new TextScramble(el);

          let counter = 0;

          const next = () => {
            fx.setText(phrases[counter]).then(() => {
              //setTimeout(next, 2200);
            });
            counter = (counter + 1) % phrases.length;
          };

          function firstFunction() {
            return new Promise((resolve) => {
              setTimeout(() => {
                next();
                resolve(); 
              }, 100); 
            });
          }

          async function executeFunctions() {
            await firstFunction(); 
            setTimeout(()=>{secondFunction()}, 2000);
          }

          function secondFunction() {
            el.classList.add("no-min-height")
          }

          // Запускаем выполнение функций
          executeFunctions();
          next();
        });
      });
    }
    // анимация с тараканами на лого 
    if(document.querySelector(".logo-tarakans")) {
      const logos = document.querySelectorAll(".logo-tarakans");

      logos.forEach(logo=> {
        onElementVisible(
          logo,
          () => {
            logo.classList.add("start-animation");
          },
          ()=> {
            logo.classList.remove("start-animation");
          }
        )
      })
    }
    // анимация наведения на слайды в слайдере
    if(document.querySelector(".stage-work__slide-inner")) {
      const slides = document.querySelectorAll(".stage-work__slide-inner");
      
      if(!slides) return;

      const parent = document.querySelector('.stage-work');
      const childs = slides;

      parent.addEventListener('mousemove', (event) => {
        const { top, left, width, height } = parent.getBoundingClientRect();
        const x = event.clientX - left; 
        const y = event.clientY - top;  

        // Вычисляем смещение в зависимости от положения курсора
        const xOffset = ((x / width) - 0.5) * -50; 
        const yOffset = ((y / height) - 0.5) * -50;

        // Применяем трансформацию к дочернему блоку
        childs.forEach(child=> child.style.transform = `translate(${xOffset}px, ${yOffset}px)`)
      });

      parent.addEventListener('mouseleave', () => {
        childs.forEach(child=> child.style.transform = 'translate(0, 0)')
      });
    }
    // анимация для появления тараканов 
    if(document.querySelector(".about-employees__list")) {
      const parent = document.querySelector(".about-employees__list");
      const items = document.querySelectorAll(".about-employees__item");

      onElementVisible(parent, () => {
        parent.classList.add("is-animation");

        setTimeout(()=>{
          items.forEach(item=> {
            item.classList.add("is-not-animation");
            parent.classList.add("hover-animation-item")
          })
        }, 2000);
      });
    }
}

export default designPage;
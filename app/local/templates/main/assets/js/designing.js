document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("no-scroll");

  // Анимация SVG заголовка
  anime({
    targets: ".designing_title",
    opacity: [0, 1],
    translateY: ["50px", "0px"],
    duration: 1000,
    easing: "easeOutExpo",
    complete: function () {
      // После завершения анимации SVG запускаем анимацию букв
      animateLetters();
    },
  });

  function animateLetters() {
    const paths = document.querySelectorAll(".designing-title__item svg path");

    // Первый этап: появление букв сдвинутых вниз (половина высоты)
    anime({
      targets: paths,
      opacity: [0, 1],
      translateY: ["20px", "0px"], // Начинаем с небольшого сдвига вниз
      duration: 800,
      delay: function (el, i) {
        return i * 100; // Задержка для каждого элемента
      },
      easing: "easeOutBack",
      complete: function () {
        // Второй этап: поднимаем весь блок выше после появления всех букв
        animateFinalMove();
      },
    });
  }

  function animateFinalMove() {
    // Поднимаем весь блок вверх
    anime({
      targets: ".designing-block",
      translateY: "-50px",
      duration: 1000,
      easing: "easeOutExpo",
      complete: function () {
        document.body.classList.remove("no-scroll");
      },
    });
  }
});

const animationUraborosAndRunis = ()=> {
    const rotatingElement = document.querySelector('.reliable__image-decor');
    const hoverElements = document.querySelectorAll(".reliable__item");

    let angle = 0;
    let rotationSpeed = 1;
    let isHovering = false;
    let targetAngle = 0; 

    function animate() {
        if (!isHovering && window.innerWidth > 992) {
            angle += rotationSpeed; // Увеличиваем угол
            if (angle >= 360) angle -= 360; // Сбрасываем угол после полного оборота
        } else {
            angle += (targetAngle - angle) * 0.1;
        }

        rotatingElement.style.rotate = `${angle}deg`;
        requestAnimationFrame(animate);
    }


    hoverElements.forEach(item=> {

        item.addEventListener('mouseenter', () => {
            isHovering = true;
            targetAngle = item.getAttribute("data-rotate");
        });

        item.addEventListener('mouseleave', () => {
            isHovering = false;
        });

    })

    animate();
}

export default animationUraborosAndRunis;
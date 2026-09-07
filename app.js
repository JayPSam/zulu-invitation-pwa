
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

let startY = 0;
let endY = 0;

/* =========================
   SHOW SLIDE
========================= */

function showSlide(index) {

    if (!slides.length) {
        return;
    }

    if (index < 0) {
        index = slides.length - 1;
    }

    if (index >= slides.length) {
        index = 0;
    }

slides[currentSlide].classList.remove("active");

    if (dots[currentSlide]) {
        dots[currentSlide].classList.remove("active");
    }

    currentSlide = index;

    slides[currentSlide].classList.add("active");

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }

    restartAnimations(slides[currentSlide]);
}

/* =========================
   RESTART ANIMATIONS
========================= */

function restartAnimations(slide) {

    const elements = slide.querySelectorAll(".reveal");

    elements.forEach(element => {

        element.style.animation = "none";

        void element.offsetWidth;

        element.style.animation = "";

    });
}

/* =========================
   DOT NAVIGATION
========================= */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

    });

});

/* =========================
   TOUCH SWIPE
========================= */

document.addEventListener("touchstart", event => {

    startY = event.changedTouches[0].screenY;

});


document.addEventListener("touchend", event => {

    endY = event.changedTouches[0].screenY;

    handleSwipe();

});

function handleSwipe() {

    const distance = startY - endY;

    if (Math.abs(distance) < 50) {
        return;
    }

    if (distance > 0) {

        showSlide(currentSlide + 1);

    } else {

        showSlide(currentSlide - 1);

    }

}

/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "ArrowDown" ||
        event.key === "ArrowRight"
    ) {

        showSlide(currentSlide + 1);

    }

          if (
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft"
    ) {

        showSlide(currentSlide - 1);

    }

});     

/* =========================
   SERVICE WORKER
========================= */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .then(() => {

                console.log("Invitation PWA ready.");

            })

       .catch(error => {

                console.log(
                    "Service worker error:",
                    error
                );

            });

    });

}   

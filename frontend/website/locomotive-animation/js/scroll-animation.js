// let currentIndex = 0;

// function autoScroll() {
//     if (currentIndex < sections.length - 1) {
//         currentIndex++;
//     } else {
//         currentIndex = 0;
//     }
//     scroll.scrollTo(sections[currentIndex], {
//         offset: 0,
//         duration: 500,
//         easing: [0.25, 0.00, 0.35, 1.00]
//     });
// }

// setInterval(autoScroll, 5000);

// Parallax effect based on mouse movement
// document.addEventListener('mousemove', (e) => {
//     const x = (e.clientX / window.innerWidth) - 0.5;
//     const y = (e.clientY / window.innerHeight) - 0.5;

//     sections.forEach(section => {
//         const title = section.querySelector('h1[data-scroll]');
//         const image = section.querySelector('img[data-scroll]');
//         const para = section.querySelector('p[data-scroll]');

//         if (title) {
//             title.style.transform = `translateZ(50px) scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
//         }
//         if (image) {
//             image.style.transform = `translateZ(20px) scale(1.05) translate(${x * 20}px, ${y * 20}px)`;
//         }
//         if (para) {
//             para.style.transform = `translateZ(30px) scale(1.05) translate(${x * 15}px, ${y * 15}px)`;
//         }
//     });
// });

// Initialize Locomotive Scroll
document.addEventListener('DOMContentLoaded', function () {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });

    // let sections = document.querySelectorAll('.section-auto-scroll');
    // let currentIndex = 0;

    // function autoScroll() {
    //     if (currentIndex < sections.length - 1) {
    //         currentIndex++;
    //     }
    //     else {
    //     }
    //     scroll.scrollTo(sections[currentIndex], {
    //         offset: 0,
    //         duration: 1000,
    //         easing: [0.25, 0.00, 0.35, 1.00]
    //     });
    // }
    // let count = 0;
    // let intervalId;

    // Function to be executed
    // function myFunction() {
    //     count++;
    //     console.log(`This is execution number ${count}`);
    //     autoScroll();

    //     if (count >= 3) {
    //         clearInterval(intervalId); // Stop the interval after 3 executions
    //         enableScroll(); // Re-enable scrolling
    //     }
    // }

    // Disable scrolling
    function disableScroll() {
        document.body.classList.add('no-scroll');
    }

    // Enable scrolling
    function enableScroll() {
        document.body.classList.remove('no-scroll');
    }

    // Disable scrolling initially
    disableScroll();

    // Set the interval
    // intervalId = setInterval(myFunction, 5000); // 1000 milliseconds = 1 second
});



document.addEventListener('DOMContentLoaded', function () {
    // Initialize Letterize.js for each title
    // document.querySelectorAll('.letterize').forEach(title => {
    //     const letterize = new Letterize({
    //         targets: title
    //     });
    //     letterize.listAll.forEach((element, index) => {
    //         element.classList.add('animate');
    //     });
    // });
    // ScrollReveal().reveal('.letterize span', {
    //     interval: 40,
    //     duration: 1000,
    //     origin: 'bottom',
    //     distance: '50px'
    // });
});

// const test = new Letterize({
//     targets: "#animateMe"
// });

// var animation = anime.timeline({
//     targets: test.listAll,
//     delay: anime.stagger(50),
//     loop: true
// });

// animation
//     .add({
//         translateY: -40
//     })
//     .add({
//         translateY: 0
//     });

// const test = new Letterize({
//       targets: "#animateMe"
//     });

//     var animation = anime.timeline({
//       targets: test.listAll,
//       delay: anime.stagger(50),
//       loop: true
//     });

//     animation
//       .add({
//         translateY: -10
//       })
//       .add({
//         translateY: 0
//       });

const animate = document.querySelectorAll('[data-animate]');

// Messages
const invalidNameText = "Please enter your name"
const invalidEmailText1 = "Please enter your email id";
const invalidEmailText2 = "Please enter valid email id";
const emailSentText = "Your message has been sent. We'll be in touch with you soon";
const emailFailedText = "Sending fail, Please try again letter";

/**
 * Check element is in viewport
 * @param {HTMLElement} el 
 * @param {number} dividend 
 * @returns 
 */
function inViewport(el, dividend = 1) {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
}

/**
 * Initialize scroll animation 
 */
function scrollAnimation() {
    animate.forEach(item => {
        if (inViewport(item, 1.15)) {
            item.classList.add(item.dataset.animate);

            const computedStyle = window.getComputedStyle(item);
            const prop = computedStyle.getPropertyValue('-webkit-animation-delay') ? '-webkit-animation-delay' : 'animation-delay';
            if (item.dataset.animateDelay) item.style.setProperty(prop, item.dataset.animateDelay);
        }
    });
}

/**
 * Hamburger menu events
 */
function menu() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const close = document.getElementById('sidebar_close');
    const overlay = document.createElement('div');
    const show = 'show';
    const removeSidebar = () => {
        sidebar.classList.remove(show);
        overlay.classList.remove(show);
        setTimeout(() => {
            overlay.remove();
        }, 251);
    }

    overlay.id = 'overlay';

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            sidebar.classList.add(show);
            document.body.appendChild(overlay);
            setTimeout(() => {
                overlay.classList.add(show);
            }, 1);
        });

        close.addEventListener("click", removeSidebar);
        overlay.addEventListener("click", removeSidebar);
    }

}

/**
 * Will gracefully scroll the page
 * This function will scroll the page using
 * an `ease-in-out` effect.
 * 
 * @param {HTMLElement | number | Selector} to 
 * @param {number} duration 
 * @returns 
 */
function scrollPageTo(to, duration = 300) {
    const easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    return new Promise((resolve, reject) => {
        const element = document.scrollingElement;

        if (typeof to === 'string') {
            to = document.querySelector(to) || reject();
        }
        if (typeof to !== 'number') {
            to = to.getBoundingClientRect().top + element.scrollTop;
        }

        let start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        const animateScroll = function () {
            currentTime += increment;
            let val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            } else {
                resolve();
            }
        };
        animateScroll();
    });
}

/**
 * Bind click event on link to scroll to element.
 */
function scrollToElement() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const id = this.getAttribute('href') !== '#' ? this.getAttribute('href') : '';
            const target = id ? document.querySelector(id) : null;
            const offset = this.dataset.offset || target?.offsetTop;
            window.scrollPageTo(parseInt(offset, 10));
        });
    });
}

/**
 * Portfolio card slider
 */
function portfolioCards() {
    new Swiper('#portfolio_cards', {
        slidesPerView: 1,
        spaceBetween: 16,

        pagination: {
            el: '#portfolio_cards .swiper-pagination',
            clickable: true
        },

        breakpoints: {
            580: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
        }
    });
}

/**
 * Testimonial slider
 */
function testimonialSlider() {
    new Swiper('#testimonial_slider', {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 16,

        pagination: {
            el: '#testimonial_slider .swiper-pagination',
            clickable: true
        },

        autoplay: {
            delay: 5000
        },
    });
}

/**
 * Blog card slider
 */
function blogCards() {
    new Swiper('#blog_cards', {
        slidesPerView: 1,
        spaceBetween: 16,

        pagination: {
            el: '#blog_cards .swiper-pagination',
            clickable: true
        },

        breakpoints: {
            580: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
        }
    });
}
// /**
//  * Contact form
//  * Validate form & send bind event on controls.
//  */
//  function contactForm() {
//     const contactButton = document.getElementById('contact_btn');
//     const name = document.getElementById('name');
//     const email = document.getElementById('email');
//     const msg = document.getElementById('msg');
//     const formMessage = document.getElementById('form_message');

//     // Function to display message
//     function displayMessage(message, className) {
//         formMessage.innerHTML = `<span class="${className}">${message}</span>`;
//     }

//     // Function to validate email
//     function validateEmail(emailValue) {
//         const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return regEx.test(emailValue);
//     }

//     // Function to handle form submission
//     function handleSubmit(event) {
//         event.preventDefault();

//         // Clear any previous messages
//         formMessage.innerHTML = '';

//         // Validate form fields
//         if (!name.value.trim()) {
//             displayMessage('Please enter your name.', 'error');
//             return;
//         }

//         if (!email.value.trim()) {
//             displayMessage('Please enter your email address.', 'error');
//             return;
//         }

//         if (!validateEmail(email.value.trim())) {
//             displayMessage('Please enter a valid email address.', 'error');
//             return;
//         }

//         if (!msg.value.trim()) {
//             displayMessage('Please enter your message.', 'error');
//             return;
//         }

//         // If all fields are valid, prepare form data
//         const formData = new FormData();
//         formData.append('name', name.value.trim());
//         formData.append('email', email.value.trim());
//         formData.append('msg', msg.value.trim());

//         // Send form data to server using fetch
//         fetch('php/contact.php', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => {
//             if (response.ok) {
//                 displayMessage('Message sent successfully!', 'success');
//                 // Optionally, reset the form
//                 // document.getElementById('contactForm').reset();
//             } else {
//                 displayMessage('Failed to send message. Please try again later.', 'error');
//             }
//         })
//         .catch(error => {
//             displayMessage('An error occurred while sending message. Please try again later.', 'error');
//             console.error('Error:', error);
//         });
//     }

//     // Add event listener to form submit button
//     if (contactButton) {
//         contactButton.addEventListener('click', handleSubmit);
//     }
// }

// // Call contactForm function to set up form validation and submission
// contactForm();

/**
 * Call functions on window load.
 */

window.onload = () => {
    scrollAnimation();
    menu();
    scrollToElement();
    portfolioCards();
    testimonialSlider();
    blogCards();
}


/**
 * Bind scroll event on window
 * For scroll animation.
 */
window.addEventListener("scroll", scrollAnimation);


let isHovered = false;
let scrollSpeed = 4; // Adjust scroll speed

function startScroll(pagecover, image) {
    isHovered = true;
    pagecover.scrollTop = 0; // Reset scroll position to the top
    requestAnimationFrame(function() {
        scrollImage(pagecover, image);
    });
}

function stopScroll(pagecover) {
    isHovered = false;
    scrollToTop(pagecover);
}

function scrollImage(pagecover, image) {
    if (isHovered && pagecover.scrollTop < image.clientHeight - pagecover.clientHeight) {
        pagecover.scrollTop += scrollSpeed;
        requestAnimationFrame(function() {
            scrollImage(pagecover, image);
        });
    }
}

function scrollToTop(pagecover) {
    let scrollInterval = setInterval(function() {
        if (pagecover.scrollTop > 0) {
            pagecover.scrollTop -= scrollSpeed;
        } else {
            clearInterval(scrollInterval);
        }
    }, 16); // Adjust the interval for smoother scrolling
}

// Attach event listeners to each image
document.querySelectorAll('#image').forEach(function(img) {
    let pagecover = img.parentElement;
    img.addEventListener('mouseenter', function() {
        startScroll(pagecover, img);
    });
    img.addEventListener('mouseleave', function() {
        stopScroll(pagecover);
    });
});

document.querySelectorAll("#downloadButton").forEach(function(button) {
    button.addEventListener("click", function() {
        var pdfUrl = this.getAttribute("data-pdf");
        downloadPDF(pdfUrl);
    });
});

function downloadPDF(pdfUrl) {
    // Create a temporary anchor element
    var a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'resume.pdf'; // Specify the default file name to be downloaded

    // Append the anchor element to the body
    document.body.appendChild(a);

    // Programmatically trigger a click event on the anchor element
    a.click();

    // Cleanup: remove the anchor element from the body
    document.body.removeChild(a);
};




// /**
//  * Theme settings
//  *------------------------------------*/
// const theme = document.getElementById('theme');
// if (theme) {
//     theme.addEventListener("click", () => {
//         if (document.body.hasAttribute('data-theme')) {
//             document.body.removeAttribute('data-theme');
//         } else {
//             document.body.setAttribute('data-theme', 'dark');
//         }
//     });
// }
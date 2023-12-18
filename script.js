const fullPage = document.querySelector('body');
const h2 = document.querySelector("#projet > h2");
const projectSection = document.querySelector('#projet');

let isTransitioning = false;
let decryptionTriggered = true;
let transitionTimeout = null;

function observerCallback(entries) {
    entries.forEach(entry => {
        if (entry.target.tagName === 'H2') {
            if (entry.isIntersecting && !isTransitioning) {
                console.log("Le h2 est maintenant visible !");
                isTransitioning = true;
                setTimeout(handleDecrypt, 50);
            } else if (!entry.isIntersecting && isTransitioning) {
                console.log("Le h2 n'est plus visible !");
                isTransitioning = false;
                resetDecryption();
            }
        }

        if (entry.target.id === 'projet') {
            if (entry.isIntersecting && !isTransitioning) {
                console.log("La section projet est maintenant visible !");
                transitionBackground();

            } else if (!entry.isIntersecting && !isTransitioning) {
                console.log("La section projet n'est plus visible !");
                resetTransition();
            }
        }
    });
}

const observer = new IntersectionObserver(observerCallback);

if (projectSection) {
    observer.observe(projectSection);
    observer.observe(h2);
} else {
    console.error("La section projet n'a pas été trouvée !");
}

const chars = `0x12_3z456e7~89!@r#$-%A^&*(q)`.split('').sort(() => Math.random() - 0.5);

const getRandomChar = (c) => {
    const n = chars.length;
    let x = chars[Math.floor(Math.random() * n)];
    while (x === c) {
        x = chars[Math.floor(Math.random() * n)];
    }
    return x;
};

const encrypt = (text) => text.split('').map(getRandomChar).join('');

const decrypt = (text) => text.split('').map(getRandomChar).join('');

const originalName = h2.innerHTML;
let currentIndex = 0;
let intervalId = null;

const handleDecrypt = () => {
    if (decryptionTriggered) {
        currentIndex = 0;
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            if (currentIndex > originalName.length) {
                clearInterval(intervalId);
            } else {
                const c = originalName.charAt(currentIndex % originalName.length);
                const n = currentIndex + 1;
                const decoded = originalName.slice(0, n);
                const encoded = encrypt(originalName.slice(n));
                h2.innerHTML = decoded + encoded;
                currentIndex++;
            }
        }, 100);
    }
};

const resetDecryption = () => {
    currentIndex = 0;
    clearInterval(intervalId);
    h2.innerHTML = originalName;
};

function transitionBackground() {
    fullPage.classList.add('black-background');
}

const resetTransition = () => {
    clearTimeout(transitionTimeout);
    fullPage.classList.remove('black-background');
};
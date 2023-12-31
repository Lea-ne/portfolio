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
    clearTimeout(transitionTimeout);
    transitionTimeout = setTimeout(() => {
        fullPage.classList.add('black-background');
        transitionBackground();
    }, 700); // Ajoutez le délai nécessaire pour la transition (par exemple, 1 seconde)
};

const resetTransition = () => {
    clearTimeout(transitionTimeout);
    fullPage.classList.remove('black-background');
};











/////// AFFICHER HEURE ///////////
function afficherHeure() {
    const heureElement = document.getElementById('heure');

    function actualiserHeure() {
        const maintenant = new Date();
        const fuseauHoraireIrlande = 'Europe/Dublin'; // Fuseau horaire de l'Irlande

        const options = {
            timeZone: fuseauHoraireIrlande,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        const heureIrlande = maintenant.toLocaleTimeString('ie-IE', options);
        heureElement.textContent = heureIrlande;
    }

    setInterval(actualiserHeure, 1000);
    actualiserHeure(); // Pour afficher l'heure immédiatement lors du chargement de la page
}

afficherHeure();





/////////SCROLL EXPERTISE//////////////

window.addEventListener('scroll', function() {
    const expertiseSection = document.getElementById('expertise');
    const nameTechnoDiv = expertiseSection.querySelector('.name-techno');
    const sectionBottom = expertiseSection.offsetTop + expertiseSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
  
    if (scrollPosition > sectionBottom) {
      let offsetY = scrollPosition - sectionBottom;
      offsetY = Math.min(offsetY, 150); // Limiter le déplacement à 400px maximum
      nameTechnoDiv.style.transform = `translateY(-${offsetY}px)`;
    } else {
      nameTechnoDiv.style.transform = 'none';
    }
  });


 const galleryStates = {
            gallery1: {
                currentImage: 1,
                totalImages: 7
            },
            quincho: {
                currentImage: 1,
                totalImages: 7
            }
        };

function showImage(galleryId, imageNumber) {
    const gallery = document.querySelector(`[data-gallery-id="${galleryId}"]`);
    const wrapper = gallery.querySelector('.images-wrapper');
    const dots = gallery.querySelectorAll('.nav-dot');

    // Calcular el porcentaje de desplazamiento
    //const translateX = -(imageNumber - 1) * (100 / galleryStates[galleryId].totalImages);
    const translateX = -(imageNumber - 1) * 14.28;
    wrapper.style.transform = `translateX(${translateX}%)`;


    // Actualizar dots
    dots.forEach((dot, index) => {
        if (index === imageNumber - 1) {
            dot.classList.add('active');
            dot.setAttribute('aria-current', 'true');
        } else {
            dot.classList.remove('active');
            dot.setAttribute('aria-current', 'false');
        }
    });

    // Actualizar estado
    galleryStates[galleryId].currentImage = imageNumber;
}

function nextImage(galleryId) {
    const state = galleryStates[galleryId];
    let nextImg;

    if (state.currentImage < state.totalImages) {
        nextImg = state.currentImage + 1;
    } else {
        nextImg = 1; // Volver al inicio
    }

    showImage(galleryId, nextImg);
}

function previousImage(galleryId) {
    const state = galleryStates[galleryId];
    let prevImg;

    if (state.currentImage > 1) {
        prevImg = state.currentImage - 1;
    } else {
        prevImg = state.totalImages; // Ir al final
    }

    showImage(galleryId, prevImg);
}



// Función para agregar más galerías dinámicamente
function addGallery(galleryId, totalImages) {
    galleryStates[galleryId] = {
        currentImage: 1,
        totalImages: totalImages
    };
}

// Convierte una miniatura de video en un <video autoplay> al hacer click
// (el trigger es un <button> real, así que Enter/Espacio ya disparan click nativamente)
function hacerClickeable(id, videoSrc) {
    const trigger = document.getElementById(id);
    trigger.addEventListener('click', function activar() {
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;

        const source = document.createElement('source');
        source.src = videoSrc;
        source.type = 'video/mp4';

        video.appendChild(source);
        this.replaceWith(video);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    hacerClickeable('quincho-video', 'assets/videos/intertower-7.mp4');
    hacerClickeable('termotanque-video', 'assets/videos/termotanque-solar.mp4');
    hacerClickeable('yeso-video', 'assets/videos/yeso.mp4');
    hacerClickeable('int2-video', 'assets/videos/intertower-2.mp4');
    hacerClickeable('termotanque2-video', 'assets/videos/termotanque-2026.mp4');
});

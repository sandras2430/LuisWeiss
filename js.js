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
        } else {
            dot.classList.remove('active');
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

document.addEventListener('DOMContentLoaded', () => {

  const miniatura = document.getElementById('quincho-video');

  miniatura.addEventListener('click', () => {
    miniatura.outerHTML = '<video controls autoplay><source src=./videos/Intert7.mp4 type=video/mp4></video>';
  });

  const miniaturaT = document.getElementById('termotanque-video');

  miniaturaT.addEventListener('click', () => {
    miniaturaT.outerHTML = '<video controls autoplay><source src=./videos/termotanquesolar.mp4 type=video/mp4></video>';
  });

  const miniaturaY = document.getElementById('yeso-video');

  miniaturaY.addEventListener('click', () => {
    miniaturaY.outerHTML = '<video controls autoplay><source src=./videos/yeso.mp4 type=video/mp4></video>';
  });

  const miniaturaI = document.getElementById('int2-video');

  miniaturaI.addEventListener('click', () => {
    miniaturaI.outerHTML = '<video controls autoplay><source src=./videos/Intert2.mp4 type=video/mp4></video>';
  });
});

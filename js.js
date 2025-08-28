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
            const translateX = -(imageNumber - 1) * (100 / galleryStates[galleryId].totalImages);
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
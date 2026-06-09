document.addEventListener('DOMContentLoaded', () => {
    
    /* --- ACORDEÓN DE PREGUNTAS FRECUENTES --- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const activeHeader = document.querySelector('.accordion-header.active');
            
            if (activeHeader && activeHeader !== header) {
                activeHeader.classList.remove('active'); 
                activeHeader.nextElementSibling.style.maxHeight = null; 
                activeHeader.querySelector('.icon').textContent = "+"; 
            }

            header.classList.toggle('active');
            const content = header.nextElementSibling;
            const icon = header.querySelector('.icon');

            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px"; 
                icon.textContent = "−"; 
            } else {
                content.style.maxHeight = null; 
                icon.textContent = "+"; 
            }
        });
    });

    /* --- MENÚ DESPLEGABLE (SUBMENÚ) --- */
    const lecturasBtn = document.getElementById('lecturas-btn');
    const lecturasSubmenu = document.getElementById('lecturas-submenu');
    
    if (lecturasBtn) {
        lecturasBtn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault(); 
                
                lecturasSubmenu.classList.toggle('open');
                this.parentElement.classList.toggle('open');
                
                const targetSection = document.getElementById(href.substring(1));
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            } else {
                lecturasSubmenu.classList.toggle('open');
                this.parentElement.classList.toggle('open');
            }
        });
    }

    /* --- SCROLL SUAVE Y NAVEGACIÓN ACTIVA --- */
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-link');
    const sidebar = document.getElementById('sidebar');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.id === 'lecturas-btn') return;

            const href = this.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault(); 
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 20, 
                        behavior: 'smooth' 
                    });
                    
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('show'); 
                    }
                }
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = ''; 
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop; 
            
            if (scrollPos >= (sectionTop - 150)) {
                if(section.getAttribute('id')) {
                    current = section.getAttribute('id'); 
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active'); 
            const href = link.getAttribute('href');
            
            if (href) {
                const hashIndex = href.indexOf('#');
                const anchor = hashIndex !== -1 ? href.substring(hashIndex + 1) : null;
                
                if (anchor && anchor === current) {
                    link.classList.add('active'); 
                }
            }
        });
    });

    /* --- MENÚ MÓVIL DESPLEGABLE --- */
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }

    /* --- LÓGICA DE AUTOMATIZACIÓN DEL CARRUSEL --- */
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;

        const updateCarousel = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            
            indicators.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        };

        const goToNextSlide = () => {
            let nextIndex = (currentIndex + 1) % totalSlides;
            updateCarousel(nextIndex);
        };

        const goToPrevSlide = () => {
            let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel(prevIndex);
        };

        nextBtn.addEventListener('click', () => {
            goToNextSlide();
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            goToPrevSlide();
            resetAutoPlay();
        });

        indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => {
                updateCarousel(i);
                resetAutoPlay();
            });
        });

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(goToNextSlide, 4000);
        };

        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };

        startAutoPlay();
    }
});
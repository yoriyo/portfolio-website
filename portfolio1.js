document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. KAMUS TERJEMAHAN (ID & EN)
    // ==========================================
    const translations = {
        id: {
            search_placeholder: "Cari...",
            nav_home: "Beranda",
            nav_about: "Tentang Saya",
            nav_category: "Kategori",
            side_title: "Cek Portofolio saya lainnya",
            tag_business: "Bisnis",
            tag_nutrition: "Nutrisi",
            tag_study: "Studi",
            tag_economy: "Ekonomi",
            articles_title: "Artikel Tambahan",
            btn_see_more: "Klik untuk selengkapnya",
            side_desc_1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            side_desc_2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            side_desc_3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            side_desc_4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            article_desc_1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            article_desc_2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            article_desc_3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            article_desc_4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            article_desc_5: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            article_desc_6: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        en: {
            search_placeholder: "Search...",
            nav_home: "Home",
            nav_about: "About Me",
            nav_category: "Category",
            side_title: "Check out my other portfolios",
            tag_business: "Business",
            tag_nutrition: "Nutrition",
            tag_study: "Study",
            tag_economy: "Economy",
            articles_title: "Additional Articles",
            btn_see_more: "Click to see more",
            side_desc_1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            side_desc_2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            side_desc_3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            side_desc_4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            article_desc_1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            article_desc_2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            article_desc_3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            article_desc_4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            article_desc_5: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            article_desc_6: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    };

    // ==========================================
    // 2. DATA CAROUSEL DWIBAHASA
    // ==========================================
    const carouselData = [
        {
            tag: { id: "Bisnis", en: "Business" },
            tagUrl: "category.html?tag=business",
            title: {
                id: "Singkat saja judul dari kegiatan Business",
                en: "Brief title of the Business activity"
            },
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80",
            projectUrl: "detail-business.html"
        },
        {
            tag: { id: "Nutrisi", en: "Nutrition" },
            tagUrl: "category.html?tag=nutrition",
            title: {
                id: "Eksplorasi Nutrisi Seimbang & Pola Hidup Sehat",
                en: "Exploring Balanced Nutrition & Healthy Lifestyle"
            },
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=80",
            projectUrl: "detail-nutrition.html"
        },
        {
            tag: { id: "Studi", en: "Study" },
            tagUrl: "category.html?tag=study",
            title: {
                id: "Riset Pola Belajar Efektif & Produktivitas",
                en: "Research on Effective Study Patterns & Productivity"
            },
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80",
            projectUrl: "detail-study.html"
        },
        {
            tag: { id: "Ekonomi", en: "Economy" },
            tagUrl: "category.html?tag=economy",
            title: {
                id: "Analisis Makroekonomi & Tren Pasar Terkini",
                en: "Macroeconomic Analysis & Current Market Trends"
            },
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80",
            projectUrl: "detail-economy.html"
        },
        {
            tag: { id: "Fisika", en: "Physics" },
            tagUrl: "category.html?tag=physics",
            title: {
                id: "Eksperimen & Pemodelan Simulasi Fisika Terapan",
                en: "Experiments & Applied Physics Simulation Modeling"
            },
            image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1000&q=80",
            projectUrl: "detail-physics.html"
        },
        {
            tag: { id: "Buku", en: "Book" },
            tagUrl: "category.html?tag=book",
            title: {
                id: "Kajian Kritis & Resume Buku Pilihan Minggu Ini",
                en: "Critical Review & Book Summary of the Week"
            },
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80",
            projectUrl: "detail-book.html"
        }
    ];

    let currentLang = localStorage.getItem('site_lang') || 'id';
    let currentIndex = 0;
    let autoSlideTimer = null;
    const DELAY_TIME = 4800;
    const ANIMATION_DURATION = 300;

    const carouselCard = document.getElementById('carouselCard');
    const carouselImg = document.getElementById('carouselImg');
    const carouselTag = document.getElementById('carouselTag');
    const carouselTitle = document.getElementById('carouselTitle');
    const dots = document.querySelectorAll('#carouselDots .dot');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const langToggle = document.getElementById('langToggle');
    const langButtons = langToggle ? langToggle.querySelectorAll('.lang-btn') : [];

    // ==========================================
    // 3. FUNGSI PENUKAR BAHASA (I18N)
    // ==========================================
    function setLanguage(lang, isInitial = false) {
            currentLang = lang;
            localStorage.setItem('site_lang', lang);
            document.documentElement.lang = lang;

            const slider = langToggle ? langToggle.querySelector('.lang-slider') : null;

            // Jika dipanggil saat muat halaman pertama kali, matikan transisi slider
            if (isInitial && slider) {
                slider.style.transition = 'none';
            }

            // Update placeholder pencarian
            if (searchInput) {
                searchInput.placeholder = translations[lang].search_placeholder;
            }

            // Update seluruh teks yang memiliki data-lang-key
            const translatableElements = document.querySelectorAll('[data-lang-key]');
            translatableElements.forEach(el => {
                const key = el.getAttribute('data-lang-key');
                if (translations[lang] && translations[lang][key]) {
                    el.textContent = translations[lang][key];
                }
            });

            // Update status tombol dan posisi slider
            if (langToggle) {
                langButtons.forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
                });

                if (lang === 'id') {
                    langToggle.classList.add('id-active');
                } else {
                    langToggle.classList.remove('id-active');
                }
            }

            // Kembalikan transisi setelah posisi awal selesai terpasang tanpa animasi
            if (isInitial && slider) {
                slider.offsetHeight; // Memicu reflow browser
                setTimeout(() => {
                    slider.style.transition = '';
                }, 50);
            }

            // Segarkan teks pada carousel
            updateCarousel(currentIndex);
    }

    // ==========================================
    // 4. LOGIKA CAROUSEL
    // ==========================================
    function updateCarousel(index) {
        currentIndex = index;
        const currentItem = carouselData[currentIndex];

        carouselImg.style.opacity = '0.3';
        carouselTitle.style.opacity = '0';
        carouselTag.style.opacity = '0';

        setTimeout(() => {
            carouselImg.src = currentItem.image;
            carouselTag.textContent = currentItem.tag[currentLang];
            carouselTag.href = currentItem.tagUrl;
            carouselTitle.textContent = currentItem.title[currentLang];

            carouselImg.style.opacity = '1';
            carouselTitle.style.opacity = '1';
            carouselTag.style.opacity = '1';
        }, ANIMATION_DURATION);

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideTimer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % carouselData.length;
            updateCarousel(nextIndex);
        }, DELAY_TIME);
    }

    function stopAutoSlide() {
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
        }
    }

    // ==========================================
    // 5. EVENT LISTENERS
    // ==========================================
    // Form Pencarian
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query !== '') {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }

    // Kartu Carousel
    if (carouselCard) {
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetIndex = parseInt(dot.getAttribute('data-index'));
                updateCarousel(targetIndex);
                startAutoSlide();
            });
        });

        carouselTag.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        carouselCard.addEventListener('click', () => {
            const currentItem = carouselData[currentIndex];
            window.location.href = currentItem.projectUrl;
        });

        carouselCard.addEventListener('mouseenter', stopAutoSlide);
        carouselCard.addEventListener('mouseleave', startAutoSlide);
    }

    // Tombol Toggle Bahasa
    if (langButtons.length > 0) {
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetLang = button.getAttribute('data-lang');
                if (targetLang !== currentLang) {
                    setLanguage(targetLang);
                }
            });
        });
    }

    // Inisialisasi awal
    setLanguage(currentLang, true);
    startAutoSlide();
});
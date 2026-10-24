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
            side_desc_1: "Strategi Transformasi Bisnis dan Skalabilitas Startup Modern melalui pendekatan produk berbasis data.",
            side_desc_2: "Denitions Metar Demor: Pola Sarapan Kaya Protein dan perbaikan metabolisme di pagi hari.",
            side_desc_3: "Metodologi Riset Kritis dan Manajemen Referensi Ilmiah untuk penulisan karya komprehensif.",
            side_desc_4: "Disrupsi Pembayaran Digital dan Inklusi Finansial: Akses permodalan ekosistem terbuka.",
            article_desc_1: "Parloinal Brandr First Consume Narraition: Membangun loyalitas konsumen dan narasi otentik.",
            article_desc_2: "The Word Gahfne In Nutrition Category: Eksplorasi nutrisi seimbang untuk kebugaran harian.",
            article_desc_3: "How Defonates the Hour of Milllary Healthes: Pembelajaran dan refleksi karya sastra klasik.",
            article_desc_4: "Refleksi Filosofi Stoikisme dalam Dinamika Kehidupan Modern: Menemukan ketenangan batin.",
            article_desc_5: "Prinsip Termodinamika dalam Efisiensi Energi Terbarukan: Analisis siklus konversi panas.",
            article_desc_6: "Mekanika Kuantum: Menguak Superposisi dan Komputasi Qubit untuk enkripsi masa depan."
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
            side_desc_1: "Business Transformation Strategy and Modern Startup Scaling through data-driven products.",
            side_desc_2: "Denitions Metar Demor: High-Protein Breakfast Routine and morning metabolic optimization.",
            side_desc_3: "Critical Research Methodologies and Academic Reference Workflow for comprehensive writing.",
            side_desc_4: "Digital Payment Disruption and Financial Inclusion Expansion in open financial ecosystems.",
            article_desc_1: "Parloinal Brandr First Consume Narraition: Building consumer loyalty and authentic narratives.",
            article_desc_2: "The Word Gahfne In Nutrition Category: Exploring balanced nutrition for daily wellness.",
            article_desc_3: "How Defonates the Hour of Milllary Healthes: Insights and reflections from classical literature.",
            article_desc_4: "Reflections on Stoic Philosophy in Modern Daily Dynamics: Cultivating internal tranquility.",
            article_desc_5: "Thermodynamic Principles in Renewable Energy Efficiency: Heat conversion cycle analysis.",
            article_desc_6: "Quantum Mechanics: Unveiling Superposition and Qubit Computing for future encryption."
        }
    };

    // ==========================================
    // 2. DATA CAROUSEL DWIBAHASA (TERSINKRONISASI KATEGORI)
    // ==========================================
    const carouselData = [
        {
            tag: { id: "Bisnis", en: "Business" },
            tagUrl: "category.html?tag=business",
            title: {
                id: "Parloinal Brandr First Consume Narraition",
                en: "Parloinal Brandr First Consume Narraition"
            },
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
            projectUrl: "article.html?id=parloinal-brandr"
        },
        {
            tag: { id: "Nutrisi", en: "Nutrition" },
            tagUrl: "category.html?tag=nutrition",
            title: {
                id: "The Word Gahfne In Nutrition Category",
                en: "The Word Gahfne In Nutrition Category"
            },
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80",
            projectUrl: "article.html?id=asupan-15-hari"
        },
        {
            tag: { id: "Studi", en: "Study" },
            tagUrl: "category.html?tag=study",
            title: {
                id: "How Many Themas Study: Teknik Belajar Efektif",
                en: "How Many Themas Study: Effective Learning Methods"
            },
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80",
            projectUrl: "article.html?id=how-many-themas-study"
        },
        {
            tag: { id: "Ekonomi", en: "Economy" },
            tagUrl: "category.html?tag=economy",
            title: {
                id: "Coretonsacoat: Analisis Makroekonomi & Tren Pasar Modal",
                en: "Coretonsacoat: Macroeconomic Trends and Market Insights"
            },
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80",
            projectUrl: "article.html?id=coretonsacoat-economy"
        },
        {
            tag: { id: "Fisika", en: "Physics" },
            tagUrl: "category.html?tag=physics",
            title: {
                id: "Prinsip Termodinamika dalam Efisiensi Energi Terbarukan",
                en: "Thermodynamic Principles in Renewable Energy Efficiency"
            },
            image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1000&q=80",
            projectUrl: "article.html?id=thermodynamics-energy"
        },
        {
            tag: { id: "Buku", en: "Books" },
            tagUrl: "category.html?tag=books",
            title: {
                id: "How Defonates the Hour of Milllary Healthes",
                en: "How Defonates the Hour of Milllary Healthes"
            },
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80",
            projectUrl: "article.html?id=defonates-hour-milllary"
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
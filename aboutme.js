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
            hero_greeting: "Halo, saya Ilham. Senang bertemu denganmu",
            hero_title: "Saya hanya orang yang suka membagikan apa pun yang saya pelajari, sukai, dan cintai.",
            skills_label: "Keahlian yang saya miliki:",
            contact_label: "Tanyakan apa saja:",
            projects_heading: "Check my other projects below"
        },
        en: {
            search_placeholder: "Search...",
            nav_home: "Home",
            nav_about: "About Me",
            nav_category: "Category",
            hero_greeting: "Hi, I'm Ilham. Nice to meet you",
            hero_title: "I'm just a guy who likes to share anything i learn, i like, and i love.",
            skills_label: "Skills i have:",
            contact_label: "Ask me anything:",
            projects_heading: "Check my other projects below"
        }
    };

    // ==========================================
    // 2. ELEMEN DOM & STATE
    // ==========================================
    let currentLang = localStorage.getItem('site_lang') || 'id';

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

        // Jika dipanggil saat awal muat halaman, matikan animasi sejenak
        if (isInitial && slider) {
            slider.style.transition = 'none';
        }

        // Perbarui placeholder form pencarian
        if (searchInput && translations[lang]) {
            searchInput.placeholder = translations[lang].search_placeholder;
        }

        // Perbarui semua elemen yang memiliki atribut data-lang-key
        const translatableElements = document.querySelectorAll('[data-lang-key]');
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Perbarui tombol aktif dan posisi slider
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

        // Pulihkan transisi animasi setelah layout awal terpasang
        if (isInitial && slider) {
            slider.offsetHeight; // Reflow browser
            setTimeout(() => {
                slider.style.transition = '';
            }, 50);
        }
    }

    // ==========================================
    // 4. EVENT LISTENERS
    // ==========================================

    // Form Pencarian di Navbar: mengarahkan ke halaman kategori dengan query
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query !== '') {
                window.location.href = `category.html?q=${encodeURIComponent(query)}`;
            } else {
                window.location.href = `category.html`;
            }
        });
    }

    // Klik Tombol Pengalih Bahasa
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

    // Inisialisasi status awal saat halaman dimuat
    setLanguage(currentLang, true);
});

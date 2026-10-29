document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. KAMUS TERJEMAHAN (ID & EN)
    // ==========================================
    const translations = {
        id: {
            nav_home: "Beranda",
            nav_about: "Tentang Saya",
            nav_category: "Kategori",
            hero_welcome: "Selamat Datang di Website Saya",
            hero_desc: "Melalui website ini kalian akan saya suguhkan hal-hal yang menarik bagi saya di dunia",
            hero_credit_1: "fully designed by Ilham for his interests",
            hero_credit_2: "with the help of AI and internet for the codes and deployment"
        },
        en: {
            nav_home: "Home",
            nav_about: "About Us",
            nav_category: "Category",
            hero_welcome: "Welcome to my Website",
            hero_desc: "Through this website I will present to you things that fascinate me in the world",
            hero_credit_1: "fully designed by Ilham for his interests",
            hero_credit_2: "with the help of AI and internet for the codes and deployment"
        }
    };

    // ==========================================
    // 2. ELEMEN DOM & STATE
    // ==========================================
    let currentLang = localStorage.getItem('site_lang') || 'id';

    const langToggle = document.getElementById('langToggle');
    const langButtons = langToggle ? langToggle.querySelectorAll('.lang-btn') : [];
    const startBtn = document.getElementById('startBtn');
    const adminBtn = document.getElementById('adminBtn');

    // ==========================================
    // 3. FUNGSI PENUKAR BAHASA (I18N)
    // ==========================================
    function setLanguage(lang, isInitial = false) {
        currentLang = lang;
        localStorage.setItem('site_lang', lang);
        document.documentElement.lang = lang;

        const slider = langToggle ? langToggle.querySelector('.lang-slider') : null;

        // Jika dipanggil saat awal buka halaman, jangan ada jeda animasi slider
        if (isInitial && slider) {
            slider.style.transition = 'none';
        }

        // Update seluruh teks yang memiliki data-lang-key
        const translatableElements = document.querySelectorAll('[data-lang-key]');
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update tombol aktif dan posisi slider
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

        // Kembalikan transisi setelah slider diposisikan di awal
        if (isInitial && slider) {
            slider.offsetHeight; // Force reflow
            setTimeout(() => {
                slider.style.transition = '';
            }, 50);
        }
    }

    // ==========================================
    // 4. EVENT LISTENERS
    // ==========================================
    // Event Tombol Pengalih Bahasa
    if (langButtons.length > 0) {
        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetLang = button.getAttribute('data-lang');
                if (targetLang !== currentLang) {
                    setLanguage(targetLang);
                }
            });
        });
    }

    // Event Klik Keseluruhan Pill Bahasa (toggle otomatis jika wadah diklik)
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const nextLang = currentLang === 'id' ? 'en' : 'id';
            setLanguage(nextLang);
        });
    }

    // Event Tombol START: Mengarahkan pengunjung ke home.html
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            window.location.href = 'home.html';
        });
    }

    // Event Tombol/Teks Admin: Sementara masuk seperti tombol CTA (ke home.html)
    if (adminBtn) {
        adminBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'home.html';
        });
    }

    // Inisialisasi awal bahasa
    setLanguage(currentLang, true);
});


// ==========================================
// 1. IMPOR FIREBASE FIRESTORE (OPSIONAL / SYNC)
// ==========================================
import { db, collection, getDocs } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', async () => {

    // ==========================================
    // 2. KAMUS TERJEMAHAN (ID & EN)
    // ==========================================
    const translations = {
        id: {
            search_placeholder: "Cari...",
            nav_home: "Beranda",
            nav_about: "Tentang Saya",
            nav_category: "Kategori",
            categories_title: "Categories",
            cat_all: "All",
            cat_business: "Business",
            cat_nutrition: "Nutrition",
            cat_study: "Study",
            cat_economy: "Economy",
            cat_physics: "Physics",
            cat_books: "Books",
            empty_title: "Tidak ada konten ditemukan",
            empty_desc: "Coba pilih kategori lain atau gunakan kata kunci pencarian yang berbeda.",
            btn_reset: "Tampilkan Semua",
            read_suffix: "mnt baca"
        },
        en: {
            search_placeholder: "Search...",
            nav_home: "Home",
            nav_about: "About Me",
            nav_category: "Category",
            categories_title: "Categories",
            cat_all: "All",
            cat_business: "Business",
            cat_nutrition: "Nutrition",
            cat_study: "Study",
            cat_economy: "Economy",
            cat_physics: "Physics",
            cat_books: "Books",
            empty_title: "No content found",
            empty_desc: "Try choosing another category or use a different search keyword.",
            btn_reset: "Show All",
            read_suffix: "mins read"
        }
    };

    // ==========================================
    // 3. DATA LENGKAP KARTU KATEGORI & ARTIKEL
    // (Presisi sesuai Wireframe & Mockup)
    // ==========================================
    let articlesData = [
        // --- 1. Business ---
        {
            id: "parloinal-brandr",
            category: "business",
            tag: { id: "Editorial", en: "Editorial" },
            title: {
                id: "Parloinal Brandr First Consume Narraition",
                en: "Parloinal Brandr First Consume Narraition"
            },
            excerpt: {
                id: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
            date: "2021.4.28",
            readTime: 10,
            url: "article.html?id=parloinal-brandr"
        },
        {
            id: "digital-business-scaling",
            category: "business",
            tag: { id: "Bisnis", en: "Business" },
            title: {
                id: "Strategi Transformasi Bisnis dan Skalabilitas Startup Modern",
                en: "Business Transformation Strategy and Modern Startup Scaling"
            },
            excerpt: {
                id: "Membangun fondasi model bisnis yang tahan krisis melalui pendekatan produk berbasis data dan retensi loyalitas pelanggan.",
                en: "Building a crisis-resilient business model foundation through data-driven products and customer retention."
            },
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            date: "2021.6.14",
            readTime: 8,
            url: "article.html?id=digital-business-scaling"
        },

        // --- 2. Nutrition ---
        {
            id: "word-gahfne-nutrition",
            category: "nutrition",
            tag: { id: "Nutrisi", en: "Nutrition" },
            title: {
                id: "The Word Gahfne In Nutrition Category",
                en: "The Word Gahfne In Nutrition Category"
            },
            excerpt: {
                id: "Lorem ipsum dolor sit amet consectetur and leam mating cineand tawerity team lorem ipsum dolor sit amet elit.",
                en: "Lorem ipsum dolor sit amet consectetur and leam mating cineand tawerity team lorem ipsum dolor sit amet elit."
            },
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
            date: "2021.5.18",
            readTime: 13,
            url: "article.html?id=asupan-15-hari"
        },
        {
            id: "denitions-metar-demor",
            category: "nutrition",
            tag: { id: "Nutrisi", en: "Nutrition" },
            title: {
                id: "Denitions Metar Demor: Pola Sarapan Kaya Protein",
                en: "Denitions Metar Demor: High-Protein Breakfast Routine"
            },
            excerpt: {
                id: "Optimasi stamina harian dengan konsumsi mikronutrisi seimbang dan perbaikan metabolisme tubuh di pagi hari.",
                en: "Optimizing daily stamina with balanced micronutrients intake and morning metabolic enhancement."
            },
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
            date: "2021.5.02",
            readTime: 7,
            url: "article.html?id=denitions-metar-demor"
        },

        // --- 3. Books ---
        {
            id: "defonates-hour-milllary",
            category: "books",
            tag: { id: "Editorial", en: "Editorial" },
            title: {
                id: "How Defonates the Hour of Milllary Healthes",
                en: "How Defonates the Hour of Milllary Healthes"
            },
            excerpt: {
                id: "Lorem ipsum dolor sit amet consectetur and thans mating areend tawrity teaim magna aliqua tempor incididunt.",
                en: "Lorem ipsum dolor sit amet consectetur and thans mating areend tawrity teaim magna aliqua tempor incididunt."
            },
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
            date: "2021.5.24",
            readTime: 35,
            url: "article.html?id=defonates-hour-milllary"
        },
        {
            id: "essential-growth-reads",
            category: "books",
            tag: { id: "Buku", en: "Books" },
            title: {
                id: "Refleksi Filosofi Stoikisme dalam Dinamika Kehidupan Modern",
                en: "Reflections on Stoic Philosophy in Modern Daily Dynamics"
            },
            excerpt: {
                id: "Menyelami pemikiran Marcus Aurelius dan Seneca dalam membangun ketenangan mental serta fokus pada hal yang dapat dikontrol.",
                en: "Diving into the wisdom of Marcus Aurelius and Seneca to cultivate mental peace and focus on what can be controlled."
            },
            image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
            date: "2021.6.01",
            readTime: 12,
            url: "article.html?id=essential-growth-reads"
        },

        // --- 4. Study ---
        {
            id: "how-many-themas-study",
            category: "study",
            tag: { id: "Studi", en: "Study" },
            title: {
                id: "How Many Themas Study: Teknik Belajar Efektif",
                en: "How Many Themas Study: Effective Learning Methods"
            },
            excerpt: {
                id: "Penerapan active recall dan spaced repetition untuk meningkatkan pemahaman konsep kompleks dan daya ingat jangka panjang.",
                en: "Applying active recall and spaced repetition to enhance mastery of complex concepts and long-term memory."
            },
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
            date: "2021.4.15",
            readTime: 15,
            url: "article.html?id=how-many-themas-study"
        },
        {
            id: "academic-research-framework",
            category: "study",
            tag: { id: "Studi", en: "Study" },
            title: {
                id: "Metodologi Riset Kritis dan Manajemen Referensi Ilmiah",
                en: "Critical Research Methodologies and Academic Reference Workflow"
            },
            excerpt: {
                id: "Langkah terstruktur menyusun literatur riset, sintesis data kualitatif, dan penulisan laporan penelitian yang komprehensif.",
                en: "Structured steps for organizing research literature, synthesizing qualitative data, and drafting comprehensive reports."
            },
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
            date: "2021.5.10",
            readTime: 11,
            url: "article.html?id=academic-research-framework"
        },

        // --- 5. Economy ---
        {
            id: "coretonsacoat-economy",
            category: "economy",
            tag: { id: "Ekonomi", en: "Economy" },
            title: {
                id: "Coretonsacoat: Analisis Makroekonomi & Tren Pasar Modal",
                en: "Coretonsacoat: Macroeconomic Trends and Market Insights"
            },
            excerpt: {
                id: "Memahami dampak pergerakan suku bunga acuan terhadap arus investasi global dan stabilitas mata uang berkembang.",
                en: "Understanding the impact of benchmark interest rate shifts on global investment flows and emerging currencies."
            },
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
            date: "2021.5.28",
            readTime: 18,
            url: "article.html?id=coretonsacoat-economy"
        },
        {
            id: "fintech-disruption-future",
            category: "economy",
            tag: { id: "Ekonomi", en: "Economy" },
            title: {
                id: "Disrupsi Pembayaran Digital dan Inklusi Finansial",
                en: "Digital Payment Disruption and Financial Inclusion Expansion"
            },
            excerpt: {
                id: "Bagaimana integrasi ekosistem keuangan terbuka (Open Banking) mempercepat akses permodalan bagi sektor riil.",
                en: "How open banking ecosystem integration accelerates capital access for the real economic sector."
            },
            image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
            date: "2021.6.05",
            readTime: 14,
            url: "article.html?id=fintech-disruption-future"
        },

        // --- 6. Physics ---
        {
            id: "thermodynamics-energy",
            category: "physics",
            tag: { id: "Fisika", en: "Physics" },
            title: {
                id: "Prinsip Termodinamika dalam Efisiensi Energi Terbarukan",
                en: "Thermodynamic Principles in Renewable Energy Efficiency"
            },
            excerpt: {
                id: "Menganalisis siklus konversi panas dan hukum kekekalan energi pada perancangan turbin generasi terbaru.",
                en: "Analyzing heat conversion cycles and conservation laws in the design of next-generation power turbines."
            },
            image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80",
            date: "2021.5.12",
            readTime: 20,
            url: "article.html?id=thermodynamics-energy"
        },
        {
            id: "quantum-mechanics-future",
            category: "physics",
            tag: { id: "Fisika", en: "Physics" },
            title: {
                id: "Mekanika Kuantum: Menguak Superposisi dan Komputasi Qubit",
                en: "Quantum Mechanics: Unveiling Superposition and Qubit Computing"
            },
            excerpt: {
                id: "Eksplorasi mendalam mengenai sifat gelombang-partikel serta implementasi entanglement dalam enkripsi masa depan.",
                en: "In-depth exploration of wave-particle duality and the application of entanglement in future security encryption."
            },
            image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80",
            date: "2021.6.20",
            readTime: 16,
            url: "article.html?id=quantum-mechanics-future"
        }
    ];

    // ==========================================
    // 4. SINKRONISASI FIRESTORE (JIKA ADA DOKUMEN)
    // ==========================================
    try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const firestoreArticles = [];
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            firestoreArticles.push({
                id: docSnap.id,
                category: (data.categorySlug || data.category || "business").toLowerCase(),
                tag: { 
                    id: data.category || "General", 
                    en: data.categoryEn || data.category || "General" 
                },
                title: { 
                    id: data.title || "Judul Artikel", 
                    en: data.titleEn || data.title || "Article Title" 
                },
                excerpt: { 
                    id: data.excerpt || (data.body ? data.body.substring(0, 120) + "..." : "Deskripsi artikel..."), 
                    en: data.excerptEn || data.excerpt || "Article description..." 
                },
                image: data.image || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
                date: data.date || "2021.5.01",
                readTime: parseInt(data.readTime) || 8,
                url: `article.html?id=${docSnap.id}`
            });
        });

        if (firestoreArticles.length > 0) {
            // Gabungkan artikel Firestore di awal daftar
            articlesData = [...firestoreArticles, ...articlesData];
        }
    } catch (err) {
        console.warn("Menggunakan data lokal portofolio (Firestore offline/belum terisi):", err);
    }

    // ==========================================
    // 5. INISIALISASI VARIABEL STATUS
    // ==========================================
    let currentLang = localStorage.getItem('site_lang') || 'id';
    
    // Ambil kategori dari parameter URL (misal: category.html?tag=nutrition)
    const urlParams = new URLSearchParams(window.location.search);
    let currentCategory = (urlParams.get('tag') || urlParams.get('category') || 'all').toLowerCase();
    let currentSearchQuery = (urlParams.get('q') || '').trim().toLowerCase();

    // Normalisasi 'book' vs 'books'
    if (currentCategory === 'book') currentCategory = 'books';

    // Elemen DOM
    const cardsGrid = document.getElementById('cardsGrid');
    const emptyState = document.getElementById('emptyState');
    const btnResetFilter = document.getElementById('btnResetFilter');
    const filterPills = document.querySelectorAll('#filterPills .pill-btn');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const langToggle = document.getElementById('langToggle');
    const langButtons = langToggle ? langToggle.querySelectorAll('.lang-btn') : [];

    if (searchInput && currentSearchQuery) {
        searchInput.value = currentSearchQuery;
    }

    // ==========================================
    // 6. RENDER KARTU ARTIKEL KE GRID
    // ==========================================
    function renderCards() {
        if (!cardsGrid) return;

        // Filter berdasarkan kategori dan pencarian
        const filtered = articlesData.filter(item => {
            const matchesCategory = (currentCategory === 'all' || item.category === currentCategory);
            
            const titleText = (item.title[currentLang] || item.title.id || '').toLowerCase();
            const excerptText = (item.excerpt[currentLang] || item.excerpt.id || '').toLowerCase();
            const tagText = (item.tag[currentLang] || item.tag.id || '').toLowerCase();

            const matchesSearch = !currentSearchQuery || 
                titleText.includes(currentSearchQuery) || 
                excerptText.includes(currentSearchQuery) || 
                tagText.includes(currentSearchQuery);

            return matchesCategory && matchesSearch;
        });

        cardsGrid.innerHTML = '';

        if (filtered.length === 0) {
            cardsGrid.style.display = 'none';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        cardsGrid.style.display = 'grid';
        if (emptyState) emptyState.style.display = 'none';

        const readSuffix = translations[currentLang].read_suffix;

        filtered.forEach((item, index) => {
            const card = document.createElement('a');
            card.href = item.url;
            card.className = 'card-item';
            card.style.animationDelay = `${index * 0.05}s`;

            const itemTag = item.tag[currentLang] || item.tag.id || 'Editorial';
            const itemTitle = item.title[currentLang] || item.title.id || '';
            const itemExcerpt = item.excerpt[currentLang] || item.excerpt.id || '';

            card.innerHTML = `
                <div class="card-thumb-wrap">
                    <img class="card-thumb" src="${item.image}" alt="${itemTitle}" loading="lazy">
                </div>
                <div class="card-body">
                    <span class="card-tag">${itemTag}</span>
                    <h3 class="card-title">${itemTitle}</h3>
                    <p class="card-excerpt">${itemExcerpt}</p>
                    <div class="card-meta">
                        <span class="meta-date">${item.date}</span>
                        <span class="meta-dot">·</span>
                        <span class="meta-read">
                            <span class="meta-icon">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: -1px;">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </span>
                            ${item.readTime} ${readSuffix}
                        </span>
                    </div>
                </div>
            `;

            cardsGrid.appendChild(card);
        });
    }

    // ==========================================
    // 7. SINKRONISASI TOMBOL FILTER PILL
    // ==========================================
    function updateActivePill() {
        filterPills.forEach(pill => {
            const pillCat = pill.getAttribute('data-category');
            if (pillCat === currentCategory) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });
    }

    // ==========================================
    // 8. FUNGSI PENGGANTIAN BAHASA (I18N)
    // ==========================================
    function setLanguage(lang, isInitial = false) {
        currentLang = lang;
        localStorage.setItem('site_lang', lang);
        document.documentElement.lang = lang;

        const slider = langToggle ? langToggle.querySelector('.lang-slider') : null;

        if (isInitial && slider) {
            slider.style.transition = 'none';
        }

        // Update placeholder pencarian
        if (searchInput) {
            searchInput.placeholder = translations[lang].search_placeholder;
        }

        // Update seluruh elemen dengan atribut data-lang-key
        const translatableElements = document.querySelectorAll('[data-lang-key]');
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update status slider bahasa
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

        if (isInitial && slider) {
            slider.offsetHeight; // Reflow
            setTimeout(() => {
                slider.style.transition = '';
            }, 50);
        }

        // Render ulang kartu agar teks berganti sesuai bahasa
        renderCards();
    }

    // ==========================================
    // 9. EVENT LISTENERS
    // ==========================================

    // Klik pada Pill Kategori
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const selected = pill.getAttribute('data-category');
            if (selected === currentCategory && !currentSearchQuery) return;

            currentCategory = selected;
            updateActivePill();

            // Perbarui URL secara halus tanpa refresh halaman
            const newUrl = new URL(window.location.href);
            if (currentCategory === 'all') {
                newUrl.searchParams.delete('tag');
                newUrl.searchParams.delete('category');
            } else {
                newUrl.searchParams.set('tag', currentCategory);
            }
            window.history.pushState({}, '', newUrl.toString());

            renderCards();
        });
    });

    // Reset Filter (Bila hasil kosong)
    if (btnResetFilter) {
        btnResetFilter.addEventListener('click', () => {
            currentCategory = 'all';
            currentSearchQuery = '';
            if (searchInput) searchInput.value = '';
            updateActivePill();

            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('tag');
            newUrl.searchParams.delete('category');
            newUrl.searchParams.delete('q');
            window.history.pushState({}, '', newUrl.toString());

            renderCards();
        });
    }

    // Form Pencarian
    if (searchForm && searchInput) {
        // Pencarian live saat mengetik
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.trim().toLowerCase();
            renderCards();
        });

        // Submit form
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            currentSearchQuery = searchInput.value.trim().toLowerCase();
            
            const newUrl = new URL(window.location.href);
            if (currentSearchQuery) {
                newUrl.searchParams.set('q', currentSearchQuery);
            } else {
                newUrl.searchParams.delete('q');
            }
            window.history.pushState({}, '', newUrl.toString());

            renderCards();
        });
    }

    // Pengalih Bahasa (EN / ID)
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

    // Tangani navigasi tombol 'Back' & 'Forward' browser
    window.addEventListener('popstate', () => {
        const params = new URLSearchParams(window.location.search);
        currentCategory = (params.get('tag') || params.get('category') || 'all').toLowerCase();
        if (currentCategory === 'book') currentCategory = 'books';
        currentSearchQuery = (params.get('q') || '').trim().toLowerCase();
        if (searchInput) searchInput.value = currentSearchQuery;

        updateActivePill();
        renderCards();
    });

    // ==========================================
    // 10. EKSEKUSI AWAL
    // ==========================================
    updateActivePill();
    setLanguage(currentLang, true);
});

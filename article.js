// 1. Impor koneksi Firebase Firestore
import { db, doc, getDoc } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', async () => {

    // 2. Tangkap elemen UI
    const categoryLink = document.getElementById('articleCategory');
    const breadcrumbTitle = document.getElementById('breadcrumbTitle');
    const articleTitle = document.getElementById('articleTitle');
    const articleDate = document.getElementById('articleDate');
    const articleReadTime = document.getElementById('articleReadTime');
    const articleBody = document.getElementById('articleBody');
    const articleImage = document.getElementById('articleImage');
    const authorName = document.getElementById('authorName');

    // 3. Baca ID artikel dari URL (misal: article.html?id=asupan-15-hari)
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (articleId) {
        try {
            // Ambil data dokumen dari koleksi 'articles' di Firebase
            const docRef = doc(db, "articles", articleId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();

                // Isi Breadcrumb & Navigasi
                if (categoryLink) {
                    categoryLink.textContent = data.category || "General";
                    categoryLink.href = `category.html?tag=${encodeURIComponent(data.categorySlug || 'general')}`;
                }
                if (breadcrumbTitle) breadcrumbTitle.textContent = data.title;

                // Isi Header Artikel
                if (articleTitle) articleTitle.textContent = data.title;
                if (articleDate) articleDate.textContent = data.date || "DD/MM/YYYY";
                if (articleReadTime) articleReadTime.textContent = data.readTime || "5 mins read";

                // Isi Penulis & Media
                if (authorName) authorName.textContent = data.authorName || "Author's name";
                if (articleImage && data.image) articleImage.src = data.image;

                // Isi Paragraf
                if (articleBody && data.body) {
                    articleBody.innerHTML = `<p>${data.body.replace(/\n/g, '</p><p>')}</p>`;
                }
            } else {
                if (articleTitle) articleTitle.textContent = "Artikel tidak ditemukan.";
            }
        } catch (error) {
            console.error("Gagal memuat artikel dari Firebase:", error);
        }
    }

    // 4. Interaksi Tombol Suka (Like) & Komentar
    const btnLike = document.getElementById('btnLike');
    const btnComment = document.getElementById('btnComment');

    if (btnLike) {
        btnLike.addEventListener('click', () => {
            btnLike.classList.toggle('liked');
        });
    }

    if (btnComment) {
        btnComment.addEventListener('click', () => {
            alert("Fitur komentar akan segera hadir!");
        });
    }

    // 5. Interaksi Table of Contents (Scroll to top)
    const floatingToc = document.getElementById('floatingToc');
    if (floatingToc) {
        floatingToc.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. ELEMEN BREADCRUMB & KONTEN ARTIKEL
    // ==========================================================================
    const categoryLink = document.getElementById('articleCategory');
    const breadcrumbTitle = document.getElementById('breadcrumbTitle');
    const articleTitle = document.getElementById('articleTitle');
    const articleDate = document.getElementById('articleDate');
    const articleReadTime = document.getElementById('articleReadTime');

    function setArticleData(categoryName, categorySlug, titleText, dateText = null, readTimeText = null) {
        if (categoryLink) {
            categoryLink.textContent = categoryName;
            categoryLink.href = `category.html?tag=${encodeURIComponent(categorySlug)}`;
        }
        if (breadcrumbTitle) breadcrumbTitle.textContent = titleText;
        if (articleTitle) articleTitle.textContent = titleText;
        if (dateText && articleDate) articleDate.textContent = dateText;
        if (readTimeText && articleReadTime) articleReadTime.textContent = readTimeText;
    }

    // ==========================================================================
    // 2. SISTEM TABLE OF CONTENTS (TOC) DINAMIS & INTERAKTIF
    // ==========================================================================
    function renderTableOfContents() {
        const floatingToc = document.getElementById('floatingToc');
        const articleBody = document.getElementById('articleBody');
        if (!floatingToc || !articleBody) return;

        // Ambil semua sub-bab (h2)
        const headings = articleBody.querySelectorAll('h2');

        // Ketentuan: Garis hanya muncul jika bab >= 3
        if (headings.length < 3) {
            floatingToc.style.display = 'none';
            return;
        }

        // Tampilkan wadah TOC
        floatingToc.style.display = 'flex';
        floatingToc.innerHTML = '';

        headings.forEach((heading, index) => {
            // Beri ID unik ke tiap bab jika belum ada
            if (!heading.id) {
                heading.id = `bab-${index + 1}`;
            }

            // Buat tombol garis panjang
            const tocBtn = document.createElement('button');
            tocBtn.type = 'button';
            tocBtn.className = 'toc-btn';
            tocBtn.title = heading.textContent; // Muncul tooltip nama bab saat kursor diarahkan
            tocBtn.setAttribute('aria-label', `Pindah ke ${heading.textContent}`);

            const line = document.createElement('span');
            line.className = 'toc-line';
            tocBtn.appendChild(line);

            // Aksi klik: Meluncur halus ke posisi bab bersangkutan
            tocBtn.addEventListener('click', () => {
                heading.scrollIntoView({ behavior: 'smooth' });
            });

            floatingToc.appendChild(tocBtn);
        });

        // Pantau posisi scroll untuk menandai garis bab yang aktif
        initScrollSpy(headings);
    }

    function initScrollSpy(headings) {
        const tocButtons = document.querySelectorAll('.floating-toc .toc-btn');

        window.addEventListener('scroll', () => {
            let currentActiveIndex = 0;
            const scrollPos = window.scrollY + 100;

            headings.forEach((heading, idx) => {
                if (scrollPos >= heading.offsetTop) {
                    currentActiveIndex = idx;
                }
            });

            tocButtons.forEach((btn, idx) => {
                btn.classList.toggle('active', idx === currentActiveIndex);
            });
        });
    }

    // Jalankan TOC
    renderTableOfContents();

    // ==========================================================================
    // 3. INTERAKSI TOMBOL REAKSI (LIKE & COMMENT)
    // ==========================================================================
    const btnLike = document.getElementById('btnLike');
    const btnComment = document.getElementById('btnComment');

    if (btnLike) {
        btnLike.addEventListener('click', () => {
            // Toggle class 'liked': menambahkan jika belum ada, menghapus jika sudah ada
            btnLike.classList.toggle('liked');
        });
    }

    if (btnComment) {
        btnComment.addEventListener('click', () => {
            alert('Fitur komentar akan segera hadir!');
        });
    }
});
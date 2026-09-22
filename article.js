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

    /**
     * Fungsi untuk memperbarui breadcrumb dan header artikel
     * @param {string} categoryName - Nama kategori (misal: "Nutrition")
     * @param {string} categorySlug - Slug URL (misal: "nutrition")
     * @param {string} titleText    - Judul artikel
     * @param {string} dateText     - Tanggal rilis (opsional)
     * @param {string} readTimeText - Estimasi waktu baca (opsional)
     */
    function setArticleData(categoryName, categorySlug, titleText, dateText = null, readTimeText = null) {
        // 1. Kategori di breadcrumb (bisa diklik ke halaman kategori)
        if (categoryLink) {
            categoryLink.textContent = categoryName;
            categoryLink.href = `category.html?tag=${encodeURIComponent(categorySlug)}`;
        }

        // 2. Judul di breadcrumb (statis, tidak bisa diklik)
        if (breadcrumbTitle) {
            breadcrumbTitle.textContent = titleText;
        }

        // 3. Judul utama artikel
        if (articleTitle) {
            articleTitle.textContent = titleText;
        }

        // 4. Meta tanggal & waktu baca (jika disertakan)
        if (dateText && articleDate) {
            articleDate.textContent = dateText;
        }
        if (readTimeText && articleReadTime) {
            articleReadTime.textContent = readTimeText;
        }
    }

    // ==========================================================================
    // 2. MEMBACA PARAMETER URL (?id=...) DARI LINK SEBELUMNYA
    // ==========================================================================
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (articleId) {
        console.log(`Membuka artikel dengan ID: ${articleId}`);
        // Saat Firebase Firestore aktif, panggil datanya di sini lalu jalankan:
        // setArticleData(data.category, data.categorySlug, data.title, data.date, data.readTime);
    }

    // ==========================================================================
    // 3. INTERAKSI TOMBOL REAKSI (LIKE & COMMENT)
    // ==========================================================================
    const btnLike = document.getElementById('btnLike');
    const btnComment = document.getElementById('btnComment');

    if (btnLike) {
        btnLike.addEventListener('click', () => {
            btnLike.classList.toggle('liked');
            const isLiked = btnLike.classList.contains('liked');
            console.log(isLiked ? "Artikel disukai ❤️" : "Batal menyukai artikel");
        });
    }

    if (btnComment) {
        btnComment.addEventListener('click', () => {
            alert("Fitur komentar akan segera hadir!");
        });
    }

    // ==========================================================================
    // 4. INTERAKSI DAFTAR ISI MELAYANG (TABLE OF CONTENTS)
    // ==========================================================================
    const floatingToc = document.getElementById('floatingToc');
    if (floatingToc) {
        floatingToc.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
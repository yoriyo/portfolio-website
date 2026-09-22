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
// ==========================================
// 1. IMPOR KONEKSI FIREBASE FIRESTORE
// ==========================================
import { db, doc, getDoc } from "./firebase-init.js";

// ==========================================
// 2. DATA SINKRONISASI ARTIKEL LOKAL
// (Menjaga halaman artikel tetap tampil utuh saat offline/tanpa Firestore)
// ==========================================
const localArticles = {
    "parloinal-brandr": {
        category: "Bisnis",
        categorySlug: "business",
        title: "Parloinal Brandr First Consume Narraition",
        date: "28 April 2021",
        readTime: "10 mins to read",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
        body: `
            <h2 class="article-heading">Bab 1: Membangun Narasi yang Relevan</h2>
            <p>Narasi brand bukan sekadar slogan pemasaran, melainkan fondasi emosional yang menghubungkan nilai produk dengan kebutuhan terdalam konsumen. Di era informasi yang serba cepat, pelanggan mencari keaslian dan konsistensi pesan.</p>
            <h2 class="article-heading">Bab 2: Interaksi dan Retensi Pelanggan</h2>
            <p>Konsumen modern menghargai keterbukaan dan nilai tambah yang berkelanjutan. Menciptakan siklus interaksi dua arah melalui konten edukatif dan layanan pelanggan yang tanggap adalah kunci membangun loyalitas jangka panjang.</p>
            <h2 class="article-heading">Bab 3: Evaluasi Dampak dan Skalabilitas</h2>
            <p>Setiap inisiatif narasi perlu diukur efektivitasnya melalui metrik keterlibatan nyata, kepuasan pelanggan, dan pertumbuhan organik tanpa mengorbankan identitas inti brand.</p>
        `
    },
    "digital-business-scaling": {
        category: "Bisnis",
        categorySlug: "business",
        title: "Strategi Transformasi Bisnis dan Skalabilitas Startup Modern",
        date: "14 Juni 2021",
        readTime: "8 mins to read",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        body: `
            <h2 class="article-heading">Bab 1: Menentukan Product-Market Fit</h2>
            <p>Skalabilitas hanya dapat tercapai jika fondasi pasar telah terbukti kokoh. Validasi cepat terhadap prototipe dan penyesuaian berbasis umpan balik pelanggan adalah langkah wajib sebelum ekspansi modal.</p>
            <h2 class="article-heading">Bab 2: Otomatisasi dan Efisiensi Operasional</h2>
            <p>Mengintegrasikan sistem alur kerja digital yang terotomatisasi memungkinkan tim fokus pada inovasi bernilai tinggi tanpa terbebani tugas repetitif.</p>
        `
    },
    "asupan-15-hari": {
        category: "Nutrisi",
        categorySlug: "nutrition",
        title: "The Word Gahfne In Nutrition Category: Pola Asupan Sehat",
        date: "18 Mei 2021",
        readTime: "13 mins to read",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
        body: `
            <h2 class="article-heading">Bab 1: Pola Makan Seimbang</h2>
            <p>Pola makan seimbang mencakup proporsi makronutrisi yang terukur antara karbohidrat kompleks, protein nabati dan hewani, serta lemak sehat alami untuk menjaga kestabilan gula darah dan energi harian.</p>
            <h2 class="article-heading">Bab 2: Kebutuhan Hidrasi Harian</h2>
            <p>Kecukupan cairan merupakan salah satu pilar utama metabolisme sel dan detoksifikasi alami tubuh. Minum air yang cukup secara teratur membantu konsentrasi dan mencegah kelelahan dini.</p>
            <h2 class="article-heading">Bab 3: Istirahat dan Pemulihan</h2>
            <p>Asupan nutrisi berkualitas harus diimbangi dengan tidur berkualitas untuk memberi kesempatan tubuh memperbaiki jaringan seluler yang rusak dan menjaga keseimbangan hormon.</p>
        `
    },
    "denitions-metar-demor": {
        category: "Nutrisi",
        categorySlug: "nutrition",
        title: "Denitions Metar Demor: Pola Sarapan Kaya Protein",
        date: "2 Mei 2021",
        readTime: "7 mins to read",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
        body: `
            <h2 class="article-heading">Bab 1: Pentingnya Protein di Pagi Hari</h2>
            <p>Memulai hari dengan asupan protein tinggi membantu mengendalikan hormon ghrelin (hormon pemicu rasa lapar), memberikan rasa kenyang lebih lama, dan meningkatkan fokus kerja.</p>
            <h2 class="article-heading">Bab 2: Rekomendasi Menu Praktis</h2>
            <p>Kombinasi telur rebus, roti gandum utuh, dan alpukat memberikan spektrum mikronutrisi lengkap yang siap disajikan dalam waktu kurang dari 15 menit.</p>
        `
    },
    "defonates-hour-milllary": {
        category: "Buku",
        categorySlug: "books",
        title: "How Defonates the Hour of Milllary Healthes",
        date: "24 Mei 2021",
        readTime: "35 mins to read",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
        body: `
            <h2 class="article-heading">Bab 1: Konsep Waktu dan Prioritas</h2>
            <p>Melalui telaah literatur klasik, kita diajak meninjau kembali bagaimana manusia memandang keterbatasan waktu dan bagaimana mengalokasikannya untuk karya yang abadi.</p>
            <h2 class="article-heading">Bab 2: Refleksi Kehidupan Modern</h2>
            <p>Di tengah distraksi digital, kembali membaca buku fisik memberikan ruang hening bagi pemikiran mendalam dan perenungan kritis.</p>
        `
    },
    "essential-growth-reads": {
        category: "Buku",
        categorySlug: "books",
        title: "Refleksi Filosofi Stoikisme dalam Dinamika Kehidupan Modern",
        date: "1 Juni 2021",
        readTime: "12 mins to read",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
        body: `
            <h2 class="article-heading">Bab 1: Dikotomi Kendali</h2>
            <p>Prinsip dasar Stoikisme membagi dunia menjadi dua: hal-hal yang berada dalam kendali kita (pikiran, tindakan, respons) dan hal-hal di luar kendali kita. Kedamaian batin bermula dari kesadaran ini.</p>
            <h2 class="article-heading">Bab 2: Ketabahan Emosional Sehari-hari</h2>
            <p>Menghadapi ketidakpastian dengan kepala dingin dan menerima kenyataan sebagaimana adanya tanpa mengeluh berlebihan.</p>
        `
    },
    "how-many-themas-study": {
        category: "Studi",
        categorySlug: "study",
        title: "How Many Themas Study: Teknik Belajar Efektif",
        date: "15 April 2021",
        readTime: "15 mins to read",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
        body: `
            <h2 class="article-heading">Bab 1: Active Recall dan Spaced Repetition</h2>
            <p>Belajar pasif dengan sekadar membaca ulang tidak efektif untuk memori jangka panjang. Menguji pemahaman diri secara berkala terbukti melipatgandakan retensi materi.</p>
            <h2 class="article-heading">Bab 2: Lingkungan Belajar Bebas Distraksi</h2>
            <p>Menciptakan ruang belajar yang terorganisasi dan membatasi notifikasi gawai memberikan dorongan fokus mendalam (deep work) yang optimal.</p>
        `
    },
    "academic-research-framework": {
        category: "Studi",
        categorySlug: "study",
        title: "Metodologi Riset Kritis dan Manajemen Referensi Ilmiah",
        date: "10 Mei 2021",
        readTime: "11 mins to read",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
        body: `
            <h2 class="article-heading">Bab 1: Perumusan Masalah dan Tinjauan Pustaka</h2>
            <p>Sebuah penelitian yang berbobot berakar dari pertanyaan riset yang tajam serta kajian sistematis terhadap temuan akademis terdahulu.</p>
            <h2 class="article-heading">Bab 2: Sintesis Data dan Kesimpulan</h2>
            <p>Menghubungkan data kualitatif dan kuantitatif dengan landasan teori yang kokoh untuk menghasilkan kesimpulan yang dapat dipertanggungjawabkan.</p>
        `
    },
    "coretonsacoat-economy": {
        category: "Ekonomi",
        categorySlug: "economy",
        title: "Coretonsacoat: Analisis Makroekonomi & Tren Pasar Modal",
        date: "28 Mei 2021",
        readTime: "18 mins to read",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
        body: `
            <h2 class="article-heading">Bab 1: Dinamika Kebijakan Moneter</h2>
            <p>Perubahan suku bunga acuan bank sentral memiliki efek domino terhadap likuiditas perbankan, nilai tukar mata uang, serta daya beli masyarakat.</p>
            <h2 class="article-heading">Bab 2: Strategi Alokasi Aset</h2>
            <p>Diversifikasi portofolio investasi ke berbagai kelas aset menjadi perlindungan utama saat menghadapi volatilitas pasar ekonomi global.</p>
        `
    },
    "fintech-disruption-future": {
        category: "Ekonomi",
        categorySlug: "economy",
        title: "Disrupsi Pembayaran Digital dan Inklusi Finansial",
        date: "5 Juni 2021",
        readTime: "14 mins to read",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80",
        body: `
            <h2 class="article-heading">Bab 1: Penetrasi Dompet Digital</h2>
            <p>Teknologi finansial telah menjangkau segmen masyarakat unbanked, memberikan kemudahan transaksi mikro dan perluasan rantai pasok UMKM.</p>
            <h2 class="article-heading">Bab 2: Keamanan Data Finansial</h2>
            <p>Inovasi teknologi harus berjalan seiring dengan penguatan sistem enkripsi dan kepatuhan regulasi perlindungan konsumen.</p>
        `
    },
    "thermodynamics-energy": {
        category: "Fisika",
        categorySlug: "physics",
        title: "Prinsip Termodinamika dalam Efisiensi Energi Terbarukan",
        date: "12 Mei 2021",
        readTime: "20 mins to read",
        image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80",
        body: `
            <h2 class="article-heading">Bab 1: Hukum Kekekalan Energi</h2>
            <p>Memahami konversi energi termal menjadi energi mekanik dan listrik merupakan kunci perancangan sistem pembangkit yang efisien dan ramah lingkungan.</p>
            <h2 class="article-heading">Bab 2: Inovasi Material Termal</h2>
            <p>Pengembangan nanomaterial baru membuka potensi pengurangan kehilangan panas secara signifikan pada rekayasa panel surya dan turbin masa depan.</p>
        `
    },
    "quantum-mechanics-future": {
        category: "Fisika",
        categorySlug: "physics",
        title: "Mekanika Kuantum: Menguak Superposisi dan Komputasi Qubit",
        date: "20 Juni 2021",
        readTime: "16 mins to read",
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80",
        body: `
            <h2 class="article-heading">Bab 1: Dualisme Gelombang-Partikel</h2>
            <p>Eksperimen celah ganda membuktikan bahwa partikel subatomik memiliki sifat gelombang probabilitas yang mengubah paradigma fisika klasik.</p>
            <h2 class="article-heading">Bab 2: Potensi Komputasi Kuantum</h2>
            <p>Dengan memanfaatkan superposisi dan keterikatan kuantum (entanglement), komputer kuantum mampu memecahkan kalkulasi rumit dalam hitungan detik.</p>
        `
    }
};

document.addEventListener('DOMContentLoaded', async () => {

    // Tangkap elemen UI artikel
    const categoryLink = document.getElementById('articleCategory');
    const breadcrumbTitle = document.getElementById('breadcrumbTitle');
    const articleTitle = document.getElementById('articleTitle');
    const articleDate = document.getElementById('articleDate');
    const articleReadTime = document.getElementById('articleReadTime');
    const articleBody = document.getElementById('articleBody');
    const articleImage = document.getElementById('articleImage');

    // Baca ID artikel dari URL (misal: article.html?id=parloinal-brandr)
    const urlParams = new URLSearchParams(window.location.search);
    let articleId = urlParams.get('id') || 'asupan-15-hari';

    let articleLoaded = false;

    // 1. Coba ambil dari Firestore
    if (articleId) {
        try {
            const docRef = doc(db, "articles", articleId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();

                if (categoryLink) {
                    categoryLink.textContent = data.category || "Kategori";
                    categoryLink.href = `category.html?tag=${encodeURIComponent(data.categorySlug || 'all')}`;
                }
                if (breadcrumbTitle) breadcrumbTitle.textContent = data.title;
                if (articleTitle) articleTitle.textContent = data.title;
                if (articleDate) articleDate.textContent = data.date || "DD/MM/YYYY";
                if (articleReadTime) articleReadTime.textContent = data.readTime || "5 mins read";
                if (articleImage && data.image) articleImage.src = data.image;

                if (articleBody && data.body) {
                    articleBody.innerHTML = `<p>${data.body.replace(/\n/g, '</p><p>')}</p>`;
                }

                articleLoaded = true;
            }
        } catch (error) {
            console.warn("Mencoba fallback lokal artikel:", error);
        }
    }

    // 2. Jika belum termuat dari Firestore, muat dari data lokal yang tersinkronisasi
    if (!articleLoaded && localArticles[articleId]) {
        const item = localArticles[articleId];

        if (categoryLink) {
            categoryLink.textContent = item.category;
            categoryLink.href = `category.html?tag=${encodeURIComponent(item.categorySlug)}`;
        }
        if (breadcrumbTitle) breadcrumbTitle.textContent = item.title;
        if (articleTitle) articleTitle.textContent = item.title;
        if (articleDate) articleDate.textContent = item.date;
        if (articleReadTime) articleReadTime.textContent = item.readTime;
        if (articleImage && item.image) articleImage.src = item.image;
        if (articleBody && item.body) articleBody.innerHTML = item.body;

        articleLoaded = true;
    }

    // 3. Tombol Interaksi (Like & Komentar)
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
});
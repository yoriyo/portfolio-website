// Impor fungsi yang dibutuhkan dari Firebase Modular CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHLM0NmMoo76lkzWZ3zUv_Q3K1ZHpuvX4",
  authDomain: "website-ilham-93d9d.firebaseapp.com",
  projectId: "website-ilham-93d9d",
  storageBucket: "website-ilham-93d9d.firebasestorage.app",
  messagingSenderId: "359774111171",
  appId: "1:359774111171:web:dec7aa16c5cc3832d7e976"
};

// Inisialisasi Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi tes untuk mengambil data dari Firestore
async function testAmbilData() {
  try {
    const querySnapshot = await getDocs(collection(db, "highlights"));
    querySnapshot.forEach((doc) => {
      console.log("Data Firebase berhasil terbaca:", doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Gagal membaca database Firebase:", error);
  }
}

// Jalankan fungsi tes
testAmbilData();

export { db };
# 📦 Aplikasi Multiform dengan Google Spreadsheet API

Aplikasi web multiform ringan dan responsif untuk mengelola data kategori, terhubung langsung dengan **Google Spreadsheet** sebagai backend melalui **REST API (Web App Google Apps Script)**.

---

## ✨ Fitur Utama

✅ Login aman menggunakan username & password yang di-hash dengan MD5  
✅ Auto logout setelah 15 menit tidak aktif  
✅ Kategori Form Dinamis
✅ Validasi input wajib di setiap form  
✅ Tekan tombol `Enter` bisa langsung untuk *submit* atau *cari* data  
✅ Efek loading di setiap tombol (`Mencari...`, `Mengirim...`, dsb.)  
✅ UI menandai tombol kategori aktif secara visual  
✅ Form otomatis dikosongkan setelah berhasil disubmit  
✅ Backend terhubung langsung ke Google Spreadsheet  
✅ Desain antarmuka yang mobile-first dan responsif (mirip Bootstrap)  
✅ Bisa langsung dipakai lewat Web App Google Apps Script  
✅ Field tambahan muncul otomatis jika pilih "Lainnya"  
✅ Data pengguna login tersimpan di `localStorage`  
✅ Redirect otomatis jika sesi login habis  
✅ Struktur HTML & JS modular dan bersih  
✅ Notifikasi error & alert yang ramah pengguna  
✅ Pemisahan data berdasarkan kategori di Spreadsheet  
✅ Animasikan tombol dengan spinner saat loading async  
✅ Pencarian otomatis data pelanggan berdasarkan ID dari Spreadsheet  
✅ Kirim data menggunakan `FormData` POST yang terstruktur  
✅ Bisa di-deploy langsung ke GitHub Pages sebagai aplikasi statis  
✅ Semua logika autentikasi dan sesi dijalankan di sisi client (tanpa backend berat)


## 🧠 Cara Kerja

1. User login (MD5 hash di frontend)
2. Cek kredensial di Google Spreadsheet (via `doGet`)
3. Setelah login, user diarahkan ke halaman form multikategori
4. Setiap kategori mengirim data ke Google Spreadsheet dengan metode `POST`

## 🚀 Instalasi
1. Upload semua file ke folder hosting (Netlify, GitHub Pages, Vercel, dll)
2. Buat Google Spreadsheet dengan kolom yang sesuai (lihat bagian “Struktur Database Spreadsheet”)
3. Deploy Google Apps Script sebagai Web App dan ambil URL-nya
4. Masukkan `scriptURL` tersebut di semua file `.html` yang butuh koneksi ke API
6. Apps Script menerima data dan menyimpannya per kategori
7. silakan email untuk contoh apsscript nya ke @muhammadalfifauzul

## 📊 Contoh Struktur Database Spreadsheet
note: sesuaikan dengan kategori/multi form kalian 

sheet1 (database)            sheet 2 (hasil sumbit)     sheet 3 (hasil sumbit )  
| Kolom               |
|---------------------|      
| CustomerId          |                      
| FullName            | 
| Address             | 
| Phone               |


# 🛡️ Keamanan

- Password tidak disimpan dalam bentuk plaintext (MD5 hashed di frontend)
- Session login otomatis expired setelah 15 menit tidak aktif
- Username/password bisa disimpan di sheet terpisah

## ✅ To Do / Fitur Selanjutnya

- [ ] Tambahkan reCAPTCHA untuk login
- [ ] Export laporan Excel per kategori
- [ ] Filter data berdasarkan tanggal
- [ ] Role admin/operator untuk approval data
- [ ] Integrasi Notifikasi WhatsApp (Wablast)

## 🤝 Kontribusi

Feel free to fork, PR, atau request fitur baru.  
Silakan hubungi developer via Issues section atau langsung lewat kontak di profil.

---

## 📃 Lisensi

MIT License © 2025 – [Muhammad Alfi Fauzul]

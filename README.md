# TukarRupiah.id 💵🔍

Aplikasi web AI untuk mendeteksi kerusakan uang rupiah dan menentukan apakah uang tersebut masih layak ditukarkan ke Bank Indonesia, sesuai regulasi resmi BI.

## 🎯 Fitur Utama

- **Deteksi via Kamera** — Ambil foto langsung dari kamera perangkat
- **Upload Foto** — Unggah foto uang yang ingin dianalisis
- **AI Vision Analysis** — Powered by Google Gemini Vision AI
- **Analisis Kerusakan** — Deteksi robek, terbakar, dimakan rayap, noda, dll.
- **Gauge Keutuhan** — Visualisasi persentase keutuhan uang
- **Verdict Otomatis** — LAYAK TUKAR / TIDAK LAYAK / PERLU CEK FISIK
- **Riwayat Analisis** — Simpan hasil analisis sebelumnya
- **Regulasi BI Terintegrasi** — Penerapan aturan hukum formal Bank Indonesia

## ⚖️ Aturan Bank Indonesia

| Jenis Uang | Syarat Penukaran |
|-----------|-----------------|
| Uang Kertas Rusak | Keutuhan **> 2/3 (66.7%)** dari ukuran asli |
| Uang Kertas Terbelah (maks. 2 bagian) | Nomor seri **harus sama dan lengkap** di kedua bagian |
| Uang Logam Rusak | Keutuhan **> 1/2 (50%)** dari ukuran asli |

## 🚀 Cara Penggunaan

1. **Dapatkan Gemini API Key** gratis di [Google AI Studio](https://aistudio.google.com/apikey)
2. Buka aplikasi dan klik ⚙️ **Pengaturan**
3. Masukkan API Key lalu klik Simpan
4. Pilih jenis uang: **Uang Kertas** atau **Uang Logam**
5. Aktifkan kamera atau upload foto uang
6. Klik **Analisis Sekarang**
7. Lihat hasil analisis lengkap dengan rekomendasi

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 Vanilla, Vanilla JavaScript
- **AI**: Google Gemini Vision API (gemini-2.0-flash)
- **Camera**: MediaDevices Web API
- **Hosting**: Vercel (static deployment)
- **No backend** — 100% client-side

## 📁 Struktur Project

```
TukarRupiah.id/
├── index.html      # Aplikasi utama (single-file app)
├── README.md       # Dokumentasi ini
└── .gitignore      # Git ignore rules
```

## 🔐 Keamanan

- API Key disimpan **hanya di browser** (localStorage)
- API Key tidak pernah dikirim ke server selain Google API langsung
- Tidak ada data yang tersimpan di server

## 🌐 Deploy ke Vercel

1. Push ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: TukarRupiah.id"
   git branch -M main
   git remote add origin https://github.com/USERNAME/TukarRupiah.id.git
   git push -u origin main
   ```

2. Di [Vercel](https://vercel.com):
   - Klik **New Project**
   - Import repository GitHub
   - Framework Preset: **Other**
   - Klik **Deploy**

## 📜 Disclaimer

Hasil analisis AI bersifat estimasi dan tidak menggantikan penilaian resmi Bank Indonesia. Untuk kepastian, kunjungi kantor Bank Indonesia atau bank umum terdekat.

## 📞 Kontak Bank Indonesia

- Website: [www.bi.go.id](https://www.bi.go.id)
- Layanan Penukaran Uang: Kantor Perwakilan BI di seluruh Indonesia

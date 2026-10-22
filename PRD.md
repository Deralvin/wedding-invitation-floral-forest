# Product Requirements Document (PRD) — Version 2
## Digital Wedding Invitation: Earthy Botanical & Boarding Pass Edition

---

## 1. Executive Summary
Web undangan pernikahan digital bertema **Earthy Botanical / Floral Forest** (Sage Green, Terracotta, Warm Taupe) dengan interaksi pembuka unik berupa **Boarding Pass Peel (Tear-off / Swipe Ticket)**, efek visual **Parallax Scroll**, linimasa **Love Story Timeline**, serta sistem RSVP dan Buku Ucapan terintegrasi Firebase Firestore.

---

## 2. Core User Personas
1. **Tamu Undangan (Passenger / Guest)**: Membuka boarding pass personal, "merobek/menggeser" tiket (peel-off) untuk membuka gerbang undangan, menikmati alur cerita visual ber-parallax, melihat linimasa perjalanan cinta mempelai, mengisi kehadiran & ucapan, serta mengirim kado/amplop digital.
2. **Calon Pengantin (Host / Airlines Dispatcher)**: Menghasilkan link broadcast WhatsApp dengan nomor kursi/gate estetik dan nama tamu via generator internal.

---

## 3. Scope & Feature Specifications

### 3.1 Cover Interaction: The "Boarding Pass Peel"
- **Visual Style**: Format tiket penerbangan / travel boarding pass vintage bertekstur kertas daur ulang (kraft paper) dengan barcode dekoratif, detail flight/destination (misal: *Origin: Single Life -> Destination: Forever Together*), dan stempel botanis.
- **Peel Interaction**:
  - Garis perforasi tiket (dashed line) dengan tab robek/geser (*"Tear here to enter"* / *"Peel to open"*).
  - Gestur: Klik atau geser (drag/swipe) pada segmen tiket bagian stub/tepi.
  - Saat di-peel: Animasi robek / geser CSS transform 3D, suara audio ambient alam/musik instrumental mulai berputar, tiket terbuka dan meluncur ke bawah membuka section pertama.

### 3.2 Visual Atmosphere: Earthy Botanical with Parallax Scroll
- **Tema Palet**:
  - Forest / Sage Green (`#4A6B53`, `#8FA998`, `#2D3E35`)
  - Warm Terracotta (`#C86D51`, `#E0896E`)
  - Taupe & Cream Muted Ground (`#F4EFEB`, `#E8E1D9`, `#D8CEBA`)
- **Parallax System**:
  - Multi-layer visual assets (ornamen daun pakis, ranting eucalyptus, ilustrasi floral transparan).
  - Elemen background bergerak dengan kecepatan lebih lambat (`data-speed="0.2"` atau `translateY` proporsional scroll) memberikan efek kedalaman optik 2.5D saat di-scroll.
  - Performa terisolasi pada GPU (`will-change: transform`, `transform: translate3d`).

### 3.3 Struktur Konten (Long Vertical Scroll)

1. **Cover / Boarding Pass**: Tiket personal dengan nama tamu (`?to=NamaTamu`), kode booking aesthetic, tombol robek tiket + pemutar musik.
2. **Hero & Welcome Note**: Salam pembuka dengan tipografi serif editorial organik, ornamen daun floating parallax.
3. **Profil Mempelai (The Couple)**:
   - Foto mempelai dengan masking bentuk daun / lengkungan lengkung arsitektur lembut (*arch frame*).
   - Profil mempelai pria & wanita beserta silsilah keluarga.
4. **Love Story Timeline (Cerita Cinta)**:
   - Garis vertikal bertunas/berdaun menghubungkan tonggak perjalanan cinta:
     - *Pertama Bertemu* (Tahun/Tanggal + Foto kilas balik + deskripsi singkat).
     - *Menjalin Hubungan* (Momen penting).
     - *Lamaran / The Proposal* (Momen komitmen).
     - *Hari Bahagia / The Wedding Day* (Hari H).
5. **Detail Acara (Event Destination)**:
   - Waktu, tanggal, dan lokasi gedung/taman.
   - Tombol interaktif: Google Maps embed/link & Add to Calendar (Google/Apple/Outlook).
6. **Dress Code & Mood Palette**:
   - Swatch warna pakaian bernuansa Earth Tone (Sage, Terracotta, Olive, Cream) sebagai panduan tamu.
7. **Galeri & Video (Memories in Bloom — Organic Editorial Collage)**:
   - Layout dinamis asimetris (bukan grid kaku): kombinasi frame polaroid bertumpuk miring (subtle rotation), variasi rasio aspek (portrait 3:4, wide landscape 16:9, arch/lengkung oval), offset posisi vertikal berbeda (overlapping cards), dan caption tipografi tangan/vintage stamp.
   - Parallax scrolling per-foto: foto bergerak dengan kecepatan vertical offset berbeda saat di-scroll, menciptakan ilusi galeri foto hidup mengambang.
   - Modal Lightbox untuk preview resolusi tinggi saat diklik.
   - Video YouTube responsif terintegrasi dalam bingkai kanvas/kraft beraksen daun.
8. **RSVP & Guestbook (Firestore)**:
   - Form kehadiran (Hadir/Tidak Hadir, Jumlah Tamu).
   - Form ucapan & doa + feed ucapan real-time dengan avatar inisial warna earthy.
9. **Amplop Digital & Kado Fisik (Wedding Gift)**:
   - Kartu bank bertema earthy terracotta/sage dengan copy nomor rekening sekali klik.
   - Preview QRIS dan modal ekspansi.
   - Alamat pengiriman kado fisik dengan tombol copy alamat.
10. **Penutup / Closing & Social Credit**: Ucapan terima kasih dari kedua keluarga besar.

### 3.4 Language Switcher (Bilingual ID / EN)
- Switcher mengambang di pojok layar: `ID | EN`.
- Terjemahan instan untuk seluruh teks boarding pass, cerita cinta, label form, dan deskripsi acara.

### 3.5 Broadcast Generator (`/generator`)
- Khusus calon pengantin untuk memproduksi tautan personal:
  - Form input: Nama Tamu, Kategori (Keluarga/Sahabat/Kolega), Pilihan Bahasa.
  - Teks WhatsApp bertema penerbangan cinta/undangan hangat.
  - Tombol Salin URL, Salin Pesan, dan Tombol Kirim langsung ke WhatsApp API.

---

## 4. Database Schema (Firebase Firestore)

### Collection: `rsvps`
```typescript
interface RSVPRecord {
  guestName: string;
  attendance: "ATTENDING" | "DECLINED";
  guestCount: number;
  dietaryRestrictions?: string; // Opsional
  createdAt: FirebaseFirestore.Timestamp;
}
```

### Collection: `wishes`
```typescript
interface WishRecord {
  guestName: string;
  message: string;
  relationshipTag?: string; // Misal: "Teman SMA", "Keluarga"
  createdAt: FirebaseFirestore.Timestamp;
}
```

---

## 5. Non-Functional Requirements
1. **Lightweight Parallax**: Parallax murni CSS transform / requestAnimationFrame native tanpa library scroll animator berat (seperti GSAP/Locomotive) demi memastikan 60 FPS di perangkat smartphone menengah ke bawah.
2. **Peel Fallback**: Jika perangkat tidak mendukung drag gesture, klik satu kali pada tombol stempel/perforasi tiket langsung menyelesaikan animasi robek.
3. **Accessibility & Contrast**: Rasio kontras teks earthy memenuhi standar WCAG AA terhadap background kraft/taupe (menggunakan dark moss green `#1F2E22` untuk teks utama).

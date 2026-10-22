# AGENTS-V2.md — Earthy Botanical & Boarding Pass Guidelines

Pedoman teknis, arsitektur, dan instruksi implementasi untuk proyek **Digital Wedding Invitation V2: Earthy Botanical Edition**.

---

## 1. Stack & Runtime Requirements
- **Framework**: Next.js (App Router, React 19 / 18, TypeScript).
- **Styling**: Tailwind CSS v3/v4 dengan konfigurasi tema khusus (Earth Tone Palette).
- **Icons**: Lucide React atau icon SVG inline minimalis.
- **Database**: Firebase Firestore (`firebase/firestore`).
- **Asset Media**: WebP/AVIF format untuk daun, tekstur kraft, foto mempelai.

---

## 2. Palette & Design Token Guide (Earthy Botanical)

| Token Name | Hex Code | Deskripsi Pemakaian |
|---|---|---|
| `botanical-deep` | `#1F2E22` | Warna teks utama, header dominan, garis tegas |
| `botanical-forest`| `#364E3D` | Background kartu sekunder, tombol primer |
| `botanical-sage`  | `#7A9A83` | Aksen border, icon, badge status |
| `earth-terracotta`| `#C86D51` | Aksen tombol aktif, timeline marker, tag 'Love Story' |
| `earth-warm`      | `#E0896E` | Hover state, gradasi hangat daun gugur |
| `kraft-bg`        | `#F7F4EE` | Warna background utama halaman |
| `kraft-card`      | `#EFEAE1` | Warna kartu informasi, boarding pass body |
| `kraft-border`    | `#DDD4C4` | Garis putus-putus tiket (perforasi), pembatas |

**Typography**:
- Headings: Serif anggun bernuansa botanis (contoh: *Cormorant Garamond* / *Playfair Display*).
- Body / Boarding pass labels: Sans-serif bersih bernuansa editorial (*Plus Jakarta Sans* / *Inter*).
- Ticket flight numbers / codes: Monospace (*JetBrains Mono* / *Courier*).

---

## 3. Engineering Implementation Details

### 3.1 Boarding Pass Peel Interaction
- Lokasi komponen: `src/components/cover/BoardingPassCover.tsx`.
- Mekanisme:
  1. Halaman di-lock (`overflow-hidden` di tag root).
  2. Komponen tiket terdiri dari 2 bagian: **Main Pass** & **Tear Stub**.
  3. Menggunakan CSS transition transform / touch gesture. Saat robek (peeled):
     - Bagian stub berotasi & slide keluar (`transform: rotate(-15deg) translateY(-80px)`).
     - Trigger audio play via HTML5 Audio element.
     - Hilangkan cover overlay secara smooth (`opacity-0` lalu `pointer-events-none`).
     - Unlock body scroll (`overflow-y-auto`).

### 3.2 Lightweight Parallax System (Native Performance)
- **Aturan**: Jangan install library runtime berat (hindari Locomotive Scroll atau plugin ScrollTrigger tebal jika scroll native sudah cukup).
- Pendekatan:
  - Gunakan native hook `useScroll` / `requestAnimationFrame` atau CSS `perspective` / `transform: translate3d(0, calc(var(--scroll) * factor), 0)`.
  - Layer parallax terbatas pada maksimal 3-4 ornamen daun mengambang per viewport untuk menghindari frame-drop di mobile browser (Safari iOS & Chrome Android).
  - Tambahkan CSS:
    ```css
    .parallax-layer {
      will-change: transform;
      transform: translateZ(0);
    }
    ```

### 3.3 Dynamic Organic Gallery (Non-Static Layout)
- Lokasi: `src/components/gallery/OrganicEditorialGallery.tsx`.
- Desain Layout:
  - Hindari grid simetris standar (`grid-cols-2` / `grid-cols-3` kaku).
  - Terapkan **Asymmetrical Editorial Collage**:
    - Kombinasi variasi rasio aspek: portrait 3:4, wide landscape 16:9, arch window rounded shape.
    - Offset vertikal asimetris (`translate-y-4`, `-translate-y-8`, dsb.) dan overlapping layer dengan z-index berlapis.
    - Sentuhan bingkai polaroid vintage dengan slight tilt angle (`rotate-[-2deg]`, `rotate-[3deg]`) dan shadow lembut.
    - Parallax per-item: setiap kartu foto bergerak pada kecepatan scroll berbeda (`transform: translateY(...)`) untuk kedalaman 3D.
  - Lightbox interaktif HTML5 `<dialog>` / modal portal untuk zoom & swipe foto.

### 3.4 Love Story Timeline
- Lokasi: `src/components/story/LoveStoryTimeline.tsx`.
- Struktur:
  - Vertical central line dengan aksen sulur daun/ranting.
  - Alternating cards (kiri & kanan di desktop, full-width di mobile).
  - Setiap titik berisi: Tanggal/Tahun, Judul Babak Cinta, Foto Kenangan, Deskripsi Singkat.
  - Animasi transisi fade-in saat masuk viewport via native `IntersectionObserver`.

### 3.4 Firestore Integration (`src/lib/firebase.ts`)
- Ekspor helper fungsi terpisah:
  - `submitRSVP({ guestName, attendance, guestCount })` -> Simpan ke collection `rsvps`.
  - `submitWish({ guestName, message })` -> Simpan ke collection `wishes`.
  - `subscribeWishes(callback)` -> Listener real-time Firestore (`onSnapshot`) untuk render ucapan terbaru tanpa reload.

### 3.5 Language Localization (i18n)
- File bahasa: `src/locales/id.ts` dan `src/locales/en.ts`.
- Sediakan context sederhana `LanguageContext` dengan hook `useLanguage()`.
- Wajib mencakup terminologi Boarding Pass (Flight number, Departure, Passenger Name, Destination: Eternity).

---

## 4. Implementation Phasing
- [ ] **Phase 1: Setup & Design Tokens**
  - Setup Tailwind config dengan palette Earthy Botanical (Sage, Terracotta, Kraft).
  - Buat helper i18n ID & EN.
- [ ] **Phase 2: Boarding Pass & Cover Peel System**
  - Komponen tiket vintage responsif.
  - Animasi robek / peel interaktif + audio playback unblocker.
- [ ] **Phase 3: Parallax Botanical Scene & Hero Section**
  - Layer dedaunan mengambang dengan efek parallax native.
  - Section profil kedua mempelai dengan lengkungan arch frame.
- [ ] **Phase 4: Love Story Timeline & Event Details**
  - Garis cerita cinta bertunas/bercabang.
  - Info acara + integrasi Maps & Calendar link.
- [ ] **Phase 5: Media Gallery, RSVP & Wishes (Firestore)**
  - Dynamic Asymmetric Organic Gallery (Polaroid tilt, overlapping, parallax offset) + Lightbox modal.
  - Form RSVP & daftar ucapan real-time.
- [ ] **Phase 6: Digital Envelope & WhatsApp Link Generator**
  - Kartu salin rekening & QRIS.
  - Rute `/generator` untuk produksi link tiket personal.
- [ ] **Phase 7: Mobile Optimization & Verification**
  - Uji sentuhan drag/peel di mobile viewport (360px - 430px).
  - Validasi performa scroll 60 FPS.

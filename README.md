# agozaliBlog

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
</p>

**agozaliBlog** adalah platform blog personal modern yang dibangun dengan teknologi web terkini. Blog ini dirancang untuk berbagi artikel, tutorial, dan insight seputar coding, web development, dan teknologi.

## Fitur Utama

### Manajemen Konten

- **Rich Text Editor** - Editor WYSIWYG dengan TipTap untuk menulis artikel dengan format lengkap
- **Cover Image Upload** - Upload gambar sampul langsung atau gunakan URL
- **Draft & Publish** - Simpan sebagai draft atau langsung publish
- **SEO Friendly** - Meta tags, Open Graph, dan structured data otomatis

### Desain & UI

- **Dark/Light Mode** - Tema responsif sesuai preferensi sistem
- **Modern Design** - UI elegan dengan animasi halus menggunakan Framer Motion
- **Fully Responsive** - Tampilan optimal di desktop, tablet, dan mobile
- **Typography** - Font modern (Inter & Outfit) untuk keterbacaan optimal

### Admin Panel

- **Authentication** - Login dengan email & password via Supabase Auth
- **Dashboard** - Panel admin untuk kelola posts dan settings
- **Site Settings** - Konfigurasi judul, tagline, dan branding situs
- **Profile Management** - Upload foto profil dan atur informasi author

### Performa

- **Vite** - Build tool super cepat dengan HMR
- **React Query** - Caching dan state management yang efisien
- **Lazy Loading** - Optimasi loading konten

## Tech Stack

| Kategori             | Teknologi                            |
| -------------------- | ------------------------------------ |
| **Framework**        | React 18 + TypeScript                |
| **Build Tool**       | Vite                                 |
| **Styling**          | Tailwind CSS + shadcn/ui             |
| **Backend**          | Supabase (PostgreSQL, Auth, Storage) |
| **State Management** | TanStack React Query                 |
| **Editor**           | TipTap                               |
| **Animation**        | Framer Motion                        |
| **Form**             | React Hook Form + Zod                |
| **Routing**          | React Router DOM                     |

## Struktur Proyek

```
lumina-blog/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images & media
│   ├── components/        # Reusable components
│   │   ├── blog/         # Blog-specific components
│   │   ├── editor/       # Rich text editor
│   │   ├── layout/       # Header, Footer, Layout
│   │   ├── seo/          # SEO components
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # Supabase client & types
│   ├── lib/              # Utility functions
│   └── pages/            # Page components
│       └── admin/        # Admin panel pages
├── supabase/             # Database migrations
└── index.html
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm atau bun
- Akun Supabase

### 1. Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd lumina-blog

# Install dependencies
npm install
```

### 2. Setup Environment

Buat file `.env` di root folder:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### 3. Setup Database

Jalankan migration SQL di Supabase SQL Editor:

```bash
# File: supabase/migrations/20251224073457_*.sql
```

### 4. Create Admin User

```bash
node seed-user.js
```

### 5. Run Development Server

```bash
npm run dev
```

Buka `http://localhost:5173` di browser.

## Panduan Penggunaan

### Halaman Publik

- `/` - Home page dengan featured & recent articles
- `/blog` - Daftar semua artikel dengan fitur search
- `/blog/:slug` - Detail artikel
- `/about` - Halaman tentang author

### Admin Panel

- `/admin/login` - Login admin
- `/admin/dashboard` - Dashboard utama
- `/admin/posts` - Kelola semua posts
- `/admin/posts/new` - Buat post baru
- `/admin/posts/:id/edit` - Edit post
- `/admin/settings` - Pengaturan situs

## Database Schema

### Tables

- `posts` - Artikel blog (title, slug, content, excerpt, cover_image, is_published)
- `profiles` - Profil pengguna
- `site_settings` - Konfigurasi situs (key-value pairs)

### Storage Buckets

- `blog-assets` - Gambar untuk artikel
- `profile-images` - Foto profil author

## Konfigurasi

### Site Settings

Kelola melalui Admin > Settings:

- `site_title` - Judul situs
- `site_tagline` - Tagline
- `site_description` - Deskripsi untuk SEO
- `hero_text` - Teks welcome di homepage
- `author_name` - Nama author
- `author_avatar` - URL foto profil
- Social links (Twitter, GitHub, LinkedIn)

## Scripts

```bash
# Development
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Deployment

### Vercel

1. Push ke GitHub
2. Import project di Vercel
3. Set environment variables
4. Deploy!

### Netlify

1. Push ke GitHub
2. Connect repository di Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables

## License

MIT License - Silakan gunakan dan modifikasi sesuai kebutuhan.

## Author

**Ahmad Gozali**

- Email: ahmadmulti10@gmail.com
- Blog: [agozaliBlog](https://agozaliblog.com)

---

<p align="center">
  Made with ❤️ using React & Supabase
</p>

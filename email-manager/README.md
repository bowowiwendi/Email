# Email Manager - Temporary Email Generator

Aplikasi web untuk manage temporary email dari **generator.email** dengan fitur save/delete email yang di-generate.

![Tech Stack](https://img.shields.io/badge/React-Vite-blue?logo=react)
![Supabase](https://img.shields.io/badge/Database-Supabase-green?logo=supabase)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?logo=tailwind-css)

## 🚀 Fitur

- ✨ **Generate Email** - Buat email temporary dengan username random atau custom
- 💾 **Save Email** - Simpan email favorit ke database Supabase
- 🗑️ **Delete Email** - Hapus email dari saved list
- 📋 **Copy to Clipboard** - Copy email dengan satu klik
- 🔄 **Auto-refresh** - Inbox refresh otomatis di generator.email
- 📱 **Responsive Design** - UI modern dengan Tailwind CSS
- 🔍 **Search & Filter** - Cari saved emails
- 🌙 **Dark Mode Support** - Otomatis sesuai system preference

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |
| Icons | Lucide React |

## 📦 Installation & Setup

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd email-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase Database

1. **Buat project di Supabase**
   - Kunjungi [https://supabase.com](https://supabase.com)
   - Sign up / Login
   - Klik "New Project"
   - Isi nama project dan password database
   - Pilih region (pilih yang terdekat)
   - Klik "Create new project"

2. **Dapatkan API Credentials**
   - Setelah project selesai dibuat, pergi ke **Settings** → **API**
   - Copy **Project URL** dan **anon/public key**

3. **Setup Database Schema**
   - Pergi ke **SQL Editor** di Supabase dashboard
   - Copy isi file `supabase/migrations/001_create_saved_emails.sql`
   - Paste dan run di SQL Editor

4. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` dengan credentials dari Supabase:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 🚀 Deployment ke Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push code ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy di Vercel**
   - Kunjungi [https://vercel.com](https://vercel.com)
   - Login dengan GitHub
   - Klik "Add New Project"
   - Import repository GitHub kamu
   - Configure project:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - **Environment Variables**: Tambahkan:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Klik "Deploy"

3. **Done!** Aplikasi kamu live di `https://your-app.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy ke production
vercel --prod
```

## 📁 Project Structure

```
email-manager/
├── src/
│   ├── components/
│   │   ├── EmailGenerator.jsx    # Komponen generate email
│   │   └── EmailList.jsx         # Komponen list saved emails
│   ├── lib/
│   │   └── supabaseClient.js     # Supabase client config
│   ├── App.jsx                   # Main component
│   ├── App.css                   # App styles
│   ├── index.css                 # Global styles + Tailwind
│   └── main.jsx                  # Entry point
├── supabase/
│   └── migrations/
│       └── 001_create_saved_emails.sql  # Database schema
├── public/
│   └── vite.svg
├── .env                          # Environment variables
├── .env.example                  # Environment template
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vercel.json                   # Vercel configuration
└── vite.config.js
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📝 Database Schema

Table: `saved_emails`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `email` | VARCHAR(255) | Full email address (unique) |
| `username` | VARCHAR(128) | Username part |
| `domain` | VARCHAR(128) | Domain part |
| `note` | TEXT | Optional note |
| `is_active` | BOOLEAN | Active status |
| `created_at` | TIMESTAMP | Created timestamp |
| `updated_at` | TIMESTAMP | Updated timestamp |

## 🎨 Customization

### Add More Domains

Edit `src/App.jsx` dan tambahkan domain ke `AVAILABLE_DOMAINS`:

```javascript
const AVAILABLE_DOMAINS = [
  'liveforms.org',
  'thaitudang.xyz',
  // Add your domains here
  'yourdomain.com'
]
```

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#...',
          500: '#...',
          600: '#...',
        }
      }
    }
  }
}
```

## 🔐 Security Notes

- Supabase RLS (Row Level Security) sudah diaktifkan
- Untuk production, pertimbangkan untuk menambahkan authentication
- Jangan commit file `.env` ke Git
- Gunakan environment variables di Vercel untuk sensitive data

## 📄 License

MIT License - feel free to use this project for personal or commercial use.

## 🙏 Credits

- [generator.email](https://generator.email) - Temporary email service
- [Supabase](https://supabase.com) - Database
- [Vercel](https://vercel.com) - Hosting
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Lucide Icons](https://lucide.dev) - Icons

---

**Happy Coding! 🚀**

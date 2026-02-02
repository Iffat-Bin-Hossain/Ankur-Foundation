# Ankur Foundation - Frontend

Next.js-based frontend application for Ankur Foundation NGO website.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## 📁 Structure

```
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/          # Reusable React components
│   └── ui/             # UI component library
├── lib/                # Utilities and helpers
├── hooks/              # Custom React hooks
├── types/              # TypeScript definitions
└── utils/              # Helper functions
public/
├── manifest.json       # PWA configuration
├── sw.js              # Service Worker
└── icons/             # App icons
```

## 🔧 Scripts

- `npm run dev` - Start development server (HMR enabled)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Technologies

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **PWA**: next-pwa

## 🔗 Configuration

### Environment Variables
Create `.env.local`:
```env
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

### Next.js Config
See `next.config.js` for PWA and build settings.

## 📱 PWA Features

- Installable on home screen
- Works offline
- Push notifications
- Fast loading

## 🐳 Docker

### Development
```bash
docker build -f Dockerfile.dev -t ankur-frontend:dev .
docker run -p 3000:3000 ankur-frontend:dev
```

### Production
```bash
docker build -f Dockerfile -t ankur-frontend:prod .
docker run -p 3000:3000 ankur-frontend:prod
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)

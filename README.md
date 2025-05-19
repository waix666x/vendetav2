# Capital Ventures Trading Platform

A modern React + TypeScript trading platform with real-time market data visualization and user-friendly interface.

## Features

- Real-time market data display
- TradingView widget integration
- Responsive design
- Modern UI with animations
- User registration system
- Multi-language support (German)

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- TradingView Widget
- React Phone Input

## Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/project.git
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Deployment

### GitHub Setup

1. Initialize git (if not already done):
```bash
git init
```

2. Add your files:
```bash
git add .
```

3. Commit your changes:
```bash
git commit -m "Initial commit"
```

4. Add your GitHub repository as remote:
```bash
git remote add origin https://github.com/yourusername/project.git
```

5. Push to GitHub:
```bash
git push -u origin main
```

### Netlify Deployment

1. Go to [Netlify](https://www.netlify.com/) and sign in with your GitHub account
2. Click "Add new site" > "Import an existing project"
3. Select your GitHub repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

## Environment Variables

Create a `.env` file in the root directory with the following variables (if needed):
```
VITE_API_KEY=your_api_key
```

## Project Structure

```
project/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
└── vite.config.ts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
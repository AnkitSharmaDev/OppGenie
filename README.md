# OppGenie 🧞‍♂️

A smart, Gen Z-themed opportunity-finder chatbot that helps users discover volunteering, internships, events, and social impact roles.

## Features ✨

- 🤖 AI-Powered chatbot using Hugging Face's Mistral-7B-Instruct model
- 🎨 Modern, Gen Z-inspired UI with Tailwind CSS
- 🔐 Firebase Authentication and Firestore database
- 📱 Fully responsive design
- 🌙 Beautiful animations with Framer Motion
- 📊 Admin panel with analytics
- 🏷️ Trending opportunities and tags

## Tech Stack 🛠️

- React.js (Vite)
- TypeScript
- Tailwind CSS
- Firebase (Auth + Firestore)
- Hugging Face Inference API
- React Router DOM
- Framer Motion
- Heroicons

## Getting Started 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/oppgenie.git
   cd oppgenie
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project named "OppGenie"
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Get your Firebase config keys

4. Set up Hugging Face:
   - Go to [Hugging Face](https://huggingface.co)
   - Sign up and create an account
   - Visit your [tokens page](https://huggingface.co/settings/tokens)
   - Create a new read-only access token

5. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Firebase and Hugging Face credentials
   - Set your admin email

6. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure 📁

```
src/
├── api/
│   └── huggingface.ts
├── components/
│   └── Layout.tsx
├── pages/
│   ├── Home.tsx
│   ├── Chatbot.tsx
│   ├── Trending.tsx
│   ├── New.tsx
│   └── AdminPanel.tsx
├── routes/
│   └── index.tsx
├── firebase.ts
└── env.d.ts
```

## Deployment 🌐

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to your preferred platform:
   - [Vercel](https://vercel.com)
   - [Netlify](https://netlify.com)
   - [Firebase Hosting](https://firebase.google.com/docs/hosting)

Make sure to set up your environment variables on your hosting platform.

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Tailwind CSS](https://tailwindcss.com)
- [Hugging Face](https://huggingface.co)
- [Firebase](https://firebase.google.com)
- [Heroicons](https://heroicons.com) 
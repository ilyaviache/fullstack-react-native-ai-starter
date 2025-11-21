# React Native AI Template

Full-stack React Native + Express.js template for building cross-platform AI applications with multiple LLM providers, image generation, and beautiful UI components.

![React Native AI](https://i.imgur.com/AOOgBM0.png)

## Features

### AI & LLM Support
- **Multiple LLM Providers**: OpenAI GPT-4/Turbo, Anthropic Claude, Cohere, Google Gemini, Mistral AI
- **Streaming Responses**: Real-time streaming from all providers
- **OpenAI Assistants**: Full support for code interpreter and retrieval
- **Web Search**: Cohere with web search capabilities

### Image Generation & Processing
- **Fast Image Generation**: LCM for quick results
- **High Quality**: Stable Diffusion XL
- **Image Processing**: Background removal, upscaling, illusion diffusion
- **Multiple Providers**: Fal.ai, Replicate integration

### UI Components (shadcn-style)
- **NativeWind**: Tailwind CSS for React Native
- **Beautiful Components**: Button, Card, Input, Text with variants
- **Cross-Platform**: Works on iOS, Android, and Web
- **Themeable**: 5 built-in themes, easy to add more

### Additional Features
- Server proxy for authentication
- Image uploads with ByteScale
- AsyncStorage for persistence
- TypeScript throughout
- Hot reload development

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/ilyaviache/react-native-and-server-ai-template.git
cd react-native-and-server-ai-template

# Install dependencies
cd server && npm install
cd ../app && npm install
```

### Environment Setup

**Server (`server/.env`):**
```env
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
COHERE_API_KEY=your_key_here
FAL_API_KEY=your_key_here
BYTESCALE_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
REPLICATE_KEY=your_key_here
```

**App (`app/.env`):**
```env
EXPO_PUBLIC_ENV=DEVELOPMENT
EXPO_PUBLIC_DEV_API_URL=http://localhost:3050
EXPO_PUBLIC_PROD_API_URL=https://your-production-url.com
```

### Running the Application

**Terminal 1 - Start Server:**
```bash
cd server
npm run dev
```
Server will start on `http://localhost:3050`

**Terminal 2 - Start App:**
```bash
cd app
npm start
```

Then press:
- `i` - iOS simulator
- `a` - Android emulator
- `w` - Web browser

## Project Structure

```
react-native-ai/
├── app/                    # React Native application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   └── ui/        # shadcn-style UI primitives
│   │   ├── screens/       # Main screens
│   │   ├── context.tsx    # React Context
│   │   ├── theme.ts       # Theme definitions
│   │   └── utils.ts       # Utilities
│   ├── App.tsx            # Root component
│   ├── constants.ts       # Models & constants
│   ├── tailwind.config.js # Tailwind config
│   └── package.json
│
├── server/                 # Express.js backend
│   ├── src/
│   │   ├── chat/          # LLM integrations
│   │   ├── images/        # Image generation
│   │   ├── files/         # File uploads
│   │   └── helpers/       # Utilities
│   ├── .env               # Environment variables
│   └── package.json
│
├── .cursorrules           # Cursor AI rules
├── .clinerules            # Cline AI rules
└── AI_CONTEXT.md          # AI context documentation
```

## UI Components

### Button
```tsx
import { Button } from '@/components/ui';

<Button variant="default" size="default" onPress={() => {}}>
  Click Me
</Button>

// Variants: default, destructive, outline, secondary, ghost, link
// Sizes: default, sm, lg, icon
```

### Card
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

### Input
```tsx
import { Input } from '@/components/ui';

<Input
  placeholder="Enter text"
  value={value}
  onChangeText={setValue}
  error={false}
/>
```

### Text
```tsx
import { Text } from '@/components/ui';

<Text variant="h1">Heading</Text>
<Text variant="p">Paragraph</Text>
<Text variant="muted">Muted text</Text>

// Variants: h1, h2, h3, h4, p, large, small, muted
```

## Theming

Add new themes in `app/src/theme.ts`:

```typescript
const customTheme = {
  ...lightTheme,
  name: 'Custom',
  label: 'custom',
  tintColor: '#ff0000',
  textColor: '#000000',
  // ... other theme properties
}

export { lightTheme, darkTheme, customTheme }
```

## Adding LLM Models

### 1. Add Model Definition
```typescript
// app/constants.ts
export const MODELS = {
  // ... existing models
  newModel: {
    name: 'New Model',
    label: 'newModel',
    icon: NewModelIcon
  }
}
```

### 2. Create Server Handler
```typescript
// server/src/chat/newModel.ts
import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  // Implement streaming response
  res.setHeader('Content-Type', 'text/event-stream');
  // ... handle streaming
});

export default router;
```

### 3. Update Router
```typescript
// server/src/chat/chatRouter.ts
import newModelRouter from './newModel';

router.use('/new-model', newModelRouter);
```

### 4. Update App Screen
```typescript
// app/src/screens/chat.tsx
// Add handling for new model type
```

## Adding Image Models

### 1. Add to Constants
```typescript
// app/constants.ts
export const IMAGE_MODELS = {
  // ... existing models
  newImageModel: {
    name: 'New Image Model',
    label: 'newImageModel'
  }
}
```

### 2. Create Handler
```typescript
// server/src/images/provider/newModel.ts
export async function handleNewModel(req, res) {
  // Implement image generation
}
```

### 3. Update Router
```typescript
// server/src/images/imagesRouter.ts
import { handleNewModel } from './provider/newModel';

router.post('/new-model', handleNewModel);
```

## API Endpoints

### Chat
- `POST /chat/gpt` - OpenAI GPT
- `POST /chat/claude` - Anthropic Claude
- `POST /chat/cohere` - Cohere
- `POST /chat/cohere-web` - Cohere with web search
- `POST /chat/gemini` - Google Gemini
- `POST /chat/mistral` - Mistral AI

### Assistants
- `POST /chat/create-assistant` - Create OpenAI assistant
- `POST /chat/add-message` - Add message to thread
- `POST /chat/run-response` - Run assistant
- `GET /chat/run-status/:threadId/:runId` - Check status
- `GET /chat/get-thread-messages/:threadId` - Get messages

### Images
- `POST /images/fal` - Generate images with Fal.ai

### Files
- `POST /files/upload` - Upload files

## Development

### Commands

**Server:**
```bash
npm run dev      # Development with hot reload
npm run build    # Build TypeScript
npm start        # Production
```

**App:**
```bash
npm start        # Start Expo dev server
npm run ios      # Run on iOS
npm run android  # Run on Android
npm run web      # Run on web
```

### TypeScript

Both app and server use TypeScript. Types are defined in:
- `app/types.ts` - App types
- Server uses inline types and interfaces

### Code Style

- Use TypeScript for all new code
- Follow existing patterns
- Use functional components with hooks
- Prefer composition over inheritance
- Keep components small (< 200 lines)
- Use NativeWind className for styling

## AI Agent Support

This template includes configuration for AI coding assistants:

- **`.cursorrules`** - Rules for Cursor AI
- **`.clinerules`** - Rules for Cline AI
- **`AI_CONTEXT.md`** - Comprehensive AI context documentation

These files help AI assistants understand the codebase structure, patterns, and best practices.

## Testing

```bash
# Run server tests
cd server
npm test

# Run app tests
cd app
npm test
```

## Building for Production

### iOS
```bash
cd app
npm run build:ios
```

### Android
```bash
cd app
npm run build:android
```

### Web
```bash
cd app
npm run build:web
```

## Troubleshooting

### NativeWind styles not applying
- Clear Metro cache: `npx expo start -c`
- Check `global.css` is imported in `App.tsx`
- Verify `metro.config.js` is configured

### TypeScript errors on className
- Ensure `nativewind-env.d.ts` exists
- Restart TypeScript server

### Server not responding
- Check server is running on port 3050
- Verify `EXPO_PUBLIC_DEV_API_URL` in `app/.env`
- Check API keys in `server/.env`

### Build fails
- Run `npm install` in both app and server
- Clear caches: `npx expo start -c`
- Check for TypeScript errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE.txt

## Author

Ilya Viache

## Acknowledgments

- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Built with [React Native](https://reactnative.dev/)
- Powered by [Expo](https://expo.dev/)
- Styled with [NativeWind](https://www.nativewind.dev/)

---

**Ready to build your AI app?** 🚀

Get your API keys, run `npm install`, and start coding!

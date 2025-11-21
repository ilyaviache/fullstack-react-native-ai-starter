# AI Context - React Native AI Template

## Quick Start for AI Agents

This document provides context for AI coding assistants working with this codebase.

## Project Type
Full-stack mobile AI application template with React Native (Expo) frontend and Express.js backend.

## Key Technologies
- **Frontend**: React Native, Expo, TypeScript, NativeWind (Tailwind CSS)
- **Backend**: Express.js, TypeScript, Node.js
- **UI**: shadcn-inspired components built with NativeWind
- **State**: React Context API, AsyncStorage
- **AI**: Multiple LLM providers (OpenAI, Anthropic, Cohere, Gemini, Mistral)
- **Images**: Fal.ai, Replicate for generation and processing

## Project Structure

### App Directory (`/app`)
```
app/
├── src/
│   ├── components/         # Reusable components
│   │   ├── ui/            # UI primitives (Button, Card, Input, Text)
│   │   ├── AnthropicIcon.tsx
│   │   ├── CohereIcon.tsx
│   │   └── ...            # Other components
│   ├── screens/           # Main screens
│   │   ├── chat.tsx       # Chat interface
│   │   ├── images.tsx     # Image generation
│   │   ├── assistant.tsx  # OpenAI assistants
│   │   ├── settings.tsx   # App settings
│   │   └── index.ts       # Screen exports
│   ├── context.tsx        # React Context (Theme, App)
│   ├── main.tsx           # Navigation setup
│   ├── theme.ts           # Theme definitions
│   └── utils.ts           # Utility functions
├── App.tsx                # Root component
├── constants.ts           # Models and constants
├── types.ts               # TypeScript types
├── global.css             # NativeWind styles
├── tailwind.config.js     # Tailwind configuration
├── metro.config.js        # Metro bundler config
└── package.json
```

### Server Directory (`/server`)
```
server/
├── src/
│   ├── chat/              # LLM integrations
│   │   ├── chatRouter.ts  # Main chat router
│   │   ├── gpt.ts         # OpenAI GPT
│   │   ├── claude.ts      # Anthropic Claude
│   │   ├── cohere.ts      # Cohere
│   │   ├── gemini.ts      # Google Gemini
│   │   ├── mistral.ts     # Mistral AI
│   │   └── ...            # OpenAI assistants endpoints
│   ├── images/            # Image services
│   │   ├── imagesRouter.ts
│   │   └── fal/           # Fal.ai integrations
│   ├── files/             # File upload handlers
│   │   └── fileRouter.ts
│   ├── helpers/           # Helper functions
│   │   └── saveFileToOpenai.ts
│   ├── utils.ts           # Utilities
│   └── index.ts           # Express server
├── uploads/               # Uploaded files directory
├── .env                   # Environment variables
└── package.json
```

## UI Components Documentation

### Button Component
```tsx
import { Button } from '@/components/ui';

// Variants: default, destructive, outline, secondary, ghost, link
// Sizes: default, sm, lg, icon
<Button
  variant="default"
  size="default"
  loading={false}
  onPress={() => {}}
>
  Click Me
</Button>
```

### Card Component
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
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Footer actions */}
  </CardFooter>
</Card>
```

### Input Component
```tsx
import { Input } from '@/components/ui';

<Input
  placeholder="Enter text"
  value={value}
  onChangeText={setValue}
  error={false}
/>
```

### Text Component
```tsx
import { Text } from '@/components/ui';

// Variants: h1, h2, h3, h4, p, large, small, muted
<Text variant="h1">Heading</Text>
<Text variant="p">Paragraph</Text>
<Text variant="muted">Muted text</Text>
```

## API Endpoints

### Chat Endpoints
- `POST /chat/gpt` - OpenAI GPT-4/Turbo
- `POST /chat/claude` - Anthropic Claude
- `POST /chat/cohere` - Cohere (standard)
- `POST /chat/cohere-web` - Cohere with web search
- `POST /chat/gemini` - Google Gemini
- `POST /chat/mistral` - Mistral AI

### Assistant Endpoints (OpenAI)
- `POST /chat/create-assistant` - Create assistant
- `POST /chat/add-message` - Add message to thread
- `POST /chat/run-response` - Run assistant
- `GET /chat/run-status/:threadId/:runId` - Check status
- `GET /chat/get-thread-messages/:threadId` - Get messages

### Image Endpoints
- `POST /images/fal` - Image generation with Fal.ai
  - Models: fast-lcm, stable-diffusion-xl, remove-bg, upscale, illusion-diffusion
- `POST /images/process` - Image processing

### File Endpoints
- `POST /files/upload` - File upload

## Common Patterns

### Making API Calls
```typescript
import { DOMAIN } from '../constants';

const response = await fetch(`${DOMAIN}/chat/gpt`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'Hello' }],
    model: 'gpt-4',
  }),
});

const data = await response.json();
```

### Streaming Responses
```typescript
import EventSource from 'react-native-sse';

const es = new EventSource(`${DOMAIN}/chat/gpt`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

es.addEventListener('message', (event) => {
  if (event.data === '[DONE]') {
    es.close();
    return;
  }
  const parsed = JSON.parse(event.data);
  // Handle streamed data
});
```

### Using Theme
```typescript
import { ThemeContext } from '../context';

function Component() {
  const { theme, themeName, setTheme } = useContext(ThemeContext);

  return (
    <View style={{ backgroundColor: theme.backgroundColor }}>
      {/* Component content */}
    </View>
  );
}
```

### Using App Context
```typescript
import { AppContext } from '../context';

function Component() {
  const {
    chatType,
    setChatType,
    imageModel,
    setImageModel,
    handlePresentModalPress,
  } = useContext(AppContext);

  // Use context values
}
```

## Environment Variables

### Server (.env)
```env
ANTHROPIC_API_KEY=sk-ant-xxx
OPENAI_API_KEY=sk-xxx
COHERE_API_KEY=xxx
FAL_API_KEY=xxx
BYTESCALE_API_KEY=xxx
GEMINI_API_KEY=xxx
REPLICATE_KEY=xxx
```

### App (.env)
```env
EXPO_PUBLIC_ENV=DEVELOPMENT
EXPO_PUBLIC_DEV_API_URL=http://localhost:3050
EXPO_PUBLIC_PROD_API_URL=https://api.production.com
```

## Development Workflow

### Starting the Project
```bash
# Terminal 1: Start server
cd server
npm run dev

# Terminal 2: Start app
cd app
npm start
# Then press 'i' for iOS, 'a' for Android, or 'w' for web
```

### Building
```bash
# Build server
cd server
npm run build

# Check server build
cd server
npm start

# Build app for production
cd app
npm run build:ios     # iOS
npm run build:android # Android
npm run build:web     # Web
```

## TypeScript Types

### Key Type Definitions (app/types.ts)
```typescript
export interface Model {
  name: string;
  label: string;
  icon: any;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface Theme {
  name: string;
  label: string;
  backgroundColor: string;
  textColor: string;
  tintColor: string;
  tabBarActiveTintColor: string;
  tabBarInactiveTintColor: string;
  placeholderTextColor: string;
}
```

## Adding New Features

### Adding a New LLM Provider
1. Create handler: `server/src/chat/[provider].ts`
2. Add to router: `server/src/chat/chatRouter.ts`
3. Add model: `app/constants.ts` in `MODELS`
4. Create icon: `app/src/components/[Provider]Icon.tsx`
5. Update chat screen: `app/src/screens/chat.tsx`

### Adding a New Image Model
1. Create handler: `server/src/images/[service]/[model].ts`
2. Update router: `server/src/images/imagesRouter.ts`
3. Add to constants: `app/constants.ts` in `IMAGE_MODELS`
4. Update images screen: `app/src/screens/images.tsx`

### Adding a New UI Component
1. Create: `app/src/components/ui/[component].tsx`
2. Export: `app/src/components/ui/index.ts`
3. Use NativeWind className for styling
4. Follow shadcn design patterns
5. Add TypeScript interface for props

## Testing Checklist
- [ ] TypeScript compiles without errors
- [ ] Server builds successfully (`npm run build`)
- [ ] Server starts without errors (`npm start`)
- [ ] App starts without errors (`npm start`)
- [ ] All imports resolve correctly
- [ ] Environment variables are set
- [ ] API endpoints respond correctly
- [ ] UI components render properly
- [ ] Works on iOS, Android, and Web

## Common Issues & Solutions

### Issue: NativeWind styles not applying
**Solution**:
- Check `global.css` is imported in `App.tsx`
- Verify `metro.config.js` is configured correctly
- Clear Metro cache: `npx expo start -c`

### Issue: TypeScript errors on className
**Solution**:
- Ensure `nativewind-env.d.ts` exists
- Restart TypeScript server in IDE

### Issue: Server API not responding
**Solution**:
- Check server is running on correct port (3050)
- Verify `EXPO_PUBLIC_DEV_API_URL` in `app/.env`
- Check for CORS issues
- Verify API keys are set in `server/.env`

### Issue: Build fails
**Solution**:
- Run `npm install` in both app and server
- Check for TypeScript errors
- Verify all imports exist
- Clear caches and rebuild

## Best Practices for AI Agents

1. **Read Before Editing**: Always read existing files before making changes
2. **Follow Patterns**: Use existing patterns in the codebase
3. **Type Safety**: Use proper TypeScript types, avoid `any`
4. **Test Changes**: Verify builds succeed after modifications
5. **Documentation**: Update docs when adding features
6. **Error Handling**: Always implement proper error handling
7. **Cross-Platform**: Consider iOS, Android, and Web compatibility
8. **Performance**: Use React.memo, virtualization, and lazy loading
9. **Security**: Never commit secrets, use environment variables
10. **Code Style**: Follow existing code formatting and conventions

## Quick Reference

### Important Files
- `app/App.tsx` - Root component
- `app/constants.ts` - Models and configuration
- `app/src/main.tsx` - Navigation setup
- `server/src/index.ts` - Server entry point
- `server/src/chat/chatRouter.ts` - Chat routes
- `server/src/images/imagesRouter.ts` - Image routes

### Key Commands
- `npm start` - Start development
- `npm run dev` - Start with hot reload (server)
- `npm run build` - Build TypeScript
- `npx expo start -c` - Clear cache and start

### Documentation
- Main README: `/README.md`
- AI Rules: `/.cursorrules`
- Cline Rules: `/.clinerules`
- This file: `/AI_CONTEXT.md`

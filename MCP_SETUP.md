# Expo MCP Integration Setup Guide

## Overview

This project integrates **Expo MCP (Model Context Protocol)** to enhance AI-assisted development. MCP enables AI tools like Claude Code, Cursor, and VS Code to directly interact with your Expo project, providing intelligent context about your development environment.

## What is Expo MCP?

Expo MCP is a remote Model Context Protocol server hosted by Expo that provides:

- **Expo SDK Knowledge**: AI can fetch official documentation on demand
- **Dependency Management**: Guides toward compatible packages using `npx expo install`
- **Visual Testing & Automation**: Screenshot simulators, interact with running apps, and verify UI changes
- **DevTools Integration**: Open React Native DevTools programmatically

## Prerequisites

### Required

- **Expo Account**: Sign up at [expo.dev](https://expo.dev)
- **EAS Paid Plan**: Required for remote MCP server access
- **Expo SDK 54+**: This project uses Expo SDK 51+
- **AI Tool**: Claude Code, Cursor, or VS Code with MCP support

### Local Development

The `expo-mcp` package (v0.1.15) is already installed as a dev dependency in `app/package.json`.

## Setup Instructions

### Step 1: Create an EAS Access Token

1. Go to [expo.dev/accounts/[account]/settings/access-tokens](https://expo.dev/settings/access-tokens)
2. Click "Create Token"
3. Name it (e.g., "MCP Access Token")
4. Copy the generated token
5. Save it securely - you'll need it for authentication

### Step 2: Configure Your AI Tool

#### For Claude Code

Run the following command in your terminal:

```bash
claude mcp add --transport http expo-mcp https://mcp.expo.dev/mcp
```

When prompted, enter your EAS access token.

Verify installation:

```bash
claude mcp list
```

You should see `expo-mcp` listed as "Connected".

#### For Cursor

1. Open Cursor Settings
2. Navigate to MCP Configuration
3. Add a new HTTP MCP server:
   - **Name**: `expo-mcp`
   - **URL**: `https://mcp.expo.dev/mcp`
   - **Authentication**: Bearer Token
   - **Token**: Your EAS access token

#### For VS Code

1. Install the MCP extension
2. Open settings (JSON)
3. Add the following configuration:

```json
{
  "mcp.servers": {
    "expo-mcp": {
      "transport": "http",
      "url": "https://mcp.expo.dev/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_EAS_ACCESS_TOKEN"
      }
    }
  }
}
```

### Step 3: Enable Local MCP Capabilities

For advanced features (screenshots, DevTools, automation), run the Expo development server with MCP enabled:

```bash
cd app
npm run start:mcp
```

Or manually:

```bash
EXPO_UNSTABLE_MCP_SERVER=1 npx expo start
```

This enables the local MCP server that connects to the remote Expo MCP service.

## Available MCP Tools

Once configured, your AI assistant can use these tools:

| Tool                         | Purpose                             | Example Use                            |
| ---------------------------- | ----------------------------------- | -------------------------------------- |
| `learn`                      | Fetch Expo documentation            | "Learn about expo-router navigation"   |
| `search_documentation`       | Natural language doc search         | "How do I handle push notifications?"  |
| `add_library`                | Install packages with compatibility | "Add react-native-maps"                |
| `automation_take_screenshot` | Capture simulator screenshots       | "Take a screenshot of the home screen" |
| `automation_tap_by_testid`   | Interact with UI elements           | "Tap the login button"                 |
| `open_devtools`              | Launch React Native DevTools        | "Open DevTools for debugging"          |

## Usage Examples

### Ask AI Assistant

Once MCP is configured, you can ask your AI assistant questions like:

```
"What's the latest way to handle deep linking in Expo?"
```

The AI will use the `learn` tool to fetch current Expo documentation.

```
"Add a library for handling camera access"
```

The AI will use `add_library` to install `expo-camera` with proper version compatibility.

```
"Take a screenshot of the current screen"
```

The AI will use `automation_take_screenshot` to capture your simulator screen.

## Testing the Integration

### Test Remote MCP

1. Open your AI tool (Claude Code, Cursor, VS Code)
2. Ask: "Use MCP to search Expo documentation for custom fonts"
3. The AI should fetch and display documentation

### Test Local Capabilities

1. Start the app with MCP enabled:

   ```bash
   cd app
   npm run start:mcp
   ```

2. Open your iOS simulator or Android emulator

3. Ask your AI assistant:

   ```
   "Take a screenshot of the app"
   ```

4. The AI should capture and display a screenshot

## Important Notes

### Limitations

- **Single Connection**: Only one development server connection at a time
- **iOS Simulators Only**: Local capabilities work only with iOS simulators on macOS
- **Physical Devices**: Not yet supported for local capabilities
- **Experimental**: The MCP server uses `EXPO_UNSTABLE_MCP_SERVER=1` flag

### Security

- **Access Tokens**: Keep your EAS access token secure
- **Never Commit**: Don't commit tokens to version control
- **Rotate Regularly**: Regenerate tokens periodically from EAS dashboard

### Troubleshooting

**MCP not connecting:**

- Verify your EAS access token is valid
- Check your internet connection
- Ensure you have an active EAS paid plan

**Local capabilities not working:**

- Make sure you're running `npm run start:mcp` in the app directory
- Verify simulator/emulator is running
- Check that `expo-mcp` package is installed

**AI not using MCP tools:**

- Explicitly mention "use MCP" in your prompts initially
- Verify MCP is listed in your AI tool's available tools
- Check AI tool's MCP configuration

## Integration with This Project

### Project-Specific Features

This React Native AI template now supports:

1. **AI-Assisted Development**: Claude Code/Cursor can understand the project structure
2. **Smart Dependency Management**: AI can suggest and install compatible packages
3. **Visual Debugging**: Take screenshots during development and testing
4. **Documentation Access**: Instant access to Expo/React Native docs

### Recommended Workflow

1. Start development with MCP enabled:

   ```bash
   cd app
   npm run start:mcp
   ```

2. Open your AI assistant (Claude Code, Cursor)

3. Ask context-aware questions:
   - "How can I optimize the LLM chat screen performance?"
   - "Add animation library compatible with this Expo version"
   - "Take a screenshot of the image generation screen"

4. Let AI use MCP tools to provide accurate, context-aware assistance

## Additional Resources

- [Expo MCP Documentation](https://docs.expo.dev/eas/ai/mcp/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [Expo EAS Dashboard](https://expo.dev/)
- [Claude Code Documentation](https://docs.claude.com/claude-code)

## Support

If you encounter issues:

1. Check the [Expo Discord](https://chat.expo.dev/) #mcp channel
2. Review [Expo MCP GitHub Issues](https://github.com/expo/expo/issues)
3. Verify your EAS plan includes MCP access

---

**Note**: Expo MCP is under active development. Features and configuration may change. Check [official documentation](https://docs.expo.dev/eas/ai/mcp/) for updates.

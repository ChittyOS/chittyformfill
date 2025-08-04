# 🤖 Using PDF Form Engine with Claude Code

## Option 1: Direct API Calls (Immediate Use)

Since your Express server is running locally, Claude Code can interact with it directly:

```bash
# Start your server first
npm start

# Then in Claude Code, I can make requests like:
curl -X POST http://localhost:3001/api/fill-url \
  -H "Content-Type: application/json" \
  -d '{
    "file_url": "https://example.com/form.pdf",
    "fields": {"name": "John Doe", "date": "2024-01-15"}
  }'
```

## Option 2: As a Local MCP Tool (Recommended)

Claude Code can use MCP tools if they're configured. Add this to your MCP settings:

### 1. First, make the MCP server executable:
```bash
chmod +x mcp-server.js
```

### 2. Add to MCP config:
Create or edit `~/.config/mcp/settings.json`:

```json
{
  "mcpServers": {
    "pdf-form-engine": {
      "command": "node",
      "args": ["/Users/nickbianchi/mcp-server.js"],
      "env": {
        "PDF_ENGINE_URL": "http://localhost:3001"
      }
    }
  }
}
```

## Option 3: Custom Claude Code Command

Create a custom command for Claude Code:

```bash
# Create claude-code command
mkdir -p ~/.claude-code/commands
cat > ~/.claude-code/commands/pdf-tools.md << 'EOF'
---
name: pdf-tools
description: PDF form extraction and filling tools
---

## Available PDF Commands

### Extract PDF Fields
```bash
curl -X POST http://localhost:3001/api/upload \
  -F "pdf=@path/to/file.pdf"
```

### Fill PDF from URL
```bash
curl -X POST http://localhost:3001/api/fill-url \
  -H "Content-Type: application/json" \
  -d '{
    "file_url": "PDF_URL_HERE",
    "fields": {
      "firstName": "VALUE",
      "lastName": "VALUE"
    }
  }'
```

### Compare Templates
```bash
curl -X POST http://localhost:3001/api/compare-templates \
  -H "Content-Type: application/json" \
  -d '{
    "templateA": "template1",
    "templateB": "template2"
  }'
```
EOF
```

Then use in Claude Code with: `/pdf-tools`

## Option 4: Direct Function Integration

For the most seamless experience, Claude Code can use the WebFetch tool:

```javascript
// In Claude Code, I can do:
const result = await WebFetch({
  url: "http://localhost:3001/api/fill-url",
  prompt: "Fill this PDF with the provided data",
  method: "POST",
  body: {
    file_url: "https://example.com/form.pdf",
    fields: {
      name: "John Doe",
      email: "john@example.com"
    }
  }
});
```

## 🚀 Quick Test in Claude Code

Ask me to:
1. "Extract fields from this PDF: [URL]"
2. "Fill out this form with my data: [provide JSON]"
3. "Compare these two PDF templates"

I'll use the appropriate method to interact with your PDF Form Engine!
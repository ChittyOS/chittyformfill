# 📋 ChittyFormFill

AI-powered PDF form extraction and filling API. Part of the ChittyOS ecosystem.

## Features

- ✅ Native PDF form field extraction (no OCR needed)
- 📝 Intelligent form filling with field validation  
- 🤖 Claude & OpenAI tool definitions included
- 🚀 Deploy anywhere - Render, Cloudflare, Railway

## Quick Start

```bash
npm install
npm start
```

## API Endpoints

### Extract Form Fields
```bash
POST /api/upload
POST /api/fill-url  # Extract from URL
```

### Fill Forms
```bash
POST /api/fill-pdf   # Fill uploaded PDF
POST /api/fill-url   # Fill PDF from URL
```

### Compare Templates
```bash
POST /api/compare-templates
```

## Claude/OpenAI Integration

```javascript
// Claude Tool
{
  "name": "extract_pdf_fields",
  "description": "Extract form fields from PDF"
}

// OpenAI Function  
{
  "name": "fill_pdf_with_fields",
  "description": "Fill PDF with provided data"
}
```

## Deployment

- **Render**: See `render.yaml`
- **Cloudflare**: See `wrangler.toml`
- **MCP Server**: `npm run mcp`

## Part of ChittyOS

Built for the ChittyOS ecosystem of intelligent automation tools.

## License

MIT © ChittyOS
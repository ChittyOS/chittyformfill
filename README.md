# 🧠 Intelligent PDF Form Engine

AI-powered PDF form extraction and filling service with Claude/OpenAI integration.

## Features

- ✅ Native PDF form field extraction (no OCR needed)
- 📝 Intelligent form filling with field validation
- 🤖 Claude & OpenAI tool definitions included
- 🚀 Ready for deployment to Render, Cloudflare, etc.

## Quick Start

```bash
npm install
npm start
```

## API Endpoints

- `POST /api/upload` - Extract fields from uploaded PDF
- `POST /api/fill-pdf` - Fill PDF with provided data
- `POST /api/fill-url` - Fill PDF from URL
- `POST /api/compare-templates` - Compare form versions
- `GET /health` - Health check

## Deployment

See `render.yaml` for Render deployment or `wrangler.toml` for Cloudflare Workers.

## License

MIT
#!/usr/bin/env node
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const fetch = require('node-fetch');

const server = new Server({
  name: 'pdf-form-engine',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {}
  }
});

// Tool to extract PDF fields
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  
  switch (name) {
    case 'extract_pdf_fields':
      const extractResponse = await fetch('http://localhost:3001/api/fill-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file_url: args.file_url, fields: {} })
      });
      const extractData = await extractResponse.json();
      return { toolResult: extractData };
      
    case 'fill_pdf':
      const fillResponse = await fetch('http://localhost:3001/api/fill-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file_url: args.file_url, fields: args.fields })
      });
      const fillData = await fillResponse.json();
      return { toolResult: fillData };
      
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Tool definitions
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'extract_pdf_fields',
        description: 'Extract form fields from a PDF file',
        inputSchema: {
          type: 'object',
          properties: {
            file_url: { type: 'string', description: 'URL of the PDF file' }
          },
          required: ['file_url']
        }
      },
      {
        name: 'fill_pdf',
        description: 'Fill a PDF form with provided field values',
        inputSchema: {
          type: 'object',
          properties: {
            file_url: { type: 'string', description: 'URL of the PDF file' },
            fields: { type: 'object', description: 'Field values to fill' }
          },
          required: ['file_url', 'fields']
        }
      }
    ]
  };
});

const transport = new StdioServerTransport();
server.connect(transport);
console.error('PDF Form Engine MCP Server running...');
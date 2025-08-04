// Cloudflare Worker for PDF Form Engine
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }
    
    try {
      if (url.pathname === '/api/fill-url' && request.method === 'POST') {
        const { file_url, fields } = await request.json();
        
        // Fetch the PDF
        const pdfResponse = await fetch(file_url);
        const pdfBuffer = await pdfResponse.arrayBuffer();
        
        // In production, you'd use pdf-lib here or call your backend
        // For now, return mock response
        return new Response(JSON.stringify({
          message: "PDF processed via Cloudflare Worker",
          source: file_url,
          fields: fields,
          outputUrl: "https://your-r2-bucket.com/filled.pdf"
        }), { headers });
      }
      
      return new Response(JSON.stringify({
        error: "Not found",
        availableEndpoints: ["/api/fill-url"]
      }), { status: 404, headers });
      
    } catch (error) {
      return new Response(JSON.stringify({
        error: error.message
      }), { status: 500, headers });
    }
  }
};
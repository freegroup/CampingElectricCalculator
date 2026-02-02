export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    // OAuth callback handler
    if (url.pathname === '/auth/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      
      if (!code) {
        return new Response('Missing code parameter', { status: 400 });
      }
      
      try {
        // Exchange code for access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code: code
          })
        });
        
        const tokenData = await tokenResponse.json();
        
        if (tokenData.error) {
          return new Response(`GitHub error: ${tokenData.error_description}`, { status: 400 });
        }
        
        // Determine redirect URL based on state parameter or default to production
        let redirectUrl = env.APP_URL;
        
        // If state parameter contains a URL, use it (for localhost development)
        if (state) {
          try {
            const decodedState = decodeURIComponent(state);
            // Validate it's a safe URL (localhost or production)
            if (decodedState.startsWith('http://localhost:') || 
                decodedState.startsWith('https://freegroup.github.io')) {
              redirectUrl = decodedState;
            }
          } catch (e) {
            // Invalid state, use default
          }
        }
        
        // Redirect back to app with token
        return Response.redirect(
          `${redirectUrl}?token=${tokenData.access_token}`,
          302
        );
      } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    }
    
    return new Response('Not found', { status: 404 });
  }
}
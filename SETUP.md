# GitHub OAuth Setup with Cloudflare Workers

This guide explains how to set up GitHub OAuth authentication for a static website using Cloudflare Workers as a minimal backend.

## Prerequisites

- GitHub account
- Cloudflare account (free tier)
- Your static website URL

## Step 1: Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in the form:
   - **Application name**: `CampingElectricCalculator`
   - **Homepage URL**: `https://freegroup.github.io/CampingElectricCalculator/`
   - **Application description**: (optional) Leave empty or add description
   - **Authorization callback URL**: `https://YOUR-WORKER.workers.dev/auth/callback` (update later)
   - **Enable Device Flow**: ❌ **Leave UNCHECKED** (not needed for our setup)
4. Click **"Register application"**
5. **Save** the `Client ID` (displayed on next page)
6. Click **"Generate a new client secret"**
7. **Save** the `Client Secret` immediately (you can't see it again!)

**Note about Device Flow:**
- NOT required for Cloudflare Worker setup
- Only needed for apps without web callback (CLI tools, etc.)
- Our setup uses standard Authorization Code Flow
- **Recommendation: Leave unchecked**

## Step 2: Create Cloudflare Worker

1. Go to https://dash.cloudflare.com/
2. Sign up/log in (free account)
3. In the left sidebar, look for **"Workers & Pages"** or **"Workers"**
   - If you don't see it, click on your account name/icon in top right
   - Select a domain or click "Workers & Pages" in the main dashboard
   - Alternative: Go directly to https://dash.cloudflare.com/?to=/:account/workers
4. Click **"Create application"** (or **"Create Worker"** button)
5. You'll see "Ship something new" with several options:
   - ✅ Click **"Start with Hello World!"** (quickest option)
   - Alternative: Click "Select a template" if you want to browse templates
6. Give your worker a name: `github-oauth-proxy`
7. Click **"Deploy"**
8. **Copy the Worker URL** (e.g., `https://github-oauth-proxy.YOUR-USERNAME.workers.dev`)

**Troubleshooting:**
- If you can't find Workers, you may need to verify your email first
- Free tier includes 100,000 requests/day
- No credit card required for free tier

## Step 3: Update GitHub OAuth Callback

1. Go back to GitHub OAuth App settings
2. Update **Authorization callback URL**: `https://YOUR-WORKER.workers.dev/auth/callback`
3. Click **"Update application"**

## Step 4: Update Application Configuration

1. Open `src/store/config.js` in your project
2. Update the `workerUrl` with your actual Cloudflare Worker URL:
   ```javascript
   workerUrl: 'https://github-oauth-proxy.YOUR-USERNAME.workers.dev'
   ```
   Replace `YOUR-USERNAME` with your actual Cloudflare username

**Note:** The GitHub Client ID is already configured in the app.

## Step 5: Configure Cloudflare Environment Variables

1. In Cloudflare, go to your Worker → **"Settings"**
2. Scroll to **"Environment Variables"**
3. Add:
   - `GITHUB_CLIENT_ID`: `Ov23lidWw7sBjRZRuDof`
   - `GITHUB_CLIENT_SECRET`: `<your Client Secret>` (encrypt this!)
   - `APP_URL`: `https://freegroup.github.io/CampingElectricCalculator`
4. Click **"Save"**

## Step 6: 

1. Click **"Quick edit"**
2. Replace code with `cloudflare-worker.js` content
3. Click **"Save and Deploy"**

## Step 7: Test the OAuth Flow

### Manual Test (Quick Check)

1. Open your browser
2. Go to: `https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=https://YOUR-WORKER.workers.dev/auth/callback&scope=repo`
   - Replace `YOUR_CLIENT_ID` with your actual GitHub Client ID
   - Replace `YOUR-WORKER.workers.dev` with your actual Worker URL
3. You should be redirected to GitHub authorization page
4. Click "Authorize"
5. You should be redirected back to your app with `?token=...` in the URL
6. If you see the token in the URL, **OAuth is working!** ✅

### Test with HTML File (Better Test)

Create a test file `test-oauth.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>OAuth Test</title>
</head>
<body>
    <h1>GitHub OAuth Test</h1>
    <button onclick="login()">Login with GitHub</button>
    <div id="result"></div>
    
    <script>
        const CLIENT_ID = 'YOUR_CLIENT_ID'; // Replace with your Client ID
        const WORKER_URL = 'https://YOUR-WORKER.workers.dev'; // Replace with your Worker URL
        
        function login() {
            const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${WORKER_URL}/auth/callback&scope=repo`;
            window.location.href = authUrl;
        }
        
        // Check for token in URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        if (token) {
            document.getElementById('result').innerHTML = `
                <h2 style="color: green;">✅ Success!</h2>
                <p>Token received: ${token.substring(0, 20)}...</p>
                <p>OAuth is working correctly!</p>
            `;
        }
    </script>
</body>
</html>
```

**To test:**
1. Replace `YOUR_CLIENT_ID` and `YOUR-WORKER.workers.dev` in the HTML
2. Open the file in your browser
3. Click "Login with GitHub"
4. Authorize the app
5. You should see "✅ Success!" message

## Verification Checklist

- [ ] GitHub OAuth App created
- [ ] Cloudflare Worker created
- [ ] Environment variables set
- [ ] Worker code deployed
- [ ] Manual OAuth test successful
- [ ] Token received in URL

## Troubleshooting

**"Redirect URI mismatch"**: Check callback URL matches exactly

**"Invalid client"**: Verify CLIENT_ID and CLIENT_SECRET

**No token**: Check Worker logs in Cloudflare Dashboard

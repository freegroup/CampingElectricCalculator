// GitHub OAuth and API Helper
import config from '@/store/config.js'

const STORAGE_KEY = 'github_token'
const USER_STORAGE_KEY = 'github_user'

export default {
  /**
   * Start GitHub OAuth login flow
   */
  login() {
    // Get current full URL (origin + pathname) for redirect (supports localhost and production)
    const currentUrl = window.location.origin + window.location.pathname
    const state = encodeURIComponent(currentUrl)
    
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&redirect_uri=${config.github.workerUrl}/auth/callback&scope=${config.github.scope}&state=${state}`
    window.location.href = authUrl
  },

  /**
   * Get stored token (checks expiration)
   */
  getToken() {
    const tokenDataStr = localStorage.getItem(STORAGE_KEY)
    if (!tokenDataStr) return null

    try {
      const tokenData = JSON.parse(tokenDataStr)
      
      // Check if token is expired
      if (tokenData.expiresAt && Date.now() > tokenData.expiresAt) {
        console.log('Token expired, clearing...')
        this.logout()
        return null
      }

      return tokenData.token
    } catch (error) {
      // Old format (just string), migrate it
      console.log('Migrating old token format...')
      const token = tokenDataStr
      this.setToken(token)
      return token
    }
  },

  /**
   * Store token with expiration (GitHub tokens don't expire, but we add 30 days as safety)
   */
  setToken(token) {
    const tokenData = {
      token: token,
      expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokenData))
  },

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    return !!this.getToken()
  },

  /**
   * Get stored user data
   */
  getUser() {
    const userData = localStorage.getItem(USER_STORAGE_KEY)
    return userData ? JSON.parse(userData) : null
  },

  /**
   * Store user data
   */
  setUser(user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  },

  /**
   * Logout - clear token and user data
   */
  logout() {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
  },

  /**
   * Fetch user data from GitHub API
   */
  async fetchUser(token) {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }

      const user = await response.json()
      this.setUser(user)
      return user
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  },

  /**
   * Initialize auth - check for token in URL and fetch user data
   */
  async init() {
    // Check for token in URL (after OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (token) {
      // Store token
      this.setToken(token)

      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname)

      // Fetch user data
      await this.fetchUser(token)
      return true
    }

    // Check if already logged in
    const existingToken = this.getToken()
    if (existingToken) {
      // Verify token is still valid by fetching user
      try {
        await this.fetchUser(existingToken)
        return true
      } catch (error) {
        // Token invalid, clear it
        this.logout()
        return false
      }
    }

    return false
  },

  /**
   * Create a pull request
   */
  async createPullRequest(title, body, head, base = config.repository.defaultBranch) {
    const owner = config.repository.owner
    const repo = config.repository.repo
    const token = this.getToken()
    if (!token) {
      throw new Error('Not logged in')
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          body,
          head,
          base
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create pull request')
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating pull request:', error)
      throw error
    }
  }
}

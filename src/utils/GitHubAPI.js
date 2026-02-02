// GitHub API Helper for repository operations
import GitHubAuth from './GitHubAuth.js'
import config from '@/store/config.js'

export default {
  /**
   * Get authenticated user's username
   */
  async getUsername() {
    const user = GitHubAuth.getUser()
    if (user && user.login) {
      return user.login
    }

    // Fetch if not cached
    const token = GitHubAuth.getToken()
    if (!token) {
      throw new Error('Not logged in')
    }

    const userData = await GitHubAuth.fetchUser(token)
    return userData.login
  },

  /**
   * Fork the repository
   */
  async forkRepository() {
    const owner = config.repository.owner
    const repo = config.repository.repo
    const token = GitHubAuth.getToken()
    if (!token) {
      throw new Error('Not logged in')
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/forks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to fork repository')
      }

      return await response.json()
    } catch (error) {
      console.error('Error forking repository:', error)
      throw error
    }
  },

  /**
   * Get repository info including default branch
   */
  async getRepoInfo(owner, repo) {
    const token = GitHubAuth.getToken()
    if (!token) {
      throw new Error('Not logged in')
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to get repository info')
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting repository info:', error)
      throw error
    }
  },

  /**
   * Get the default branch SHA
   */
  async getDefaultBranchSHA(owner, repo) {
    const token = GitHubAuth.getToken()
    if (!token) {
      throw new Error('Not logged in')
    }

    const branchName = config.repository.defaultBranch
    console.log('Using configured branch:', branchName)

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branchName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to get branch SHA for ${branchName}`)
      }

      const data = await response.json()
      return data.object.sha
    } catch (error) {
      console.error('Error getting branch SHA:', error)
      throw error
    }
  },

  /**
   * Create a new branch
   */
  async createBranch(owner, repo, branchName, sha) {
    const token = GitHubAuth.getToken()
    if (!token) {
      throw new Error('Not logged in')
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: sha
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create branch')
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating branch:', error)
      throw error
    }
  },

  /**
   * Get file content and SHA
   */
  async getFileContent(owner, repo, path, branch = config.repository.defaultBranch) {
    const token = GitHubAuth.getToken()
    if (!token) {
      throw new Error('Not logged in')
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to get file content')
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting file content:', error)
      throw error
    }
  },

  /**
   * Update file content
   */
  async updateFile(owner, repo, path, content, message, branch, sha) {
    const token = GitHubAuth.getToken()
    if (!token) {
      throw new Error('Not logged in')
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          content: btoa(unescape(encodeURIComponent(content))), // Base64 encode UTF-8
          branch: branch,
          sha: sha
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update file')
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating file:', error)
      throw error
    }
  },

  /**
   * Create a pull request
   */
  async createPullRequest(owner, repo, title, body, head, base = config.repository.defaultBranch) {
    const token = GitHubAuth.getToken()
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
  },

  /**
   * Wait for fork to be ready
   */
  async waitForFork(username, repo, maxAttempts = 10) {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        console.log(`Checking if fork is ready (attempt ${i + 1}/${maxAttempts})...`)
        await this.getRepoInfo(username, repo)
        console.log('Fork is ready!')
        return true
      } catch (error) {
        if (i < maxAttempts - 1) {
          console.log('Fork not ready yet, waiting...')
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      }
    }
    throw new Error('Fork is not ready after multiple attempts. Please try again in a few moments.')
  },

  /**
   * Complete workflow: Create PR with file changes
   */
  async createComponentPR(componentType, componentData, fileContent) {
    try {
      // 1. Get username
      const username = await this.getUsername()
      console.log('Username:', username)

      // 2. Determine if user is the repo owner
      const isOwner = username === config.repository.owner
      console.log('Is repo owner:', isOwner)

      let targetOwner, targetRepo

      if (isOwner) {
        // Owner works directly on the original repo
        console.log('Working on original repository (you are the owner)')
        targetOwner = config.repository.owner
        targetRepo = config.repository.repo
      } else {
        // Non-owner needs to fork
        console.log('Checking for existing fork...')
        let forkExists = false
        try {
          const token = GitHubAuth.getToken()
          const response = await fetch(`https://api.github.com/repos/${username}/${config.repository.repo}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/vnd.github.v3+json'
            }
          })
          
          if (response.ok) {
            forkExists = true
            console.log('Fork already exists')
          }
        } catch (error) {
          console.log('Fork does not exist yet')
        }

        if (!forkExists) {
          console.log('Forking repository...')
          await this.forkRepository()
          
          // Wait for fork to be ready
          await this.waitForFork(username, config.repository.repo)
        }

        targetOwner = username
        targetRepo = config.repository.repo
      }

      // 3. Get default branch SHA
      console.log(`Getting branch SHA from ${targetOwner}/${targetRepo}...`)
      const sha = await this.getDefaultBranchSHA(targetOwner, targetRepo)

      // 4. Create new branch
      const branchName = `add-${componentType}-${componentData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
      console.log('Creating branch:', branchName)
      await this.createBranch(targetOwner, targetRepo, branchName, sha)

      // 5. Get current file to get its SHA
      const filePath = `src/store/${componentType.charAt(0).toUpperCase() + componentType.slice(1)}_data.js`
      console.log('Getting file:', filePath)
      const fileData = await this.getFileContent(targetOwner, targetRepo, filePath, branchName)

      // 6. Update file
      const commitMessage = `Add new ${componentType}: ${componentData.name}`
      console.log('Updating file...')
      await this.updateFile(
        targetOwner,
        targetRepo,
        filePath,
        fileContent,
        commitMessage,
        branchName,
        fileData.sha
      )

      // 7. Create pull request
      const prTitle = `Add new ${componentType}: ${componentData.name}`
      const prBody = `## New Component Suggestion\n\n` +
        `**Component Type:** ${componentType}\n` +
        `**Name:** ${componentData.name}\n` +
        `**Description:** ${componentData.description}\n\n` +
        `### Technical Data\n` +
        `\`\`\`json\n${JSON.stringify(componentData.data, null, 2)}\n\`\`\`\n\n` +
        `### Shopping Links\n` +
        componentData.shopping.filter(s => s.link).map(s => 
          `- [${s.label}](${s.link}) - ${s.lastKnownPrice}€ at ${s.shop}`
        ).join('\n') + '\n\n' +
        `---\n` +
        `This PR was automatically generated via the Component Suggestion Dialog.`

      console.log('Creating pull request...')
      const pr = await this.createPullRequest(
        config.repository.owner,
        config.repository.repo,
        prTitle,
        prBody,
        isOwner ? branchName : `${username}:${branchName}`,
        config.repository.defaultBranch
      )

      return pr
    } catch (error) {
      console.error('Error in createComponentPR:', error)
      throw error
    }
  }
}

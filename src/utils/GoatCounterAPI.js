/**
 * GoatCounter API Service
 * Fetches visitor statistics from GoatCounter
 */

const GOATCOUNTER_SITE = 'camping-calculator'

// PUBLIC READ-ONLY TOKEN - Safe to expose in client-side code
// This token has read-only permissions and can only fetch public statistics
// No sensitive data or write operations are possible with this token
const GOATCOUNTER_PUBLIC_READONLY_TOKEN = '1jyqqbdeaorhiy63vxt0disqjm99ofzc2fcsl232fai15jdqdi'

/**
 * Fetch total visitor count from GoatCounter
 * @returns {Promise<Object>} Visitor statistics
 */
export async function getVisitorStats() {
  try {
    const response = await fetch(
      `https://${GOATCOUNTER_SITE}.goatcounter.com/api/v0/stats/total`,
      {
        headers: {
          Authorization: `Bearer ${GOATCOUNTER_PUBLIC_READONLY_TOKEN}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(`GoatCounter API error: ${response.status}`)
    }

    const data = await response.json()
    return {
      total: data.total || 0,
      totalUnique: data.total_unique || 0
    }
  } catch (error) {
    return {
      total: 0,
      totalUnique: 0,
      error: true
    }
  }
}

/**
 * Fetch visitor count for a specific period
 * @param {string} period - 'day', 'week', 'month', or 'year'
 * @returns {Promise<Object>} Visitor statistics for the period
 */
export async function getVisitorStatsForPeriod(period = 'month') {
  try {
    const end = new Date()
    const start = new Date()

    // Calculate start date based on period
    switch (period) {
      case 'day':
        start.setDate(start.getDate() - 1)
        break
      case 'week':
        start.setDate(start.getDate() - 7)
        break
      case 'month':
        start.setMonth(start.getMonth() - 1)
        break
      case 'year':
        start.setFullYear(start.getFullYear() - 1)
        break
    }

    const startStr = start.toISOString().split('T')[0]
    const endStr = end.toISOString().split('T')[0]

    const response = await fetch(
      `https://${GOATCOUNTER_SITE}.goatcounter.com/api/v0/stats/hits?start=${startStr}&end=${endStr}`,
      {
        headers: {
          Authorization: `Bearer ${GOATCOUNTER_PUBLIC_READONLY_TOKEN}`
        }
      }
    )

    if (!response.ok) {
      throw new Error(`GoatCounter API error: ${response.status}`)
    }

    const data = await response.json()

    // Sum up the counts
    const total = data.reduce((sum, item) => sum + (item.count || 0), 0)
    const totalUnique = data.reduce((sum, item) => sum + (item.count_unique || 0), 0)

    return {
      total,
      totalUnique,
      period
    }
  } catch (error) {
    return {
      total: 0,
      totalUnique: 0,
      period,
      error: true
    }
  }
}

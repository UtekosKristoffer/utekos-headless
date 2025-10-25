'use client'

import { useState } from 'react'

export default function SyncProductsPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const syncProducts = async () => {
    setLoading(true)
    setResult(null)

    try {
      const testProducts = [
        {
          id: 'test-123',
          title: 'Test Product - Utekos Mikrofiber',
          description: 'Dette er et test-produkt for synkronisering',
          handle: 'test-product',
          image:
            'https://utekos.no/cdn/shop/files/Utekos-hjemmeside-2024-7_360x.jpg',
          availableForSale: true,
          price: '199.00'
        }
      ]

      // Send til Google Merchant Center
      const syncResponse = await fetch('/api/sync-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: testProducts })
      })

      const syncResult = await syncResponse.json()
      setResult(syncResult)
    } catch (error) {
      setResult({
        error: error instanceof Error ? error.message : 'Failed to sync'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>
        Sync Products to Google Merchant Center
      </h1>

      <button
        onClick={syncProducts}
        disabled={loading}
        className='bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:bg-gray-400'
      >
        {loading ? 'Syncing...' : 'Sync All Products'}
      </button>

      {result && (
        <div className='mt-4 p-4 bg-gray-100 rounded'>
          <h2 className='font-bold mb-2'>Result:</h2>
          <pre className='overflow-auto'>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

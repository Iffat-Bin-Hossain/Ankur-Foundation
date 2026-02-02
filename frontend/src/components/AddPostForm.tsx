'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PenTool, Check, X } from 'lucide-react'

export default function AddPostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          title: title.trim(), 
          content: content.trim(),
          published: true
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post')
      }
      
      setSuccess(true)
      setTitle('')
      setContent('')
      
      // Reset success state after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Post Title
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full"
            disabled={loading}
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            className="w-full min-h-[120px]"
            disabled={loading}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-md">
          <X className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-md">
          <Check className="w-4 h-4" />
          <span>Post created successfully!</span>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Creating Post...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <PenTool className="w-4 h-4" />
            <span>Add Post</span>
          </div>
        )}
      </Button>
    </form>
  )
}
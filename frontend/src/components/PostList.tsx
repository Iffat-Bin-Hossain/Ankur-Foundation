'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, Calendar, User, FileText } from 'lucide-react'

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

type Post = {
  id: string
  title: string
  content: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id: string) => {
    setDeletingIds(prev => new Set(prev).add(id))
    
    try {
      const response = await fetch(`/api/posts?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== id))
      } else {
        console.error('Failed to delete post')
      }
    } catch (error) {
      console.error('Failed to delete post:', error)
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No posts found</p>
        <p className="text-gray-400 text-sm">Create your first post to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {post.content}
                  </p>
                </div>
                <Badge 
                  variant={post.published ? "default" : "secondary"}
                  className="ml-4"
                >
                  {post.published ? "Published" : "Draft"}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Created {formatDate(post.createdAt)}</span>
                </div>
                {post.updatedAt !== post.createdAt && (
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>Updated {formatDate(post.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deletePost(post.id)}
              disabled={deletingIds.has(post.id)}
              className="ml-4"
            >
              {deletingIds.has(post.id) ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

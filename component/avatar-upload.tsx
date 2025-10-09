'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

interface AvatarUploadProps {
  currentAvatarUrl?: string
  onAvatarUpdate: (url: string) => void
  userId: string
}

export default function AvatarUpload({ currentAvatarUrl, onAvatarUpdate, userId }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file.')
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB.')
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/${Date.now()}.${fileExt}`

      // Create preview URL
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      if (data?.publicUrl) {
        onAvatarUpdate(data.publicUrl)
      }

    } catch (error) {
      console.error('Error uploading avatar:', error)
      alert(error instanceof Error ? error.message : 'Error uploading avatar')
    } finally {
      setUploading(false)
      // Clean up preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const displayUrl = previewUrl || currentAvatarUrl || '/logo.png'

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div 
          className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors"
          onClick={handleClick}
        >
          <Image
            src={displayUrl}
            alt="Avatar"
            width={96}
            height={96}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/logo.png'
            }}
          />
        </div>
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className="hidden"
      />
      
      <button
        onClick={handleClick}
        disabled={uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {uploading ? 'Uploading...' : 'Change Avatar'}
      </button>
      
      <p className="text-sm text-gray-500 text-center">
        Click the avatar or button to upload a new image.<br />
        Supported formats: JPG, PNG, GIF (max 5MB)
      </p>
    </div>
  )
}
'use client'

import React, { useRef, useState } from 'react'

const WebCamera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')

  // カメラを起動する関数
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraOn(true)
        setHasError(false)
      }
    } catch (err) {
      setHasError(true)
      console.error('Webカメラの取得に失敗しました: ', err)
    }
  }

  // カメラを停止する関数
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsCameraOn(false)
    }
  }

  // カメラの切り替え
  const toggleCamera = async () => {
    stopCamera()
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'))
    await startCamera()
  }

  return (
    <div className='flex flex-col items-center'>
      {hasError ? (
        <p className='text-red-500'>Webカメラの取得に失敗しました。</p>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={`rounded-lg border-4 border-gray-300 ${
            isCameraOn ? 'block' : 'hidden'
          }`}
        />
      )}
      <div className='mt-4 flex space-x-4'>
        <button
          onClick={startCamera}
          disabled={isCameraOn}
          className={`px-4 py-2 rounded-lg text-white ${
            isCameraOn
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700'
          }`}
        >
          Webカメラを起動
        </button>
        <button
          onClick={stopCamera}
          disabled={!isCameraOn}
          className={`px-4 py-2 rounded-lg text-white ${
            isCameraOn
              ? 'bg-red-500 hover:bg-red-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Webカメラを停止
        </button>
        <button
          onClick={toggleCamera}
          disabled={!isCameraOn}
          className={`px-4 py-2 rounded-lg text-white ${
            isCameraOn
              ? 'bg-green-500 hover:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          カメラ切替
        </button>
      </div>
    </div>
  )
}

export default WebCamera

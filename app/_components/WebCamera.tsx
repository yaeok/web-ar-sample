'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'

const WebCamera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

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

  // 撮影機能
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      if (context) {
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
        setCapturedImage(canvas.toDataURL('image/png'))
      }
    }
  }

  return (
    <div className='flex flex-col items-center'>
      {hasError ? (
        <p className='text-red-500'>Webカメラの取得に失敗しました。</p>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={`rounded-lg border-4 border-gray-300 ${
              isCameraOn ? 'block' : 'hidden'
            }`}
          />
          <canvas ref={canvasRef} className='hidden'></canvas>
        </>
      )}
      {capturedImage && (
        <Image
          src={capturedImage}
          alt='Captured'
          className='mt-4 rounded-lg border-4 border-gray-300'
          width={640}
          height={480}
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
        <button
          onClick={captureImage}
          disabled={!isCameraOn}
          className={`px-4 py-2 rounded-lg text-white ${
            isCameraOn
              ? 'bg-yellow-500 hover:bg-yellow-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          撮影
        </button>
      </div>
    </div>
  )
}

export default WebCamera

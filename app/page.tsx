// pages/index.tsx
import type { NextPage } from 'next'
import WebCamera from './_components/WebCamera';

const Home: NextPage = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-xl w-full'>
        <h1 className='text-2xl font-semibold text-center mb-4'>
          Webカメラの起動
        </h1>
        <WebCamera />
      </div>
    </div>
  )
}

export default Home

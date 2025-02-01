import { IconContext } from 'react-icons'
import { RiCloseCircleFill } from 'react-icons/ri'
import Image from 'next/image'

type ImageModalProps = {
  isOpen: boolean
  onClose: () => void
  capturedImage: string
}

const ImageModal = ({ isOpen, onClose, capturedImage }: ImageModalProps) => {
  if (isOpen) {
    return (
      <div className='fixed inset-0 max-h-screen z-50'>
        <div className='fixed inset-0 bg-black opacity-50 filter grayscale' />
        <div className='h-screen flex items-center justify-center'>
          <div className='relative p-4 mx-2 bg-white flex flex-col gap-4 rounded-lg shadow-lg w-full md:w-2/5'>
            <div className='w-full flex flex-row justify-between items-center'>
              <h1 className='text-xl font-semibold text-black border-b-2 border-blue-500'>
                撮影した画像
              </h1>
              <button onClick={onClose}>
                <IconContext.Provider value={{ size: '2em', color: 'black' }}>
                  <RiCloseCircleFill />
                </IconContext.Provider>
              </button>
            </div>
            <Image
              src={capturedImage}
              alt='Captured'
              className='mt-4 rounded-lg border-4 border-gray-300'
              width={640}
              height={480}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default ImageModal

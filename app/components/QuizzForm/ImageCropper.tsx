import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { BiCrop } from 'react-icons/bi';
import { MdRefresh } from 'react-icons/md';
import { getCroppedImg } from '@/utils/cropImage';

interface ImageCropperProps {
  imageSrc: string | null;
  onCropComplete: (croppedImage: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onCropComplete }) => {

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleCropComplete = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImg);
      onCropComplete(croppedImg);
      
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  }

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedImage(null);
  };

  const onCropChange = (newCrop: { x: number; y: number }) => setCrop(newCrop);
  const onZoomChange = (newZoom: number) => setZoom(newZoom);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {imageSrc && (
        <div className="relative w-full max-w-md h-80 bg-gray-100 mb-6 rounded-md overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="rect"
            showGrid={false}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
          />

          {/* Boutons d'action */}
          <div className="absolute top-4 right-4 flex space-x-3">
            <button
              onClick={handleCropComplete}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-lg"
              title="Crop Image"
            >
              <BiCrop className="text-xl" />
            </button>
            <button
              onClick={handleReset}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              title="Reset Image"
            >
              <MdRefresh className="text-xl" />
            </button>
          </div>
        </div>
      )}

      {croppedImage && (
        <div className="mt-6">
          <p className="text-center font-semibold mb-4">Cropped Image:</p>
          <div className="w-full max-w-xs mx-auto">
            <img
              src={croppedImage}
              alt="Cropped"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;

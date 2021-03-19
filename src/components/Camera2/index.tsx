import React from 'react';
import * as DomCamera from 'react-dom-camera';
import { ICameraProps } from './models';
import { TakePhotoButton } from './components';
import './camera.css';

export const Camera: React.FC<ICameraProps> = (props) => {

     const blobToBase64 = async (blob: Blob) => {
          return new Promise((resolve, _) => {
               const reader = new FileReader();
               reader.onloadend = () => resolve(reader.result);
               reader.readAsDataURL(blob);
          });
     }

     const onTakePhoto = async (image: string) => {
          try {
               const aux = await fetch(image);
               const imageBlob = await aux.blob();
               const base64Image = await blobToBase64(imageBlob);
               console.log(base64Image, 'do whatever you want with the image');
          }
          catch (e) {
               console.error(e);
               alert("Ha ocurrido un error al tomar la foto.");
          }
     };

     return (
          <div className="camera-container">
               <DomCamera
                    facingMode="USER"
                    captureButtonRenderer={(onClick: Function) => <TakePhotoButton onClick={onClick} />}
                    onTakePhoto={onTakePhoto}
               />
          </div>)
};

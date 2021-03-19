import React from 'react';
import * as RCamera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import DeviceOrientation, { Orientation } from 'react-screen-orientation';

import {
     MobileView,
     BrowserView
} from "react-device-detect";
import "./camera.css";


export enum FacingMode {
     ENV = "environment",
     USER = "user",
}

export const Camera = (props) => {
     const [facingMode, setFacingMode] = React.useState<FacingMode>(FacingMode.USER);
     const handleTakePhoto = (dataUri) => {
          // Do stuff with the photo...
          console.log('takePhoto', dataUri);
     }

     return (
          <React.Fragment>
               <BrowserView>
                    <div className="main-camera">
                         <RCamera.Camera
                              imageType={"jpg"}
                              isImageMirror={false}
                              idealFacingMode={facingMode}
                              onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                         />
                    </div>
               </BrowserView>

               <MobileView >
                    <DeviceOrientation lockOrientation={'landscape'}>
                         {/* Will only be in DOM in landscape */}
                         <Orientation orientation='landscape' alwaysRender={false}>
                              <div>
                                   <p>Please rotate your device</p>
                              </div>
                         </Orientation>
                         {/* Will stay in DOM, but is only visible in portrait */}
                         <Orientation orientation='portrait' alwaysRender={false}>
                              <div className="main-camera">
                                   <RCamera.Camera
                                        imageType={"jpg"}
                                        isImageMirror={false}
                                        idealFacingMode={facingMode}
                                        onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                                   />

                                   <div className="swap-camera">
                                        <img
                                             onClick={() => setFacingMode(facingMode === FacingMode.ENV ? FacingMode.USER : FacingMode.ENV)}
                                             width={30}
                                             height={30}
                                             src={`${process.env.PUBLIC_URL}/SwapCamera.svg`}
                                             alt="Swap camera"
                                             title="Swap camera"
                                        />
                                   </div>

                              </div>
                         </Orientation>
                    </DeviceOrientation>
               </MobileView>
          </React.Fragment>
     );
}

import React from 'react';
import { Icon, Button } from 'rsuite';
import { ITakePhotoButtonProps } from './models';
import 'rsuite/dist/styles/rsuite-default.css';

export const TakePhotoButton: React.FC<ITakePhotoButtonProps> = (props) => {
     const { onClick } = props;
     return (
          <React.Fragment>
               {/* <IconButton
                    size={"lg"}
                    onClick={() => onClick()}
                    icon={<Icon icon='camera-retro' size="lg" />}
                    color="red"
                    circle
               /> */}
               <Button onClick={() => onClick()} style={{ fontSize: 20 }} color="red" >
                    <Icon icon='camera-retro' size="lg" /> Tomar foto
                    </Button>
          </React.Fragment>
     );
}

export default TakePhotoButton;

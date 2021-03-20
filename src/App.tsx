import React from 'react';
import { IAppProps, IResultData } from './models';
import { Camera } from './components';
import { Icon } from 'rsuite';
import { Message } from 'rsuite';
import { Table } from 'rsuite';
import { ENDPOINTS } from './utils';

import 'rsuite/dist/styles/rsuite-default.css';
import './App.css';

const App: React.FC<IAppProps> = (props) => {

     const [processing, setProcessing] = React.useState<boolean>(false);
     const [processResult, setProcessResult] = React.useState<Array<IResultData>>([]);

     const onTakePhoto = async (image: string) => {
          setProcessing(true);

          console.log("imagen", image);

          try {
               // TODO fetch API http://localhost:8081/v1/predict
               const responsePromise = await fetch(ENDPOINTS.PREDICTION_API, {
                    headers: {
                         "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                         image: image
                    })
               });
               const response: Array<IResultData> = await responsePromise.json();
               console.log(response);
               setProcessResult(response);
          }
          catch (e) {
               console.error(e);
               alert(JSON.stringify(e));
          }


          setProcessing(false);
     };

     return (
          <div>
               <div className="main-header">
                    <div className="header-option">
                         <img
                              alt="Logo"
                              title="Logo"
                              width={60}
                              height={60}
                              src={"https://www.ucm.es/data/cont/docs/3-2016-07-21-EscudoUCMTransparenteBig.png"}
                         />
                    </div>
                    <div className="header-option active">
                         Classify
                    </div>
                    <div className="header-option">
                         Records
                    </div>
               </div>

               <div className="center-container">
                    <Camera
                         onTakePhoto={onTakePhoto}
                    />
               </div>

               {processing && <div className="center-container">
                    <Message
                         className="result-message"
                         type="success"
                         description={<div className="classifying-message"> <Icon size="lg" icon="spinner" spin /> <p>Classifying ...</p> </div>}
                    />
               </div>}

               <div className="results-table-main">
                    <div className="results-table">
                         <Table
                              height={200}
                              width={400}
                              virtualized
                              autoHeight
                              data={processResult}
                         >

                              <Table.Column width={200} fixed>
                                   <Table.HeaderCell>Class</Table.HeaderCell>
                                   <Table.Cell dataKey="class" />
                              </Table.Column>

                              <Table.Column width={200}>
                                   <Table.HeaderCell>Probabilities </Table.HeaderCell>
                                   <Table.Cell dataKey="probability" />
                              </Table.Column>
                         </Table>
                    </div>
               </div>
          </div >)
};

export default App;

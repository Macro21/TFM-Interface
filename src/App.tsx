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
     const bodyRef = React.useRef<any>();

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
               //console.log(response);
               setProcessResult(response);
          }
          catch (e) {
               console.error(e);
               //setProcessResult([{ "class": "Carton", "probability": "80%" }, { "class": "Metal", "probability": "20%" }])
          }
          setProcessing(false);
     };

     React.useEffect(() => {
          if (!processing) {
               console.log(bodyRef.current.tableBodyRef.current.childNodes[0].childNodes)
               const items: Array<any> = bodyRef.current.tableBodyRef.current.childNodes[0].childNodes;
               console.log(items);
               let max = 0;
               let currentVal = 0;
               let aux;
               let maxIndex = 0;

               for (let i = 0; i < items.length; i++) {
                    aux = items[i] as HTMLDivElement;
                    const aux1 = ((((aux as HTMLDivElement).childNodes[0]) as HTMLDivElement));
                    const aux2 = ((((aux as HTMLDivElement).childNodes[0]) as HTMLDivElement));
                    if (aux1 && aux2) {
                         (aux1.childNodes[0] as HTMLDivElement).style.backgroundColor = "inherit";
                         (aux2.childNodes[1] as HTMLDivElement).style.backgroundColor = "inherit";
                    }
                    currentVal = Number(aux.innerText.slice(aux.innerText.indexOf('\n'), aux.innerText.indexOf('%')));
                    if (currentVal > max) {
                         max = currentVal;
                         maxIndex = i;
                    }
               }
               if (items && items.length > 0) {
                    const aux1 = ((((items[maxIndex] as HTMLDivElement).childNodes[0]) as HTMLDivElement));
                    const aux2 = ((((items[maxIndex] as HTMLDivElement).childNodes[0]) as HTMLDivElement));
                    if (aux1 && aux2) {
                         (aux1.childNodes[0] as HTMLDivElement).style.backgroundColor = "springgreen";
                         (aux2.childNodes[1] as HTMLDivElement).style.backgroundColor = "springgreen";
                    }
               }
          }
     }, [processing]);

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
                    <div className="header-option">
                         Prediction accuracy
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
                              ref={bodyRef}
                              style={{ color: 'black' }}
                              bordered
                         >

                              <Table.Column width={200} fixed>
                                   <Table.HeaderCell style={{ fontSize: 16 }}>Class</Table.HeaderCell>
                                   <Table.Cell dataKey="class" />
                              </Table.Column>

                              <Table.Column width={200}>
                                   <Table.HeaderCell style={{ fontSize: 16 }}>Probabilities </Table.HeaderCell>
                                   <Table.Cell className="winner" dataKey="probability" />
                              </Table.Column>
                         </Table>
                    </div>
               </div>
          </div >)
};

export default App;

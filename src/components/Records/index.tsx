import React from 'react';
import { IRecordsProps } from './models';
import { Table } from 'rsuite';
import './records.css';
import { ENDPOINTS } from '../../utils';
import { IResultData } from '../../models';

export interface IItem {
     image: string;
     result: Array<IResultData>;
}

export const Records: React.FC<IRecordsProps> = (props) => {
     const [items, setItems] = React.useState<Array<IItem>>([]);
     const bodyRef = React.useRef<any>();

     React.useEffect(() => {
          fetch(`${ENDPOINTS.PREDICTION_API}?records=1`, {
               method: 'GET',
               headers: {
                    'Accept': 'application/json'
               }
          }).then(async (response) => {
               const data: Array<any> = await response.json();
               const newItems: Array<IItem> = [];
               data.forEach((d) => {
                    newItems.push({
                         image: d.image,
                         result: JSON.parse(d.result.result)
                    });
               });
               setItems(newItems);
          }).catch(console.error)
     }, []);


     React.useEffect(() => {
          setTimeout(() => {
               if (items && items.length > 0) {
                    let currentTable;
                    for (let i = 0; i < items.length; i++) {
                         currentTable = document.getElementById('Table' + i) as HTMLDivElement;
                         console.log(currentTable);
                         const items: any = ((currentTable.childNodes[1] as HTMLDivElement).childNodes[0] as HTMLDivElement).childNodes;
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
               }
          }, 500);
     }, [items]);

     return (
          <div className="main-records">
               <div className="row">
                    {items.map((item, i) => {
                         return (
                              <div className="col">
                                   <img
                                        width={224}
                                        height={224}
                                        src={item.image}
                                        alt="test"
                                   />
                                   <div className="table">
                                        <Table
                                             height={224}
                                             width={224}
                                             virtualized
                                             autoHeight
                                             data={item.result}
                                             ref={bodyRef}
                                             id={"Table" + i}
                                             style={{ color: 'black' }}
                                             bordered
                                        >

                                             <Table.Column width={112} fixed>
                                                  <Table.HeaderCell style={{ fontSize: 16 }}>Class</Table.HeaderCell>
                                                  <Table.Cell dataKey="class" />
                                             </Table.Column>

                                             <Table.Column width={112}>
                                                  <Table.HeaderCell style={{ fontSize: 16 }}>Probabilities </Table.HeaderCell>
                                                  <Table.Cell className="winner" dataKey="probability" >

                                                  </Table.Cell>
                                             </Table.Column>
                                        </Table>
                                   </div>
                              </div>
                         );
                    })}
               </div>
          </div>
     );
}

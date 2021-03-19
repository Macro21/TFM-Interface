import React from 'react';
import { IAppProps } from './models';
import { Camera } from './components';
import { Nav, Icon } from 'rsuite';
import { Navbar } from 'rsuite';
import { Message } from 'rsuite';
import { Table } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import './App.css';

const App: React.FC<IAppProps> = (props) => {

     return (
          <div>
               <Navbar className="header">
                    <Navbar.Header>
                         <div className="logo">
                              <img
                                   alt="Logo"
                                   title="Logo"
                                   width={45}
                                   height={45}
                                   src={"https://www.ucm.es/data/cont/docs/3-2016-07-21-EscudoUCMTransparenteBig.png"}
                              />
                         </div>

                         {/* <a href="#" className="navbar-brand logo">RSUITE</a> */}
                    </Navbar.Header>
                    <Navbar.Body>
                         <Nav>
                              <Nav.Item active icon={<Icon icon="home" />} >Classify</Nav.Item>
                              <Nav.Item>Records</Nav.Item>
                              {/* <Dropdown title="About">
                                   <Dropdown.Item>Project</Dropdown.Item>
                                   <Dropdown.Item>Contact</Dropdown.Item>
                              </Dropdown> */}
                         </Nav>
                         {/* <Nav pullRight>
                                   <Nav.Item icon={<Icon icon="cog" />} >Settings</Nav.Item>
                              </Nav> */}
                    </Navbar.Body>
               </Navbar>
               <div className="center-container">
                    <Camera />
               </div>

               <div className="center-container">
                    <Message
                         className="result-message"
                         type="success"
                         description={<div className="classifying-message"> <Icon size="lg" icon="spinner" spin /> <p>Classifying ...</p> </div>}
                    />
               </div>

               <div className="results-table-main">
                    <div className="results-table">
                         <Table
                              height={200}
                              width={400}
                              virtualized
                              autoHeight
                              data={[{
                                   "class": "Metal",
                                   "probabilities": "80%",
                              }]}
                              onRowClick={data => {
                                   console.log(data);
                              }}
                         >
                              {/* <Table.Column width={70} align="center" fixed>
                                   <Table.HeaderCell>Id</Table.HeaderCell>
                                   <Table.Cell dataKey="id" />
                              </Table.Column> */}

                              <Table.Column width={200} fixed>
                                   <Table.HeaderCell>Class</Table.HeaderCell>
                                   <Table.Cell dataKey="class" />
                              </Table.Column>

                              <Table.Column width={200}>
                                   <Table.HeaderCell>Probabilities </Table.HeaderCell>
                                   <Table.Cell dataKey="probabilities" />
                              </Table.Column>
                         </Table>
                    </div>
               </div>
          </div >)
};

export default App;

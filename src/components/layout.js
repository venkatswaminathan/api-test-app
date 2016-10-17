import React, { Component } from 'react';
//import Modal  from 'react-bootstrap/lib/Modal';
import Tab from 'react-bootstrap/lib/Tab';
import Row from 'react-bootstrap/lib/Row';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
//import Button  from 'react-bootstrap';
import Specialties from './specialties';
import Coordinates from './coordinates';

let host = location.hostname;
let port = location.port;
let protocol = location.protocol;
let sourceUrl = `${protocol}\\${host}:${port}`;
class Layout extends Component {  
    constructor (props) {           
      super(props);
      this.state={
        open: false
      };
    }
    render(){
        return(
            <div>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className="clearfix">
                        <Col sm={2}>
                            <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first">
                                Home
                            </NavItem>                            
                            <NavItem eventKey="second">
                                Specialties
                            </NavItem>
                            <NavItem eventKey="third">
                                Zips
                            </NavItem>
                            <NavItem eventKey="fourth">
                                practitioners/locations
                            </NavItem>
                            <NavItem eventKey="fifth">
                                organizations/locations
                            </NavItem>
                            <NavItem eventKey="sixth">
                                Networks
                            </NavItem>
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content animation>
                            <Tab.Pane eventKey="first">
                                  <Well bsSize="large"><p><strong>Welcome to api testing!!!</strong></p>
                                  <ul>
                                    <li>This tool lets you test / play around with the set of GPD platform hosted api's.</li> 
                                    <li>click on the tabs to test each of the api.</li>
                                    <li>Given below is little tool which lets you find the coordinates for a given address or just zip </li>
                                  </ul>
                                  </Well>
                                  <div>
                                    <Coordinates className="App-entry" Source=""/>
                                  </div>
                            </Tab.Pane>                            
                            <Tab.Pane eventKey="second">
                                <Specialties className="App-entry" Source=""/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                Zips Api Content
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                Practitioners/ practitioner-locations Api Content
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">
                                Organizations/ organizations-locations Api Content
                            </Tab.Pane>
                            <Tab.Pane eventKey="sixth">
                                Networks Api
                            </Tab.Pane>
                            </Tab.Content>
                        </Col>
                        </Row>
                    </Tab.Container>
                </div>
        );
    }
}
export default Layout;
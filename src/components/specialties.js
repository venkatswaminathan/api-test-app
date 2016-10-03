import React, { Component } from 'react';
import Button  from 'react-bootstrap/lib/Button';
import Modal  from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Table from 'react-bootstrap/lib/Table';
import Collapse from 'react-bootstrap/lib/Collapse';
import Pagination from 'react-bootstrap/lib/Pagination';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Alert from 'react-bootstrap/lib/Alert';
import Label from 'react-bootstrap/lib/Label';
import axios from 'axios';
import _ from 'lodash';
axios.defaults.timeout = 500;

const collapseUpText="glyphicon glyphicon-menu-up";
const collapseDownText="glyphicon glyphicon-menu-down";
const sortedTextAscending = "glyphicon glyphicon-sort-by-alphabet";
const sortedTextDescending = "glyphicon glyphicon-sort-by-alphabet-alt";
const sortableText="glyphicon glyphicon-sort";

class Specialties extends Component {  
    constructor (props) {           
      super(props);
      this.state={
        open: false,
        alertVisible: false,
        collapseVisible: true,
        collapseGlyph: collapseUpText,
        codesortableGlyph: sortableText,
        textsortableGlyph: sortableText,
        groupingsortableGlyph:sortableText,
        classificationsortableGlyph:sortableText,
        specializationsortableGlyph:sortableText,
        activePage: 1,
        pageLimit:5,
        specialtyData: [],
        sortColumn:"code",
        dataCount:0,
        totalCount:0,
        dataUrl: this.props.Source,
        text:"",
        code:"",
        grouping:"",
        classification:"",
        specialization:"",
        apiUrl:"",
        onSortParams:""
      };
      //const specialtyUrl= this.props.Source;
      console.log(this.state.dataUrl);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      console.log(this.state.codeSortColDesc);      
    }

    openModal () { console.log('msg'); this.setState({open: true}); }

    closeModal () { this.setState({open: false}); }

    openSearchScreen(){
      this.openModal();
    }

    searchResults(e){
      let offset;   
      console.log(typeof e);
      if(e !== undefined){
        if(typeof e !== 'object'){
          console.log('inside page offset');
          offset = (e-1)*this.state.pageLimit;
        }     
        else{
          offset = 0;
        }
      }
      console.log('page offset '+ offset);
      let serverParams="?";
      if(this.state.text!==""){
        serverParams = serverParams.endsWith("?") ? serverParams.concat("text="+this.state.text):serverParams.concat("&text="+this.state.text); 
      }
      if(this.state.code!==""){
        console.log(this.state.code.split(","));
        let textValues=this.state.code.split(",").join("&code=");
        console.log(textValues);        
        serverParams = serverParams.endsWith("?") ? serverParams.concat("code=",textValues):serverParams.concat("&code=",textValues); 
      }
      if(this.state.grouping!==""){
        serverParams = serverParams.endsWith("?") ? serverParams.concat("grouping="+this.state.grouping):serverParams.concat("&grouping="+this.state.grouping); 
      }
      if(this.state.classification!==""){
        serverParams = serverParams.endsWith("?") ? serverParams.concat("classification="+this.state.classification):serverParams.concat("&classification="+this.state.classification); 
      }
      if(this.state.specialization!==""){
        serverParams = serverParams.endsWith("?") ? serverParams.concat("specialization="+this.state.specialization):serverParams.concat("&specialization="+this.state.specialization); 
      }
      console.log('inside results click');
      this.getServerData(serverParams,offset,this.state.pageLimit,this.state.sortColumn);
    }
    getServerData(params,offset,limit,sortCol){
      let callParams = params;
      let serverParams = params.concat("&includeCount=true&offset="+offset+"&limit="+limit+"&sort="+sortCol);
      let callableUrl=this.state.dataUrl+"/specialties"+serverParams;
      console.log(callableUrl);
      this.serverRequest = axios.get(callableUrl)
        .then(result =>{
          console.log('inside result return');            
          console.log('data length: '+ result.data.length);
          console.log('total count', result);
          this.setState({
              specialtyData: result.data,
              dataCount: result.data.length,
              totalCount: _.get(result.headers,"x-total-count"),
              apiUrl: callableUrl,
              onSortParams: callParams
            });
          console.log(this.state.totalCount);
          console.log(this.state.specialtyData);                  
        })
        .catch(res =>{
          if(res instanceof Error) {
            console.log(res.message);
          } else {
            console.log(res.data);
          }
          this.setState({
            specialtyData: [],
            apiUrl: callableUrl,
            onSortParams: callParams            
          });
        });
    }
    specialtyTextOnChange (e){
      this.setState(
        { text: e.target.value }
      );
    }
    codeOnChange (e){
      this.setState(
        { code: e.target.value }
      );
    }
    classificationOnChange (e){
      this.setState(
        { classification: e.target.value }
      );
    }
    groupingOnChange (e){
      this.setState(
        { grouping: e.target.value }
      );
    }
    specializationOnChange(e){
      this.setState(
        { specialization: e.target.value }
      );
    }
    handleAlertDismiss(){
      this.setState({alertVisible: false});
    }
    collapseChange(e){
      this.setState({ 
        collapseVisible: !this.state.collapseVisible,
        collapseGlyph: this.state.collapseVisible?collapseDownText: collapseUpText });
    }
    handleSelect(eventKey) {
      console.log(eventKey);      
      this.setState({
        activePage: eventKey
      });
      this.searchResults(eventKey);
    }    
    sortOnClick(eventKey){
      let sortCol = eventKey.target.id;
      let sortDirection = "";
      switch (eventKey.target.id){
        case 'code':
          sortDirection =  this.state.codesortableGlyph === sortedTextAscending? "-":"";
          this.setState({
            codesortableGlyph: this.state.codesortableGlyph === sortedTextAscending? sortedTextDescending: sortedTextAscending,
            textsortableGlyph: sortableText,
            groupingsortableGlyph: sortableText,
            classificationsortableGlyph: sortableText,
            specializationsortableGlyph: sortableText
          });
        break;
        case 'text':
        sortDirection =  this.state.textsortableGlyph === sortedTextAscending? "-":"";
          this.setState({
            codesortableGlyph: sortableText,
            textsortableGlyph: this.state.textsortableGlyph === sortedTextAscending? sortedTextDescending: sortedTextAscending,
            groupingsortableGlyph: sortableText,
            classificationsortableGlyph: sortableText,
            specializationsortableGlyph: sortableText            
          });            
          break;
        case 'grouping':
        sortDirection =  this.state.groupingsortableGlyph === sortedTextAscending? "-":"";
          this.setState({
            codesortableGlyph: sortableText,
            textsortableGlyph: sortableText,
            groupingsortableGlyph: this.state.groupingsortableGlyph === sortedTextAscending? sortedTextDescending: sortedTextAscending,
            classificationsortableGlyph: sortableText,
            specializationsortableGlyph: sortableText            
          });        
        break;
        case 'classification':
        sortDirection =  this.state.classificationsortableGlyph === sortedTextAscending? "-":"";
          this.setState({
            codesortableGlyph: sortableText,
            textsortableGlyph: sortableText,
            groupingsortableGlyph: sortableText,
            classificationsortableGlyph: this.state.classificationsortableGlyph === sortedTextAscending? sortedTextDescending: sortedTextAscending,
            specializationsortableGlyph: sortableText            
          });        
        break;
        case 'specialization':
        sortDirection =  this.state.specializationsortableGlyph === sortedTextAscending? "-":"";
          this.setState({
            codesortableGlyph: sortableText,
            textsortableGlyph: sortableText,
            groupingsortableGlyph: sortableText,
            classificationsortableGlyph: sortableText,
            specializationsortableGlyph: this.state.specializationsortableGlyph === sortedTextAscending? sortedTextDescending: sortedTextAscending            
          });        
        break;        
      }
      sortCol = sortDirection+sortCol;
      this.getServerData(this.state.onSortParams,0,this.state.pageLimit,sortCol);
    }

  render() {
    let tooltip = <Tooltip id="tooltip">Collapse/Hide search results pane!</Tooltip>;
    return (
      <div>
          <div className="glyphButton">            
            <OverlayTrigger placement="bottom" overlay={tooltip}>
              <Button onClick={this.collapseChange.bind(this)}> 
                <Glyphicon glyph={this.state.collapseGlyph} />
              </Button>
            </OverlayTrigger>
          </div>      
        <div>
        <Collapse in={this.state.collapseVisible}>
          <div>        
              <Form inline>
                <FormGroup controlId="formInlineText">
                  <ControlLabel>Text</ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder="Text" bsSize="small" onBlur={this.specialtyTextOnChange.bind(this)}/>
                </FormGroup>
                {' '}
                <FormGroup controlId="formInlineCode">
                  <ControlLabel>Code</ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder="Code" bsSize="small" onBlur={this.codeOnChange.bind(this)}/>
                </FormGroup>
                {' '}
                <FormGroup controlId="formInlineGrouping">
                  <ControlLabel>Grouping</ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder="Grouping" bsSize="small" onBlur={this.groupingOnChange.bind(this)}/>
                </FormGroup>
                {' '}            
                </Form>
                <br/>
                <Form inline>
                <FormGroup controlId="formInlineClassification">
                  <ControlLabel>Classification</ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder="Classification" bsSize="small" onBlur={this.classificationOnChange.bind(this)}/>
                </FormGroup>
                {' '}                        
                <FormGroup controlId="formInlineSpecialization">
                  <ControlLabel>Specialization</ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder="Specialization" bsSize="small" onBlur={this.specializationOnChange.bind(this)}/>
                </FormGroup>
                {' '}
                <Button onClick={this.searchResults.bind(this)} value="0" bsStyle="primary">
                  Search Results
                </Button>
              </Form>
            </div>
          </Collapse>            
        </div>
      <br/>
      <div id="table-container">
         <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th id="hashcol"/>
                <th id="idCol">_id</th>
                <th>Code <Button bsStyle="link" onClick={this.sortOnClick.bind(this)}><Glyphicon glyph={this.state.codesortableGlyph} id="code"/></Button></th>
                <th>Text <Button bsStyle="link" onClick={this.sortOnClick.bind(this)}><Glyphicon glyph={this.state.textsortableGlyph} id="text"/></Button></th>
                <th>Grouping <Button bsStyle="link" onClick={this.sortOnClick.bind(this)} value="grouping"><Glyphicon glyph={this.state.groupingsortableGlyph} id="grouping"/></Button></th>                
                <th>Classification <Button bsStyle="link" onClick={this.sortOnClick.bind(this)} value="classification"><Glyphicon glyph={this.state.classificationsortableGlyph} id="classification"/></Button></th>
                <th>Specialization <Button bsStyle="link" onClick={this.sortOnClick.bind(this)} value="specialization"><Glyphicon glyph={this.state.specializationsortableGlyph} id="specialization"/></Button></th>
                <th id="systemCol">System</th>
              </tr>
            </thead>
            <tbody>
                {
                  this.state.specialtyData.map((specialty, idx) =>                   
                    <tr key={idx}>
                      <td id="hashcol">{idx+1}</td>
                      <td className='right aligned'>{specialty._id}</td>
                      <td>{specialty.code}</td>
                      <td>{specialty.text}</td>
                      <td>{specialty.grouping}</td>
                      <td>{specialty.classification}</td>
                      <td>{specialty.specialization}</td>
                      <td className='right aligned'>{specialty.system}</td>
                    </tr>
                  )
                }
          </tbody>
          {this.state.dataCount >= 1 ?
              <tfoot>
                    <tr>
                        <td colSpan="8">
                          <div>
                            <Pagination bsSize="small" prev next first last ellipsis boundaryLinks items={this.state.totalCount>5?Math.ceil(this.state.totalCount/5):0} maxButtons={5} activePage={this.state.activePage} onSelect={this.handleSelect.bind(this)}/>
                          </div>
                        </td>                          
                    </tr>                                        
              </tfoot>: null}
        </Table>
            <Alert bsStyle="success"> Api call: <br/> <p><strong>{this.state.apiUrl}</strong></p></Alert>
        </div>
      </div>);
  }
}

export default Specialties; // Don’t forget to use export default!
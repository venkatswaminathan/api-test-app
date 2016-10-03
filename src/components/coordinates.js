import React,{ Component } from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Alert from 'react-bootstrap/lib/Alert';
import Button  from 'react-bootstrap/lib/Button';
import axios from 'axios';
import _ from 'lodash';

class Coordinates extends Component
{
    constructor (props) {           
      super(props);
      this.state={
          dataUrl: this.props.Source,
          address: "",
          resultData:[]
      };
    }
    addressOnChange (e){
      this.setState(
        { address: e.target.value }
      );
    }
    searchResults (){
      let serverParams = this.state.address;
      let callableUrl=this.state.dataUrl+"/coordinates?address="+serverParams;
      this.serverRequest = axios.get(callableUrl)
        .then(result =>{
          this.setState({
              resultData: result.data,
              apiUrl: callableUrl
            });
          console.log(this.state.resultData);                
        })
        .catch(function(res) {
          if(res instanceof Error) {
            console.log(res.message);
          } else {
            console.log(res.data);
          }
        });
    }
    render(){
        return(
            <div>
              <Form inline>
                    <FormGroup controlId="formInlineAddress">
                    <ControlLabel>Address Or Zip : </ControlLabel>
                    {' '}
                    <FormControl type="text" placeholder="AddressOrzip" bsSize="small" onBlur={this.addressOnChange.bind(this)}/>
                    </FormGroup>
                    {' '}
                    <Button onClick={this.searchResults.bind(this)} value="0" bsStyle="primary">
                    Get Coordinates
                    </Button>
                </Form>
                <br/>
                { this.state.resultData.length !== 0?
                <div>
                    <Alert bsStyle="info"> Coordinates: <p><strong>{this.state.resultData.toString()}</strong></p></Alert>                  
                </div>: null}
                <div>
                    <Alert bsStyle="success"> Api call: <br/> <p><strong>{this.state.apiUrl}</strong></p></Alert>
                </div>                           

            </div>
        );
    }
}
export default Coordinates;
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Form, FormGroup, Input, Button, Label} from "reactstrap"
import axios from 'axios'


class App extends Component{ 
constructor () {
  super()
  this.state = {
    name: '',
    email: '',
    message: ''
  }
  this.hanleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange = e => {
  this.setState({[e.target.name]:e.target.value } );
}

async handleSubmit(e) {
  e.preventDefault();
  const {name, email, message} = this.state;
  const form = await axios.post('api/form', {
    name: String,
    email: String,
    message: String
  })
}

   render () {return (
        <Form method="POST" action="/contact" style ={{width: '600px'}}>
           <FormGroup>
             <Label for ="name">Name: </Label>
             <Input 
                type ="text"
                name = "name"
                onChange = {this.hanleChange} />
          </FormGroup>
          <FormGroup>
             <Label for ="email">Email: </Label>
             <Input 
                type ="email"
                name = "email"
                onChange = {this.hanleChange} />
          </FormGroup>
          <FormGroup>
             <Label for ="message">message: </Label>
             <Input 
                type ="textarea"
                name = "message"
                onChange = {this.hanleChange} />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
   );
}  
}
export default App;

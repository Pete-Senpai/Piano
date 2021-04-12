import React from 'react';
import { notes } from './notes';
  interface MyProps {
    
  }

  interface MyState {
    keys: Array<string>;
  }

export class ShowNote extends React.Component<MyProps, MyState> {
  constructor(props: string){
    super(props);
    this.state = {keys: []};
  }
  
  handleKeyDown = (key: any) => {
    console.log(notes[key]);
    let alreadyExists = this.state.keys.some(x => x === notes[key]);
    if(!alreadyExists) {
      this.setState({keys: [...this.state.keys, notes[key]]});
    };

  }

  handleKeyUp = (key: string) => {
    //look into filter
    let index = this.state.keys.findIndex(x => x === notes[key]);
    this.setState({keys: [...this.state.keys.slice(0, index), ...this.state.keys.slice(index + 1,this.state.keys.length)]});
  }
  componentDidMount() {
    document.addEventListener("keydown",(e: KeyboardEvent) => this.handleKeyDown(e.key));
    document.addEventListener("keyup",(e: KeyboardEvent) => this.handleKeyUp(e.key));
  }
  componentWillUnmount() {
    document.removeEventListener("keydown",(e: KeyboardEvent) => this.handleKeyDown(e.key));
    document.removeEventListener("keyup",(e: KeyboardEvent) => this.handleKeyUp(e.key));
  }
  render() {
    return <div>{this.state.keys}</div>;
  }
}
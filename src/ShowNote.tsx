import React from 'react';
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
  handleKeyDown = (key: string) => {
    let alreadyExists = this.state.keys.some(x => x === key);
    if(!alreadyExists) {
      this.setState({keys: [...this.state.keys, key]});
    };
    
  }
  handleKeyUp = (key: string) => {
    let index = this.state.keys.findIndex(x => x === key);
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
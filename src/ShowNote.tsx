import React from 'react';
  interface MyProps {
    
  }

  interface MyState {
    keys: Array<string>;
  }

export class ShowNote extends React.Component<MyProps, MyState> {
  constructor(props: string){
    super(props);
    this.state = {keys: [""]};
  }
  handleKeyDown = (key: string) => {
    this.state.keys.push(key);
    this.setState({keys: this.state.keys});
  }
  handleKeyUp = () => {
    this.state.keys.pop();
    this.setState({keys: this.state.keys});
  }
  componentDidMount() {
    document.addEventListener("keydown",(e: KeyboardEvent) => this.handleKeyDown(e.key));
    document.addEventListener("keyup",this.handleKeyUp);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown",(e: KeyboardEvent) => this.handleKeyDown(e.key));
    document.removeEventListener("keyup",this.handleKeyUp);
  }
  render() {
    return <div>{this.state.keys}</div>;
  }
}
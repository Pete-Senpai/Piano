import React from 'react';
  interface MyProps {
    
  }

  interface MyState {
    key: string;
  }

export class ShowNote extends React.Component<MyProps, MyState> {
  constructor(props: string){
    super(props);
    this.state = {key: ""};
  }
  handleKeyDown = (key: string) => {
    this.setState({key});
  }
  handleKeyUp = () => {
    this.setState({key: ""});
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
    return <div>{this.state.key}</div>;
  }
}
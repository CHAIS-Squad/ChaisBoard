import dynamic from 'next/dynamic';
import React, { Component } from 'react';

// Dynamically import Konva components with SSR disabled
const Stage = dynamic(() => import('react-konva').then((mod) => mod.Stage), { ssr: false });
const Layer = dynamic(() => import('react-konva').then((mod) => mod.Layer), { ssr: false });
const Line = dynamic(() => import('react-konva').then((mod) => mod.Line), { ssr: false });

class Whiteboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      stageWidth: 1000,
      stageHeight: 800,
    };
    // Create a ref for the stage
    this.stageRef = React.createRef();
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({
      stageWidth: window.innerWidth,
      stageHeight: window.innerHeight,
    });
  };

  handleMouseDown = (e) => {
    this._drawing = true;
    // Initialize a new line
    this.setState(prevState => ({
      lines: [...prevState.lines, []],
    }));
  };

  handleMouseMove = (e) => {
    // Check if we are currently drawing
    if (!this._drawing) return;
    
    // Access the pointer position directly from the event
    const point = e.target.getStage().getPointerPosition();
    
    // Proceed with adding the point to the current line
    let lines = this.state.lines.slice(0);
    let currentLine = lines[lines.length - 1];
    currentLine = currentLine.concat([point.x, point.y]);
    lines[lines.length - 1] = currentLine;
  
    this.setState({
      lines,
    });
  };
  

  handleMouseUp = () => {
    this._drawing = false;
  };

  render() {
    return (
      <div>
        <Stage
          width={this.state.stageWidth}
          height={this.state.stageHeight}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          ref={this.stageRef}
        >
          <Layer>
            {this.state.lines.map((line, i) => (
              <Line key={i} points={line} stroke="black" strokeWidth={5} />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Whiteboard;

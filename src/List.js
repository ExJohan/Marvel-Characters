import React, { Component } from 'react';
import ListItem from './ListItem';


class List extends Component {
  render() {
    return (
      <div>
        {this.props.result.map((datatest,index) => <ListItem datatest={datatest} key={index} />)}
      </div>
    );
  }
}

export default List;
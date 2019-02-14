import React, { Component } from 'react';
import './App.css';


class ListItem extends Component {
  render() {
    const metaData = this.props.datatest;
    const {thumbnail} = metaData;
    return (
      <div id="elementList" className="datatest">
        <img className="image" src={`${thumbnail.path}.${thumbnail.extension}`} alt="Description"/>
        <div className="data-container">
          <h1>{metaData.name}</h1>
          <p>Description : {metaData.description}</p>
        </div>

      </div>
    );
  }
}

export default ListItem;

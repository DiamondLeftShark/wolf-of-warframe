//displays Ducat information
import React from 'react';


class Ducats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ducatData: null
    }

    this.generateList = this.generateList.bind(this);
  }

  //generates a list of data for ducat data.  If no data is present, display a message
  generateList() {
    if(this.state.ducatData === null) {
      return(<div>Retrieving data...</div>);
    } else {
      return(<div>Data listing TBD</div>);
    }
  }

  //get latest data from the database
  componentDidMount() {

  }

  render() {
    let data = this.generateList();
    return(data);
  }
}

export default Ducats;
import React from 'react';


class Pagination extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(<div>
      <span onClick={this.props.prev}><b>Previous</b></span> (Page {this.props.page}) <span onClick={this.props.next}><b>Next</b></span>
    </div>)
  }
}

export default Pagination;
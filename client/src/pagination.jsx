import React from 'react';


class Pagination extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(<div>
      <span onClick={this.props.prev}>Previous</span> (Page {this.props.page}) <span onClick={this.props.next}>Next</span>
    </div>)
  }
}

export default Pagination;
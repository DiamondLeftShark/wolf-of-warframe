import React from 'react';


class Pagination extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(<div>
      <span>Previous</span> (Page {this.props.page}) <span>Next</span>
    </div>)
  }
}

export default Pagination;
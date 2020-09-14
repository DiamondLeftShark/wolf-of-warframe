//landing "page". Displays latest update date for data
import React from 'react';
import axios from 'axios';

import rootUrl from './url.jsx';


class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.getUpdateDate = this.getUpdateDate.bind(this);

    this.state = {
      date: null
    };

    this.getUpdateDate();
  }

  //get latest update date
  getUpdateDate() {
    let url = rootUrl.concat('lastupdate');
    axios.get(url)
    .then((result) => {
      console.log(result.data);
      this.setState({date: result.data});
    })
    .catch((error) => {
      return null;
    });
  }

  componentDidMount() {
    this.getUpdateDate();
  }

  render() {
    console.log(this.state);
    return(<h3>Data current as of {this.state.date}</h3>);
  }
}

export default Landing;
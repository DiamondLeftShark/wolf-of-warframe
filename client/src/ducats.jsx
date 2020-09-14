//displays Ducat information
import React from 'react';
import axios from 'axios';

import rootUrl from './url.jsx';
import wfmAssetUrl from './wfm_asset_url.jsx';


class Ducats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ducatData: null,
      page: 0,
      numRecords: 9999,
      limit: 50
    }

    this.generateList = this.generateList.bind(this);
  }

  //generates a list of data for ducat data.  If no data is present, display a message
  generateList() {
    if(this.state.ducatData === null) {
      return(<div>Retrieving data...</div>);
    } else {
      let output = [];
      for(let i = 0; i < this.state.ducatData.length; i++) {
        let thumbnailUrl = wfmAssetUrl.concat(this.state.ducatData[i].thumb);
        output.push(<div>
                      <img src={thumbnailUrl}/>
                      <div>{this.state.ducatData[i].item_name}</div>
                      <div>Value: {this.state.ducatData[i].ducats}</div>
                      <div>Ducats/platinum: {this.state.ducatData[i].ducats_per_plat}</div>
                    </div>);
      }
      return(output);
    }
  }

  //get latest data from the database
  //TBD: pass in page/offset information
  componentDidMount() {
    let url = rootUrl.concat('ducats');
    axios.get(url)
    .then((results) => {
      console.log(results.data);
      this.setState({ducatData: results.data});
    })
    .catch((error) => {
      console.log("error");
    })
  }

  render() {
    let data = this.generateList();
    console.log(data);
    return(<div>
            <h3>Best Items for Ducats</h3>
            {data}
          </div>);
  }
}

export default Ducats;
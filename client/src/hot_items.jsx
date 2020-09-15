//displays items by active trading volume
import React from 'react';
import axios from 'axios';

import rootUrl from './url.jsx';
import wfmAssetUrl from './wfm_asset_url.jsx';
import Pagination from './pagination.jsx';


class HotItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotItemData: null,
      page: 0,
      numRecords: 9999,
      limit: 50
    }
    this.generateList = this.generateList.bind(this);
  }

  generateList() {
    if(this.state.hotItemData === null) {
      return(<div>Retrieving data...</div>);
    } else {
      let output = [];
      for(let i = 0; i < this.state.hotItemData.length; i++) {
        let thumbnailUrl = wfmAssetUrl.concat(this.state.hotItemData[i].thumb);
        output.push(<div>
                      <img src={thumbnailUrl}/>
                      <div>{this.state.hotItemData[i].item_name}</div>
                      <div>Volume: {this.state.hotItemData[i].volume}</div>
                    </div>);
      }
      return(output);
    }
  }

  componentDidMount() {
    let url = rootUrl.concat('hotitems');
    axios.get(url)
    .then((results) => {
      console.log(results.data);
      this.setState({hotItemData: results.data});
    })
    .catch((error) => {
      console.log("error");
    })
  }

  render() {
    let data = this.generateList();
    console.log(data);
    return(<div>
            <h3>Hot Items by Volume</h3>
            <Pagination page={this.state.page}/>
            {data}
            <Pagination page={this.state.page}/>
          </div>);
  }
}

export default HotItems;
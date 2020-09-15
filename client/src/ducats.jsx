//displays Ducat information
import React from 'react';
import axios from 'axios';

import rootUrl from './url.jsx';
import wfmAssetUrl from './wfm_asset_url.jsx';
import Pagination from './pagination.jsx';


class Ducats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ducatData: null,
      page: 0,
      numRecords: 9999,
      limit: 10
    }

    this.generateList = this.generateList.bind(this);
    this.changePage = this.changePage.bind(this);
    this.getInformation = this.getInformation.bind(this);
  }

  //generates a list of data for ducat data.  If no data is present, display a message
  generateList() {
    if(this.state.ducatData === null) {
      return(<div>Retrieving data...</div>);
    } else {
      let output = [];
      for(let i = 0; i < this.state.ducatData.length; i++) {
        let thumbnailUrl = wfmAssetUrl.concat(this.state.ducatData[i].thumb);
        let quantity = 0;
        for(let j = 0; j < this.props.inventory.length; j++) {
          if (this.state.ducatData[i].id === this.props.inventory[j].id) {
            quantity = this.props.inventory[j].quantity;
          }
        }
        let owned = '';
        if(quantity > 0) {
          owned = (<div><b>You own {quantity}</b></div>);
        }
        output.push(<div>
                      <img src={thumbnailUrl}/>
                      <div>{this.state.ducatData[i].item_name}</div>
                      {owned}
                      <div>Value: {this.state.ducatData[i].ducats}</div>
                      <div>Ducats/platinum: {this.state.ducatData[i].ducats_per_plat}</div>
                    </div>);
      }
      return(output);
    }
  }

  changePage(increment) {
    let newPage = this.state.page + increment;
    console.log(newPage);
    if(newPage >= 0) {
      this.setState({page: newPage}, (() => {this.getInformation()}));
    }
  }

  getInformation() {
    console.log(`Getting information for page ${this.state.page}`);
    let url = rootUrl.concat('ducats');
    let params = {
      page: this.state.page,
      limit: this.state.limit
    };
    axios.get(url, {params})
    .then((results) => {
      //console.log(results.data);
      this.setState({ducatData: results.data});
    })
    .catch((error) => {
      console.log("error");
    })
  }

  //get latest data from the database
  //TBD: pass in page/offset information
  componentDidMount() {
    let url = rootUrl.concat('ducats');
    let params = {
      page: this.state.page,
      limit: this.state.limit
    };
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
            <Pagination page={this.state.page} prev={()=>{this.changePage(-1)}} next={()=>{this.changePage(1)}}/>
            {data}
            <Pagination page={this.state.page} prev={()=>{this.changePage(-1)}} next={()=>{this.changePage(1)}}/>
          </div>);
  }
}

export default Ducats;
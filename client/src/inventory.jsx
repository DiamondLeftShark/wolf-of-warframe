import React from 'react';
import axios from 'axios';

import rootUrl from './url.jsx';
import wfmAssetUrl from './wfm_asset_url.jsx';

class Inventory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: 0,
      numRecords: this.props.inventory.length,
      limit: 50
    }

    this.generateList = this.generateList.bind(this);
  }

  generateList() {
    if (this.props.inventory === null) {
      return <div>Retrieving inventory data...</div>;
    } else {
      let output = [];
      for(let i = this.state.page * this.state.limit; i < (this.state.page+1) * this.state.limit; i++) {
        let thumbnailUrl = wfmAssetUrl.concat(this.props.inventory[i].thumb);
        output.push(<div>
                      <img src={thumbnailUrl}/>
                      <div>{this.props.inventory[i].item_name}</div>
                      <div>Quantity: <input type="number" itemId ={this.props.inventory[i].id} min="0" max="99999" step="1" defaultValue={this.props.inventory[i].quantity}></input></div>
                    </div>);
      }
      return output;
    }
  }

  componentDidMount() {
    this.props.getInventory();
  }

  render() {
    let data = this.generateList();
    return(<div>
            {data}
          </div>)
  }
}

export default Inventory;
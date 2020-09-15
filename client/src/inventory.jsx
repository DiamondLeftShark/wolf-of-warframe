import React from 'react';
import axios from 'axios';

import rootUrl from './url.jsx';
import wfmAssetUrl from './wfm_asset_url.jsx';
import Pagination from './pagination.jsx';

class Inventory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: 0,
      numRecords: this.props.inventory.length,
      limit: 10
    }

    this.generateList = this.generateList.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  changePage(increment) {
    let newPage = this.state.page + increment;
    console.log(newPage);
    if(newPage >= 0) {
      this.setState({page: newPage});
    }
  }

  //TBD: debounce query with delay so that database update is only sent after user stops modifying quantity
  //updates inventory with new quantity, and sends that value to the database
  updateInventory(event, inventoryId, itemId) {
    if(event.target.value === '') {
      console.log("not a number");
    } else {
      this.props.inventory[inventoryId].quantity = Number(event.target.value);

      //pass data to database
      let params = {
        id: itemId,
        quantity: event.target.value
      };
      let url = rootUrl.concat('inventory');
      axios.patch(url, params)
      .then((result) => {
        console.log("Inventory record updated in database.");
      })
      .catch((error) => {
        console.log("Error updating inventory record in database");
        console.log(error);
      });
    }
  }

  generateList() {
    if(document.getElementById('inventory-form') !== null){
      document.getElementById('inventory-form').reset();
    }
    if (this.props.inventory === null) {
      return <div>Retrieving inventory data...</div>;
    } else {
      let output = [];
      for(let i = this.state.page * this.state.limit; i < (this.state.page+1) * this.state.limit; i++) {
        console.log(this.props.inventory[i]);
        let thumbnailUrl = wfmAssetUrl.concat(this.props.inventory[i].thumb);
        let defaultValue = this.props.inventory[i].quantity;
        output.push(<div>
                      <img src={thumbnailUrl}/>
                      <div>{this.props.inventory[i].item_name}</div>
                      <div>Quantity: <input type="number" inventoryId={i} itemId={this.props.inventory[i].id} min="0" max="99999" step="1" defaultValue={defaultValue} onChange={(event)=>{this.updateInventory(event,i,this.props.inventory[i].id)}}></input></div>
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
            <h3>Your Inventory:</h3>
            <Pagination page={this.state.page} prev={()=>{this.changePage(-1)}} next={()=>{this.changePage(1)}}/>
            <form id="inventory-form">{data}</form>
            <Pagination page={this.state.page} prev={()=>{this.changePage(-1)}} next={()=>{this.changePage(1)}}/>
          </div>)
  }
}

export default Inventory;
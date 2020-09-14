/*Main Container: loaded into HTML document, and is in charge of rendering submodules/menus*/
import React from 'react';
import Menu from './menu.jsx';

class Container extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    return(<div>
            <Menu />
            <h1>Testing!</h1>
           </div>
    );
  }
};

export default Container;
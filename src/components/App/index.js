import React from 'react';
import './index.less';

import {Link} from 'react-router';
import {Menu} from 'antd';

const MenuItem = Menu.Item;

/**
 * App组件
 * 定义整个页面的布局
 */
class App extends React.Component {

  render() {

    // 正常显示
    return (
      <div className="ant-layout-base">

        <aside className="ant-layout-sidebar">

          <Menu theme="dark" mode="inline">
            <MenuItem>
              <Link to="/"><span className="nav-text">无affix</span></Link>
            </MenuItem>
            <MenuItem>
              <Link to="/aaa"><span className="nav-text">有affix</span></Link>
            </MenuItem>
          </Menu>

        </aside>

        <div id="main-content-div" className="ant-layout-main">

          <div className="ant-layout-container">
            {this.props.children}
          </div>

        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import './index.less';

import {Affix} from 'antd';

/**
 * 测试用
 */
class Hello extends React.PureComponent {

  render() {
    return (
      <div style={{height:'2000px'}}>
        <Affix offsetTop={8} target={() => document.getElementById('main-content-div')}>
          <h1 className="testStyle">Hello, React!</h1>
        </Affix>
      </div>
    );
  }

}

export default Hello;

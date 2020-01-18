import React from 'react'
import Cleared from './files-cleared/Cleared';
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import TurnAround from './tat/TurnAround';
import Stacked from './stacked/Stacked';

const Stats = () => {

    let pages = [
        { name: 'No. of Files Cleared', component: <Cleared/> },
        { name: 'Turn Around Time', component: <TurnAround/>},
        { name: 'Credibility', component: <Stacked/>}
    ];

    const getTabs = () => {
        return pages.map((page, index) => ({
          title: page.name,
          getContent: () => page.component,
          key: index,
          tabClassName: 'tab',
          panelClassName: 'panel',
        }));
      }

    return (
        <div>
            <Tabs items={getTabs()}/>
        </div>
    )
}


export default Stats;
import React, { Component } from 'react';
import Tabbar from '../component/Tabbar.jsx';
import TabbarContent from '../component/TabbarContent.jsx';
import { connect } from 'react-redux';
import util from '../util/source.js';
import { 
    actionFetchStaticResource
} from '../actions/index.js';
import { tabs } from '../cfg.js';
import styles from '../component/tabbar.less';

const mapStateToProps = (state) => {
    return {
        names: state.source.names,
        loadingDureations: state.source.loadingDureations
    };
};

@connect(mapStateToProps)
export default class App extends Component {
	constructor(props) {
        super(props);
        this.tabItemClicked = this.tabItemClicked.bind(this);
	}

    tabItemClicked(tab) {
        const { getSource } = this.props;
        getSource && getSource(tab.name);
        // dispatch(actionFetchStaticResource(getSource(tab.name)));
    }

	render() {
        const { names, loadingDureations } = this.props;
		return (
            <div className={styles.tabbarContainer}>
                <Tabbar tabs={tabs}
                    tabbarItemClick={this.tabItemClicked}
                />
                <TabbarContent
                    names={names}
                    loadingDureations={loadingDureations}
                />
            </div>
		)
	}
}

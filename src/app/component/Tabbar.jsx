import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import util from '../util/source.js';
import styles from './tabbar.less';

export default class Tabbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.currentIndex !== this.state.currentIndex;
    }
    __tabItemClicked(i, tab) {
        const { tabbarItemClick } = this.props;
        this.setState({
            currentIndex: i
        });
        tabbarItemClick && tabbarItemClick(tab);
    }
    __renderTabItem() {
        const { tabs = [] } = this.props;
        return tabs.map((tab, i) => {
            let style = this.state.currentIndex === i
                ? classnames(styles.tabItem, styles.selected)
                : styles.tabItem;
            return <span key={i}
                        className={style}
                        onClick={this.__tabItemClicked.bind(this, i, tab)}
                    >
                    {tab.name}
                    </span>;
        });
    }
    render() {
        return (
            <div className={styles.tabBar}>
                { this.__renderTabItem() }
            </div>
        )
    }
}


Tabbar.propTypes = {
    tabs: PropTypes.array.isRequired,
    tabbarItemClick: PropTypes.func.isRequired
}
Tabbar.defaultProps = {
    tabs: [],
    tabbarItemClick: () => {}
}

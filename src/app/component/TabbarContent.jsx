import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import echarts from 'echarts';
import styles from './tabbar.less';

export default class TabbarContent extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.loadingTimeCanvas = echarts.init(this.content);
    }
    componentWillReceiveProps(nextProps) {
        const { names, loadingDureations } = nextProps;
        this.loadingTimeCanvas.setOption({
            title: {
                text: 'Time(ms)'
            },
            tooltip: {},
            color: ['#3398DB'],
            xAxis: {
                data: names,
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            yAxis: {},
            series: [{
                name: 'Time',
                type: 'bar',
                data: loadingDureations
            }]
        })
    }
    render() {
        return (
            <div className={styles.tabbarContent}
                ref={(c) => { this.content = c; }}
            >
            </div>
        )
    }
}

TabbarContent.propTypes = {
    names: PropTypes.array.isRequired,
    loadingDureations: PropTypes.array.isRequired
}
TabbarContent.defaultProps = {
    names: [],
    loadingDureations: []
}

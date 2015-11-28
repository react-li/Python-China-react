var React = require('react');
var Reflux = require('reflux');
var Header = require('./Header');
var TopicList = require('./TopicList');
var FetchStore = require('../stores/FetchStore');
var FetchActions = require('../actions/FetchActions');
var TimelineActions = require('../actions/TimelineActions');
var TimelineStore = require('../stores/TimelineStore');

var HomePage = React.createClass({
    mixins: [
        Reflux.connect(FetchStore, "fetching"),
        Reflux.connect(TimelineStore, "topics")
    ],
	componentDidMount: function(){
        TimelineActions.fetchTimeline(this.props.location.query);
	},
    componentWillReceiveProps: function(nextProps) {
        if ( nextProps.location.search !== this.props.location.search ) {
            this.setState({topics: []});
            FetchActions.fetching(true);
            TimelineActions.resetTimeline();
            TimelineActions.fetchTimeline(nextProps.location.query);
        }
    },
    render: function() {
        var current_user = this.props.current_user;
        return (
            <div className="home-view">
                <Header title="Python China" description="Welcome to Python China" path="home" />
                <div className="body">
					<div className="split-view container">
					  <div className="main-view">
						<TopicList topics={this.state.topics} query={this.props.location.query} />
					  </div>
					  <div className="sidebar-view">
                        { 
                            (function(obj){
                                if ( current_user.id ) {
                                    return (
                                        <div className="widget">
                                          <a className="button button--green">New Topic</a>
                                        </div>
                                    );
                                }
                            }(this)) 
                        }
						<div className="site-sidebar"></div>
					  </div>
					</div>
                </div>
            </div>
        );
    }
});

module.exports = HomePage;

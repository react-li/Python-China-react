var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Reflux = require('reflux');
var TopicActions = require('../actions/TopicActions');
var TopicStore = require('../stores/TopicStore');
var MarkdownArea = require('./MarkdownArea');
var ContentActions = require('../actions/ContentActions');
var ContentStore = require('../stores/ContentStore');
var shake = require('../utils').shake;

var TopicForm = React.createClass({
    mixins: [
        Reflux.connect(ContentStore, "content"),
    ],
    getInitialState: function() {
        return {
            title: this.props.topic.title || '',
            link: this.props.topic.link || '',
            disabled: false 
        };
    },
    componentDidMount: function() {
        ContentActions.sync(this.props.topic.content);
        this.setState({content: this.props.topic.content});
    },
    propTypes: {
        topic: React.PropTypes.shape({
            title: React.PropTypes.string,
            link: React.PropTypes.string,
            content: React.PropTypes.string
        }),
    },
	getDefaultProps: function() {
		return {
		    topic: {
                title: '',
                link: '',
                content: ''
            }
		};
	},
    handleChange: function(e) {
        if (e.target.name === 'content') {
            ContentActions.sync(e.target.value);
        }
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    },
    handleFormSubmit: function(e) {
        e.preventDefault();
        var payload = {
            title: this.state.title.replace(/(^\s*)|(\s*$)/g, ""),
            content: this.state.content.replace(/(^\s*)|(\s*$)/g, ""),
            link: this.state.link.replace(/(^\s*)|(\s*$)/g, "")
        };
        if (!payload.title || !payload.content) {
          	return shake(ReactDOM.findDOMNode(this.refs.form));
        }
        TopicActions.update(this.props.topic.id, payload);
    },
    render: function() {
        var cafe = this.props.cafe;
        var current_user = this.props.current_user;
        return (
			<form className="topic-form" ref="form" onSubmit={this.handleFormSubmit} >
				<div className="form-description">
					Topic in <Link to={ "/c/" + cafe.slug }> { cafe.name }</Link>
				</div>
				<div className="form-field form-title">
					<input placeholder="Your topic title" name='title' value={this.state.title} onChange={ this.handleChange }></input>
				</div>
				<div className="form-field form-link">
					<input placeholder="Source link?" type="url" name='link' value={this.state.link} onChange={ this.handleChange }></input>
				</div>
				<MarkdownArea clazz="form-field form-content yue" handleChange={this.handleChange} placeholder="What is in your mind" content={ this.state.content }></MarkdownArea>
				<div className="form-submit">
					<button className="button buttong--green">{ this.props.type }</button>
				</div>
			</form>
        );
    }
});

module.exports = TopicForm;

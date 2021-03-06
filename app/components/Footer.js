var React = require('react');

var Footer = React.createClass({
    getDefaultProps: function() {
        return {
            year: new Date().getFullYear()
        };
    },
    render: function() {
        return (
            <div className="footer">
                <div className="container">
                    <div style={{float: "left"}}>Copyright &copy; { this.props.year } Python China </div>
                    <div style={{float: "right"}}>
                        <a href="https://github.com/lepture/zerqu">ZERQU</a> •
                        <a href="https://github.com/zerqu/qingcheng">青城</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Footer;

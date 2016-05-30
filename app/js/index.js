'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Entrys = React.createClass({
  render: function() {
    var elapsed = Math.round(this.props.elapsed  / 100);
    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
    var message =
      'React has been successfully running for ' + seconds + ' seconds.';

    return (
        <div className="entry">
            <div id="entry1001" className="entry-item entryTitle">
                entry's title
            </div>
            <div className="tasks">
                <div className="task">
                    <span className="task-title">task's.summary</span>
                </div>
            </div>
            <div className="tasks">
                <div className="task">
                    <span className="task-title">task's.summary</span>
                </div>
            </div>
            <div className="tasks">
                <div className="task">
                    <span className="task-title">task's.summary</span>
                </div>
            </div>
        </div>
    );
  }
});

var ec = document.getElementById('entry-container');
console.log('ec='+ec);

ReactDOM.render(
    <Entrys/>,
    ec
);

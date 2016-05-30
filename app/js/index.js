'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Entrys = React.createClass({
  render: function() {
      var tasks = [];
      for (var i = 0; i < 4; i++) {
          tasks.push(
              <div className="task">
                  <span className="task-title">task[{i}]'s.summary</span>
              </div>
          );
      }

      return (
          <div className="entry">
              <div id="entry1001" className="entry-item entryTitle">
                  entry's title
              </div>
              <div className="tasks">
                  {tasks}
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

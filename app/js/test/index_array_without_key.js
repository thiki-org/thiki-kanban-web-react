'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Entrys = React.createClass({
  render: function() {
      var tasks = this.props.tasks;
      var taskViews = [];
      for (var i = 0; i < tasks.length; i++) {
          taskViews.push(
              <div className="task">
                  <span className="task-title">{tasks[i].summary}</span>
              </div>
          );
      }

      return (
          <div className="entry">
              <div id="entry1001" className="entry-item entryTitle">
                  entry's title
              </div>
              <div className="tasks">
                  {taskViews}
              </div>
          </div>
      );
  }
});

var destination = document.getElementById('entry-container');
var tasks = [
    {
        "summary": "swimming 1200 meters"
    }
];

ReactDOM.render(
    <Entrys tasks={tasks}/>,
    destination
);

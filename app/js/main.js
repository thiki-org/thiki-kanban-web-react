'use strict';

var React = require('react');
var ReactDOM = require('react-dom');


var Task = React.createClass({
    render: function () {
        return (
            <div className="task">
                <span className="task-title">{this.props.data.summary}</span>
            </div>
        );
    }

});


var Entrys = React.createClass({
    render: function () {
        var tasks = this.props.tasks;
        return (
            <div className="entry">
                <div id="entry1001" className="entry-item entryTitle">
                    entry's title
                </div>
                <div className="tasks">
                    {
                        tasks.map(function (task) {
                            return <Task key={task.id} data={task}/>
                        })
                    }
                </div>
            </div>
        );
    }
});

var destination = document.getElementById('entry-container');
var tasks = [
    {
        "id": "task10002",
        "summary": "swimming 1200 meters"
    },
    {
        "id": "task10005",
        "summary": "run 10000 meters"
    }
];

ReactDOM.render(
    <Entrys tasks={tasks}/>,
    destination
);

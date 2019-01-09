var my_timer;
class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            running: false,
            sessionlength: 25,
            breaklength: 5,
            time_left: (25 * 60),
            timer_label: ""
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.reset = this.reset.bind(this);
        this.startstop = this.startstop.bind(this);
        this.beginTimerInterval = this.beginTimerInterval.bind(this);
        this.clearTimerInterval = this.clearTimerInterval.bind(this);
    }
    componentDidMount()
    {
        this.setState({
            timer_label: "Session"
        });
    }
    clickHandler(button_id, button_parentnode)
    {
        if(this.state.running == false)
        {
            var changeState = function(self, changing_state, new_length, current_label, time_length_state)
            {
                self.setState({
                    [changing_state]: new_length
                });
                if(self.state.timer_label == current_label)
                {
                    var new_time_left = (new_length * 60);
                    self.setState({
                        [time_length_state]: new_time_left
                    });
                }
            }
            if(button_parentnode == "break-section")
            {
                if(button_id == "break-increment" && this.state.breaklength < 60)
                {
                    var newbreaklength = this.state.breaklength + 1;
                    changeState(this, "breaklength", newbreaklength, "Break", "time_left");
                }
                if(button_id == "break-decrement" && this.state.breaklength > 1)
                {
                    var newbreaklength = this.state.breaklength - 1;
                    changeState(this, "breaklength", newbreaklength, "Break", "time_left");
                }
            }
            if(button_parentnode == "session-section")
            {
                if(button_id == "session-increment" && this.state.sessionlength < 60)
                {
                    var newsessionlength = this.state.sessionlength + 1;
                    changeState(this, "sessionlength", newsessionlength, "Session", "time_left");
                }
                if(button_id == "session-decrement" && this.state.sessionlength > 1)
                {
                    var newsessionlength = this.state.sessionlength - 1;
                    changeState(this, "sessionlength", newsessionlength, "Session", "time_left");
                }
            }
        }
    }
    reset()
    {
        if(document.getElementById("beep").paused == false)
        {
            document.getElementById("beep").pause();
            document.getElementById("beep").currentTime = 0; 
        }
        if(this.state.running == true)
        {
            this.clearTimerInterval();
        }
        this.setState({
            running: false,
            sessionlength: 25,
            breaklength: 5,
            time_left: (25 * 60),
            timer_label: "Session"
        });
    }
    startstop()
    {
        if(this.state.running == false)
        {
            this.setState({
                running: true
            });
            this.beginTimerInterval();
        }
        else
        {
            this.setState({
                running: false
            });
            this.clearTimerInterval();
        }
    }
    beginTimerInterval()
    {
        var self = this;
        my_timer = setInterval(function()
        {
            var iatemylife = self.state.time_left - 1;
            if(iatemylife < 0)
            {
                document.getElementById("beep").play();
                if(self.state.timer_label == "Session")
                {
                    iatemylife = (self.state.breaklength * 60);
                    self.setState({
                        time_left: iatemylife,
                        timer_label: "Break"
                    });
                }
                else if(self.state.timer_label == "Break")
                {
                    iatemylife = (self.state.sessionlength * 60);
                    self.setState({
                        time_left: iatemylife,
                        timer_label: "Session"
                    });
                }
                return;
            }
            else
            {
                self.setState({
                    time_left: iatemylife
                });
            }
        },1000);
    }
    clearTimerInterval()
    {
        clearInterval(my_timer);
    }
    render()
    {
        var timeleft = (this.state.time_left);
        return(
            <div>
                <SectionLengthComponent section_id="break-section" section_label_id="break-label" section_label="Break Length" incrementor_id="break-increment" decrementor_id="break-decrement" section_length_id="break-length" section_length={this.state.breaklength} clickHandler={this.clickHandler}/>
                <SectionLengthComponent section_id="session-section" section_label_id="session-label" section_label="Session Length" incrementor_id="session-increment" decrementor_id="session-decrement" section_length_id="session-length" section_length={this.state.sessionlength} clickHandler={this.clickHandler}/>
                <Timer time_left={timeleft} timer_label={this.state.timer_label}/>
                <button id="start_stop" onClick={this.startstop}>Start/Stop</button>
                <button id="reset" onClick={this.reset}>Reset</button>
                <audio className="clip" id="beep" src="https://onlineclock.net/audio/options/zombie.mp3"></audio>
            </div>
        );
    }
};
class SectionLengthComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            section_time_length: ""
        };
        this.clickHandler = this.clickHandler.bind(this);
    }
    componentWillReceiveProps(nextProps)
    {
        this.setState({
            section_time_length: nextProps.section_time_length
        });
    }
    clickHandler(e)
    {
        var target_parentnode = document.getElementById(e.target.id).parentNode.id;
        this.props.clickHandler(e.target.id, target_parentnode);
    }
    render()
    {
        return(
            <div id={this.props.section_id} className="a_section">
                <h1 id={this.props.section_label_id}>{this.props.section_label}</h1>
                <i className="fa fa-arrow-up" aria-hidden="true" id={this.props.incrementor_id} onClick={this.clickHandler}></i>
                <i className="fa fa-arrow-down" aria-hidden="true" id={this.props.decrementor_id} onClick={this.clickHandler}></i>
                <h3 id={this.props.section_length_id}>{this.props.section_length}</h3>
            </div>
        );
    }
}
class Timer extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        var time_left_minutes = Math.floor(this.props.time_left/60);
        var time_left_seconds = Math.floor(((this.props.time_left/60) - time_left_minutes) * 60);
        if(time_left_minutes < 10)
        {
            time_left_minutes = "0" + time_left_minutes;
        }
        if(time_left_seconds < 10)
        {
            time_left_seconds = "0" + time_left_seconds;
        }
        return(
            <div>
                <h2 id="timer-label">{this.props.timer_label}</h2>
                <h1 id="time-left">{time_left_minutes}:{time_left_seconds}</h1>
            </div>
        );
    }
}
React.render(<App />, document.getElementById("app"));
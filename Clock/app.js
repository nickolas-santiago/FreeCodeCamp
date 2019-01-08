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
        this.reset = this.reset.bind(this);
        this.startstop = this.startstop.bind(this);
        this.beginTimerInterval = this.beginTimerInterval.bind(this);
        this.clearTimerInterval = this.clearTimerInterval.bind(this);
        this.breakincrementfunc = this.breakincrementfunc.bind(this);
        this.breakdecrementfunc = this.breakdecrementfunc.bind(this);
        this.sessionincrementfunc = this.sessionincrementfunc.bind(this);
        this.sessiondecrementfunc = this.sessiondecrementfunc.bind(this);
    }
    componentDidMount()
    {
        this.setState({
            timer_label: "Session"
        });
    }
    breakincrementfunc()
    {
        if(this.state.breaklength < 60 && this.state.running == false)
        {
            var newbreaklength = this.state.breaklength + 1;
            this.setState({
                breaklength: newbreaklength
            });
            if(this.state.timer_label == "Break")
            {
                var new_time_left = (newbreaklength * 60);
                this.setState({
                    time_left: new_time_left
                });
            }
        }
    }
    breakdecrementfunc()
    {
        if(this.state.breaklength > 1 && this.state.running == false)
        {
            var newbreaklength = this.state.breaklength - 1;
            this.setState({
                breaklength: newbreaklength
            });
            if(this.state.timer_label == "Break")
            {
                var new_time_left = (newbreaklength * 60);
                this.setState({
                    time_left: new_time_left
                });
            }
        }
    }
    sessionincrementfunc()
    {
        if(this.state.sessionlength < 60 && this.state.running == false)
        {
            var newsessionlength = this.state.sessionlength + 1;
            this.setState({
                sessionlength: newsessionlength
            });
            if(this.state.timer_label == "Session")
            {
                var new_time_left = (newsessionlength * 60);
                this.setState({
                    time_left: new_time_left
                });
            }
        }
    }
    sessiondecrementfunc()
    {
        if(this.state.sessionlength > 1 && this.state.running == false)
        {
            var newsessionlength = this.state.sessionlength - 1;
            var new_time_left = (newsessionlength * 60);
            this.setState({
                sessionlength: newsessionlength
            });
            if(this.state.timer_label == "Session")
            {
                var new_time_left = (newsessionlength * 60);
                this.setState({
                    time_left: new_time_left
                });
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
                <BreakComponent running={this.state.running} breaklength={this.state.breaklength} breakincrementfunc={this.breakincrementfunc} breakdecrementfunc={this.breakdecrementfunc} />
                <SessionComponent running={this.state.running} sessionlength={this.state.sessionlength} sessionincrementfunc={this.sessionincrementfunc} sessiondecrementfunc={this.sessiondecrementfunc} />
                <Timer time_left={timeleft} timer_label={this.state.timer_label}/>
                <button id="start_stop" onClick={this.startstop}>Start/Stop</button>
                <button id="reset" onClick={this.reset}>Reset</button>
                <audio className="clip" id="beep" src="https://onlineclock.net/audio/options/zombie.mp3"></audio>
            </div>
        );
    }
};
class BreakComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            breaklength: this.props.breaklength
        };
    }
    componentWillReceiveProps(nextProps)
    {
        this.setState({
            breaklength: nextProps.breaklength
        });
    }
    render()
    {
        return(
            <div>
                <h1 id="break-label">Break Length</h1>
                <p id="break-increment" onClick={this.props.breakincrementfunc}>break-increment</p>
                <p id="break-decrement" onClick={this.props.breakdecrementfunc}>break-decrement</p>
                <h3 id="break-length">{this.state.breaklength}</h3>
            </div>
        );
    }
}
class SessionComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            sessionlength: this.props.sessionlength
        };
    }
    componentWillReceiveProps(nextProps)
    {
        this.setState(
        {
            sessionlength: nextProps.sessionlength
        });
    }
    render()
    {
        return(
            <div>
                <h1 id="session-label">Session Length</h1>
                <p id="session-increment" onClick={this.props.sessionincrementfunc}>session-increment</p>
                <p id="session-decrement" onClick={this.props.sessiondecrementfunc}>session-decrement</p>
                <h3 id="session-length">{this.state.sessionlength}</h3>
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
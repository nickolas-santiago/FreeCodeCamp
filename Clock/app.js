var my_timer;
var beep_srcs = [
    {sound_label: "Default Beep", src: "https://onlineclock.net/audio/options/default.mp3"},
    {sound_label: "Rooster", src: "https://onlineclock.net/audio/options/rooster.mp3"},
    {sound_label: "Heavy Metal Solo", src: "https://onlineclock.net/audio/options/heavy-metal.mp3"},
    {sound_label: "Calming Harp", src: "https://onlineclock.net/audio/options/harp-strumming.mp3"},
    {sound_label: "Zombie Moan", src: "https://onlineclock.net/audio/options/zombie.mp3"}
];
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
            timer_label: "Session",
            selectedbeep: 0
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.reset = this.reset.bind(this);
        this.startstop = this.startstop.bind(this);
        this.beginTimerInterval = this.beginTimerInterval.bind(this);
        this.clearTimerInterval = this.clearTimerInterval.bind(this);
        this.changeBeepSrc = this.changeBeepSrc.bind(this);
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
            var new_time_period_length = self.state.time_left - 1;
            if(new_time_period_length < 0)
            {
                document.getElementById("beep").play();
                var setNewTimePeriod = function(self_, period_length, time_left_state, timer_label_state, new_timer_label)
                {
                    new_time_period_length = (period_length * 60);
                    self_.setState({
                        [time_left_state]: new_time_period_length,
                        [timer_label_state]: new_timer_label
                    });
                }
                if(self.state.timer_label == "Session")
                {
                    setNewTimePeriod(self, self.state.breaklength, "time_left", "timer_label", "Break");
                }
                else if(self.state.timer_label == "Break")
                {
                    setNewTimePeriod(self, self.state.sessionlength, "time_left", "timer_label", "Session");
                }
                return;
            }
            else
            {
                self.setState({
                    time_left: new_time_period_length
                });
            }
        },1000);
    }
    clearTimerInterval()
    {
        clearInterval(my_timer);
    }
    changeBeepSrc(e)
    {
        var new_beep = e.target.value;
        this.setState({
            selectedbeep: new_beep
        });
    }
    render()
    {
        var timeleft = (this.state.time_left);
        var self = this;
        var beep_opt = beep_srcs.map(function(beep, i)
        {
            return(
                <label>
                    {beep.sound_label}
                    <input type="radio" name="beep_options" value={i} onChange={self.changeBeepSrc} className="form-check-input" checked={self.state.selectedbeep == i}/>
                </label>
            ); 
        });
        return(
            <div id="my_app">
            <div id="time_period_length_sections">
                <SectionLengthComponent section_id="break-section" section_label_id="break-label" section_label="Break Length" incrementor_id="break-increment" decrementor_id="break-decrement" section_length_id="break-length" section_length={this.state.breaklength} clickHandler={this.clickHandler}/>
                <SectionLengthComponent section_id="session-section" section_label_id="session-label" section_label="Session Length" incrementor_id="session-increment" decrementor_id="session-decrement" section_length_id="session-length" section_length={this.state.sessionlength} clickHandler={this.clickHandler}/>
            </div>             
            <Timer time_left={timeleft} timer_label={this.state.timer_label}/>
            <div id="buttons">
                <button id="start_stop" classonClick={this.startstop}>Start/Stop</button>
                <button id="reset" onClick={this.reset}>Reset</button>
            </div>
            <div id="sound_options_section">
                <p id="sound_options_label"><u>Sound Options:</u></p>
                {beep_opt}
            </div>
            <audio className="clip" id="beep" src={beep_srcs[this.state.selectedbeep].src}></audio>
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
        this.props.clickHandler(e.target.id, this.props.section_id);
    }
    render()
    {
        return(
            <div id={this.props.section_id} className="a_section">
                <h2 id={this.props.section_label_id} className="section_label">{this.props.section_label}</h2>
                <div className="a_section_content">
                    <i className="fa fa-arrow-up section_element" aria-hidden="true" id={this.props.incrementor_id} onClick={this.clickHandler}></i>
                    <p id={this.props.section_length_id} className="section_element">{this.props.section_length}</p>
                    <i className="fa fa-arrow-down section_element" aria-hidden="true" id={this.props.decrementor_id} onClick={this.clickHandler}></i>
                </div>
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
            <div id="timer_section">
                <h1 id="timer-label" className="section_label">{this.props.timer_label}</h1>
                <h1 id="time-left">{time_left_minutes}:{time_left_seconds}</h1>
            </div>
        );
    }
}
React.render(<App />, document.getElementById("app"));
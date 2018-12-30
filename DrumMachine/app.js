class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            buttons: [
                {id: "sound-q", buttontext: "Q", soundsrc: "1.mp3"},
                {id: "sound-w", buttontext: "W", soundsrc: "6.mp3"},
                {id: "sound-e", buttontext: "E", soundsrc: "2.mp3"},
                {id: "sound-a", buttontext: "A", soundsrc: "3.mp3"},
                {id: "sound-s", buttontext: "S", soundsrc: "4.mp3"},
                {id: "sound-d", buttontext: "D", soundsrc: "5.mp3"},
                {id: "sound-z", buttontext: "Z", soundsrc: "7.mp3"},
                {id: "sound-x", buttontext: "X", soundsrc: "8.mp3"},
                {id: "sound-c", buttontext: "C", soundsrc: "level-complete.mp3"}
            ], 
            display: "",
            currentsound: ""
        }
        this.playsound = this.playsound.bind(this);
    }  
    componentDidMount()
    {
        var self = this;
        var soundpad_keyboard_strokes = this.state.buttons.map(function(button)
        {
            return button.buttontext;
        });
        document.addEventListener("keydown", function(e)
        {
            var key_uppercase = e.key.toUpperCase();
            if(soundpad_keyboard_strokes.includes(key_uppercase))
            {
                var soundpad_keyboard_strokes_index = soundpad_keyboard_strokes.indexOf(key_uppercase);
                self.playsound(self.state.buttons[soundpad_keyboard_strokes_index].buttontext, self.state.buttons[soundpad_keyboard_strokes_index].id);
            }
        });
    }
    playsound(drum_pad_button_audiotag_id, drum_pad_button_id)
    {
        document.getElementById(drum_pad_button_audiotag_id).play();
        this.setState({
            display: drum_pad_button_id
        })
    }
    render()
    {
        var self = this;
        var clip_buttons = this.state.buttons.map(function(button)
        {
            return(
                <Clipbutton key={button.id} id={button.id} buttontext={button.buttontext} soundsrc={button.soundsrc} playsound={self.playsound}/>
            );
        });
        return(
            <div id="drum-machine">
                <div id="display">
                    <h2>{this.state.display}</h2>
                </div>
                {clip_buttons}
            </div>
        );
    }
};
class Clipbutton extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        var self = this;
        var playsound = function()
        {
            return self.props.playsound(self.props.buttontext, self.props.id);
        }
        return(
            <div className="drum-pad" id={this.props.id} onClick={playsound}>
                <h2>{this.props.buttontext}</h2>
                <audio className="clip" id={this.props.buttontext} src={this.props.soundsrc} ></audio>
            </div>
        );
    }
}
React.render(<App />, document.getElementById("app"));
const Calc_Buttons = [
                {button_id: "nine", button_text: "9"},
                {button_id: "eight", button_text: "8"},
                {button_id: "seven", button_text: "7"},
                {button_id: "six", button_text: "6"},
                {button_id: "five", button_text: "5"},
                {button_id: "four", button_text: "4"},
                {button_id: "three", button_text: "3"},
                {button_id: "two", button_text: "2"},
                {button_id: "one", button_text: "1"},
                {button_id: "zero", button_text: "0"},
                {button_id: "add", button_text: "+"},
                {button_id: "subtract", button_text: "-"},
                {button_id: "multiply", button_text: "X"},
                {button_id: "divide", button_text: "/"}
            ];
var start_new_evaluation = true;
class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            current_display: 0,
            current_function: []
        }
        this.evaluateFunction = this.evaluateFunction.bind(this);
        this.addDecimal = this.addDecimal.bind(this);
        this.clear = this.clear.bind(this);
        this.upDateDisplay = this.upDateDisplay.bind(this);
    }
    clear()
    {
        this.setState({
            current_display: 0,
            current_function: []
        });
    }
    upDateDisplay(button_id, button_value)
    {
        if(isNaN(button_value) == true)
        {
            if(start_new_evaluation == true)
            {
                var arr = [];
                arr.push(this.state.current_display);
                if(button_id == "multiply")
                {
                    arr.push("*");
                }
                else
                {
                    arr.push(button_value);
                }
                this.setState({
                    current_display: 0,
                    current_function: arr
                });
                start_new_evaluation= false;
            }
            else
            {
                var arr = [...this.state.current_function];
                if(this.state.current_display === 0)
                {
                    if(/(\+)|(\-)|(\*)|(\/)/.test(this.state.current_function[(this.state.current_function.length - 1)]) == true)
                    {
                        if(button_id == "multiply")
                        {
                            arr.splice((arr.length - 1), 1, "*");
                        }
                        else
                        {
                            arr.splice((arr.length - 1), 1, button_value);
                        }
                        this.setState({
                            current_function: arr
                        });
                    }
                }
                else
                {
                    if(this.state.current_function.length == 0)
                    {
                        arr.push(this.state.current_display);
                        if(button_id == "multiply")
                        {
                            arr.push("*");
                        }
                        else
                        {
                            arr.push(button_value);
                        }
                        this.setState({
                            current_display: 0,
                            current_function: arr
                        });
                    }
                    else
                    {
                        arr.push(this.state.current_display);
                        if(button_id == "multiply")
                        {
                            arr.push("*");
                        }
                        else
                        {
                            arr.push(button_value);
                        }
                        this.setState({
                            current_display: 0,
                            current_function: arr
                        });
                    }
                }
            }
        }
        else
        {
            if(start_new_evaluation == true)
            {
                this.clear();
            }
            start_new_evaluation = false;
            if(this.state.current_display === 0)
            {
                if(button_value == 0)
                {
                    return;
                }
                var newdisplay = "" + button_value;
                this.setState({
                    current_display: newdisplay
                });
                return;
            }
            var newdisplay = "" + this.state.current_display + button_value;
            this.setState({
                current_display: newdisplay
            });
        }
    }
    addDecimal()
    {
        if(this.state.current_display.toString().indexOf(".") < 0)
        {
            var newdisplay = ("" + this.state.current_display + ".");
            this.setState({
                current_display: newdisplay
            });
        }
    }
    evaluateFunction()
    {
        var arr = [...this.state.current_function];
        arr.push(this.state.current_display);
        var joined_arr = arr.join("");
        var equatedvalue = eval(joined_arr);
        this.setState({
            current_display: equatedvalue,
            current_function: joined_arr
        });
        start_new_evaluation = true;
    }
    render()
    {
        var self = this;
        var calc_buttons = Calc_Buttons.map(function(button)
        {
            return(
                <NumberButton key={button.button_id} id={button.button_id} buttontext={button.button_text} updateisplay={self.upDateDisplay}/>
            );
        });
        return(
            <div id="main">
                <div id="display_section">
                    <div id="current_function">
                        <p>{this.state.current_function}</p>
                    </div>
                    <div id="display">
                        <p>{this.state.current_display}</p>
                    </div>
                </div>
                <div id="number_buttons">
                    {calc_buttons}
                </div>
                <div id="clear" onClick={this.clear} className="button">
                    <p>CLEAR</p>
                </div>
                <div id="decimal" onClick={this.addDecimal} className="button">
                    <p>.</p>
                </div>
                <div id="equals" onClick={this.evaluateFunction} className="button">
                    <p>=</p>
                </div>
            </div>
        );
    }
};
class NumberButton extends React.Component
{
    constructor(props)
    {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler()
    {
        this.props.updateisplay(this.props.id, this.props.buttontext);
    }
    render()
    {
        return(
            <div id={this.props.id} onClick={this.clickHandler} className="button">
                <p>{this.props.buttontext}</p>
            </div>
        );
    }
};
React.render(<App />, document.getElementById("app"));
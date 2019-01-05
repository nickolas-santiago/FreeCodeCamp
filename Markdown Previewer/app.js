//To begin, I will define some variable that will be the app's inital data to mee the project's requirements
var init_input = "# This is some markdown\n### You can add your own right here!! \n --- \n";
init_input += "#### Some Headings: \n # Heading 1 \n ## Heading 2 \n ### Heading 3 \n --- \n";
init_input += "#### Here's a list: \n ### Awesome Pokemon: \n - Swampert \n - Mewtwo \n - Rayquaza \n - Blissey \n - Venasaur \n - Primeape \n --- \n";
init_input += "You can even create some links: [Pokemon Wiki page](https://en.wikipedia.org/wiki/Pok%C3%A9mon) \n --- \n";
init_input += "#### Need a motivational quote? \n >Start where you are. Use what you have. Do what you can. \n --- \n";
init_input += "#### You can even add flair to your text. **Make it bold!** *or you make it italic.* \n --- \n";
init_input += "#### Or Maybe you want to see some code. \n\n `function()\n{console.log('yeeerrrrrr')}`";
init_input += '\n\n\n\n';
init_input += '```' + '\n';
init_input += 'function test()' + '\n';
init_input += '{' + '\n';
init_input += '    console.log("This is a block of code")' + '\n';
init_input += '}' + '\n';
init_input += '```' + '\n';
init_input += "#### Thanks for coming! :) \n ![some stock photo](http://diagramcenter.org/wp-content/uploads/2016/03/image.png)";

class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            preview_data: init_input
        };
        this.changePreview = this.changePreview.bind(this);
    }
    changePreview(e)
    {
        var new_preview_data = e.target.value;
        this.setState({
            preview_data: new_preview_data
        });
    }
    render()
    {
        return(
            <div id="main">
                <textarea id="editor" onChange={this.changePreview} value={this.state.preview_data}></textarea>
                <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.preview_data)}}></div>
            </div>
        );
    }
};
React.render(<App />, document.getElementById("app"));
const my_quotes = [
    {quote_text: "You can't cross the sea merely by standing and staring at the water.", quote_author: "Rabindranath Tagore"},
    {quote_text: "Your talent is God’s gift to you. What you do with it is your gift back to God.", quote_author: "Leo Buscaglia"},
    {quote_text: "Believe in yourself! Have faith in your abilities! Without a humble but reasonable confidence in your own powers you cannot be successful or happy.", quote_author: "Norman Vincent Peale"},
    {quote_text: "Do the one thing you think you cannot do. Fail at it. Try again. Do better the second time. The only people who never tumble are those who never mount the high wire. This is your moment. Own it.", quote_author: "Oprah Winfrey"},
    {quote_text: "When the past calls, let it go to voicemail, believe me, it has nothing new to say.", quote_author: "Unknown"},
    {quote_text: "The key is to keep company only with people who uplift you, whose presence calls forth your best.", quote_author: "Epictetus"},
    {quote_text: "You are not here merely to make a living. You are here in order to enable the world to live more amply, with greater vision, with a finer spirit of hope and achievement. You are here to enrich the world, and you impoverish yourself if you forget the errand.", quote_author: "Woodrow Wilson"},
    {quote_text: "Be miserable. Or motivate yourself. Whatever has to be done, it’s always your choice.", quote_author: "Wayne Dyer"},
    {quote_text: "Do not wait to strike till the iron is hot; but make it hot by striking.", quote_author: "William Butler Yeats"},
    {quote_text: "I learned that we can do anything, but we can’t do everything… at least not at the same time. So think of your priorities not in terms of what activities you do, but when you do them. Timing is everything.", quote_author: "Dan Millman"},
    {quote_text: "Love what you have. Need what you want. Accept what you receive. Give what you can. Always remember, what goes around, comes around…", quote_author: "Uknown"},
    {quote_text: "Happiness cannot be traveled to, owned, earned, or worn. It is the spiritual experience of living every minute with love, grace & gratitude.", quote_author: "Denis Waitley"},
    {quote_text: "For every minute you are angry you lose 60 seconds of happiness.", quote_author: "Ralph Waldo Emerson"},
    {quote_text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", quote_author: "Thich Nhat Hanh"},
    {quote_text: "I think people who are creative are the luckiest people on earth. I know that there are no shortcuts, but you must keep your faith in something greater than you, and keep doing what you love. Do what you love, and you will find the way to get it out to the world.", quote_author: "Judy Collins"}
];
class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            quote_text: "",
            quote_author: "",
            tweet_link: ""
        };
        this.generateRandomQuote = this.generateRandomQuote.bind(this);
    }
    componentDidMount()
    {
        this.generateRandomQuote();
    }
    generateRandomQuote()
    {
        var new_quote_index = Math.floor(Math.random() * my_quotes.length);
        var new_quote_text = my_quotes[new_quote_index].quote_text;
        var new_quote_author = my_quotes[new_quote_index].quote_author;
        var new_tweet_link = "https://twitter.com/intent/tweet?text=%22" + new_quote_text.split(" ").join("%20") + "%22%20-" + new_quote_author.split(" ").join("%20");
        this.setState({
            quote_text: new_quote_text,
            quote_author: new_quote_author,
            tweet_link: new_tweet_link
        });
    }
    render()
    {
        return(
            <div id="quote-box">
                <h2 id="text">{this.state.quote_text}</h2>
                <p id="author">{this.state.quote_author}</p>
                <button id="new-quote" onClick={this.generateRandomQuote}>New Quote</button>
                <a id="tweet-quote" href={this.state.tweet_link}><img src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" width="55"/></a>
            </div>
        );
    }
};
React.render(<App />, document.getElementById("app"));
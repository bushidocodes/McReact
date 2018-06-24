import McReact from "./McReact/McReact.js";

// Example 1: Rendering a basic DOM element
// equivalent to McReact.render(<h1>hello world</h1>, document.getElementById('root'));
McReact.render(
  McReact.createElement("h1", null, "Hola Mundo"),
  document.getElementById("example1")
);

// Example 2: Rendering a basic McReact component once
const MyFirstComponent = McReact.createClass({
  render() {
    return McReact.createElement("h1", null, this.props.message);
  }
});

McReact.render(
  McReact.createElement(MyFirstComponent, { message: "hey there McReact" }),
  document.getElementById("example2")
);

// Example 3: Updating a DOM element
McReact.render(
  McReact.createElement("h1", null, new Date().toLocaleTimeString("en-US")),
  example3
);
setInterval(function() {
  McReact.render(
    McReact.createElement("h1", null, new Date().toLocaleTimeString("en-US")),
    example3
  );
}, 1000);

// Example 4: Updating a Component
const funnyWords = [
  "Bumfuzzle",
  "Cattywampus",
  "Gardyloo",
  "Taradiddle",
  "Snickersnee",
  "Widdershins"
];

function getRandomWord() {
  const i = Math.floor(Math.random() * funnyWords.length);
  return funnyWords[i];
}
McReact.render(
  McReact.createElement(MyFirstComponent, { message: getRandomWord() }),
  document.getElementById("example4")
);

setInterval(function() {
  McReact.render(
    McReact.createElement(MyFirstComponent, { message: getRandomWord() }),
    document.getElementById("example4")
  );
}, 5000);

// Example 5: Re-rendering a custom McReact component
const MyTitle = McReact.createClass({
  getInitialState() {
    return { message: "Going to call setState" };
  },
  componentDidMount() {
    setInterval(() => {
      console.log("Setting State");
      this._timesCalled = this._timesCalled + 1 || 0;
      this.setState({
        message: `setState Called ${this._timesCalled} times`
      });
    }, 5000);
  },
  render() {
    return McReact.createElement("h1", null, this.state.message);
  }
});

McReact.render(
  McReact.createElement(MyTitle, { message: "Wut up McReact?" }),
  document.getElementById("example5")
);

import McReact from "./McReact/McReact.js";

const MyTitle = McReact.createClass({
  getInitialState() {
    return { message: "Going to call setState" };
  },
  componentDidMount() {
    setTimeout(() => {
      console.log("Setting State");
      this.setState({
        message: "setState Called"
      });
    }, 2000);
  },
  render() {
    return McReact.createElement("h1", null, this.state.message);
  }
});

McReact.render(
  McReact.createElement(MyTitle, { message: "Wut up McReact?" }),
  document.querySelector("#root")
);

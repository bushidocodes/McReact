// Abstract Top level component rendered at the top of the component tree in McReact.render
const TopLevelWrapper = function(props) {
  this.props = props;
};
TopLevelWrapper.prototype.render = function() {
  return this.props;
};

export default TopLevelWrapper;

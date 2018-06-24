import TopLevelWrapper from "./TopLevelWrapper.js";
import McReactCompositeComponentWrapper from "./McReactCompositeComponentWrapper.js";
import McReactReconciler from "./McReactReconciler.js";

function McReactComponent() {}

McReactComponent.prototype.setState = function(partialState) {
  const internalInstance = getMyInternalInstancePlease(this);

  internalInstance._pendingPartialState = partialState;

  McReactReconciler.performUpdateIfNecessary(internalInstance);
};

function mixSpecIntoComponent(Constructor, spec) {
  const proto = Constructor.prototype;

  // Add all enumerables from spec to proto
  for (const key in spec) {
    proto[key] = spec[key];
  }
}

const McReact = {
  /**
   * Create the element to render
   *
   * @param {*} type - type of DOM node that we'll create
   * @param {*} props - Object of props that we want to pass
   * @param {*} children - Children that we want to pass
   * @returns
   */
  createElement(type, props, children) {
    const element = {
      type,
      props: props || {}
    };

    if (children) {
      element.props.children = children;
    }

    return element;
  },

  /**
   * Defines a McReact Component
   *
   * @param {*} spec
   * @returns
   */
  createClass(spec) {
    function Constructor(props) {
      this.props = props;

      // setup initial state
      const initialState = this.getInitialState ? this.getInitialState() : null;
      this.state = initialState;
    }

    Constructor.prototype = new McReactComponent();

    mixSpecIntoComponent(Constructor, spec);
    return Constructor;
  },

  /**
   * Renders the component tree
   *
   * @param {*} element
   * @param {*} container
   * @returns
   */
  render(element, container) {
    // Check for a root component in the container to know if this is the initial render or a rerender
    const prevComponent = getTopLevelComponentInContainer(container);
    if (prevComponent) {
      // We are just blindly using the existing component. This means that we
      // aren't able to know when to unmount a component and mount a different component in its place
      return updateRootComponent(prevComponent, element);
    } else {
      return renderNewRootComponent(element, container);
    }
  }
};

/**
 * Render the root element in the DOM container for the first time
 *
 * @param {*} element
 * @param {*} container
 * @returns
 */
function renderNewRootComponent(element, container) {
  // We wrap the component tree in a top level wrapper to handle when the tree is just a single DOM node
  const wrapperElement = McReact.createElement(TopLevelWrapper, element);
  const componentInstance = new McReactCompositeComponentWrapper(
    wrapperElement
  );

  // Via the reconciler, mount the component in the container
  const markUp = McReactReconciler.mountComponent(componentInstance, container);

  // and then stash the virtual dom representation on the DOM object
  container.___mcreactComponentInstance = componentInstance._renderedComponent;

  return markUp;
}

function getTopLevelComponentInContainer(container) {
  // check the container for the virtual dom
  return container.___mcreactComponentInstance;
}
function updateRootComponent(prevComponent, nextElement) {
  McReactReconciler.receiveComponent(prevComponent, nextElement);
}

export default McReact;

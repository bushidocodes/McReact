// This component is a bit confusing. I presume that this project structure
// is used because the reconciliation logic would get more complex

const McReactReconciler = {
  /**
   * Invokes internalInstance.mountComponent(container)
   *
   * @param {*} internalInstance
   * @param {*} container
   * @returns
   */
  mountComponent(internalInstance, container) {
    return internalInstance.mountComponent(container);
  },

  /**
   * Invokes internalInstance.receiveComponent(nextElement)
   *
   * @param {*} internalInstance
   * @param {*} nextElement
   * @returns
   */
  receiveComponent(internalInstance, nextElement) {
    internalInstance.receiveComponent(nextElement);
  },

  /**
   * Invokes internalInstance.performUpdateIfNecessary().
   * nextElement seems to not be used
   *
   * @param {*} internalInstance
   * @param {*} nextElement
   * @returns
   */
  performUpdateIfNecessary(internalInstance) {
    internalInstance.performUpdateIfNecessary();
  }
};

export default McReactReconciler;

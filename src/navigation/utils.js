export async function updateOwnProps(arg, cb) {
  if (typeof arg == 'function') {
    const newProps = cb(this.state.ownProps);
    this.ownProps = { ...newProps };
  } else {
    this.ownProps = { ...arg };
    cb(this.ownProps);
  }
}
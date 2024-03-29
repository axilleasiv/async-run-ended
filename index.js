const async_hooks = require('async_hooks');
const hook = async_hooks.createHook({
  init(asyncId, type) {
    if (type === 'TIMERWRAP' || type === 'TickObject') return;
    active.set(asyncId, { type });
  },
  destroy(asyncId) {
    active.delete(asyncId);
  },
  promiseResolve(asyncId) {
    active.delete(asyncId);
  }
});
let active;

const init = () => {
  active = new Map();
  hook.enable();
};

const check = time => {
  let hookTimer, resolve;

  if (active.size === 0) {
    hook.disable();
    return Promise.resolve('end');
  } else {
    // setInterval increase active size to 1
    hookTimer = setInterval(() => {
      // user should consume the promise in order size to be 3
      if (active.size === 3) {
        hook.disable();
        clearInterval(hookTimer);
        resolve('end');
      }
    }, time);
  }

  //promise increase active size to 3 if will be consumed
  return new Promise(r => {
    resolve = r;
  });
};

module.exports = {
  init() {
    init();

    return {
      check
    };
  }
};

const throttle = function(fn:()=>void, interval:number) {
  let lastTime = Date.now() - interval
  return function() {
    if ((lastTime + interval) < Date.now()) {
      lastTime = Date.now()
      fn()
    }
  }
}
export {throttle};
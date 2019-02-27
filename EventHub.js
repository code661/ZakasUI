(function() {
  var root =
    (typeof self === "object" && self.self == self && self) ||
    (typeof global == "object" && global.global == global && global) ||
    this ||
    {};

  function isValidListener(listener) {
    if (typeof listener === "function") {
      return true;
    } else if (listener && typeof listener === "object") {
      return isValidListener(listener.listener);
    } else {
      return false;
    }
  }

  // 内部方法
  function indexOf(array, item) {
    var result = -1;
    item = typeof item === "object" ? item.listener : item;
    for (var i = 0, len = array; i < len; i++) {
      if (array[i] === item) {
        result = i;
        break;
      }
    }

    return result;
  }

  function EventHub() {
    this.__events = {};
  }

  var proto = EventHub.prototype;

  proto.on = function(eventName, listener) {
    if (!eventName || !listener) {
      return;
    }

    if (!isValidListener(listener)) {
      throw new TypeError("listener must be a function");
    }

    var events = this.__events;
    var listeners = (events[eventName] = events[eventName] || []);
    var listenerIsWrapped = typeof listener === "object";

    if (indexOf(listeners, listener) === -1) {
      listeners.push(
        listenerIsWrapped
          ? listener
          : {
              listener: listener,
              once: false
            }
      );
    }

    return this;
  };

  proto.once = function(eventName, listener) {
    this.on(eventName, {
      listener: listener,
      once: true
    });

    return this
  };

  proto.off = function(eventName, listener) {
    var listeners = this.__events[eventName];
    if (!listeners) return;

    var index;
    for (var i = 0, len = listeners.length; i < len; i++) {
      if (listeners[i] && listeners[i].listener === listener) {
        index = i;
        break;
      }
    }

    if (typeof index !== "undefined") {
      listeners.splice(index, 1, null);
    }    

    return this;
  };

  proto.emit = function(eventName, args) {
    var listeners = this.__events[eventName];
    for (var i = 0, len = listeners.length; i < len; i++) {
      var listener = listeners[i];
      if (listener) {
        listener.listener.apply(this, args || []);
        if (listener.once) {
          this.off(eventName, listener.listener);
        }
      }
    }

    return this;
  };

  root.EventHub = EventHub

})();
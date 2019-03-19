function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true
  });
}

// users
define("ADMIN", 1);

// videos
define("PENDING", 1);
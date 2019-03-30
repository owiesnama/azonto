function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true
  });
}

// users
define("ADMIN", 1);
define("REVIEWER", 2);

// videos
define("PENDING", 0);
define("APPROVED", 1);

// videos uploading
define("UPLOADED", 0);
define("YOUTUBE", 1);
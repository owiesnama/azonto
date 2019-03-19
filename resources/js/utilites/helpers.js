let objectValues = require('lodash').values;

/**
 * Generic tap function.
 *
 * @param {mixed}    val
 * @param {Function} callback
 */
window.tap = function(val, callback) {
    callback(val);

    return val;
};

/**
 * Add tap to arrays.
 *
 * @param {mixed}    val
 * @param {Function} callback
 */
Object.defineProperty(Array.prototype, 'tap', {
    value: function(callback) {
        if (this.length) {
            callback(this);
        }
        return this;
    }
});

/**
 * Reject items from an array.
 *
 * @param {mixed}    val
 * @param {Function} callback
 */

Object.defineProperty(Array.prototype, 'reject', {
    value: function(callback) {
        return this.filter(item => !callback(item));
    }
});

/**
 * Flatten the given array.
 *
 * @param {Array} arr
 */
window.flatten = function(arr) {
    return [].concat.apply([], objectValues(arr));
};

/**
 * Sort object by keys
 *
 * @param {Object} obj
 */
window.sortObjectKeys = obj => {
    return Object.keys(obj)
        .sort()
        .reduce((r, k) => ((r[k] = obj[k]), r), {});
};

/**
 * Get the first item in an array
 */
Object.defineProperty(Array.prototype,'first',{
    value: function () {
        return this[0];
    }
});

/**
 * Get the last item in an array
 */
Object.defineProperty(Array.prototype,'last',{
    value: function () {
        return this[this.length - 1];
    }
});
/**
 * it's a syntactic sugar to clone object
 *
 * @param source {Object} obj
 */
window.clone = function (source){
    if(typeof source !== "object"){
        return new Error('wrong type arguments')
    }
    return Object.assign({},source)
};
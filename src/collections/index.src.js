/**
 * @since 0.0.1
 * @copyright State of Victoria
 * @author State of Victoria
 * @version 1.0.0
 */

'use strict';

/**
 * collections singleton
 * @module collections
 */
angular.module('farmbuild.core')
	.factory('collections', function (validations, $log) {
		var collections = {},
			_isDefined = validations.isDefined,
			_isArray = validations.isArray,
			_equals = validations.equals;

		/**
		 * Finds an item in collection that matches this property and value
		 * @method byProperty
		 * @param {array} collection
		 * @param property
		 * @returns item at specified index or undefined if it's not found
		 * @param value
		 */
		function _byProperty(collection, property, value) {
			if (!_isArray(collection)) {
				return undefined;
			}
			if (!_isDefined(property)) {
				return undefined;
			}
			if (!_isDefined(value)) {
				return undefined;
			}

			var i = 0;
			for (i; i < collection.length; i++) {
				var item = collection[i];

				if (!item.hasOwnProperty(property)) {
					continue;
				}

				if (_equals(item[property], value)) {
					return item;
				}

			}
			return undefined;
		}

		/**
		 * add the item at specified index
		 * @method add
		 * @param {array} collection
		 * @param {object} item
		 * @param {number} index
		 * @returns {array} Collection
		 */
		function _add(collection, item, index) {
			if (_isDefined(index)) {
				collection.splice(index, 0, item)
			} else {
				collection.push(item);
			}
			return collection;
		};

		/**
		 * Whether this collection is empty
		 * @method isEmpty
		 * @returns {boolean}
		 * @param {array} collections
		 */
		function _isEmpty(collections) {
			return collections.length === 0;
		};

		/**
		 * returns the item at specified index
		 * @method count
		 * @returns {number} number of item in this collection
		 * @param {array} collection
		 */
		function _count(collection) {
			if (!angular.isArray(collection)) {
				return -1;
			}
			return collection.length;
		};

		/**
		 * returns the item at specified index
		 * @method at
		 * @returns item at specified index
		 * @param {array} collection
		 * @param {number} index
		 */
		function _at(collection, index) {
			return collection[index];
		};

		/**
		 * Removes the item at specified index
		 * @method removeAt
		 * @param {array} collection
		 * @param {number} index - zero based
		 * @returns Collection
		 */
		function _removeAt(collection, index) {
			if (!angular.isArray(collection)) {
				$log.warn('collection is not an array, returning as it is: %j', collection);
				return collection;
			}

			if (!_isDefined(index) || index < 0 || index > collection.length - 1) {
				$log.warn('index is out of range for the array, index: %s, collection.length: %s', index, collection.length);
				return collection;
			}

			collection.splice(index, 1);

			return collection;
		};

		/**
		 * Removes this item from collection
		 * @method remove
		 * @param {array} collections
		 * @param item - zero based
		 * @returns {array} Collection
		 */
		function _remove(collections, item) {
			$log.info('removing item %s ', item);

			if (!_isDefined(item)) {
				return undefined;
			}
			angular.forEach(collections, function (i, index) {
				if (angular.equals(i, item)) {
					_removeAt(collections, index);
				}
			});

			return collections;
		};

		/**
		 * Get the first item of this collection
		 * @method first
		 * @param {array} collection
		 * @returns item
		 */
		function _first(collection) {
			return collection[0];
		};

		/**
		 * Get the last item of this collection
		 * @method last
		 * @param {array} collection
		 * @returns item
		 */
		function _last(collection) {
			var length = _count(collection);
			return collection[length - 1];
		};

		collections = {
			add: _add,
			at: _at,
			size: _count,
			byProperty: _byProperty,
			removeAt: _removeAt,
			remove: _remove,
			first: _first,
			last: _last,
			isEmpty: _isEmpty
		};

		return collections;
	});
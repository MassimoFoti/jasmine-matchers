/* istanbul ignore if */
if(typeof(jQuery) === "undefined"){
	throw("Unable to find jQuery");
}

/* istanbul ignore else */
if(typeof(window.jasmineMatchers) === "undefined"){
	window.jasmineMatchers = {};
}

/**
 * @typedef {Object} jasmineMatchers.result
 *
 * @property {Boolean} pass
 * @property {String} [message]
 */

(function(){
	"use strict";

	jasmineMatchers.version = "0.3";

	/* Generic matchers */

	jasmineMatchers.toHaveProperty = function(){
		return {
			/**
			 * @param {Object} actual
			 * @param {String} propertyName
			 * @param {String} expectedValue
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, propertyName, expectedValue){
				var result = {
					pass: false
				};
				if(jQuery.type(propertyName) !== "string"){
					result.message = "Please specify the property as string";
					return result;
				}
				if(actual[propertyName] === undefined){
					result.message = "Property: " + propertyName + " not found";
					return result;
				}
				if(hasProperty(actual[propertyName], expectedValue) === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Expected: " + propertyName + " to equal: " + expectedValue + " but current value is: " + actual[propertyName];
					return result;
				}
			}
		};
	};

	jasmineMatchers.toHaveReadonly = function(){
		return {
			/**
			 * @param {Object} actual
			 * @param {String} property
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, property){
				var result = {
					pass: false
				};
				if(jQuery.type(property) !== "string"){
					result.message = "Please specify the name of the property as string";
					return result;
				}
				var desc = Object.getOwnPropertyDescriptor(actual, property);
				if(desc === undefined){
					result.message = "Unable to find property: " + property;
					return result;
				}
				if(desc.writable === false){
					result.pass = true;
					return result;
				}
				result.message = "Property: " + property + " is not readonly";
				return result;
			}
		};
	};

	jasmineMatchers.toMatchDuckType = function(){
		return {
			/**
			 * @param {Object} actual
			 * @param {Object} duckType
			 * @param {Boolean} [matchType] Define if we have to compare type of property. Default to true
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, duckType, matchType){
				var result = {
					pass: false
				};
				if(duckType === undefined){
					result.message = "Please specify an instance of a duckType";
					return result;
				}
				if(jQuery.type(actual) !== jQuery.type(duckType)){
					result.message = "Type mismatch, comparing: " + jQuery.type(actual) + " vs " + jQuery.type(duckType);
					return result;
				}
				if(matchType === undefined){
					// By default we check for type
					matchType = true;
				}
				for(var key in duckType){
					/* istanbul ignore else */
					if(duckType.hasOwnProperty(key) === true){
						var duckProp = duckType[key];
						if(actual.hasOwnProperty(key) === true){
							if(matchType === true){
								if(jQuery.type(duckProp) !== jQuery.type(actual[key])){
									result.pass = false;
									result.message = "Type of: ." + key + " does not match. Supposed to be: " + jQuery.type(duckProp);
									return result;
								}
							}
						}
						else{
							result.message = "The following duck property is missing: ." + key;
							return result;
						}
					}
				}
				result.pass = true;
				return result;
			}
		};
	};

	/* jQuery-based matchers */

	var hasProperty = function(actualValue, expectedValue){
		if(expectedValue === undefined){
			return actualValue !== undefined;
		}
		return actualValue === expectedValue;
	};

	jasmineMatchers.toBeChecked = function(){
		return {
			/**
			 * @param {jQuery} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				var result = {
					pass: false
				};
				if(jQuery(actual).is(":checked") === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Element is not checked";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeDisabled = function(){
		return {
			/**
			 * @param {jQuery} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				var result = {
					pass: false
				};
				if(jQuery(actual).is(":disabled") === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Element is not disabled";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeEmpty = function(){
		return {
			/**
			 * @param {jQuery} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				var result = {
					pass: false
				};
				if(jQuery(actual).is(":empty") === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Element is not empty";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeMatchedBy = function(){
		return {
			/**
			 * @param {jQuery} actual
			 * @param {String} selector
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, selector){
				var result = {
					pass: false
				};
				if(jQuery.type(selector) !== "string"){
					result.message = "Please specify the selector as string";
					return result;
				}
				if(jQuery(actual).filter(selector).length > 0){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Element not matched by: " + selector;
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeSelected = function(){
		return {
			/**
			 * @param {jQuery} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				var result = {
					pass: false
				};
				if(jQuery(actual).is(":selected") === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Element is not selected";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeVisible = function(){
		return {
			/**
			 * @param {jQuery} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				var result = {
					pass: false
				};
				if(jQuery(actual).is(":visible") === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Element is not visible";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toHaveAttr = function(){
		return {
			/**
			 * @param {jQuery} actual
			 * @param {String} attributeName
			 * @param {String} expectedValue
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, attributeName, expectedValue){
				var result = {
					pass: false
				};
				if(jQuery.type(attributeName) !== "string"){
					result.message = "Please specify the attribute as string";
					return result;
				}
				if(hasProperty(jQuery(actual).attr(attributeName), expectedValue) === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Attribute: " + attributeName + " does not match";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toHaveClass = function(){
		return {
			/**
			 * @param {jQuery} actual
			 * @param {String} className
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, className){
				var result = {
					pass: false
				};
				if(jQuery.type(className) !== "string"){
					result.message = "Please specify the name of the CSS class as string";
					return result;
				}
				if(jQuery(actual).hasClass(className) === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "CSS class: " + className + " not found";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toHaveCss = function(){
		return {
			/**
			 * @param {jQuery} actual
			 * @param {String} propertyName
			 * @param {String} expectedValue
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, propertyName, expectedValue){
				var result = {
					pass: false
				};
				if(jQuery.type(propertyName) !== "string"){
					result.message = "Please specify the CSS property as string";
					return result;
				}
				// Second case is Chrome only
				if(jQuery(actual).css(propertyName) === "" || jQuery(actual).css(propertyName) === "0px"){
					result.message = "CSS property: " + propertyName + " not found";
					return result;
				}
				if(hasProperty(jQuery(actual).css(propertyName), expectedValue) === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "CSS property: " + propertyName + " does not match";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toHaveProp = function(){
		return {
			/**
			 * @param {jQuery} actual
			 * @param {String} propertyName
			 * @param {String} expectedValue
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, propertyName, expectedValue){
				var result = {
					pass: false
				};
				if(jQuery.type(propertyName) !== "string"){
					result.message = "Please specify the property as string";
					return result;
				}
				if(hasProperty(jQuery(actual).prop(propertyName), expectedValue) === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Property: " + propertyName + " does not match";
					return result;
				}
			}
		};
	};

	jasmine.getEnv().beforeEach(function(){
		jasmine.getEnv().addMatchers(jasmineMatchers);
	});

}());
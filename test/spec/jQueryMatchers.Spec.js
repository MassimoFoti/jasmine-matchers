describe("jasmineMatchers", function(){

	"use strict";

	describe("Provides the following jQuery-based custom matchers for Jasmine:", function(){

		beforeEach(function(){
			jasmineFixtures.loadHTML("main.htm");
		});

		describe(".toBeChecked()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeChecked();
			});

			describe("Given a jQuery object or an HTMLElement", function(){

				describe("Matches if:", function(){

					it("The jQuery object is a checked checkbox", function(){
						var element = jQuery("#boxChecked");
						var result = matcher.compare(element);
						expect(result.pass).toBe(true);

						var node = document.getElementById("boxChecked");
						var nodeResult = matcher.compare(node);
						expect(nodeResult.pass).toBe(true);
					});

					it("The jQuery object is a checked radiobutton", function(){
						var element = jQuery("#radioChecked");
						var result = matcher.compare(element);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is neither a jQuery object nor a HTMLElement", function(){
						var notValidElement = "text";
						var result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The jQuery object is an unchecked checkbox", function(){
						var element = jQuery("#box");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not checked");
					});

					it("The jQuery object is an unchecked radiobutton", function(){
						var element = jQuery("#radio");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not checked");
					});

				});

			});

		});

		describe(".toBeDisabled()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeDisabled();
			});

			describe("Given a jQuery object or an HTMLElement", function(){

				describe("Matches if:", function(){

					it("The jQuery object is disabled", function(){
						var element = jQuery("#disabled");
						var result = matcher.compare(element);
						expect(result.pass).toBe(true);

						var node = document.getElementById("disabled");
						var nodeResult = matcher.compare(node);
						expect(nodeResult.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is neither a jQuery object nor a HTMLElement", function(){
						var notValidElement = "text";
						var result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The jQuery object is not disabled", function(){
						var element = jQuery("#enabled");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not disabled");
					});

				});

			});

		});

		describe(".toBeEmpty()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeEmpty();
			});

			describe("Given a jQuery object or an HTMLElement", function(){

				describe("Matches if:", function(){

					it("The jQuery object is empty", function(){
						var element = jQuery("#generic");
						var result = matcher.compare(element);
						expect(result.pass).toBe(true);

						var node = document.getElementById("generic");
						var nodeResult = matcher.compare(node);
						expect(nodeResult.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is neither a jQuery object nor a HTMLElement", function(){
						var notValidElement = "text";
						var result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The jQuery object contains child elements", function(){
						var element = jQuery("<div><span></span></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not empty");
					});

					it("The jQuery object contains text", function(){
						var element = jQuery("<div>test</div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not empty");
					});

				});

			});

		});

		describe(".toContainElement()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toContainElement();
			});

			describe("Given a jQuery object or HTMLElement (from now on Element1) and another jQuery object or HTMLElement (from now on Element2)", function(){

				describe("Matches if:", function(){

					it("Element2 is a child of Element1", function(){
						var element = jQuery("#container");
						var childElement = jQuery("#containedLevel1");
						var result = matcher.compare(element, childElement);
						expect(result.pass).toBe(true);

						var node = document.getElementById("container");
						var childNode = document.getElementById("containedLevel1");
						var nodeResult = matcher.compare(node, childNode);
						expect(nodeResult.pass).toBe(true);
					});

					it("Element2 is a child, with any nesting level, of Element1", function(){
						var element = jQuery("#container");
						var childElement = jQuery("#containedLevel2");
						var result = matcher.compare(element, childElement);
						expect(result.pass).toBe(true);

						var node = document.getElementById("container");
						var childNode = document.getElementById("containedLevel2");
						var nodeResult = matcher.compare(node, childNode);
						expect(nodeResult.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("Element2 is not a child of the Element1", function(){
						var element = jQuery("#container");
						var notChildElement = jQuery("#notContained");
						var result = matcher.compare(element, notChildElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element " + notChildElement + " is not contained in " + element);
					});

					it("Only one argument is provided", function(){
						var element = jQuery("#container");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element as child");
					});

					it("Element1 is neither a jQuery object nor a HTMLElement", function(){
						var notValidElement = "text";
						var result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element as parent");
					});

					it("Element2 is neither a jQuery object nor a HTMLElement", function(){
						var element = jQuery("#container");
						var notValidChildElement = "text";
						var result = matcher.compare(element, notValidChildElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element as child");
					});

				});

			});

		});

		describe(".toContainElementsMatching()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toContainElementsMatching();
			});

			describe("Given a jQuery object or HTMLElement (from now on Container), a selector and optionally a cardinality", function(){

				describe("Matches if:", function(){

					it("The cardinality is undefined and the Container contains at least one element matching the selector", function(){
						var element = jQuery("#container");
						var node = document.getElementById("container");

						// One child
						var selectorById = "#containedLevel1";
						var resultById = matcher.compare(element, selectorById);
						expect(resultById.pass).toBe(true);

						var nodeResultById = matcher.compare(node, selectorById);
						expect(nodeResultById.pass).toBe(true);

						// More than one child, at any nesting level
						var selectorByClass = ".groupA";
						var resultByClass = matcher.compare(element, selectorByClass);
						expect(resultByClass.pass).toBe(true);

						var nodeResultByClass = matcher.compare(node, selectorByClass);
						expect(nodeResultByClass.pass).toBe(true);
					});

					it("The Container contains n elements matching the selector, where n is equal to the provided cardinality", function(){
						var element = jQuery("#container");
						var node = document.getElementById("container");

						// One child
						var selectorById = "#containedLevel1";
						var cardinalityById = 1;
						var resultById = matcher.compare(element, selectorById, cardinalityById);
						expect(resultById.pass).toBe(true);

						var nodeResultById = matcher.compare(node, selectorById, cardinalityById);
						expect(nodeResultById.pass).toBe(true);

						// More than one child, at any nesting level
						var selectorByClass = ".groupA";
						var cardinalityByClass = 2;
						var resultByClass = matcher.compare(element, selectorByClass, cardinalityByClass);
						expect(resultByClass.pass).toBe(true);

						var nodeResultByClass = matcher.compare(node, selectorByClass, cardinalityByClass);
						expect(nodeResultByClass.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The cardinality is undefined, and there aren't elements in Container matching the selector", function(){
						var element = jQuery("#container");
						var selector = ".notExistingElement";

						var result = matcher.compare(element, selector);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element " + element + " does not contain any element matched by: " + selector);
					});

					it("There are more elements in Container matching the selector than what specified by the cardinality", function(){
						var element = jQuery("#container");
						var selector = ".groupA";
						var wrongCardinality = 1;

						var result = matcher.compare(element, selector, wrongCardinality);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element " + element + " contains 2 elements matched by: " + selector + " and not " + wrongCardinality);
					});

					it("There are less elements in Container matching the selector than what specified by the cardinality", function(){
						var element = jQuery("#container");
						var selector = ".groupA";
						var wrongCardinality = 3;

						var result = matcher.compare(element, selector, wrongCardinality);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element " + element + " contains 2 elements matched by: " + selector + " and not " + wrongCardinality);
					});

					it("Only one argument is provided", function(){
						var element = jQuery("#container");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the selector as string");
					});

					it("Container is neither a jQuery object nor a HTMLElement", function(){
						var notValidElement = "text";
						var result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element as container");
					});

					it("The selector provided is not a string", function(){
						var element = jQuery("#container");
						var notValidSelector = 1;
						var result = matcher.compare(element, notValidSelector);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the selector as string");
					});

					it("The cardinality provided is not a number", function(){
						var element = jQuery("#container");
						var selector = ".groupA";
						var notValidCardinality = "mockCardinality";
						var result = matcher.compare(element, selector, notValidCardinality);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the cardinality as number");
					});

				});

			});

		});

		describe(".toBeMatchedBy()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeMatchedBy();
			});

			describe("Given a jQuery object or an HTMLElement and a selector", function(){

				describe("Matches if:", function(){

					it("The jQuery object matches the selector", function(){
						var element = jQuery("#generic");
						var result = matcher.compare(element, "div");
						expect(result.pass).toBe(true);
						var moreResult = matcher.compare(element, ".test");
						expect(moreResult.pass).toBe(true);

						var node = document.getElementById("generic");
						var nodeResult = matcher.compare(node, "div.test");
						expect(nodeResult.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is neither a jQuery object nor a HTMLElement", function(){
						var notValidElement = "text";
						var result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The jQuery object does not matches the selector", function(){
						var element = jQuery("<div class='test'></div>");
						var result = matcher.compare(element, "span");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element not matched by: span");
					});

					it("Only one argument is provided", function(){
						var element = jQuery("<div></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the selector as string");
					});

				});

			});

		});

		describe(".toBeSelected()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeSelected();
			});

			describe("Given a jQuery object or an HTMLElement", function(){

				describe("Matches if:", function(){

					it("The jQuery object is selected", function(){
						var element = jQuery("#selected");
						var result = matcher.compare(element);
						expect(result.pass).toBe(true);

						var node = document.getElementById("selected");
						var nodeResult = matcher.compare(node);
						expect(nodeResult.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is neither a jQuery object nor a HTMLElement", function(){
						var notValidElement = "text";
						var result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The jQuery object is not selected", function(){
						var element = jQuery("#unselected");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not selected");
					});

				});

			});

		});

		describe(".toBeVisible()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeVisible();
			});

			describe("Given a jQuery object or an HTMLElement", function(){

				describe("Matches if:", function(){

					it("The jQuery object is visible", function(){
						var genericResult = matcher.compare(jQuery("#generic"));
						expect(genericResult.pass).toBe(true);
						var blockResult = matcher.compare(jQuery("#blockDisplay"));
						expect(blockResult.pass).toBe(true);
						var visibilityResult = matcher.compare(jQuery("#visibleVisibility"));
						expect(visibilityResult.pass).toBe(true);

						var node = document.getElementById("generic");
						var nodeResult = matcher.compare(node);
						expect(nodeResult.pass).toBe(true);
					});

					it("The jQuery object CSS has both height and width set to zero", function(){
						var zeroDimensionsResult = matcher.compare(jQuery("#zeroDimensions"));
						expect(zeroDimensionsResult.pass).toBe(true);
					});

					it("The jQuery object CSS contains: visibility: hidden (it takes space in the document)", function(){
						var hiddenVisibilityResult = matcher.compare(jQuery("#hiddenVisibility"));
						expect(hiddenVisibilityResult.pass).toBe(true);
					});

					it("The jQuery object CSS contains: opacity: 0 (it takes space in the document)", function(){
						var opacityResult = matcher.compare(jQuery("#zeroOpacity"));
						expect(opacityResult.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is neither a jQuery object nor a HTMLElement", function(){
						var notValidElement = "text";
						var result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The jQuery object CSS contains display: none", function(){
						var noneDisplayResult = matcher.compare(jQuery("#noneDisplay"));
						expect(noneDisplayResult.pass).toBe(false);
						expect(noneDisplayResult.message).toBe("Element is not visible");
					});

					it("The jQuery object CSS has a parent with display: none", function(){
						var noneDisplayResult = matcher.compare(jQuery("#hiddenByParent"));
						expect(noneDisplayResult.pass).toBe(false);
						expect(noneDisplayResult.message).toBe("Element is not visible");
					});

					it("The jQuery object is not part of the current document DOM", function(){
						var element = jQuery("<div></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not visible");
					});

				});

			});

		});

		describe(".toHaveAttr()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveAttr();
			});

			describe("Given a jQuery object or an HTMLElement, the name of an attribute and an optional value", function(){

				describe("Matches if:", function(){

					it("The attribute is found", function(){
						var element = jQuery("#generic");
						var result = matcher.compare(element, "class");
						expect(result.pass).toBe(true);

						var node = document.getElementById("generic");
						var nodeResult = matcher.compare(node, "class", "test");
						expect(nodeResult.pass).toBe(true);
					});

					it("The attribute is found and its value matches", function(){
						var element = jQuery("<div class='test'></div>");
						var result = matcher.compare(element, "class", "test");
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is neither a jQuery object nor a HTMLElement", function(){
						var notValidElement = "text";
						var result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The attribute is not found", function(){
						var element = jQuery("<div class='test'></div>");
						var result = matcher.compare(element, "missing");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Attribute: missing does not match");
					});

					it("The attribute is found, but its value does not matches", function(){
						var element = jQuery("<div class='test'></div>");
						var result = matcher.compare(element, "class", "missing");
						expect(result.pass).toBe(false);
					});

					it("Only one argument is provided", function(){
						var element = jQuery("<div id='x'></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the attribute as string");
					});

				});

			});

		});

		describe(".toHaveClass()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveClass();
			});

			describe("Given a jQuery object or an HTMLElement and the name of a CSS class", function(){

				describe("Matches if:", function(){

					it("The class is found", function(){
						var element = jQuery("#generic");
						var result = matcher.compare(element, "test");
						expect(result.pass).toBe(true);

						var node = document.getElementById("generic");
						var nodeResult = matcher.compare(node, "test");
						expect(nodeResult.pass).toBe(true);
					});

					it("The jQuery object also contains multiple classes other then the given one", function(){
						var element = jQuery("<div class='test more'></div>");
						var result = matcher.compare(element, "test");
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is neither a jQuery object nor a HTMLElement", function(){
						var notValidElement = "text";
						var result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The class is not found", function(){
						var element = jQuery("<div class='test'></div>");
						var result = matcher.compare(element, "missing");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("CSS class: missing not found");
					});

					it("Only one argument is provided", function(){
						var element = jQuery("<div></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the name of the CSS class as string");
					});

				});

			});

		});

		describe(".toHaveCss()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveCss();
			});

			describe("Given a jQuery object or an HTMLElement, the name of a CSS property and an optional value. Check the computed style property", function(){

				describe("Matches if:", function(){

					it("The CSS property is found inside an inline style", function(){
						var element = jQuery("#blockDisplay");
						var result = matcher.compare(element, "display");
						expect(result.pass).toBe(true);

						var node = document.getElementById("blockDisplay");
						var nodeResult = matcher.compare(node, "display");
						expect(nodeResult.pass).toBe(true);
					});

					it("The CSS property is found inside an embedded style", function(){
						var element = jQuery("#computed");
						var result = matcher.compare(element, "box-sizing");
						expect(result.pass).toBe(true);
					});

					it("The CSS property is found inside an inline style and its value matches", function(){
						var element = jQuery("#blockDisplay");
						var result = matcher.compare(element, "display", "block");
						expect(result.pass).toBe(true);
					});

					it("The CSS property is found inside an embedded style and its value matches", function(){
						var element = jQuery("#computed");
						var result = matcher.compare(element, "box-sizing", "border-box");
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is neither a jQuery object nor a HTMLElement", function(){
						var notValidElement = "text";
						var result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The CSS property is not found", function(){
						var element = jQuery("#blockDisplay");
						var result = matcher.compare(element, "border-width");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("CSS property: border-width not found");
					});

					it("The CSS property is found, but its value does not matches", function(){
						var element = jQuery("#blockDisplay");
						var result = matcher.compare(element, "display", "xxx");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("CSS property: display does not match");
					});

					it("Only one argument is provided", function(){
						var element = jQuery("<div id='x'></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the CSS property as string");
					});

				});

			});

		});

		describe(".toHaveProp()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveProp();
			});

			describe("Given a jQuery object or an HTMLElement, the name of a property and an optional value", function(){

				describe("Matches if:", function(){

					it("The property is found", function(){
						var element = jQuery("#radioChecked");
						var result = matcher.compare(element, "checked");
						expect(result.pass).toBe(true);

						var node = document.getElementById("radioChecked");
						var nodeResult = matcher.compare(node, "checked");
						expect(nodeResult.pass).toBe(true);
					});

					it("The property is found and its value matches", function(){
						var element = jQuery("#radioChecked");
						var result = matcher.compare(element, "checked", true);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is neither a jQuery object nor a HTMLElement", function(){
						var notValidElement = "text";
						var result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The property is not found", function(){
						var element = jQuery("#radioChecked");
						var result = matcher.compare(element, "missing");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Property: missing does not match");
					});

					it("The property is found, but its value does not matches", function(){
						var element = jQuery("#radioChecked");
						var result = matcher.compare(element, "checked", "false");
						expect(result.pass).toBe(false);
					});

					it("Only one argument is provided", function(){
						var element = jQuery("#generic");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the property as string");
					});

				});

			});

		});

	});

});
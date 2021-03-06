
'use strict';

var positionListType = window._WebAnimationsTestingUtilities._positionListType;
var testParse = function(input, expected) {
  test(function() {
    var result = positionListType.fromCssValue(input);
    if (result) {
      result = positionListType.toCssValue(result);
    }
    assert_equals(result, expected);
  }, 'from/toCssValue: ' + input);
};

var testAdd = function(base, delta, expected) {
  test(function() {
    assert_equals(positionListType.toCssValue(positionListType.add(
        positionListType.fromCssValue(base),
        positionListType.fromCssValue(delta))), expected);
  }, 'add: ' + base + ' with ' + delta);
};

var testInterpolate = function(parameters) {
  test(function() {
    assert_equals(positionListType.toCssValue(positionListType.interpolate(
        positionListType.fromCssValue(parameters.from),
        positionListType.fromCssValue(parameters.to),
        parameters.fraction)), parameters.expected);
  }, 'interpolate: ' + parameters.from + ' to ' + parameters.to + ' at ' + parameters.fraction);
};

testParse('', '0% 0%');

testParse('left', '0% 50%');
testParse('center', '50% 50%');
testParse('right', '100% 50%');
testParse('top', '50% 0%');
testParse('bottom', '50% 100%');
testParse('10px', '10px 50%');
testParse('25%', '25% 50%');
testParse('calc(80% - 15px)', 'calc(80% + -15px) 50%');

testParse('0% 0%', '0% 0%');
testParse('0px 0px', '0px 0px');
testParse('left left', undefined);
testParse('left center', '0% 50%');
testParse('left right', undefined);
testParse('left top', '0% 0%');
testParse('left bottom', '0% 100%');
testParse('left 10px', '0% 10px');
testParse('left 25%', '0% 25%');
testParse('left calc(80% - 15px)', '0% calc(80% + -15px)');
testParse('center left', '0% 50%');
testParse('center center', '50% 50%');
testParse('center right', '100% 50%');
testParse('center top', '50% 0%');
testParse('center bottom', '50% 100%');
testParse('center 10px', '50% 10px');
testParse('center 25%', '50% 25%');
testParse('center calc(80% - 15px)', '50% calc(80% + -15px)');
testParse('right left', undefined);
testParse('right center', '100% 50%');
testParse('right right', undefined);
testParse('right top', '100% 0%');
testParse('right bottom', '100% 100%');
testParse('right 10px', '100% 10px');
testParse('right 25%', '100% 25%');
testParse('right calc(80% - 15px)', '100% calc(80% + -15px)');
testParse('top left', '0% 0%');
testParse('top center', '50% 0%');
testParse('top right', '100% 0%');
testParse('top top', undefined);
testParse('top bottom', undefined);
testParse('top 10px', undefined);
testParse('top 25%', undefined);
testParse('top calc(80% - 15px)', undefined);
testParse('bottom left', '0% 100%');
testParse('bottom center', '50% 100%');
testParse('bottom right', '100% 100%');
testParse('bottom top', undefined);
testParse('bottom bottom', undefined);
testParse('bottom 10px', undefined);
testParse('bottom 25%', undefined);
testParse('bottom calc(80% - 15px)', undefined);
testParse('10px left', undefined);
testParse('10px center', '10px 50%');
testParse('10px right', undefined);
testParse('10px top', '10px 0%');
testParse('10px bottom', '10px 100%');
testParse('10px 10px', '10px 10px');
testParse('10px 25%', '10px 25%');
testParse('10px calc(80% - 15px)', '10px calc(80% + -15px)');
testParse('25% left', undefined);
testParse('25% center', '25% 50%');
testParse('25% right', undefined);
testParse('25% top', '25% 0%');
testParse('25% bottom', '25% 100%');
testParse('25% 10px', '25% 10px');
testParse('25% 25%', '25% 25%');
testParse('25% calc(80% - 15px)', '25% calc(80% + -15px)');
testParse('calc(80% - 15px) left', undefined);
testParse('calc(80% - 15px) center', 'calc(80% + -15px) 50%');
testParse('calc(80% - 15px) right', undefined);
testParse('calc(80% - 15px) top', 'calc(80% + -15px) 0%');
testParse('calc(80% - 15px) bottom', 'calc(80% + -15px) 100%');
testParse('calc(80% - 15px) 10px', 'calc(80% + -15px) 10px');
testParse('calc(80% - 15px) 25%', 'calc(80% + -15px) 25%');
testParse('calc(80% - 15px) calc(80% - 15px)', 'calc(80% + -15px) calc(80% + -15px)');

testParse('left left 10px', undefined);
testParse('left center left', undefined);
testParse('left center 25%', undefined);
testParse('left right center', undefined);
testParse('left right calc(80% - 15px)', undefined);
testParse('left bottom 10px', '0% calc(-10px + 100%)');
testParse('left 10px right', undefined);
testParse('left 25% 25%', undefined);
testParse('left calc(80% - 15px) top', 'calc(80% + -15px) 0%');
testParse('center left top', undefined);
testParse('center center left', undefined);
testParse('center center center', undefined);
testParse('center right 10px', 'calc(-10px + 100%) 50%');
testParse('center top 25%', '50% 25%');
testParse('center 25% left', undefined);
testParse('right left right', undefined);
testParse('right left 25%', undefined);
testParse('right center 10px', undefined);
testParse('right right 25%', undefined);
testParse('right top 10px', '100% 10px');
testParse('right bottom 25%', '100% 75%');
testParse('right 25% bottom', '75% 100%');
testParse('right 10px 25%', undefined);
testParse('top left 25%', '25% 0%');
testParse('top center 25%', undefined);
testParse('top 10px right', '100% 10px');
testParse('top 10px 10px', undefined);
testParse('top calc(80% - 15px) center', '50% calc(80% + -15px)');
testParse('bottom left 10px', '10px 100%');
testParse('bottom calc(80% - 15px) right', '100% calc(20% + 15px)');
testParse('bottom calc(80% - 15px) bottom', undefined);
testParse('10px left center', undefined);
testParse('10px right 25%', undefined);
testParse('10px 25% bottom', undefined);
testParse('25% 25% 25%', undefined);
testParse('calc(80% - 15px) calc(80% - 15px) right', undefined);

testParse('left 25% left 10px', undefined);
testParse('left center left 10px', undefined);
testParse('left center top 25%', undefined);
testParse('left 10px right calc(80% - 15px)', undefined);
testParse('left 10px bottom 10px', '10px calc(-10px + 100%)');
testParse('left 25% top 25%', '25% 25%');
testParse('left calc(80% - 15px) top 10px', 'calc(80% + -15px) 10px');
testParse('center left top 10px', undefined);
testParse('center center left 25%', undefined);
testParse('center center center 10px', undefined);
testParse('center 25% right 10px', undefined);
testParse('right left right 25%', undefined);
testParse('right 10px right 25%', undefined);
testParse('top 10px center 25%', undefined);
testParse('top 10px right calc(80% - 15px)', 'calc(20% + 15px) 10px');
testParse('top 10px 10px right', undefined);
testParse('bottom calc(80% - 15px) left 10px', '10px calc(20% + 15px)');
testParse('calc(80% - 15px) 10px right 25%', undefined);
testParse('10px 25% bottom 25%', undefined);
testParse('25% 25% 25% 25%', undefined);

testParse('10px right, center center', undefined);
testParse('25% calc(80% - 15px), right 10px', '25% calc(80% + -15px), 100% 10px');
testParse('left calc(80% - 15px) top, 25% calc(80% - 15px)', 'calc(80% + -15px) 0%, 25% calc(80% + -15px)');
testParse('right left 25%, left calc(80% - 15px) top', undefined);
testParse('top center 25%, right left 25%', undefined);

testParse('10px right, center center, 25% calc(80% - 15px), right 10px', undefined);
testParse('right calc(80% - 15px) top, 25% calc(80% - 15px), top left 25%, left calc(80% - 15px) top', 'calc(20% + 15px) 0%, 25% calc(80% + -15px), 25% 0%, calc(80% + -15px) 0%');
testParse('calc(80% - 15px) 10px right 25%, left calc(80% - 15px) top 10px, center center, calc(80% - 15px) 10px right 25%', undefined);

testParse('aoeu', undefined);
testParse('aoeu, asdf', undefined);
testParse('laft 45%', undefined);


// Last parameter is expected result.
testAdd('0px 0px', '0px 0px', '0px 0px');
testAdd('0px 0px', '25px 50px', '25px 50px');
testAdd('0% 0%', '25% 50%', '25% 50%');
testAdd('10px 10%', '25px 50%', '35px 60%');
testAdd('10px 10%', '25% 50px', 'calc(10px + 25%) calc(10% + 50px)');
testAdd('10px 10%, 10px 10px', '25px 50%', '35px 60%, 10px 10px');
testAdd('10px 10%', '25px 50%, 10px 10px', '35px 60%, 10px 10px');
testAdd('10px 10%, 5% 5px', '25px 50%, 20% 20px', '35px 60%, 25% 25px');


testInterpolate({
  from: '0px 0px',
  to: '0px 0px',
  fraction: 0.2,
  expected: '0px 0px'});
testInterpolate({
  from: '0px 0px',
  to: '25px 50px',
  fraction: 0.2,
  expected: '5px 10px'});
testInterpolate({
  from: '0% 0%',
  to: '25% 50%',
  fraction: 0.2,
  expected: '5% 10%'});
testInterpolate({
  from: '10px 10%',
  to: '25px 50%',
  fraction: 0.2,
  expected: '13px 18%'});
testInterpolate({
  from: '10px 10%',
  to: '25% 50px',
  fraction: 0.2,
  expected: 'calc(8px + 5%) calc(8% + 10px)'});
testInterpolate({
  from: '10px 10%, 10px 10px',
  to: '25px 50%',
  fraction: 0.2,
  expected: '13px 18%, 8px 8px'});
testInterpolate({
  from: '10px 10%',
  to: '25px 50%, 10px 10px',
  fraction: 0.2,
  expected: '13px 18%, 2px 2px'});
testInterpolate({
  from: '10px 10%, 5% 5px',
  to: '25px 50%, 20% 20px',
  fraction: 0.2,
  expected: '13px 18%, 8% 8px'});


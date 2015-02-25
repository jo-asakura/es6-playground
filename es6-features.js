// 1. Block scope
// ---
(function blockScope() {
  function blockScopeTest() {
    var x = 'initial value';
    if (1 === 1) {
      let x = 'trying to overwrite';
    }
    return x;
  }

  console.log(blockScopeTest()); // initial value
})();


// 2. Constants
// ---
(function constants() {
  const constVariable = 1;
  constVariable = 2; // <-- nope, constVariable is read-only
})();


// 3. Destructuring
// ---
(function destructuringExample() {
  // note: remember that in destructuring assignments "target <= source"
  // and not "source => target" like we used to see it;
  // thus, you have to train your brain for the inversion

  // array destructuring assignment
  let [foo, bar] = ['hello', 'world', 'another value', 'last value'];
  console.log(foo, ', ', bar); // hello , world

  // swap
  [foo, bar] = [bar, foo];
  console.log(foo, ', ', bar); // world , hello

  // array destructuring assignment with gathering the rest into an array
  let [wild, ...rest] = ['hello', 'world', 'foo', 'bar'];
  console.log(wild); // hello
  console.log(rest); // world,foo,bar

  // object destructuring assignment
  function giveMeObj() {
    return {
      prop1: 'hello',
      prop2: 'world'
    };
  }

  let { prop1: a1, prop2: a2 } = giveMeObj();
  console.log(a1, a2); // hello world
})();


// 4. Arrow functions
// ---
(function arrowFunction() {
  var promiseFunc = new window.Promise((resolve, reject) => resolve('you did it!'));
  promiseFunc.then(res => console.log(res)); // you did it!

  let arrorFunc = (x, y) => console.log(x, y);
  arrorFunc('it', 'works'); // it works

  var objDef = {
    key: 'value of objDef',
    print: function () {
      return () => 'new: ' + this.key // <-- auto binds to this
    },
    oldPrint: function () { // <-- old way of getting the same result
      return function () {
        return 'old: ' + this.key;
      }.bind(this);
    }
  };

  var anotherScopeObj1 = objDef.print();
  console.log(anotherScopeObj1()); // new: value of objDef

  var anotherScopeObj2 = objDef.oldPrint();
  console.log(anotherScopeObj2()); // old: value of objDef
})();


// 5. Default params
// ---
(function defaultParams() {
  var say = {
    word: function (w = 'word') {
      console.log(w);
    }
  };
  say.word(); // word
  say.word('another word'); // another word

  // null, undefined, and more...
  function sum(x = 1, y = 5) {
    return x + y;
  }
  console.log(sum(2, 10)); // 12
  console.log(sum(10)); // 15
  console.log(sum(null, null)); // 0
  console.log(sum()); // 6
  console.log(sum(null, 10)); // 10
  console.log(sum(undefined, 2)); // 3
  console.log(sum(undefined, undefined)); // 6

  // expression as a default value
  function power_sum(x = 2, y = 3, z = sum(x, y)) {
    return z;
  }
  console.log(power_sum(1, 2)); // 3
  console.log(power_sum(10, 5)); // 15
  console.log(power_sum(5, null)); // 5
  console.log(power_sum(null, undefined)); // 3
  console.log(power_sum(null, null)); // 0
  console.log(power_sum()); // 5
  console.log(power_sum(null, null, 99)); // 99

  // ajax done right \o/
  function ajax(data, cb = window.Function.prototype) {
    // ..
    cb('error', 'response');
  }
  ajax({ url: '/test.me' });
  ajax({ url: '/test.me' }, function (err, data) {
    console.log(err, data);
  });
})();


// 6. Computed property names
// ---
(function computedProps() {
  var prefix = 'scope_';

  // old school way
  var oldWayObj = {};
  oldWayObj[prefix + 'x'] = 'value x';
  oldWayObj[prefix + 'y'] = 'value y';
  console.log(window.JSON.stringify(oldWayObj)); // {"scope_x":"value x","scope_y":"value y"}

  // es6 way
  var es6Obj = {
    [prefix + 'x']: 'value x',
    [prefix + 'y']: 'value y'
  };
  console.log(window.JSON.stringify(es6Obj)); // {"scope_x":"value x","scope_y":"value y"}
})();


// 7. Spread & rest
// ---
(function spreadAndRest1() {
  // in the following example processArgs function takes
  // the first argument explicitly and gathers the rest into array called rest;
  // then it logs that first element and calls itself with spreaded out rest array
  function processArgs(first, ...rest) {
    console.log(first);
    if (rest.length) {
      processArgs(...rest);
    }
  };

  // ... in front of an array spreads it out into individual values
  processArgs(...['A', 'B', 'C', 'D']); // A B C D
})();

(function spreadAndRest2() {
  function newWay(...args) {
    // log as an array
    console.log('Array: ', args);
    // log as individual values
    console.log('Variables: ', ...args);
  }

  function oldWay() {
    var args = window.Array.prototype.slice.call(arguments);
    // log as an array
    console.log('Array: ', args);
    // log as individual values
    var log = console.log.bind(window.console, 'Variables: ');
    args.forEach(function (arg) {
      log = log.bind(window.console, arg);
    });
    log();
  }

  newWay(1, 2, 3, 4, 5);
  oldWay(1, 2, 3, 4, 5);
})();


// 8. Named params
// ---
(function namedParams() {
  var stringValue = 'foo bar.';

  var objValues = {
    prop1: 'hello, ',
    prop2: 'world!'
  };

  var objMoreValues = {
    prop1: 'read',
    prop2: 'that',
    prop3: 'book!'
  };

  function testNamedParams(a, { prop1, prop2, prop3 = 'default param' }) {
    console.log(a, prop1, prop2, prop3);
  }

  testNamedParams(stringValue, objValues); // foo bar. hello, world! default param
  testNamedParams(stringValue, objMoreValues); // foo bar. read that book!
})();


// 9. String templates
// ---
(function stringTemplates() {
  let name = 'Alex';
  console.log(`Hello, ${name}!`); // Hello, Alex!

  let ten = 10;
  let five = 5;
  console.log(`It can do math: ${ten} + ${five} = ${ten + five}`); // It can do math: 10 + 5 = 15

  let fun = () => { return "I'm a result of a function call."; };
  console.log(`Function call! ${fun()}`); // Function call! I'm a result of a function call.

  let line1 = 'foo bar.';
  let line2 = 'hello, world!';
  let result = `line #1 ${line1}
  and line #2 ${line2}`;
  console.log(result);
  // line #1 foo bar.
  // and line #2 hello, world!

  var dict = {
    'Alex': 'Александр',
    'Russia': 'Россия'
  };

  function taggedTemplatesLocalization(pieces) {
    var values = [].slice.call(arguments, 1);
    return values.reduce(function(memo, value, idx) {
      memo += dict[value] + pieces[idx + 1];
      return memo;
    }, pieces[0]);
  }

  let name = 'Alex';
  let country = 'Russia';
  console.log(taggedTemplatesLocalization`Hello, ${name}! Your country is ${country}.`);
  // Hello, Александр! Your country is Россия.
})();


// 10. string API sugar
// ---
(function stringsSugar() {
  var someString = 'Some text here!';
  console.log(someString.startsWith('Some')); // true
  console.log(someString.includes('me te')); // true
  console.log(someString.endsWith('!')); // true
})();


// 11. Object literal shorthand
// ---
(function objectLiteralShorthand() {
  var name = 'Alex';
  var age = 30;
  var shortObj = { name, age };
  console.log(JSON.stringify(shortObj, null, 2)); // { "name": "Alex", "age": 30 }

  var shortObjWithFunc = {
    oldWay: function () { return 'A'; },
    newWay() { return 'B'; }
  };
  console.log(shortObjWithFunc.oldWay()); // A
  console.log(shortObjWithFunc.newWay()); // B
})();


// 12. Object.assign === extend, ya!
(function objectAssign() {
  var obj1 = { key: 'A' };
  var obj2 = { anotherKey: 'B' };
  var obj3 = 'nothing here';
  var objExtended = Object.assign(obj1, obj2, { obj3 });
  console.log(JSON.stringify(objExtended, null, 2)); // { "key": "A", "anotherKey": "B", "o3": "nothing here" }

  obj1.new = 'blah'; // it also updates objExtended
  console.log(JSON.stringify(objExtended, null, 2)); // { "key": "A", "anotherKey": "B", "obj3": "nothing here", "new": "blah" }

  var objDeepExtended = Object.assign({}, obj2, { obj3 });
  console.log(JSON.stringify(objDeepExtended, null, 2)); // { "anotherKey": "B", "o3": "nothing here" }
})();


// 13. Arrays
(function arrays() {
  // findIndex
  var arr1 = ['A', 'B', 'C', 'D'];
  var idx1 = arr1.findIndex((x, idx) => x === 'C');
  console.log(idx1); // 2

  // find
  var arr2 = [
    { key: 1, value: 'foo' },
    { key: 2, value: 'bar' },
    { key: 3, value: 'world' }
  ];
  var found1 = arr2.find((x) => x.key === 2);
  console.log(found1.value); // bar

  // from
  var arr3 = [
    { key: 1, value: 'foo' },
    { key: 2, value: 'bar' }
  ];
  var from1 = window.Array.from(arr3, (x) => x.value);
  console.log(from1); // ["foo", "bar"]

  var arr4 = 'abcdef';
  var from2 = window.Array.from(arr4);
  console.log(from2); // ["a", "b", "c", "d", "e", "f"]
})();


// 14. Loops
// ---
(function loops() {
  for (let el of [1, 2, 3]) {
    console.log(el);
  } // 1 2 3

  let arrLoopObj = {
    prop1: 1,
    prop2: 2,
    prop3: 3
  };
  for (let el of Object.keys(arrLoopObj)) {
    console.log(el);
  } // prop1 prop2 prop3

  // loop using generator
  function* loopKeys(obj) {
    for (let k of Object.keys(obj)) {
      yield [k, obj[k]];
    }
  }

  var arrGenLoop = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3'
  };

  for (let [key, value] of loopKeys(arrGenLoop)) {
    console.log('{ ', key, '= ', value, ' }');
  } // { prop1 = value1 } { prop2 = value2 } { prop3 = value3 }
})();


// 15. Generators
// ---
(function generators() {
  function* simpleGen() {
    yield "hello";
    yield "world";
  }

  var simpleGenIns = simpleGen();
  console.log(JSON.stringify(simpleGenIns.next())); // {"value":"hello","done":false}
  console.log(JSON.stringify(simpleGenIns.next())); // {"value":"world","done":false}
  console.log(JSON.stringify(simpleGenIns.next())); // {"done":true}
})();


// 16. Set (a collection with no duplicates)
// ---
(function sets() {
  var set = new window.Set();

  set.add('value-1');
  set.add('value-2');
  set.add('value-2');
  set.add('value-2');

  for (let s of set) {
    console.log(s);
  } // value-1 value-2

  var set2 = new window.Set([1, 1, 2, 2, 2, 3]);
  for (let s of set2) {
    console.log(s);
  } // 1 2 3
  console.log([...set2]); // back to array: [1, 2, 3]
})();


// 17. Promises
// ---
(function promises() {
  let simplePromise = () => new window.Promise(
    (resolve, reject) => resolve("hello")
  );

  simplePromise()
    .then(
      (data) => console.log('data:', data),
      (err) => console.log('err:', err)
    ); // data: hello


  let delayedPromise = () => new window.Promise(
    (resolve, reject) => {
      // timeout if we don't get it under 1 sec
      setTimeout(() => reject('timeout'), 1000);

      (function externalCall() {
        var cb = (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        };

        setTimeout(() => cb(null, 'done'), 1500);
      })();
    }
  );

  delayedPromise()
    .then(
      (data) => console.log(data),
      (err) => console.log(err)
    ); // timeout (because externalCall takes 1500ms)



  window.Promise
    .all([
      new window.Promise(
        (resolve, reject) => {
          resolve('ya1');
        }
      ),
      new window.Promise(
        (resolve, reject) => {
          resolve('ya2');
        }
      )
    ])
    .then(
      (data) => console.log('done', data),
      (err) => console.log('error')
    ); // done ya1,ya2
})();

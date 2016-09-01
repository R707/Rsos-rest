/**
 * Created by cavasblack on 16/9/1.
 */
// var set = new Set();
//
// set.add("params1")
// set.add("params1")
// set.add("params1")
// set.add("params1")
// set.add("params1")
//
// console.log(set)

var fn = function(){
    console.log([].slice.apply(arguments))
}

fn(1,2,3,4,5,6)
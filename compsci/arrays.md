


# Quick Guide: Arrays

`Arrays` and Array like data structures are a fundamental part of object oriented programming. Array like prototypes and their built in manipulation methods form the foundation of several more complex data structures that we will discuss here. This is by no means an exhaustive discussion and it's assumed that you already have a working knowledge of Array manipulation. For illustrative purposes we will be using `JavaScript` so please be sure to visit the documentation for your programming language of choice for more details. 

## Fundamental Manipulation

### Lookup and Search

~~~js

    const arr = [1,2,3];

    // the length of an array can be called in constant time as the prototype tracks number of indices.
    const length = arr.length; // -> length === 3 O(1)

    // if the index of an item is known, lookup time is constant. 
    const idx0 = arr[0]; // -> idx0 ==== 1 O(1)

    // if the index of an item is unknown, lookup is done in linear time as every element may need to be checked. 
    const hackedIncludes = (data, array) => {
        for (let item of array) {
            if (item === data) return true;
        }
        return false;
    }; 
    // (2, arr) -> true O(n)
    // (4, arr) -> false O(n)


~~~

### Insertion
 
~~~js

    const arr = [1,2,3];

    // adding data to the end of an array can be done in constant time. 
    arr.push(4); // -> [1,2,3,4] O(1)
    
    // adding data to the front of an array requires a linear time reordering of all elements in the array. 
    arr.unshift(0); // -> [0,1,2,3,4] O(n)

    // consider a function hackedUnshift that inserts a single piece of data into the front of an array to visualize the full linear iteration.
    const hackedUnshift = (data, array) => {
        let shifted = null;
        let inserted = data; 
        for (let i = 0; i < array.length; i++) { 
            shifted = array[i];
            array[i] = inserted;
            inserted = shifted;
        }
        array.push(inserted);
        return array;
    };

    // inserting data at a specific index while maintaining other array items requires a linear time reorder.
    // Array.prototype.splice(index, num items to be removed, data to be inserted)
    arr.splice(1,0,'X'); // -> [0,'X',1,2,3,4] O(n)

    // overwriting to a pre-existing index (insertion via direct index manipulation) can be done two ways in constant time as overwriting does not require reordering of the array:

    // direct indexing
    arr[1] = 'Y'; // -> [0,'Y',1,2,3,4] O(1)

    // Array.prototype.splice(index, num items to be removed, data to be inserted)
    arr.splice(2,1,'Z'); // -> [0,'Y','Z',2,3,4] O(1)
    

~~~

### Deletion
 
~~~js

    const arr = [1,2,3,4,5];

    // removing data from the end of an array can be done in constant time. 
    arr.pop(); // -> [1,2,3,4] O(1) -> 5
    
    // removing data from the front of an array requires a reordering of all elements in the array. 
    arr.shift(0); // -> [2,3,4] O(n) -> 1

    const hackedShift = array => {
        for (let i = 0; i < array.length - 1; i++) { 
            [array[i], array[i+1]] = [array[i+1], array[i]];
        };
        return array.pop();
    };

    // removing from a specific index in an utilizes 2 arguments passed to the splice method in linear time.
    // Array.prototype.splice(index, num items to be removed) 
    arr.splice(1,1); // -> [2,4] O(n)
    
    

~~~

(PT: If lookup can be done in constant time, insertion and deletion can be done in constant time)

## Performant Manipulation

Now that we have reviewed the methods used to manipulate Arrays, let's look at ways to optimize.

### Unordered Insertion/Deletion - Constant Time

We know that inserting or removing data between the 0th and n-1th index (inclusive) requires a linear manipulation of the array. However, if we do not care about the order of our array elements 
we can get creative:

~~~js

    // lets say we are tracking the following characters through an epic quest.
    const fellowship = ['frodo','aragorn','legolas','samwise','pippin', 'gandalf', 'gimli'];

    // throughout our journey the fellowship grows and shrinks as characters venture off and return with reinforcements, but we can only follow one group at a time. 
    // we'd like to maintain an active list of our fellow travelers, but time and parchment are limited. 
    
    



~~~
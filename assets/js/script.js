console.log('hello');
console.log(data);


printSizes ();

function printSizes () {

    var sizes = data.map( getSizes );
    console.log( sizes );

}

function getSizes ( item ) {

    return item.sizes.list;
}
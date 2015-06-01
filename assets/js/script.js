// console.log('hello');
// console.log(data);
var doc = document;
var navElem = doc.querySelector('.nav');
var dataElem = doc.querySelector('.data');

function fillPage () {

    for ( key in map ) {
        var item = new dataItemObj;
        item.init( { key: key } );
    }
}

var dataItemObj = function () {
    var linkElem;
    var key;
    var contentElem;
    var test;

    this.init = function ( params ) {
        key = params.key;
        linkElem = createLink();
        contentElem = createContent();

        console.log( linkElem );

        linkElem.onclick = function() {
            // linkOnClick();
            // createContent();
        }
    }

    function createLink() {
        var liItem = doc.createElement('a');
        liItem.setAttribute('id', key);
        liItem.setAttribute('href', '#' + key);
        liItem.setAttribute('class', 'nav__link');
        liItem.innerText = map[key];

        var link = navElem.insertBefore(liItem, null);
        return link;
    }

    function createContent() {
        var dataItem = doc.createElement('div');
        dataItem.setAttribute('id', 'content-' + key);
        dataItem.setAttribute('class', 'data__item');


        console.log( 'conent ')
        console.log(key);

        var dataItems = data.map( getData );
        dataItems = uniq( dataItems );
        var list = dataItemsToList( dataItems );
        list = '<ul class=\'data__list\'>' + list + '</ul>';

        dataItem.innerHTML = list;
        var dataContent = dataElem.insertBefore(dataItem, null);
        return dataContent;

        // console.log('dataItems');
        // console.log(dataItems);

        // console.log( list);
        return list;
    }

    function printDataByKey() {
        // console.log( item[key] );
        console.log( 'printDataByKey' );

    }

    function getData ( item ) {
        // console.log( ' --- getData --- ');
        // console.log( key );
        // console.log( item );
        return item[ key ];
    }

    function uniq( list ) {
        var seen = {};
        return list.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }

    function dataItemsToList ( dataItems ) {
        console.log( 'dataItemsToList ' );
        var list = dataItems.map( itemToLi ).join('');
        console.log(list );
        return list;
    }

    function itemToLi ( item ) {
        return '<li class=\'data__item\'>' + item + '</li>';
    }

    // function linkOnClick () {
    //     console.log(key);
    // }

} // End dataItemObj

fillPage ();

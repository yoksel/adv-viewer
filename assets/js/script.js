// console.log('hello');
// console.log(data);
var doc = document;
var navElem = doc.querySelector('.nav');
var dataElem = doc.querySelector('.data__list');
var dataItemClass = 'data__item';
var dataItemVisibleClass = dataItemClass + '--visible';

function fillPage () {

    var pos = 0;

    for ( key in map ) {
        var item = new dataItemObj;
        item.init( {
            pos: pos,
            key: key
            } );

        pos++;
    }
}

var dataItemObj = function () {
    var linkElem;
    var key;
    var pos = 0;
    var contentElem;
    var test;

    this.init = function ( params ) {
        key = params.key;
        pos = params.pos;
        linkElem = createLink();
        contentElem = createContent();

        linkElem.onclick = function() {
            var visibleElems = doc.querySelectorAll('.' + dataItemVisibleClass);

            for (var i = 0; i < visibleElems.length; i++) {
                visibleElems[i].classList.remove( dataItemVisibleClass );
            };

            contentElem.classList.add( dataItemVisibleClass );
        }
    }

    function createLink() {
        var liItem = doc.createElement('a');
        liItem.setAttribute('id', key);
        liItem.setAttribute('href', '#');
        liItem.setAttribute('class', 'nav__link');
        liItem.innerText = map[key];

        var link = navElem.insertBefore(liItem, null);
        return link;
    }

    function createContent() {
        var dataItem = doc.createElement('div');
        dataItem.id = 'content-' + key;
        dataItem.classList.add( dataItemClass );

        if ( pos == 0 ) {
            dataItem.classList.add( dataItemVisibleClass );
        }

        var dataItems = data.map( getData ).join('');

        dataItems = '<table>' + dataItems + '</table>';

        dataItem.innerHTML = dataItems;
        var dataContent = dataElem.insertBefore(dataItem, null);
        return dataContent;
    }

    function getData ( item ) {
        var out = '';
        var cyrClass = 'noneCyr';

        for ( prop in item ) {
            var propOut = '';
            var propName = prop;
            var propValue = item[ propName ];
            // console.log( propName + ': ' + propValue );

            if ( Array.isArray( propValue ) ) {
                propOut = dataItemsToList( propValue );
            }
            else if ( typeof propValue  == 'object' ) {
                propOut += dataItemsToList( propValue.list );
            }
            else if ( typeof propValue  == 'boolean' ) {
                if ( prop === 'cyr' && propValue ) {
                    cyrClass = 'cyr';
                }
            }
            else {
                propOut += propValue;
            }

            if ( propOut ) {
                out += '<td>' + propOut + '</td>';
                }
        }

        out = '<tr class=\'users--' + cyrClass + '\'>' + out + '</tr>';

        return out;
    }

    function uniq( list ) {
        var seen = {};
        return list.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }

    function dataItemsToList ( dataItems ) {
        // console.log( 'dataItemsToList ' );
        var list = dataItems.map( itemToLi ).join('');
        list = '<ul class=\'content__list\'>' + list + '</ul>';
        // console.log(list );
        return list;
    }

    function itemToLi ( item ) {
        return '<li class=\'content__item\'>' + item + '</li>';
    }

} // End dataItemObj

fillPage ();

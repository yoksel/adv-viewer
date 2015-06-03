// console.log('hello');
// console.log(data);
var doc = document;
var navElem = doc.querySelector('.nav');
var navCurrentClass = 'current';
var wrapperElem = doc.querySelector('.l-wrapper');
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
            var currentLink = doc.querySelector('.' + navCurrentClass);
            console.log( currentLink );
            if ( currentLink ) {
                console.log( currentLink );
                currentLink.classList.remove( navCurrentClass );
            }
            this.classList.add( navCurrentClass );

            var visibleElems = doc.querySelectorAll('.' + dataItemVisibleClass);

            for (var i = 0; i < visibleElems.length; i++) {
                visibleElems[i].classList.remove( dataItemVisibleClass );
            };

            contentElem.classList.add( dataItemVisibleClass );
        }
    }

    function createLink() {
        var liItem = doc.createElement('a');
        liItem.id = key;
        liItem.href = '#';
        liItem.classList.add('nav__link');
        if ( pos == 0 ){
            liItem.classList.add( navCurrentClass );
        }
        liItem.innerText = map[key];

        var link = navElem.insertBefore(liItem, null);
        return link;
    }

    function createContent() {
        var dataItem = doc.createElement('div');
        var dataItems = '';
        dataItem.id = 'content-' + key;
        dataItem.classList.add( dataItemClass );

        if ( pos == 0 ) {
            dataItem.classList.add( dataItemVisibleClass );
        }

        if ( key == 'defData') {
            dataItems = data.map( getData ).join('');
        }
        else {

            var newData = dataSortByKey();
            for ( dataKey in newData ) {
                dataItems += '<tr><th colspan=6>' + dataKey + '</th></tr>';
                dataItems += getTableHead();
                var newDataItem = newData[ dataKey ];
                dataItems += newDataItem.map( getData ).join('');
            }
        }

        dataItems = '<table>' + dataItems + '</table>';

        dataItem.innerHTML = dataItems;
        var dataContent = dataElem.insertBefore(dataItem, null);
        return dataContent;
    }

    function getTableHead() {
        var out = '';

        for ( thKey in mapTablehead ) {
            out += '<td>' + mapTablehead[thKey] + '</td>';
        }

        out = '<tr class=\'column-heads\'>' + out + '</tr>';

        return out;

    }

    function getData ( item ) {
        var out = '';
        var cyrClass = 'noneCyr';

        for ( prop in item ) {
            var propOut = '';
            var propName = prop;
            var propValue = item[ propName ];

            if ( prop == 'sizesMode'
                || prop == 'positionDepends'
                || prop == 'positionNotes' ) {
                continue;
            }
            if ( prop === 'cyr' ) {
                if ( propValue ) {
                    cyrClass = 'cyr';
                }
                continue;
            }

            if ( prop == 'positions' && item['positionDepends'] ) {
                propOut += '<h4 class=\'depends\'>' + item['positionDepends'] + ':</h4>';
            }

            if ( Array.isArray( propValue ) ) {
                if ( prop == 'sizes' && item['sizesMode'] == 'or' ) {
                    propOut += propValue.join(' / ');
                }
                else {
                    propOut += dataItemsToList( propValue );
                }
            }
            else if ( typeof propValue  == 'object' ) {
                propOut += dataItemsToList( propValue.list );
            }
            else {
                propOut += propValue;
            }

            if ( prop == 'positions' && item['positionNotes'] ) {
                propOut += '<h4 class=\'notes\'>Position Notes:</h4>';
                propOut += dataItemsToList( item['positionNotes'] );
            }


            if ( propOut ) {
                out += '<td>' + propOut + '</td>';
                }
        }

        out = '<tr class=\'users--' + cyrClass + '\'>' + out + '</tr>';

        return out;
    }

    function dataSortByKey() {

        var newData = {};

        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var keyItems = data[i][ key ];

            if ( Array.isArray( keyItems ) ) {

                for (var k = 0; k < keyItems.length; k++) {
                    if ( !newData[keyItems[k]] ) {
                        newData[keyItems[k]] = [];
                    }
                    newData[keyItems[k]].push(dataItem);
                };
            }
            else {

                if ( !newData[keyItems] ) {
                    newData[keyItems] = [];
                }
                newData[keyItems].push(dataItem);

            }
        };

        return newData;
    }

    function uniq ( list ) {
        var seen = {};
        return list.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }

    function dataItemsToList ( dataItems ) {
        var list = dataItems.map( itemToLi ).join('');
        list = '<ul class=\'content__list\'>' + list + '</ul>';
        return list;
    }

    function itemToLi ( item ) {
        if ( item.indexOf('LJSUP') >= 0 ){
            item = wrapWithLink ( item, jiraLink );
        }
        else if ( item.indexOf('ONTD') >= 0 ) {
            item = wrapWithLink ( item, ontdLink );
        }
        return '<li class=\'content__item\'>' + item + '</li>';
    }

    function wrapWithLink ( str, link ) {
        var newUrl = link + str;
        var out = '<a href=\'' + newUrl + '\'>' + str + '</a>';
        return out;
    }

} // End dataItemObj


fillPage ();

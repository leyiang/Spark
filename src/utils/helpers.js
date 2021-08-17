export function inRange( num, min, max ) {
    if( num < min ) return min;
    if( num > max ) return max;

    return num;
}

export function map( n, s1, e1, s2, e2 ) {
    return (n - s1) / (e1 - s1) * (e2 - s2) + s2;
}

export function dragFile( el, fn ) {
    ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"].forEach( eventName => {
        el.addEventListener( eventName, event => {
            event.preventDefault();

            if( ['dragover', 'dragenter'].includes( eventName ) ) {
                el.classList.add('is-dragover');
            }

            if( ['dragleave', 'dragend', 'drop'].includes( eventName ) ) {
                el.classList.remove('is-dragover');
            }

            if( ['drop'].includes( eventName ) ) {
                fn( event );
            }
        });
    });
}

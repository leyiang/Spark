export default class EventBus {
    constructor() {
        this.events = {};
    }

    on( event, fn ) {
        if( typeof this.events[ event ] === 'undefined' ) {
            this.events[ event ] = [];
        }

        this.events[ event ].push( fn );
    }

    emit( event ) {
        if( typeof this.events[ event ] === 'undefined' ) return;
        this.events[ event ].forEach( fn => fn.apply( this, [].slice.call(arguments, 1) ) );
    }
}

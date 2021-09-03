export default class Vec {
    constructor(x=0, y=0) {
        this.set(x, y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Vec( this.x, this.y );
    }

    sub( vec ) {
        this.x -= vec.x;
        this.y -= vec.y;

        return this;
    }

    mult( num ) {
        this.x *= num;
        this.y *= num;

        return this;
    }

    static Sub(vec, vec1) {
        return vec.copy().sub( vec1 );
    }
}

export function inRange( num, min, max ) {
    if( num < min ) return min;
    if( num > max ) return max;

    return num;
}

export function map( n, s1, e1, s2, e2 ) {
    return (n - s1) / (e1 - s1) * (e2 - s2) + s2;
}

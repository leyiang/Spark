import Vec from "@/libs/Vec";

export default function listen( e, fn ) {
    const start = new Vec(e.clientX, e.clientY);

    const handleMove = moveEvent => {
        const mouse = new Vec(moveEvent.clientX, moveEvent.clientY);
        const delta = Vec.Sub( mouse, start );

        if( typeof fn === 'function' && fn ) {
            fn( delta, mouse, start );
        }
    };

    const handleUp = upEvent => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
}

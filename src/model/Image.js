import Vec from "@/libs/Vec";

export default class Image {
    constructor( image ) {
        this.el = image;
        this.dimension = image.width > image.height ? "x" : "y";
        this.naturalSize = new Vec( image.naturalWidth, image.naturalHeight );
        this.renderSize = null;
    }

    getRenderSize() {
        this.renderSize = new Vec(
            this.el.width,
            this.el.height
        );
    }
}

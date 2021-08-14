import Vec from "@/libs/Vec";
import { map } from "@/utils/helpers";

export default class Image {
    constructor( id, image ) {
        this.id = id;
        this.el = image;
        this.dimension = image.width > image.height ? "x" : "y";
        this.naturalSize = new Vec( image.naturalWidth, image.naturalHeight );

        this.renderSize = null;
        this.cropInfo = null;
    }

    getRenderSize() {
        this.renderSize = new Vec(
            this.el.width,
            this.el.height
        );
    }

    getCropInfo( crop ) {
        this.cropInfo = {
            x: map( crop.pos.x, 0, this.renderSize.x, 0, this.naturalSize.x ),
            y: map( crop.pos.y, 0, this.renderSize.y, 0, this.naturalSize.y ),
            width: map( crop.size.x, 0, this.renderSize.x, 0, this.naturalSize.x ),
            height: map( crop.size.y, 0, this.renderSize.y, 0, this.naturalSize.y )
        };
    }
}

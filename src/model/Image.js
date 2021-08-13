import Vec from "@/libs/Vec";
import { map } from "@/utils/helpers";

export default class Image {
    constructor( image ) {
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
        return {
            left: map(crop.pos.x, 0, this.renderSize.x, 0, this.naturalSize.x ),
            top: map(crop.pos.y, 0, this.renderSize.y, 0, this.naturalSize.y ),
            right: map(crop.pos.x + crop.size.x, 0, this.renderSize.x, 0, this.naturalSize.x ),
            bottom: map(crop.pos.y + crop.size.y, 0, this.renderSize.y, 0, this.naturalSize.y )
        };
    }
}

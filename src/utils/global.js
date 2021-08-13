export default {
    install( app ) {
        app.config.globalProperties.$loadImage = ( src ) => {
            return new Promise(resolve => {
                const image = new Image();
                image.addEventListener("load", () => resolve(image));
                image.src = src;
            });
        }

        app.config.globalProperties.global = {
            editingURI: null,
        }
    }
}

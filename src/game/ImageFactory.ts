const IMAGES = {
    blue: 'public/images/block_blue.png',
    orange: 'public/images/block_orange.png',
    yellow: 'public/images/block_yellow.png',
    green: 'public/images/block_green.png',
};

export class ImageFactory {

    protected images:any = {};

    async loadImages() {
        for(const index in IMAGES) {
            this.images[IMAGES[index]] = await this.loadImage(IMAGES[index]);
        }
    }

    getImage(color:string) {
        return this.images[IMAGES[color]];
    }

    protected loadImage (imageSrc):Promise<unknown> {
        return new Promise((resolve) => {
            this.images[imageSrc] = new Image();

            // We need to wait image loading to prevent transparent shapes
            this.images[imageSrc].onload = () => {
                resolve(this.images[imageSrc]);
            };

            this.images[imageSrc].src = imageSrc;
        });
    }

}

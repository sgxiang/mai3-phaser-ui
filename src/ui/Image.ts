import { BaseScene } from "../game";
import { Container } from './Container';
import { ImageConfig } from '../types';

export class Image extends Container {
    config: ImageConfig;
    image: Phaser.GameObjects.Image;

    constructor(scene: BaseScene, config: ImageConfig) {
        super(scene, config);
        this.config = config;
        this.Type = 'Image';

        const width = config.width ?? 200;
        const height = config.height ?? 60;
        const radius = config.radius ?? 0;
        const borderWidth = config.borderWidth ?? 0;
        const circleHeight = config.isCircle ? width : height;
        const circleRadius = config.isCircle ? width / 2 : height;
        const circleRadiusMax = config.isCircle ? (width / 2 + borderWidth) : height;

        this.image = scene.make.image({ x: borderWidth, y: borderWidth, key: config.key! });
        this.image.setDisplaySize(width, circleHeight);
        this.image.setOrigin(0);
        this.addAt(this.image, 0);

        if (radius > 0) {
            const shape = scene.make.graphics();
            shape.fillStyle(0xffffff);
            if (config.isCircle) {
                shape.fillCircle(this.x + circleRadiusMax, this.y + circleRadiusMax, circleRadius);
            } else {
                shape.fillRoundedRect(this.x, this.y, width, height, radius);
            }

            shape.setVisible(false);
            const mask = shape.createGeometryMask();
            this.image.setMask(mask);
        }

        if (borderWidth > 0) {
            const borderColor = config.borderColor ?? 0;
            const border = scene.make.graphics();
            this.addAt(border, 1);

            border.lineStyle(borderWidth, borderColor);
            if (config.isCircle) {
                border.strokeCircle(circleRadiusMax, circleRadiusMax, circleRadiusMax);
            } else {
                border.strokeRoundedRect(
                    0, 0,
                    width + borderWidth * 2,
                    height + borderWidth * 2,
                    radius
                );
            }
        }
    }
}



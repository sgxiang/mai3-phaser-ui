import { BaseScene } from "../game";
import { FlexLayoutConfig } from "../types";
import { Container } from "./Container";
import Utils from "../utils";
export class FlexLayout extends Container {
  _content?: Container;
  _config?: FlexLayoutConfig;

  constructor(scene: BaseScene, config: FlexLayoutConfig) {
    super(scene, config);
    this.scene = scene;
    this.Type = "FlexLayout";
    this.draw(config);
  }

  draw(config: FlexLayoutConfig) {
    this._config = config;
    const width = config.width ?? 200;
    const height = config.height ?? 300;

    const layoutBg = Utils.createBg(this.scene, 0, 0, width, height, config);
    this.addChildAt(layoutBg!, 0);

    this._content = new Container(this.scene, {});
    this._content.setPosition(0, 0);
    this.addChildAt(this._content, 1);

    this.scene.input.enableDebug(this._content);
    this.RefreshBounds();
  }

  public addChildren(children: Container[]): void {
    this._config!.children = children;
    this.updateChildrenPosition(children);
    children.forEach((child, index) => {
      this._content?.addChild(child);
      child.on(
        "dragend",
        () => {
          this.onChildDragEnd(index);
        },
        this
      );
    });
  }

  private onChildDragEnd(index: number): void {
    const children = this._config!.children!;
    const findex = this.findMostIntersectingElementIndex(index, children);
    if (findex !== null) {
      [children[index], children[findex]] = [children[findex], children[index]];
    }
    this.updateChildrenPosition(children);
  }

  private getIntersectionArea(element1: Container, element2: Container) {
    const x1_max = element1.x + element1.RealWidth;
    const y1_max = element1.y + element1.RealHeight;
    const x2_max = element2.x + element2.RealWidth;
    const y2_max = element2.y + element2.RealHeight;
    const xOverlap = Math.max(
      0,
      Math.min(x1_max, x2_max) - Math.max(element1.x, element2.x)
    );
    const yOverlap = Math.max(
      0,
      Math.min(y1_max, y2_max) - Math.max(element1.y, element2.y)
    );
    if (xOverlap > 0 && yOverlap > 0) {
      return xOverlap * yOverlap;
    }
    return 0;
  }

  private findMostIntersectingElementIndex(
    dragElementIndex: number,
    elements: Container[]
  ) {
    const dragElement = elements[dragElementIndex];
    let maxIntersection = 0;
    let mostIntersectingElementIndex = null;
    elements.forEach((element, index) => {
      if (index === dragElementIndex) return;
      const intersectionArea = this.getIntersectionArea(dragElement, element);
      if (intersectionArea > maxIntersection) {
        maxIntersection = intersectionArea;
        mostIntersectingElementIndex = index;
      }
    });
    return mostIntersectingElementIndex;
  }

  private updateChildrenPosition(items: Container[]) {
    const containerWidth = this.Width;
    const containerHeight = this.Height;
    const flexDirection = this._config!.flexDirection;
    const flexWrap = this._config!.flexWrap;
    const justifyContent = this._config!.justifyContent;
    const alignItems = this._config!.alignItems;
    const isRowDirection = flexDirection === "row";
    const isWrap = flexWrap !== "nowrap";

    let mainAxisSize = isRowDirection ? containerWidth : containerHeight;
    let crossAxisSize = isRowDirection ? containerHeight : containerWidth;

    const totalFixedMainAxis = items.reduce(
      (sum, item) =>
        sum + (isRowDirection ? item.RealWidth || 0 : item.RealHeight || 0),
      0
    );
    const remainingMainAxisSpace = mainAxisSize - totalFixedMainAxis;

    let lines: Container[][] = [[]];
    let currentLineMainAxisSize = 0;
    items.forEach((item) => {
      const itemSize = isRowDirection
        ? item.RealWidth || 0
        : item.RealHeight || 0;
      if (isWrap && currentLineMainAxisSize + itemSize > mainAxisSize) {
        lines.push([item]);
        currentLineMainAxisSize = itemSize;
      } else {
        lines[lines.length - 1].push(item);
        currentLineMainAxisSize += itemSize;
      }
    });

    let crossPos = 0;

    lines.forEach((line) => {
      let offsetMainAxis = 0;
      switch (justifyContent) {
        case "center":
          offsetMainAxis =
            remainingMainAxisSpace > 0 ? remainingMainAxisSpace / 2 : 0;
          break;
        case "flex-end":
          offsetMainAxis =
            remainingMainAxisSpace > 0 ? remainingMainAxisSpace : 0;
          break;
        case "space-between":
          offsetMainAxis = 0;
          break;
        default:
          // 'flex-start'
          offsetMainAxis = 0;
          break;
      }

      let mainPos = offsetMainAxis;
      let maxCrossAxisItemSize = 0;

      line.forEach((item) => {
        let crossAxisSizeItem = isRowDirection
          ? item.RealHeight || 0
          : item.RealWidth || 0;

        let crossAxisOffset = 0;
        switch (alignItems) {
          case "center":
            crossAxisOffset = (crossAxisSize - crossAxisSizeItem) / 2;
            break;
          case "flex-end":
            crossAxisOffset = crossAxisSize - crossAxisSizeItem;
            break;
          default:
            // 'flex-start'
            crossAxisOffset = 0;
            break;
        }

        item.x = isRowDirection ? mainPos : crossPos + crossAxisOffset;
        item.y = isRowDirection ? crossPos + crossAxisOffset : mainPos;

        mainPos +=
          (isRowDirection ? item.RealWidth || 0 : item.RealHeight || 0) +
          (justifyContent === "space-between"
            ? remainingMainAxisSpace / (line.length - 1)
            : 0);
        maxCrossAxisItemSize = Math.max(
          maxCrossAxisItemSize,
          crossAxisSizeItem
        );
      });

      // crossPos += maxCrossAxisItemSize;
      crossPos += crossAxisSize / lines.length;
    });
  }
}

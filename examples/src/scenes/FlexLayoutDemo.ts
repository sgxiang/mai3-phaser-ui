import { BaseScene, FlexLayout, ObjectFactory } from "../../../dist";

export class FlexLayoutDemo extends BaseScene {
  constructor() {
    super("FlexLayoutDemo");
  }

  preload() {
    super.preload();
  }

  async create() {
    this.createExampleFlexLayout(this);
    this.createReturnButton();
  }

  private createReturnButton() {
    this.mai3.add.textButton({
      x: 10,
      y: 10,
      width: 150,
      height: 50,
      text: "返回DemoScene",
      backgroundColor: 0x4caf50,
      borderColor: 0x45a049,
      borderWidth: 2,
      radius: 10,
      textStyle: {
        fontFamily: "Arial",
        fontSize: "18px",
        color: "#FFFFFF",
      },
      handleUp: {
        handleFn: () => {
          this.scene.start("DemoScene");
        },
      },
    });
  }

  // 示例使用
  private createExampleFlexLayout(scene: BaseScene): FlexLayout {
    const flexLayout = new FlexLayout(scene, {
      x: 200,
      y: 150,
      width: 600,
      height: 600,
      radius: 10,
      background: 0x333333,
      borderWidth: 2,
      borderColor: 0x000000,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    });

    scene.add.existing(flexLayout);

    flexLayout.addChildren(
      new Array(9).fill(0).map((_, index) =>
        new ObjectFactory(scene, true).textButton({
          enableDrag: true,
          width: 600 / 3,
          height: 600 / 3,
          text: `button-${index}`,
          backgroundColor: 0x4caf50,
          borderColor: 0x45a049,
          borderWidth: 2,
          radius: 40,
          textStyle: {
            fontFamily: "Arial",
            fontSize: "18px",
            color: "#FFFFFF",
          },
        })
      )
    );

    return flexLayout;
  }

  update() {}
}

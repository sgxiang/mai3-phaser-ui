import { Checkbox } from "./ui/Checkbox";
import { CheckboxGroup } from "./ui/CheckboxGroup";
import { Container } from "./ui/Container";
import { Dialog } from "./ui/Dialog";
import { Grid } from "./ui/Grid";
import { GridLayout } from "./ui/GridLayout";
import { Image } from "./ui/Image";
import { ImageButton } from "./ui/ImageButton";
import { Label } from "./ui/Label";
import { LinearLayout } from "./ui/LinearLayout";
import { ProgressBar } from "./ui/ProgressBar";
import { RoundedButton } from "./ui/RoundedButton";
import { Slider } from "./ui/Slider";
import { Tabs } from "./ui/Tabs";
import { Text } from "./ui/Text";
import { TextBox } from "./ui/TextBox";
import { TextButton } from "./ui/TextButton";
import { Toast } from "./ui/Toast";
import { VolumeSlider } from "./ui/VolumeSlider";
import { Mai3Plugin } from "./plugins/Mai3Plugin";
import ObjectFactory from "./plugins/ObjectFactory";
import { BaseScene, Mai3Game } from "./game";
import * as Types from "./types";
import Utils from "./utils";
import { ListView } from "./ui/ListView";
import { FlexLayout } from "./ui/FlexLayout";

export {
  BaseScene,
  Checkbox,
  CheckboxGroup,
  Container,
  Dialog,
  Grid,
  GridLayout,
  LinearLayout,
  Image,
  ImageButton,
  Label,
  ProgressBar,
  RoundedButton,
  Slider,
  Tabs,
  Text,
  TextBox,
  TextButton,
  Toast,
  VolumeSlider,
  ListView,
  FlexLayout,
  Mai3Plugin,
  ObjectFactory,
  Mai3Game,
  Types,
  Utils
};

const Mai3 = {
  BaseScene: BaseScene,
  Checkbox: Checkbox,
  CheckboxGroup: CheckboxGroup,
  Container: Container,
  Dialog: Dialog,
  Grid: Grid,
  GridLayout: GridLayout,
  LinearLayout: LinearLayout,
  Image: Image,
  ImageButton: ImageButton,
  Label: Label,
  ProgressBar: ProgressBar,
  RoundedButton: RoundedButton,
  Slider: Slider,
  Tabs: Tabs,
  Text: Text,
  TextBox: TextBox,
  TextButton: TextButton,
  Toast: Toast,
  VolumeSlider: VolumeSlider,
  ListView: ListView,
  FlexLayout: FlexLayout,
  Mai3Plugin: Mai3Plugin,
  ObjectFactory: ObjectFactory,
  Mai3Game: Mai3Game,
  Types: Types,
  Utils: Utils
};

export default Mai3;

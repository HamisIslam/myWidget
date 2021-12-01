import { React } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import {
  MapWidgetSelector,
  SettingRow,
  SettingSection,
} from "jimu-ui/advanced/setting-components";
import defaultI18nMessages from "./translations/default";
import { IMConfig } from "../config";
import { TextInput } from "jimu-ui";
import { Button } from "jimu-ui";
//import Widget from "your-extensions/widgets/simple/src/runtime/widget";

export default class Setting extends React.PureComponent<
  AllWidgetSettingProps<IMConfig>,
  any
> {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      textInputValue: null,
    };
  }
  

  handleClickAdd = () => {
    console.log("Added ", this.props.config.featureUrl);
    this.setState({ value: this.state.textInputValue });
    
  };
  handleClickRemove = () => {
    this.setState({ value: "", textInputValue: null });
    setTimeout(() => {
      console.log("removed ", "this the text value",this.state.textInputValue,this.props.config.featureUrl);
      //I want to reset props.confg.featureUrl
      
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.set(
          "featureUrl",
          null
          
        ),
      })
      
    }, 3);
    
  };
  resetTextInput = () => {
    this.setState({
      value: null,
    });
    console.log ("the textinput reseted " , this.state.value)
  };

  onMapSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds,
    });
  };

  ///the added code fot test
  onTextChange = (event) => {
    this.setState({ textInputValue: event.target.value });
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set(
        "featureUrl",
         event.target.value
        //event.target.value.split("\n")
      ),
    });
    console.log("ths is Config", this.props.config.featureUrl);
  };

  render() {
    return (
      <div>
        <SettingSection
          title={this.props.intl.formatMessage({
            id: "selectedMapLabel",
            defaultMessage: defaultI18nMessages.selectedMap,
          })}
        >
          <SettingRow>
            <MapWidgetSelector
              onSelect={this.onMapSelected}
              useMapWidgetIds={this.props.useMapWidgetIds}
            />
          </SettingRow>
        </SettingSection>

        <div>
          <TextInput
            placeholder="Insert your feature here ..."
            onAcceptValue={function noRefCheck() {}}
            type="url"
            allowClear={true}
            onChange={this.onTextChange}
             onFocus={this.resetTextInput}
            //value={this.state.textInputValue}
            value={this.state.value}
          />
          <Button
            onClick={this.handleClickAdd}
            style={{ margin: "10px" }}
            size="default"
            type="primary"
          >
            Add
          </Button>
          {/* <Button
            onClick={this.handleClickRemove}
            style={{ margin: "10px" }}
            size="default"
            type="danger"
          >
            Remove
          </Button> */}
        </div>
      </div>
    );
  }
}

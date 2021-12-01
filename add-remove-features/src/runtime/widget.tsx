import { React, AllWidgetProps, jsx } from "jimu-core";
import { IMConfig } from "../config";
import defaultMessages from "./translations/default";
import FeatureLayer from "esri/layers/FeatureLayer";
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";
import { TextInput } from "jimu-ui";
import { Button } from "jimu-ui";

export default class ViewLayersToggle extends React.PureComponent<
  AllWidgetProps<IMConfig>,
  any
> {
  constructor(props) {
    super(props);
    this.state = {
      jimuMapView: undefined,
      featureLayerOnMap: [],
      textInput: null,
      value: null,
    };
  }
  //to reset text-input value after the user insert his URL to be prepared to recieve anther one
  resetTextInput = () => {
    this.setState({
      value: null,
      // value : this.props.config.featureUrl
    });
    setTimeout(() => {
      console.log(this.state.value);
    }, 2);
  };
  //get the URL from text-input
  getData = (val) => {
    let url = val.target.value;
    this.setState({
      textInput: url,
    });
  };

  handleAddClick = () => {
    const url = this.state.textInput;
    if (url && url !== "" && !this.state.value) {
      //if statement is used in case the user insert feature server url with more than one layer inside
      // instead of feature server layer
      if (url.endsWith("FeatureServer")) {
        fetch(url + "?f=pjson").then((res) => {
          res.json().then((response) => {
            const ids = [];
            response.layers.map((item) => {
              ids.push(item.id);
            });
            for (let i = 0; i < ids.length; i++) {
              //for loop is used to add the ids of all the layers within the feature server
              let fixedUrl = url + "/" + ids[i];
              const featureLayer = new FeatureLayer({
                url: fixedUrl,
              });
              this.state.featureLayerOnMap.push(featureLayer);
              this.setState({
                featureLayerOnMap: this.state.featureLayerOnMap,
              });
              this.state.jimuMapView.view.map.add(featureLayer);
              // when() ==> is used to zoom into the added layer
              featureLayer.when(() => {
                this.state.jimuMapView.view.extent = featureLayer.fullExtent;
              });
            }
          });
        });
      } else {
        const featureLayer = new FeatureLayer({
          url: url,
        });

        this.setState({
          featureLayerOnMap: featureLayer,
        });
        this.state.jimuMapView.view.map.add(featureLayer);
        featureLayer.when(() => {
          this.state.jimuMapView.view.extent = featureLayer.fullExtent;
        });
      }
    } else {
      alert("Please Insert a valid URL");
      this.setState({
        featureLayerOnMap: [],
      });
    }
  };

  handleRemoveClick = () => {
    let url = this.state.textInput;
    if (this.state.jimuMapView) {
      if (this.state.featureLayerOnMap && url !== "" && url) {
        if (url.endsWith("FeatureServer")) {
          for (let i = 0; i < this.state.featureLayerOnMap.length; i++) {
            this.state.jimuMapView.view.map.remove(
              this.state.featureLayerOnMap[i]
            );
          }
          this.setState({
            featureLayerOnMap: [],
            textInput: null,
            value: "",
          });
        } else {
          //layer case
          this.state.jimuMapView.view.map.remove(this.state.featureLayerOnMap);
          this.setState({
            featureLayerOnMap: [],
            textInput: null,
            value: "",
          });
        }
      } else {
        alert("Insert Url First");
      }
    }
  };

  ////neeeeeeeeew added code
  textValueFromSetting = () => {
    let url = this.props.config.featureUrl;
    this.setState({
      value: url,
    });
    console.log("this is the value from setting", this.state.value);
  };

  addFeatureLayerToMap=()=>{
    
  }

  handleAddClick2 = () => {
    let url = this.state.value;
    if (url && url !== "") {
      //if statement is used in case the user insert feature server url with more than one layer inside
      // instead of feature server layer
      if (url.endsWith("FeatureServer")) {
        fetch(url + "?f=pjson").then((res) => {
          res.json().then((response) => {
            const ids = [];
            response.layers.map((item) => {
              ids.push(item.id);
            });
            for (let i = 0; i < ids.length; i++) {
              //for loop is used to add the ids of all the layers within the feature server
              let fixedUrl = url + "/" + ids[i];
              const featureLayer = new FeatureLayer({
                url: fixedUrl,
              });
              this.state.featureLayerOnMap.push(featureLayer);
              this.setState({
                featureLayerOnMap: this.state.featureLayerOnMap,
              });
              this.state.jimuMapView.view.map.add(featureLayer);
              // when() ==> is used to zoom into the added layer
              featureLayer.when(() => {
                this.state.jimuMapView.view.extent = featureLayer.fullExtent;
              });
            }
          });
        });
      } else {
        //layer case
        const featureLayer = new FeatureLayer({
          url: url,
        });

        this.setState({
          featureLayerOnMap: featureLayer,
        });
        this.state.jimuMapView.view.map.add(featureLayer);
        featureLayer.when(() => {
          this.state.jimuMapView.view.extent = featureLayer.fullExtent;
        });
      }
    } else {
      alert("Please Insert a valid URL");
      this.setState({
        featureLayerOnMap: [],
      });
    }
  };

  handleRemoveClick2 = () => {
    let url = this.state.value;
    if (this.state.jimuMapView) {
      if (this.state.featureLayerOnMap && url !== "" && url) {
        if (url.endsWith("FeatureServer")) {
          for (let i = 0; i < this.state.featureLayerOnMap.length; i++) {
            this.state.jimuMapView.view.map.remove(
              this.state.featureLayerOnMap[i]
            );
          }
          this.setState({
            featureLayerOnMap: [],
            textInput: null,
            value: "",
          });
        } else {
          //layer case
          this.state.jimuMapView.view.map.remove(this.state.featureLayerOnMap);
          this.setState({
            featureLayerOnMap: [],
            textInput: null,
            value: "",
          });
        }
      } else {
        alert("Insert Url First");
      }
    }
  };

  render() {
    return (
      <div
        className="widget-view-layers-toggle jimu-widget"
        style={{ overflow: "auto" }}
      >
        {this.props.hasOwnProperty("useMapWidgetIds") &&
          this.props.useMapWidgetIds &&
          this.props.useMapWidgetIds.length === 1 && (
            // The JimuMapViewComponent gives us a connection to the
            // ArcGIS JS API MapView object. We store it in the State.
            <JimuMapViewComponent
              useMapWidgetId={this.props.useMapWidgetIds?.[0]}
              onActiveViewChange={(jmv: JimuMapView) => {
                this.setState({
                  jimuMapView: jmv,
                });
              }}
            />
          )}

        <p className="shadow-lg m-3 p-3 bg-white rounded">
          {defaultMessages.URL}:
          <TextInput
            autoFocus
            placeholder="Insert your feature here ..."
            onAcceptValue={function noRefCheck() {}}
            type="url"
            allowClear={true}
            // onChange={this.getData}
            onChange={this.textValueFromSetting}
            //onFocus={this.textValueFromSetting}
            onFocus={this.resetTextInput}
            value={this.state.value}
          />
          <Button
            onClick={this.handleAddClick2}
            style={{ margin: "10px" }}
            size="default"
            type="primary"
          >
            Add
          </Button>
          <Button
            onClick={this.handleRemoveClick2}
            style={{ margin: "10px" }}
            size="default"
            type="danger"
          >
            Remove
          </Button>
        </p>
      </div>
    );
  }
}

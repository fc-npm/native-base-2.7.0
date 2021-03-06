import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StatusBar, ViewPropTypes, StyleSheet } from "react-native";
import { connectStyle } from "native-base-shoutem-theme";
import mapPropsToStyleNames from "../utils/mapPropsToStyleNames";
import variable from "../theme/variables/platform";
import _ from "lodash";
class Header extends Component {
  static contextTypes = {
    theme: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      orientation: "portrait"
    };
  }
  layoutChange(val) {
    let maxComp = Math.max(variable.deviceWidth, variable.deviceHeight);
    if (val.width >= maxComp) this.setState({ orientation: "landscape" });
    else {
      this.setState({ orientation: "portrait" });
    }
  }
  calculateHeight(mode, inSet) {
    let inset = null;
    if (inSet != undefined) {
      inset = inSet;
    } else {
      inset = variable.Inset;
    }
    const InsetValues = mode === "portrait" ? inset.portrait : inset.landscape;
    let oldHeight = null;
    if (this.props.style.height != undefined) {
      oldHeight = this.props.style.height;
    } else if (this.props.style[1].height) {
      oldHeight = this.props.style[1].height;
    } else {
      oldHeight = this.props.style[0].height;
    }
    let height = oldHeight + InsetValues.topInset;
    return height;
  }
  calculatePadder(mode, inSet) {
    let inset = null;
    if (inSet != undefined) {
      inset = inSet;
    } else {
      inset = variable.Inset;
    }
    const InsetValues = mode === "portrait" ? inset.portrait : inset.landscape;
    let topPadder = null;
    let style = StyleSheet.flatten(this.props.style);
    if (style.padding !== undefined && style.paddingTop !== undefined) {
      topPadder = (style.paddingTop ? style.paddingTop : style.padding) + InsetValues.topInset;
    } else {
      topPadder = InsetValues.topInset;
    }
    return topPadder;
  }
  render() {
    return (
      <View ref={c => (this._root = c)} {...this.props} />
    );
  }
}

Header.propTypes = {
  ...ViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  searchBar: PropTypes.bool,
  rounded: PropTypes.bool
};

const StyledHeader = connectStyle(
  "NativeBase.Header",
  {},
  mapPropsToStyleNames
)(Header);
export { StyledHeader as Header };
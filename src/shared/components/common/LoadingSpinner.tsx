import * as React from "react";
import { Spin, Icon } from "antd";

const antIcon = <Icon type="loading" style={{ fontSize: 18 }} spin />;

function LoadingSpinner() {
  return <Spin indicator={antIcon} />;
}

export default LoadingSpinner;

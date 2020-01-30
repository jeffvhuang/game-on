import * as React from "react";
import PageHeader from "../common/PageHeader";

class LoginPage extends React.Component {
  render() {
    return (
      <div className="section content">
        <PageHeader title="Game On BETA" isLoading={false} />
        <p>
          This website is currently undergoing the initial phase of development.
          You may encounter some issues while browsing.
        </p>
        <p>
          If you have noticed any errors or have suggestions for improvements, I
          would love to hear back from you!
        </p>
        <p>Please email your feedback to jeffvh@outlook.com</p>
        <p>Thank you for your patience and for visiting!!</p>
      </div>
    );
  }
}

export default LoginPage;

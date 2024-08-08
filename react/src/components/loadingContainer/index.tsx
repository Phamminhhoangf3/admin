import { Spin } from "antd";

const LoadingContainer = ({ loading = false, children }) => (
  <div style={{}}>
    {loading && (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.5)', 
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99,
        }}
      >
        <Spin size="large" />
      </div>
    )}
    <div style={{ minHeight: 100 }}>{children}</div>
  </div>
);

export default LoadingContainer;

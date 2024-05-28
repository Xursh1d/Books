export const authCardStyle = {
  maxWidth: "500px",
  padding: "30px",
};

export const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
  mt: 2,
};

export const boxStyle = {
  ...centerStyle,
  width: "100%",
  height: "100vh",
};

export const cardStyle = {
  width: 400,
  p: 4,
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

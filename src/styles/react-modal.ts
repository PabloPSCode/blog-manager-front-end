const reactModalCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    opacity: 1,
    borderRadius: 8,
    padding: 32,
    width: "60vw",
    minWidth: "372px",
    maxHeight: "80vh",
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
};

const reactMobileMenuModalCustomStyles = {
  content: {
    top: 0,
    left: 0,
    width: "90vw",
    height: "100vh",
    overflow: "hidden",
    padding: 0,
    maxHeight: "80vh",
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
};

const reactModalCustomStylesDark = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    opacity: 1,
    borderRadius: 8,
    padding: 32,
    width: "60vw",
    minWidth: "372px",
    backgroundColor: "#1e293b",
    maxHeight: "80vh",
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
};

const reactMobileMenuModalCustomStylesDark = {
  content: {
    top: 0,
    left: 0,
    height: "100vh",
    overflow: "hidden",
    padding: 0,
    width: "90vw",
    minWidth: "372px",
    maxHeight: "80vh",
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
};

export {
  reactMobileMenuModalCustomStyles,
  reactMobileMenuModalCustomStylesDark,
  reactModalCustomStyles,
  reactModalCustomStylesDark,
};

interface IContainer {
  className?: string;
}

const Container: React.FC<IContainer> = ({ className, children }) => (
  <div className={`container ${className ?? ""}`}>{children}</div>
);

export default Container;

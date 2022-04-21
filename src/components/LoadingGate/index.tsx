interface LoadingGateProps {
  waitFor: boolean;
  meanWile: React.ReactNode;
}

const LoadingGate: React.FC<LoadingGateProps> = ({
  waitFor,
  meanWile,
  children,
}) => <>{waitFor ? children : meanWile}</>;

export default LoadingGate;

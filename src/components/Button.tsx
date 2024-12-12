type ButtonProps = {
  title: string;
  loading: boolean;
  buttonStyle?: React.CSSProperties | string;
};
const Button = ({ title, loading, buttonStyle }: ButtonProps) => {
  return (
    <div>
      <button
        className={typeof buttonStyle === 'string' ? buttonStyle : undefined}
        disabled={loading}
      >
        {loading ? 'Loading...' : `${title}`}
      </button>
    </div>
  );
};

export default Button;

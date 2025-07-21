type props = {
  title: string;
  message?: string;
};
const ErrorComponent = ({ title, message }: props) => {
  return (
    <div>
      <div>
        <h2>{title}</h2>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export { ErrorComponent as Error };

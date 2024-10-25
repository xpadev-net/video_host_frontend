type props = {
  title: string;
  message?: string;
};
const Error = ({ title, message }: props) => {
  return (
    <div>
      <div>
        <h2>{title}</h2>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export { Error };

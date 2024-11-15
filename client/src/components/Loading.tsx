const Loading: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div
        className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-sky-700 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
    </div>
  );
};

export default Loading;

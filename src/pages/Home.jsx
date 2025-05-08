function Home() {
  return (
    <div className="flex flex-col gap-3.5 p-3">
      <h1 className="text-9xl font-black">Hello World!</h1>
      <p className="text-5xl font-light">Your new app experience awaits!</p>
      <h2 className="mt-6 text-5xl font-bold">Tech Stack</h2>
      <ul className="list-inside list-disc p-3">
        <li>
          <span className="text-2xl">React</span>
        </li>
        <li>
          <span className="text-2xl">React Router</span>
        </li>
        <li>
          <span className="text-2xl">React Query</span>
        </li>
      </ul>
    </div>
  );
}

export default Home;

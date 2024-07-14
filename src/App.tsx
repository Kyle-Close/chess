interface AppProps {
  children?: React.ReactNode;
}

function App({ children }: AppProps) {
  return <div className='flex flex-grow justify-center bg-gray-900 text-slate-50'>{children}</div>;
}

export default App;

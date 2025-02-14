interface AppProps {
  children?: React.ReactNode;
}

function AppWrapper({ children }: AppProps) {
  return <div className='flex flex-grow justify-center bg-gray-900 text-slate-50'>{children}</div>;
}

export default AppWrapper;

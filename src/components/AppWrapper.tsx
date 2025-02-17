import { Provider } from '../components/ui/provider.tsx'

interface AppProps {
  children?: React.ReactNode;
}

function AppWrapper({ children }: AppProps) {
  return (
    <Provider>
      <div className='flex flex-grow justify-center bg-gray-900 text-slate-50'>{children}</div>
    </Provider>);
}

export default AppWrapper;

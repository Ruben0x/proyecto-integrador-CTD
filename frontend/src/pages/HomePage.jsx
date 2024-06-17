import { Toaster } from 'sonner';
import ResponsiveBody from '../components/ResponsiveBody';

export const HomePage = () => {
  return (
    <>
      <Toaster position='bottom-right' richColors />

      <ResponsiveBody />
    </>
  );
};

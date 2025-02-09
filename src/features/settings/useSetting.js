import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

const useSetting = () => {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  return { settings, isLoading, error };
};
export default useSetting;

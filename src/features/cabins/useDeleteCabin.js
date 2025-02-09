import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinAPI } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteCabinAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin successfully deleted!');
    },
    onError: () => {
      toast.error('There was an error deleting the cabin.');
    },
  });

  return { deleteCabin, isDeleting };
};

export default useDeleteCabin;

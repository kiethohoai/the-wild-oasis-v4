import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const useCreateCabin = () => {
  const queryClient = useQueryClient();

  // create cabin query
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    // mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin successfully created!');
    },
    onError: () => {
      toast.error('There was an error creating the cabin.');
    },
  });

  return { isCreating, createCabin };
};
export default useCreateCabin;

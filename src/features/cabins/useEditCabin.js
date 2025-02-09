import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const useEditCabin = () => {
  const queryClient = useQueryClient();

  // edit cabin query
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin successfully updated!');
    },
    onError: () => {
      toast.error('There was an error updating the cabin.');
    },
  });
  return { isEditing, editCabin };
};
export default useEditCabin;

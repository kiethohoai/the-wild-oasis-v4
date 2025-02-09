import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import Input from '../../ui/Input';
import FormRow from '../../ui/FormRow';
import useCreateCabin from './useCreateCabin';
import useEditCabin from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, setShowForm }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // create/edit cabin (custom hook)
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  // create or edit status
  const isWorking = isCreating || isEditing;

  //HANDLE FORM SUBMIT
  const onSubmit = (data) => {
    // choose default image when user upload or already exists
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    // call api create/update cabin
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image: image }, id: editId },
        {
          onSuccess: () => setShowForm(false),
        },
      );
    } else {
      createCabin(
        { newCabinData: { ...data, image: image }, id: null },
        {
          onSuccess: () => reset(),
        },
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            min: {
              value: 0,
              message: 'Discount should be at least 0',
            },
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isWorking}
          type="number"
          id="description"
          defaultValue=""
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          disabled={isWorking}
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession
            ? 'Edit Cabin'
            : `${isCreating ? 'Adding cabin...' : 'Add cabin'}`}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

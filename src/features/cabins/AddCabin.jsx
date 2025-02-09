import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

const AddCabin = () => {
  const [isOpenModal, setIsOpenModel] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModel(!isOpenModal)}>
        Add New Cabin
      </Button>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModel(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModel(false)} />
        </Modal>
      )}
    </div>
  );
};

export default AddCabin;

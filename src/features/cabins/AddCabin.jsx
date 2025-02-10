import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>

        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddCabin;

/* 
      <Modal.Open opens="table">
        <Button>Show table</Button>
      </Modal.Open>

      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>


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

export default AddCabin; */

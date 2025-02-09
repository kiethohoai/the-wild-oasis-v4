import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CabinTable from './CabinTable';
import CreateCabinForm from './CreateCabinForm';

const AddCabin = () => {
  return (
    <Modal>
      {/* #1 */}
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>

      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* #2 */}
      <Modal.Open opens="table">
        <Button>Show table</Button>
      </Modal.Open>

      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
};

export default AddCabin;

/* 
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

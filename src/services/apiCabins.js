import supabase from './supabase';

//GET ALL CABINS
export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Canbins could not be loaded');
  }

  return data;
}

// DELETE CABIN
export async function deleteCabin(id) {
  const { error, data } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Canbins could not be deleted!');
  }

  return data;
}

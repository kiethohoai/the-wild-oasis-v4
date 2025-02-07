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

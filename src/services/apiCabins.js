import supabase, { supabaseUrl } from './supabase';

//GET ALL CABINS
export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Canbins could not be loaded');
  }

  return data;
}

//DELETE CABIN
export async function deleteCabin(id) {
  const { error, data } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Canbins could not be deleted!');
  }

  return data;
}

//CREATE CABIN
export async function createCabin(newCabin) {
  console.log(`🚀CHECK > newCabin:`, newCabin);

  // prepare image fileName and imagePath before upload
  const imageName = `${Math.random() * 10000000000000000}-${
    newCabin.image.name
  }`.replaceAll('/', '');
  console.log(`🚀CHECK > imageName:`, imageName);

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Canbins could not be created');
  }

  // upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // delete cabin if there was an error while uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('Cabin image could not be uploaded and cabin deleted!');
  }

  return data;
}

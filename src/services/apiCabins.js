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
export async function createEditCabin(newCabin, id) {
  // Check imagePath already exists
  const hasImagePath = typeof newCabin.image === 'string';

  // prepare image fileName and imagePath before upload
  const imageName = `${Math.random() * 100000000000000000}-${
    newCabin.image.name
  }`.replaceAll('/', '');

  /* IMAGE
  1. oldImage => Keep imagePath & Don't Upload
  2. newImage => Create imagePath & Upload */
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from('cabins');

  // create cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // edit cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Canbins could not be created');
  }

  // upload image
  // 1. oldImage => don't upload
  // 2. newImage => upload
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    // delete cabin if there was an error while uploading image
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id);
      console.error(storageError);
      throw new Error('Cabin image could not be uploaded and cabin deleted!');
    }
  }

  return data;
}

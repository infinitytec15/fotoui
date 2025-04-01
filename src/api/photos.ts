import { uploadPhoto, getPhotos, matchFaces } from "@/services/photoService";

// Upload a photo and store it in Supabase
export async function uploadPhotoAPI(
  file: File,
  userId: string,
  eventId?: string,
) {
  return await uploadPhoto(file, userId, eventId);
}

// Get photos for a user, optionally filtered by event
export async function getPhotosAPI(userId: string, eventId?: string) {
  return await getPhotos(userId, eventId);
}

// Match a photo against the database using facial recognition
export async function matchFacesAPI(photoFile: File, userId: string) {
  return await matchFaces(photoFile, userId);
}

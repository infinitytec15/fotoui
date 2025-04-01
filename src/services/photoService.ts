import { supabase } from "@/lib/supabase";

// Define types for our database tables
export interface Photo {
  id: string;
  url: string;
  userId: string;
  uploadDate: string;
  eventId: string | null;
  matchConfidence?: number;
  tags?: string[];
}

export interface Event {
  id: string;
  name: string;
  date: string;
  schoolId: string;
}

export interface User {
  id: string;
  name: string;
  schoolId: string;
}

// Upload a photo to Supabase storage and save metadata to the database
export async function uploadPhoto(
  file: File,
  userId: string,
  eventId?: string,
) {
  try {
    // Generate a unique file name
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `photos/${fileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("photos")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("photos").getPublicUrl(filePath);

    // Save metadata to the database
    const { data: photoData, error: insertError } = await supabase
      .from("photos")
      .insert({
        url: publicUrl,
        userId,
        uploadDate: new Date().toISOString(),
        eventId: eventId || null,
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return { photo: photoData, error: null };
  } catch (error) {
    console.error("Error uploading photo:", error);
    return { photo: null, error };
  }
}

// Get photos for a specific user and optionally filter by event
export async function getPhotos(userId: string, eventId?: string) {
  try {
    let query = supabase.from("photos").select("*").eq("userId", userId);

    if (eventId) {
      query = query.eq("eventId", eventId);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return { photos: data as Photo[], error: null };
  } catch (error) {
    console.error("Error getting photos:", error);
    return { photos: [], error };
  }
}

// Match a photo against the database using facial recognition
export async function matchFaces(photoFile: File, userId: string) {
  try {
    // In a real implementation, you would:
    // 1. Upload the photo to your server or directly to a facial recognition service
    // 2. Process the photo to extract facial features
    // 3. Compare against your database of faces
    // 4. Return matching photos with confidence scores

    // For this demo, we'll simulate the process by uploading the photo
    // and then returning mock results

    // Upload the photo first
    const { photo, error: uploadError } = await uploadPhoto(photoFile, userId);

    if (uploadError) {
      throw uploadError;
    }

    // In a real app, you would now call your facial recognition service
    // For demo purposes, we'll fetch some random photos and pretend they matched
    const { photos, error: fetchError } = await getPhotos(userId);

    if (fetchError) {
      throw fetchError;
    }

    // Simulate matching by adding confidence scores
    const matchedPhotos = photos.map((p) => ({
      ...p,
      matchConfidence: Math.floor(Math.random() * 15) + 85, // Random score between 85-99
    }));

    // Sort by confidence (highest first)
    matchedPhotos.sort(
      (a, b) => (b.matchConfidence || 0) - (a.matchConfidence || 0),
    );

    return { matches: matchedPhotos, error: null };
  } catch (error) {
    console.error("Error matching faces:", error);
    return { matches: [], error };
  }
}

// Get all events
export async function getEvents(schoolId?: string) {
  try {
    let query = supabase.from("events").select("*");

    if (schoolId) {
      query = query.eq("schoolId", schoolId);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return { events: data as Event[], error: null };
  } catch (error) {
    console.error("Error getting events:", error);
    return { events: [], error };
  }
}

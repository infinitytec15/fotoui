import { supabase } from "@/lib/supabase";

// Authenticate a user with a QR code
export async function authenticateWithQRCode(qrCode: string) {
  try {
    // In a real implementation, you would validate the QR code with your backend
    // For demo purposes, we'll simulate authentication

    // Check if the user exists
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("qrCode", qrCode)
      .single();

    if (userError && userError.code !== "PGRST116") {
      // PGRST116 is "not found"
      throw userError;
    }

    // If the user doesn't exist, create a new one
    if (!existingUser) {
      // In a real app, you would validate the QR code against a database of valid codes
      // For demo purposes, we'll create a new user
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert({
          name: `Parent ${Math.floor(Math.random() * 1000)}`,
          schoolId: "school-123",
          qrCode: qrCode,
        })
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      return { user: newUser, error: null };
    }

    return { user: existingUser, error: null };
  } catch (error) {
    console.error("Error authenticating with QR code:", error);
    return { user: null, error };
  }
}

// Sign out the current user
export async function signOut() {
  return await supabase.auth.signOut();
}

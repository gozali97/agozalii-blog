import { createClient } from "@supabase/supabase-js";

const url = "https://phqtxbifdkcyhytnpbyp.supabase.co";
const key = "sb_publishable_EBzt9dpSaQj8VR_nlVnaRw_VNVuTdSp";

const supabase = createClient(url, key);

async function seed() {
  console.log("Attempting to create user: ahmadmulti10@gmail.com");

  const { data, error } = await supabase.auth.signUp({
    email: "ahmadmulti10@gmail.com",
    password: "password123",
    options: {
      data: {
        full_name: "Admin User",
      },
    },
  });

  if (error) {
    console.error("Error creating user:", error.message);
  } else {
    console.log("User creation result:", data);
    if (data?.user && data?.session) {
      console.log(
        "SUCCESS: User created and logged in (Auto Trigger should have created profile)."
      );
    } else if (data?.user && !data?.session) {
      console.log(
        "SUCCESS: User created. IMPORTANT: You may need to confirm your email in the simulated inbox (if using InBucket) or real inbox before logging in."
      );
    }
  }
}

seed();

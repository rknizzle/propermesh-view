export const register = async (email, password) => {
  try {
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    return { registerSuccess: true, data };
  } catch (error) {
    console.error("Registration Error:", error);
    return { registerSuccess: false, error: error.message };
  }
};

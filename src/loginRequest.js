export const login = async (email, password) => {
  try {
    const response = await fetch("/auth/login", {
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
      throw new Error("Login failed");
    }

    const data = await response.json();
    return { loginSuccess: true, data };
  } catch (error) {
    console.error("Login Error:", error);
    return { loginSuccess: false, error: error.message };
  }
};

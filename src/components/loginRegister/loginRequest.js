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
    return data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

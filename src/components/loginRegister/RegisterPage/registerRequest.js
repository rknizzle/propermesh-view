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
      const response_body = await response.json();
      console.log(response_body.detail);
      if (response_body.detail === "account with that email already exists") {
        throw new Error(
          "registration failed because a user with that email already exists"
        );
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

const API_URL = import.meta.env.VITE_BACKEND_URL;

const AuthService = {
  verifyToken: async (navigate) => {
    const token = sessionStorage.getItem("access_token");
    console.log("AuthService.verifyToken - token:", token);

    if (!token) {
      navigate("/login");
      return { valid: false, msg: "No token found" };
    }

    try {
      const response = await fetch(`${API_URL}/api/verify-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // opcional: mode y credentials para debugging CORS
        // mode: "cors"
      });

      if (response.ok) {
        const data = await response.json();
        return { valid: true, userId: data.user_id };
      } else {
        // log para ver por qué falla en backend
        const text = await response.text();
        console.error("verify-token failed:", response.status, text);
        // eliminar la misma clave usada para guardar el token
        sessionStorage.removeItem("access_token");
        navigate("/login");
        return { valid: false, msg: "Invalid or expired token" };
      }
    } catch (error) {
      console.error("Error verifying token (fetch):", error);
      navigate("/login");
      return { valid: false, msg: "Error verifying token" };
    }
  }
};

export default AuthService;
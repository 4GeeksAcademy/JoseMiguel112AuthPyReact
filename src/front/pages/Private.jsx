import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import AuthService from "../../services/AuthService";

export const Private = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  
  function handleLogout() {
    sessionStorage.removeItem("access_token");
    navigate("/login");
  }

  useEffect(() => {
    (async () => {
      const verify = await AuthService.verifyToken(navigate);
      if (!verify.valid) {
        console.log("Comprobar Token", verify.msg);
        setLoading(false);
        return;
      }
      await fetchProfileData();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchProfileData() {
    const token = sessionStorage.getItem("access_token");
    console.log("Token en Private.jsx:", token);
    if (!token) { navigate("/login"); return; }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      console.log("/api/private status:", response.status);
      const text = await response.text();
      try {
        // intentar parsear JSON si es posible
        const json = JSON.parse(text);
        if (!response.ok) {
          console.error("Error /api/private:", response.status, json);
          if (response.status === 401) navigate("/login");
          return;
        }
        setUserData(json.current_user);
      } catch (e) {
        console.error("Respuesta no JSON /api/private:", text);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }

  return (
    <div className="container mt-5">
      {loading ? (
        <p>Cargando...</p>
      ) : userData ? (
        <div>
          <h2>Bienvenido {userData.email}</h2>
          <button className="btn btn-danger mb-3" onClick={handleLogout}>
            Cerrar sesión
          </button>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      ) : (
        <p>No hay datos de usuario. Redirigiendo...</p>
      )}
    </div>
  );
};
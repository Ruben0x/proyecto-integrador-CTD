import axios from "axios";
import { useEffect, useState } from "react";

export const useInstrumento = (id, accessToken) => {
  const [instrumento, setInstrumento] = useState(null);
  const [listaImagenes, setListaImagenes] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (accessToken) {
      axios(`${apiUrl}/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          setInstrumento(res.data);
          setListaImagenes(res.data.imagenes || []);
          setError(null);
        })
        .catch((err) => {
          setError(
            "No se pudo cargar el producto. Por favor, intenta nuevamente."
          );
          console.error("Error " + err.message);
        });
    }
  }, [id, accessToken]);

  return { instrumento, listaImagenes, error };
};

// /* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Sky, Stars } from "@react-three/drei";
import Navbar from "../../components/navbar/Navbar";
import BiodiversityTittle from "../../components/BiodiversityTittle";
import { useNavigate } from "react-router-dom";
import LostBiodiversity from "../../components/LostBiodiversity";
import LightsDeforestation from "../../components/LightsDeforestation";
import { Physics } from "@react-three/rapier";
import Cow from "../../components/CowModel";

const Biodiversity = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [showAwareness, setShowAwareness] = useState(false); // Estado para la ventana de sensibilización
  const [showHelps, setShowHelps] = useState(false);
  const textContainerRef = useRef();
  const navigate = useNavigate();

  const handleHelp = () =>{
    setShowHelps(!showHelps);
  }

  const handleTitleClick = () => {
    setShowDescription(!showDescription);
  };

  const handleNextClick = () => {
    navigate("/deforestation"); // Navega a la página deforestacion
  };

  // Función para manejar eventos de teclado
  const handleKeyDown = (event) => {
    if (event.key === "a" || event.key === "A") {
      setShowAwareness(true);
    }
  };

  // Agregar y limpiar el listener de eventos de teclado
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Función para cerrar la ventana de sensibilización
  const handleCloseAwareness = () => {
    setShowAwareness(false);
  };

  return (
    <>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Navbar />
        {/* Botón "Siguiente" */}
        <button
          onClick={handleNextClick}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
            zIndex: 9, // Asegura que el botón esté sobre el Canvas
          }}
        >
          Anterior
        </button>
        <Canvas shadows camera={{ position: [30, 5, 160], fov: 60 }}>
          <Suspense fallback={null}>
            <BiodiversityTittle initial onClick={handleTitleClick} />
            <Physics>
              <Cow scale={[5, 5, 5]} rotation={[0, 3.8, 0]} /> 
              <LostBiodiversity />
            </Physics>
            <LightsDeforestation />
          </Suspense>
          <Sky
            sunPosition={[100, 20, 100]}
            turbidity={10}
            rayleigh={2}
            mieCoefficient={0.005}
            mieDirectionalG={0.8}
          />
          <Stars
            radius={300}
            depth={50}
            count={2000}
            factor={7}
            saturation={0}
            fade
          />
          <OrbitControls
            minAzimuthAngle={-Math.PI / 8} // Limita la rotación horizontal (izquierda)
            maxAzimuthAngle={Math.PI / 8} // Limita la rotación horizontal (derecha)
            minPolarAngle={Math.PI / 4} // Limita la rotación vertical (arriba)
            maxPolarAngle={Math.PI / 2}
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
          />
          <Html>
            <div>
              <a href="#"
              onClick={handleHelp}
              style={{
                position:"absolute",
                top:"220px",
                left:"580px",
                transform: "translate(10%, 10%)",
              }}>
                <img src="/src/assets/signoInterrogacion.svg" alt="Ayudas" 
                style={{
                  width:"60px",
                }}
                />
              </a>
            {showHelps && (
            <div
            style={{
              position: "absolute",
              backgroundColor: "rgba(239, 244, 239, 0.2)",
              fontWeight: "bold",
              width: "300px",
              padding: "5px",
              top: "90px",
              left: "280px",
            }}
            >
            <p>Mensaje de sensibilización con la tecla (A)
            o haciendo click algunos arboles cortados <br />
            Mensaje de soluciones haciendo click en algunos arboles <br />
            Mensaje sobre la perdidad de biodiversidad haciendo click en el titulo.
            </p>
            </div>
            )}
            </div>
          </Html>
        </Canvas>

        {showDescription && (
          <div
            ref={textContainerRef}
            style={{
              position: "absolute",
              bottom: "10%",
              left: "10%",
              padding: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              textAlign: "center",
              borderRadius: "10px",
              zIndex: 2,
              opacity: 1,
            }}
          >
            Desde un punto de vista humano, la diversidad biológica
            <br /> es clave para la alimentación, la medicina y el bienestar
            general. <br />
            La pérdida de biodiversidad puede tener consecuencias graves, <br />
            como la disminución de recursos naturales, la pérdida de hábitats
            <br /> y el aumento de enfermedades. Por lo tanto, <br />
            conservar la biodiversidad es crucial no solo para la naturaleza,{" "}
            <br />
            sino también para el futuro de la humanidad.
          </div>
        )}

        {/* Ventana de sensibilización */}
        {showAwareness && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "30px",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              textAlign: "center",
              borderRadius: "10px",
              zIndex: 10,
              maxWidth: "80%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2>Sensibilización sobre la Pérdida de Biodiversidad</h2>
            <p>
              La pérdida de biodiversidad es un problema crítico que afecta a
              todo el planeta. Cada especie perdida reduce la resiliencia de los
              ecosistemas y compromete los servicios vitales que estos nos
              proporcionan, como la purificación del aire y agua, la
              polinización de cultivos y la regulación del clima. Es fundamental
              actuar ahora para conservar y restaurar los hábitats naturales,
              proteger las especies en peligro y promover prácticas sostenibles
              que garanticen un futuro saludable para las próximas generaciones.
            </p>
            <button
              onClick={handleCloseAwareness}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#f44336",
                color: "white",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Biodiversity;

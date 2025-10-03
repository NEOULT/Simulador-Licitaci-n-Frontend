import React, { useState } from "react";
import "./empresa.css";
import licitador from "../../services/LicitacionService.js";

const Empresa = () => {
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState("");

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (!uploadedFile) {
        setFile(null);
        setFileError("");
        return;
        }
        const name = uploadedFile.name.toLowerCase();
        const isDat = name.endsWith(".dat");
        if (isDat) {
        setFile(uploadedFile);
        setFileError("");
        } else {
        setFile(null);
        setFileError("Solo se permiten archivos .dat.");
        e.target.value = ""; 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
        alert("Por favor, adjunta un archivo .dat válido antes de enviar.");
        return;
        }
        try {
        const form = new FormData();
        form.append("paquete_dat", file, file.name);
        await licitador.subirOferta(form);
        alert("Propuesta enviada con éxito.");
        } catch (error) {
        console.error("Error al enviar la propuesta:", error);
        }
    };

    return (
        <div className="empresa-container">
        <div className="upload-box">
            <h2>Subir Propuesta</h2>
            <input type="file" accept=".dat" onChange={handleFileChange} />
            {fileError && <p className="error-message">{fileError}</p>}
            <button onClick={handleSubmit} className="submit-button">
            Enviar Propuesta
            </button>
        </div>
        <div className="file-preview">
            {file && <p className="doc-preview">Archivo cargado: {file.name}</p>}
        </div>
        </div>
    );
};

export default Empresa;

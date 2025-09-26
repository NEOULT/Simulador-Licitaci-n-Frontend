import React, { useState } from "react";
import "./empresa.css";

const Empresa = () => {
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState("");

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

        if (uploadedFile && allowedTypes.includes(uploadedFile.type)) {
        setFile(uploadedFile);
        setFileError("");
        } else {
        setFile(null);
        setFileError("Solo se permiten archivos PDF o DOC.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
        console.log("Archivo enviado:", file.name);
        alert("Propuesta enviada correctamente.");
        } else {
        alert("Por favor, adjunta un archivo válido antes de enviar.");
        }
    };

    return (
        <div className="empresa-container">
        <div className="upload-box">
            <h2>Subir Propuesta</h2>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            {fileError && <p className="error-message">{fileError}</p>}
            <button onClick={handleSubmit} className="submit-button">
            Enviar Propuesta
            </button>
        </div>
        <div className="file-preview">
            {file && (
            <>
                <p className="doc-preview">Archivo cargado: {file.name}</p>
            </>
            )}
        </div>
        </div>
    );
};

export default Empresa;
import { useEffect, useState } from 'react';
import licitador from '../../services/LicitacionService.js';
import './licitador.css';

export default function Licitador({ ids: idsProp }) {
    const [ids, setIds] = useState(Array.isArray(idsProp) ? idsProp : []);
    const [loading, setLoading] = useState(false);
    const [busyId, setBusyId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (Array.isArray(idsProp)) return;
        const fetchIds = async () => {
        try {
            setLoading(true);
            setError('');
            const res = await licitador.obtenerLista();
            if (!res.status) throw new Error(`Error ${res.status}`);
            const data = res;
            const list = data.ids || data.ofertas || [];
            setIds(list);
        } catch (e) {
            setError('No se pudo cargar la lista de ofertas.');
        } finally {
            setLoading(false);
        }
        };
        fetchIds();
    }, [idsProp]);

    const verOferta = async (id) => {
        try {
        setBusyId(id);
        setError('');
        const { blob } = await licitador.procesarOferta(id);
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank', 'noopener,noreferrer');
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
        } catch (e) {
        setError(`Error al procesar: ${e.message}`);
        console.log(e.message);
        } finally {
        setBusyId(null);
        }
    };

    const marcarGanador = async (id) => {
        try {
        setBusyId(id);
        setError('');
        const res = await licitador.enviarGanador(id);
        if (!res.ok) throw new Error(res.error || 'Error al marcar ganador');
        alert(`Ganador seleccionado: ${id}`);
        } catch (e) {
        setError(`Error al marcar ganador: ${e.message}`);
        } finally {
        setBusyId(null);
        }
    };

    const salir = () => {
        window.location.href = '/';
    };

    return (
        <div className="lic-page">
        <div className="lic-card">
            <h1 className="lic-title">Licitador</h1>
            <button className="btn btn-exit" onClick={salir} aria-label="Salir a login">
            Salir
            </button>
            {error && <div className="lic-error">{error}</div>}
            {loading && <div className="lic-loading">Cargando ofertas…</div>}

            <div className="lic-scroll">
            <ul className="lic-list" role="list">
                {ids.map((id, idx) => (
                <li key={id} className="lic-item">
                    <div className="lic-info">
                    <span className="lic-label">Oferta {idx + 1}</span>
                    <span className="lic-id">{id}</span>
                    </div>
                    <div className="lic-actions">
                    <button
                        className="btn btn-view"
                        onClick={() => verOferta(id)}
                        disabled={busyId === id}
                    >
                        {busyId === id ? 'Procesando…' : 'Ver'}
                    </button>
                    <button
                        className="btn btn-winner"
                        onClick={() => marcarGanador(id)}
                        disabled={busyId === id}
                    >
                        {busyId === id ? 'Enviando…' : 'Ganador'}
                    </button>
                    </div>
                </li>
                ))}
                {!loading && ids.length === 0 && (
                <li className="lic-empty">No hay ofertas disponibles.</li>
                )}
            </ul>
            </div>
        </div>
        </div>
    );
}
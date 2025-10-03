import apiservice from "./apiservice";

const authService = {

    obtenerLista: async () => {
        return await apiservice.get('/licitacion/listar');
    },

    subirOferta: async (data) => {
        return await apiservice.post('/licitacion/subir', data);
    },
    
    procesarOferta: async (id) => {
        const res = await apiservice.postRaw(`/licitacion/procesar/${id}`, {
            headers: {
                Accept: 'application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }
        });
        const ct = res.headers.get('content-type') || '';
        if (!res.ok) {
            const msg = ct.includes('application/json') ? JSON.stringify(await res.json()) : await res.text();
            throw new Error(msg || `HTTP ${res.status}`);
        }
        const blob = await res.blob();
        return { blob, contentType: ct };
    },

    enviarGanador: async (id) => {
        return await apiservice.post(`/licitacion/ganador`, { id });
    }
};

export default authService;
    
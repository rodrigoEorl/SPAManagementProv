import { useEffect, useState } from "react";
import { Modal, Table, Select, Spin, Alert } from "antd";
import { buscarEnScraping } from "../api/scraping";

const { Option } = Select;

function ScreeningModal({ visible, onClose,resultados,setResultados, entidad }) {
  const [fuentes, setFuentes] = useState(["https://www.icij.org/investigations/offshore"]);
  const [loading, setLoading] = useState(false);
  //const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (visible && entidad) {
      ejecutarScreening();
    }
  }, [visible, entidad]);

  const ejecutarScreening = async () => {
    if (!entidad || fuentes.length === 0) {
      setError("Debe seleccionar al menos una fuente.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await buscarEnScraping(entidad);
      if (data.length > 0) {
        setResultados(data);
      } else {
        setError("No se encontraron datos.");
      }
    } catch (err) {
      setError("Error al obtener datos del API.");
      console.error(err);
    }

    setLoading(false);
  };

  const columns = [
    { title: "Entidad", dataIndex: "entity", key: "entity" },
    { title: "Jurisdicción", dataIndex: "jurisdiction", key: "jurisdiction" },
    { title: "Vinculado a", dataIndex: "linkedTo", key: "linkedTo" },
    {
      title: "Fuente",
      dataIndex: "dataFrom",
      key: "dataFrom",
      render: (url) => <a href={url} target="_blank" rel="noopener noreferrer">Ver fuente</a>,
    },
  ];

  return (
    <Modal title="Screening de Proveedor" open={visible} onCancel={onClose} footer={null} width={800}>
      <div style={{ marginBottom: 16 }}>
        <span>Seleccionar fuentes:</span>
        <Select
          mode="multiple"
          style={{ width: "100%", marginTop: 8 }}
          value={fuentes}
          onChange={setFuentes}
          maxCount={3}
        >
          <Option value="https://www.icij.org/investigations/offshore">Offshore Leaks</Option>
        </Select>
      </div>

      {loading ? <Spin size="large" style={{ display: "block", textAlign: "center", margin: "20px 0" }} /> : null}
      {error ? <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} /> : null}

      <Table columns={columns} dataSource={resultados} rowKey="entity" bordered />
    </Modal>
  );
}

export default ScreeningModal;

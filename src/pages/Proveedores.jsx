import { useEffect, useState } from "react";
import { Table, Button, Tooltip, Modal, Form, Input, Switch, message } from "antd";
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { obtenerProveedores, eliminarProveedor, crearProveedor } from "../api/proveedores";
import ProveedorModal from "../components/ProveedorModal";
import ScreeningModal from "../components/ScrenningModal";

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [proveedorActual, setProveedorActual] = useState(null);
  const [modoVista, setModoVista] = useState(false);
  const [modalScreeningVisible, setModalScreeningVisible] = useState(false);
  const [entidadSeleccionada, setEntidadSeleccionada] = useState("");
  const [resultados, setResultados] = useState([]);
  const [form] = Form.useForm();;

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    setLoading(true);
    try {
      const response = await obtenerProveedores();
      setProveedores(response.data);
      message.success(response.message);
    } catch (error) {
      console.error("Error al cargar proveedores:", error);
    }
    setLoading(false);
  };

  const handleEliminar = async (id) => {
    const confirmation = window.confirm("¿Seguro que deseas eliminar este proveedor?");
    
    if (confirmation) {
      try {
        console.log("Intentando eliminar el proveedor con ID:", id);
        await eliminarProveedor(id);
        message.success("Proveedor eliminado correctamente");
        cargarProveedores();
      } catch (error) {
        console.error("Error al eliminar proveedor:", error);
        message.error("Error al eliminar el proveedor");
      }
    }
  };

  const handleVer = (proveedor) => {
    setProveedorActual(proveedor);
    setModoVista(true);
    form.setFieldsValue(proveedor);
    setModalVisible(true);
  };

  const handleCrear = () => {
    setProveedorActual(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditar = (proveedor) => {
    setProveedorActual(proveedor);
    setModoVista(false);
    setModalVisible(true);
  };
  
  const handleCerrarModal = () => {
    setModalVisible(false);
    setModoVista(false);
    setProveedorActual(null);
  };

  const handleScreening = (entidad) => {
    setEntidadSeleccionada(entidad);
    setModalScreeningVisible(true);
  };

  const handleCloseScreeningModal = () => {
    setModalScreeningVisible(false);
    setResultados([]);
  };

  const columns = [
    {
        title: "N°",
        dataIndex: "index",
        key: "index",
        align: "center",
        render: (_, __, index) => index + 1,
    },
    { title: "Razón Social", dataIndex: "proRazonSocial", key: "proRazonSocial", align: "center" },
    { title: "Nombre Comercial", dataIndex: "proNomComerc", key: "proNomComerc", align: "center" },
    { title: "Identificación", dataIndex: "proIdentifTributaria", key: "proIdentifTributaria", align: "center" },
    { title: "Teléfono", dataIndex: "proNumTelef", key: "proNumTelef", align: "center" },
    {
      title: "Acciones",
      key: "acciones",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          <Tooltip title="Editar">
            <Button icon={<EditOutlined />} onClick={() => handleEditar(record)} />
          </Tooltip>
          <Tooltip title="Ver">
            <Button icon={<EyeOutlined />} onClick={() => handleVer(record)} />
          </Tooltip>
          <Tooltip title="Screening">
            <Button icon={<SearchOutlined />} onClick={() => handleScreening(record.proRazonSocial)} />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button icon={<DeleteOutlined />} danger onClick={() => handleEliminar(record.proId)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%", maxWidth: "1000px", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2>Lista de Proveedores</h2>
          <Tooltip title="Crear Proveedor">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCrear} />
          </Tooltip>
        </div>
        <Table
          columns={columns}
          dataSource={proveedores}
          loading={loading}
          rowKey="proId"
          bordered
        />
        <ProveedorModal 
        visible={modalVisible} 
        onClose={handleCerrarModal} 
        proveedorActual={proveedorActual} 
        onGuardado={cargarProveedores} 
        onSave={(data) => console.log(data)} 
        modoVista={modoVista}
        />

      <ScreeningModal
        visible={modalScreeningVisible}
        onClose={handleCloseScreeningModal}
        resultados={resultados}
        setResultados={setResultados}
        entidad={entidadSeleccionada}
      />
      </div>
    </div>
  );
}

export default Proveedores;

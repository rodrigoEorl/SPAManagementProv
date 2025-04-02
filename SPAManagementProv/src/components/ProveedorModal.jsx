import { useEffect, useState } from "react";
import { Form, Input, Select, Button, Modal, InputNumber, message } from "antd";
import { obtenerPaises } from "../api/paises";
import { crearProveedor, actualizarProveedor } from "../api/proveedores";

const { Option } = Select;

function ProveedorModal({ visible, onClose, proveedorActual, onGuardado, modoVista }) {
  const [form] = Form.useForm();
  const [paises, setPaises] = useState([]);

  // Cargar países al iniciar
  useEffect(() => {
    async function cargarPaises() {
      const data = await obtenerPaises();
      setPaises(data);
    }
    cargarPaises();
  }, []);

  // Cargar datos del proveedor seleccionado en el formulario
  useEffect(() => {
    if (proveedorActual) {
      form.setFieldsValue(proveedorActual);
    } else {
      form.resetFields();
    }
  }, [proveedorActual, form]);

  // Enviar datos al API
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (proveedorActual) {
        const response = await actualizarProveedor({ ...proveedorActual, ...values });
        message.success(response.message || "Proveedor actualizado correctamente");
      } else {
        const response = await crearProveedor(values);
        message.success(response.message || "Proveedor creado correctamente");
      }
      onGuardado();
      onClose();
      form.resetFields();
    } catch (error) {
      console.error("Error en el formulario:", error);
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      title={modoVista ? "Detalles del Proveedor" : proveedorActual ? "Editar Proveedor" : "Nuevo Proveedor"}
      footer={
        modoVista ? (
          <Button type="primary" onClick={onClose}>
            OK
          </Button>
        ) : (
          <Button type="primary" onClick={handleSubmit}>
            {proveedorActual ? "Actualizar" : "Guardar"}
          </Button>
        )
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item name="proRazonSocial" label="Razón Social" rules={[{ required: true, message: "Campo requerido" }]}>
          <Input disabled={modoVista} />
        </Form.Item>

        <Form.Item name="proNomComerc" label="Nombre Comercial" rules={[{ required: true, message: "Campo requerido" }]}>
          <Input disabled={modoVista} />
        </Form.Item>

        <Form.Item
          name="proIdentifTributaria"
          label="Identificación Tributaria"
          rules={[
            { required: true, message: "Campo requerido" },
            { pattern: /^[0-9]{11}$/, message: "Debe contener 11 dígitos numéricos" },
          ]}
        >
          <Input maxLength={11} disabled={modoVista} />
        </Form.Item>

        <Form.Item
          name="proNumTelef"
          label="Teléfono"
          rules={[
            { required: true, message: "Campo requerido" },
            { pattern: /^[0-9+\-() ]{9,15}$/, message: "Número inválido" },
          ]}
        >
          <Input placeholder="+51 999 999 999" disabled={modoVista} />
        </Form.Item>

        <Form.Item
          name="proCorreo"
          label="Correo Electrónico"
          rules={[
            { type: "email", message: "Correo inválido" },
            { required: true, message: "Campo requerido" },
          ]}
        >
          <Input disabled={modoVista} />
        </Form.Item>

        <Form.Item name="proWeb" label="Sitio Web" rules={[{ type: "url", message: "Debe ser una URL válida" }]}>
          <Input placeholder="https://ejemplo.com" disabled={modoVista} />
        </Form.Item>

        <Form.Item name="proDireccion" label="Dirección" rules={[{ required: true, message: "Campo requerido" }]}>
          <Input disabled={modoVista} />
        </Form.Item>

        <Form.Item name="proPaisId" label="País" rules={[{ required: true, message: "Selecciona un país" }]}>
          <Select placeholder="Seleccione un país" disabled={modoVista}>
            {paises.map((pais) => (
              <Option key={pais.paisId} value={pais.paisId}>
                {pais.paisNombre}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="proFacturacionAnual" label="Facturación Anual (USD)" rules={[{ required: true, message: "Campo requerido" }]}>
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            disabled={modoVista}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ProveedorModal;

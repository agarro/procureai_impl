# Cuestionario de Relevamiento Técnico y Funcional - Integración ProcureAI

## Introducción
Este documento tiene como objetivo recopilar información crítica para dimensionar, diseñar y planificar la implementación de **ProcureAI** en su organización. Dado que su empresa opera en la industria de fabricación y distribución de hormigón elaborado a nivel multinacional, las preguntas han sido diseñadas para entender las particularidades de su cadena de suministro, infraestructura tecnológica (SAP) y reglas de negocio.

La información provista aquí será tratada con confidencialidad y servirá de base para reemplazar los datos de prueba (mock data) actuales por datos reales de su operación, permitiendo una demostración ajustada a su realidad.

---

## 1. Infraestructura Tecnológica y ERP (SAP)
Para diseñar los conectores y la arquitectura de integración, necesitamos entender su ecosistema actual.

*   **Versión de SAP:** ¿Qué versión de SAP están ejecutando actualmente (ej. SAP ECC 6.0, S/4HANA)? Indique el Enhancement Package (EHP) si aplica.
*   **Modelo de Despliegue:** ¿La infraestructura es On-Premise, Cloud (HEC, Public Cloud, Private Cloud) o Híbrida?
*   **Módulos Implementados:** ¿Qué módulos de SAP están activos y son relevantes para Compras y Suministros (ej. MM, PP, SD, FI, CO, QM, PM)?
*   **Personalizaciones (Z):** ¿Utilizan transacciones o tablas "Z" críticas para el proceso de compras o gestión de stock? Por favor, descríbalas brevemente.
*   **Integración Actual:** ¿Utilizan SAP PI/PO, SAP CPI/Integration Suite u otro middleware para integraciones?
*   **Acceso a Datos:** ¿Disponen de APIs (OData, SOAP) expuestas o la integración se realiza mayormente vía IDoc/RFC?

## 2. Procesos de Compras, Reglas y Políticas
Queremos entender "cómo compran" para que la IA se adapte a sus normativas.

*   **Documentación:** ¿Existe documentación actualizada (diagramas de flujo, manuales) de sus procesos Procure-to-Pay (P2P) y Source-to-Contract?
*   **Políticas de Compras:** Describa brevemente las reglas de aprobación (ej. montos, jerarquías) y políticas de compliance mandatorias.
*   **Niveles de Automatización:** Para cada sub-proceso (Requisición, PO, Recepción, Facturación), ¿qué nivel de automatización tienen hoy? (Manual, Parcial, Totalmente Automático).
*   **Circuitos de Aprobación:** ¿Son estáticos o dinámicos? ¿Dependen de centro de costos, categoría de material o monto?
*   **Manejo de Urgencias:** ¿Existe un "Fast Track" para compras críticas (ej. rotura de planta de hormigón)? ¿Cómo se gestiona hoy?

## 3. Compras Estratégicas y Gestión de Proveedores
*   **Evaluación de Proveedores:** ¿Cómo califican hoy a sus proveedores? ¿Qué KPIs miden (ej. OTIF, Calidad, Compliance)?
*   **Registro de Proveedores:** ¿Qué datos son obligatorios? ¿Cómo es el proceso de alta, modificación y bloqueo de proveedores en SAP?
*   **Contacto con Proveedores:** 
    *   Describa detalladamente cómo contactan a los proveedores en cada etapa (RFI, RFQ, Adjudicación, Seguimiento de Entrega). 
    *   ¿Cómo les **gustaría** que fuesen contactados? (ej. WhatsApp para confirmaciones rápidas, Portal para licitaciones, Email para OCs).
    *   ¿Existen reglas de canal preferido según la criticidad del insumo?
*   **Publicación de Convocatorias:** ¿Utilizan portales externos, invitaciones por email o publicaciones abiertas? Describa el proceso detallado.

## 4. Cadena de Suministro y Producción (Enfoque Hormigón)
Dada la naturaleza crítica de sus materiales (cemento, áridos, aditivos), necesitamos detalles precisos.

*   **Materiales Críticos:** Por favor liste las familias de materiales críticos. (ej. Cemento a granel, Áridos finos/gruesos, Aditivos químicos, Agua, Repuestos de flota mixer).
*   **Estado del MRP (Material Requirements Planning):** 
    *   ¿Ejecutan el MRP en SAP? ¿Con qué frecuencia?
    *   ¿Confían en los resultados del MRP o requieren muchos ajustes manuales?
    *   ¿Cómo gestionan hoy las excepciones del MRP (retrasos, cancelaciones)?
*   **Líneas de Producción:** Describa la configuración de sus plantas (Plantas dosificadoras, Plantas móviles). 
*   **Lead Times:** ¿Cuáles son los Lead Times típicos para sus materiales críticos? ¿Cómo varían geográficamente?
*   **Logística de Entrada:** ¿La gestión de turnos de descarga de camiones (ej. cemento/áridos) está integrada con compras?

## 5. Gestión de Contratos y Legal
*   **Tipología:** Detalle los tipos de contratos vigentes (ej. Acuerdos Marco, Contratos de precio fijo, Contratos por obra).
*   **Reglas de Vigencia:** ¿Cómo gestionan las renovaciones y actualizaciones de precios (ej. fórmulas polinómicas de ajuste)?
*   **Certificaciones y Compliance:** ¿Qué certificaciones (ISO, Seguridad, Medioambiente) son mandatorias para sus proveedores de materias primas y transporte?

## 6. Datos e Inteligencia Externa
*   **Fuentes Externas:** ¿Utilizan servicios como Amplify, Bloomberg, D&B, o fuentes climáticas/tráfico para la toma de decisiones? Describa detalladamente.
*   **Seguridad de la Información:** Detalle sus políticas de seguridad de la información y protección de datos personales (GDPR, leyes locales) que debamos cumplir.

## 7. Deseos y Visión Futura (AI Oportunities)
*   **Gaps Funcionales:** ¿Qué funcionalidades críticas NO tienen hoy con sus sistemas actuales?
*   **Potencial de la IA:** ¿Qué problemas les gustaría resolver con IA? (ej. predecir quiebres de stock de cemento, automatizar lectura de facturas complejas, negociación automática de compras menores).

## 8. Datos para Personalización (Mock Data Replacement)
Para configurar ProcureAI con datos que les resulten familiares, necesitamos nos provean (o describan la estructura) de los siguientes sets de datos anonimizados:

1.  **Maestro de Materiales:** Estructura de códigos, descripciones, grupos de artículos (especialmente críticos).
2.  **Maestro de Proveedores:** Lista representativa con categorías y ubicaciones.
3.  **Centros y Almacenes:** Estructura de sus plantas de hormigón y almacenes de repuestos.
4.  **Historial de Compras:** Ejemplos de Órdenes de Compra recientes (Cabecera y Posiciones).
5.  **Facturas Ejemplo:** PDFs de facturas típicas para entrenar el motor de OCR.
6.  **Reglas de Stock:** Puntos de pedido, stocks de seguridad actuales.

---

## 9. Selección de Funcionalidades de ProcureAI
Por favor, marque con una "X" las funcionalidades de nuestra plataforma que le interesa implementar o explorar en esta fase:

**Gestión de Compras (Procurement)**
- [ ] **Sourcing Event Management:** Creación y gestión de RFI, RFP, RFQ con comparación automática de ofertas.
- [ ] **MRO Catalog:** Catálogo tipo e-commerce para compras de mantenimiento, reparación y operaciones.
- [ ] **AP Automation:** Automatización de Cuentas a Pagar, lectura de facturas con IA y "3-way match" automático.
- [ ] **Spend Analysis:** Tableros de análisis de gasto, categorización automática y detección de anomalías.

**Cadena de Suministro Inteligente (Supply Chain)**
- [ ] **MRP Control Tower:** Gestión centralizada de excepciones del MRP, predicción de quiebres de stock.
- [ ] **Demand Planning:** Pronóstico de demanda alimentado por IA (ventas históricas + variables externas).
- [ ] **Scenario Planner:** Simulación de escenarios "What-if" (ej. ¿Qué pasa si el proveedor X falla? ¿Qué pasa si sube el combustible?).
- [ ] **Audit Console:** Trazabilidad completa y logs de auditoría sobre las decisiones tomadas por la IA.

**Gestión Estratégica y Riesgos**
- [ ] **Contract Lifecycle Management (CLM):** Repositorio digital, alertas de vencimiento y análisis de riesgo contractual con IA.
- [ ] **Integración de Riesgos (Risk Management):** Monitoreo de salud financiera y reputacional de proveedores.
- [ ] **Comunicaciones Proactivas:** Generación automática de comunicados a proveedores/clientes ante eventos disruptivos.

**Infraestructura y Configuración**
- [ ] **Backoffice & Master Data Sync:** Sincronización bidireccional de datos maestros con SAP.
- [ ] **Integration Logs:** Visibilidad técnica detallada del intercambio de mensajes con el ERP.

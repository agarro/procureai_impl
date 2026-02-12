# Documento de Especificación Funcional: Plataforma ProcureAI

## 1. Resumen Ejecutivo
La aplicación **ProcureAI** es una plataforma de orquestación de compras autónoma diseñada para automatizar y optimizar el ciclo de vida del abastecimiento (sourcing) empresarial. Su propósito principal es delegar tareas operativas complejas a un sistema de agentes inteligentes que interactúan entre sí para validar necesidades, evaluar riesgos, negociar con proveedores y formalizar adjudicaciones.

El sistema actúa como una capa de inteligencia sobre los sistemas ERP tradicionales, permitiendo a las organizaciones reducir tiempos de ciclo, minimizar riesgos en la cadena de suministro y maximizar ahorros mediante negociaciones automatizadas, todo bajo la supervisión de un panel de control centralizado.

## 2. Perfiles de Usuario
Basado en la interfaz y los flujos de trabajo, se identifican los siguientes perfiles de interacción:

*   **Gerente de Compras / Comprador Estratégico**: Usuario principal. Responsable de iniciar nuevos eventos de compra, monitorear el desempeño de los agentes a través del Dashboard y supervisar la ejecución de las simulaciones de sourcing. Tiene autoridad para validar pasos críticos y descargar órdenes de compra.
*   **Administrador del Sistema / Configuración**: Encargado de la gestión técnica del entorno. Sus responsabilidades incluyen conectar sistemas externos (ERPs, portales de proveedores), configurar fuentes de datos para la IA (RAG) y ajustar las políticas de ponderación de riesgos y tipos de cambio.

## 3. Listado de Funcionalidades Principales

### 1. Dashboard Ejecutivo de Compras
*   **Métricas Clave (KPIs)**:
    *   **Ahorros IA (YTD)**: Ahorros acumulados por negociaciones autónomas.
    *   **Riesgo Proveedores**: Nivel de riesgo integral de la base activa.
    *   **Excepciones Activas**: Eventos que requieren intervención humana.
    *   **Tasa OC Auto**: Porcentaje de órdenes de compra "touchless".
    *   **Sitios VMI Activos**: Cantidad de inventarios gestionados por proveedores.
*   **Visualización de Datos**:
    *   **Agilidad vs. Transparencia**: Análisis de tiempos de respuesta vs. score de confianza.
    *   **Curva de Ahorros IA**: Evolución temporal de los ahorros generados.
*   **Guía de Interpretación**: Micro-ayuda integrada para entender el cálculo de cada métrica.

### 2. Gestión de Eventos de Sourcing
*   **Creación de Eventos**: Soporte para Compra Spot, Licitación (RFP), Sourcing Estratégico y Contrato Marco.
*   **Configuración Dinámica**: Campos adaptativos según el tipo de proceso y soporte multimoneda (USD/ARS).
*   **Simulación de Orquestación**:
    *   Log de chat interactivo entre agentes (Orquestador, ERP, Sourcing, Riesgo, Legal).
    *   Visualización del "Proceso de Pensamiento" de la IA.
    *   Generación de tablas comparativas y cuadros de adjudicación sugeridos.
*   **Generación de Documentos**: Creación automática de Órdenes de Compra (OC) en PDF.

### 3. Planificación MRP y Demanda (Nuevos Módulos)
*   **Demand Planning**: Predicción de necesidades futuras basada en IA.
*   **MRP Control Tower**: Gestión de excepciones en la cadena de suministro y rupturas de stock.
*   **Scenario Planner**: Simulación de diversos escenarios operativos ("What-if") para mitigar riesgos.

### 4. Gestión de Contratos (CLM) y Catálogo
*   **Catálogo MRO**: Centralización de repuestos y materiales de mantenimiento.
*   **CLM con IA**: 
    *   Redacción automática de borradores de contratos.
    *   Cálculo de **Riesgo IA** (0-100%) analizando ambigüedad, cumplimiento legal y financiero.

### 5. Automatización de Cuentas por Pagar (AP)
*   **Three-Way Matching**: Conciliación automática entre Orden de Compra (PO), Recepción de Mercancías (GR) y Factura.
*   **Match Score**: Porcentaje de coincidencia inteligente para aprobación automatizada o desvío a excepciones.

### 6. Análisis de Gastos (Spend Analysis) e Información de Auditoría
*   **Spend Analysis**: Análisis visual de la distribución del gasto corporativo.
*   **Consola de Auditoría**:
    *   Monitoreo en tiempo real de trazas del sistema (pensamientos de IA, transacciones, acciones de usuario).
    *   Exportación de logs formateados para cumplimiento y auditoría externa.

### 7. Backoffice y Configuración Avanzada
*   **Conexiones ERP**: Integración con SAP, Oracle y otros sistemas mediante API.
*   **Redes de Proveedores**: Gestión de portales (Ariba, Coupa).
*   **Motor de Riesgos y RAG**: Ajuste de ponderaciones de riesgo y activación de fuentes de conocimiento (Bloomberg, SharePoint).
*   **Normalización Monetaria**: Configuración de tipos de cambio (Mercado, MEP, Blue, Custom).
*   **Sincronización de Master Data**: Actualización bidireccional de parámetros logísticos con el ERP.

## 4. Flujos de Usuario (User Journeys)

### Flujo A: Creación y Ejecución de un Evento de Compra
1.  **Inicio**: Acceso al Dashboard -> Crear Nuevo Evento.
2.  **Configuración**: Definición de título, moneda y tipo de proceso.
3.  **Orquestación**: Inicio de la simulación donde los agentes validan stock, evalúan proveedores y negocian precios.
4.  **Cierre**: Adjudicación final, validación legal y descarga del PDF de la OC.

### Flujo B: Conciliación de Facturas (AP)
1.  **Ingreso**: Navegación al módulo de Cuentas por Pagar.
2.  **Ejecución**: Uso de "Auto-Match" para procesar facturas pendientes.
3.  **Resolución**: Validación de facturas con 100% de coincidencia y revisión manual de excepciones detectadas.

### Flujo C: Auditoría y Trazabilidad
1.  **Monitoreo**: Acceso a la Consola de Auditoría para visualizar la lógica detrás de una decisión de la IA.
2.  **Exportación**: Descarga de logs para soporte o revisiones de cumplimiento.

## 5. Reglas de Negocio

1.  **Validación Dinámica**: Campos mandatorios cambian según el tipo de evento (ej. Fee Mensual solo en Contrato Marco).
2.  **Conversión Global**: Todas las métricas del Dashboard se normalizan a la moneda de preferencia usando el tipo de cambio configurado en Backoffice.
3.  **Seguridad y Auditoría**: Cada decisión de un agente debe quedar registrada en el log de auditoría con su respectivo "contexto de pensamiento".
4.  **Flujo de Aprobación**: El sistema sugiere adjudicaciones, pero bloquea el cierre si el riesgo integral supera los umbrales configurados sin supervisión.

## 6. Componentes Globales
*   **AI Chat Assistant**: Asistente persistente disponible en todas las vistas para consultas sobre el estado del sistema, métricas o ayuda operativa.

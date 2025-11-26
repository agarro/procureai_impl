# Documento de Especificación Funcional: Plataforma ProcureAI

## 1. Resumen Ejecutivo
La aplicación **ProcureAI** es una plataforma de orquestación de compras autónoma diseñada para automatizar y optimizar el ciclo de vida del abastecimiento (sourcing) empresarial. Su propósito principal es delegar tareas operativas complejas a un sistema de agentes inteligentes que interactúan entre sí para validar necesidades, evaluar riesgos, negociar con proveedores y formalizar adjudicaciones.

El sistema actúa como una capa de inteligencia sobre los sistemas ERP tradicionales, permitiendo a las organizaciones reducir tiempos de ciclo, minimizar riesgos en la cadena de suministro y maximizar ahorros mediante negociaciones automatizadas, todo bajo la supervisión de un panel de control centralizado.

## 2. Perfiles de Usuario
Basado en la interfaz y los flujos de trabajo, se identifican los siguientes perfiles de interacción:

*   **Gerente de Compras / Comprador Estratégico**: Usuario principal. Responsable de iniciar nuevos eventos de compra, monitorear el desempeño de los agentes a través del Dashboard y supervisar la ejecución de las simulaciones de sourcing. Tiene autoridad para validar pasos críticos y descargar órdenes de compra.
*   **Administrador del Sistema / Configuración**: Encargado de la gestión técnica del entorno. Sus responsabilidades incluyen conectar sistemas externos (ERPs, portales de proveedores), configurar fuentes de datos para la IA (RAG) y ajustar las políticas de ponderación de riesgos y tipos de cambio.

## 3. Listado de Funcionalidades Principales

1.  **Dashboard Ejecutivo de Compras**:
    *   Visualización de métricas clave en tiempo real: Ahorros generados por IA, Nivel de riesgo de proveedores, Excepciones activas y Tasa de automatización de Órdenes de Compra (OC).
    *   Gráfico de dispersión para analizar la relación entre la "Agilidad del Agente" y el "Score de Transparencia".
    *   Guía interactiva de interpretación de métricas.

2.  **Gestión de Eventos de Sourcing**:
    *   Creación de nuevos eventos con soporte para múltiples tipos de procesos:
        *   **Compra Spot**: Para necesidades inmediatas y puntuales.
        *   **Licitación (RFP)**: Para procesos formales y competitivos.
        *   **Sourcing Estratégico**: Para desarrollo de categorías a largo plazo.
        *   **Contrato Marco**: Para acuerdos de suministro recurrentes.
    *   Formularios dinámicos que adaptan los campos requeridos según el tipo de proceso seleccionado.
    *   Soporte multimoneda (USD y ARS) con conversión automática de valores.

3.  **Simulación de Orquestación de Agentes (Sourcing Event)**:
    *   Interfaz de chat tipo "Log de Orquestación" que muestra la interacción entre distintos agentes especializados (Orquestador, ERP, Sourcing, Riesgo, Legal).
    *   Visualización del "Proceso de Pensamiento" de la IA para transparencia en la toma de decisiones.
    *   Generación dinámica de tablas de datos durante la conversación (ej. validación de stock, comparativas de ofertas, rondas de negociación).
    *   Control de flujo paso a paso (Validación -> Riesgo -> Negociación -> Adjudicación).

4.  **Generación de Documentos**:
    *   Creación y descarga automática de Órdenes de Compra (OC) en formato PDF al finalizar un evento exitoso.

5.  **Backoffice y Configuración**:
    *   **Conexiones**: Gestión del estado de integración con sistemas ERP (SAP, Oracle) y redes de proveedores (Ariba, Coupa).
    *   **Fuentes de Conocimiento**: Activación de fuentes de datos externas para el motor de IA (ej. Bloomberg, SharePoint).
    *   **Motor de Riesgos**: Sliders para ajustar la ponderación de factores de riesgo (Proveedores vs. Mercado).
    *   **Tipos de Cambio**: Configuración de tasas de conversión manuales o automáticas para la normalización de moneda.

## 4. Flujos de Usuario (User Journeys)

### Flujo A: Creación y Ejecución de un Evento de Compra
1.  **Inicio**: El usuario accede al Dashboard y selecciona "Crear Nuevo Evento" o navega desde la barra lateral.
2.  **Configuración del Evento**:
    *   El usuario define el título y selecciona la moneda (USD/ARS).
    *   Selecciona el tipo de proceso (ej. "Compra Spot").
    *   El sistema despliega los campos específicos (Volumen, Categoría, Precio Objetivo).
    *   El usuario completa la información y confirma la creación.
3.  **Orquestación (Simulación)**:
    *   El sistema redirige a la vista del evento en estado "Iniciado".
    *   **Paso 1 (Validación)**: El usuario inicia el flujo. El agente "ERP" verifica stock y valida la necesidad.
    *   **Paso 2 (Riesgo y Ofertas)**: El agente de "Sourcing" contacta proveedores y presenta un cuadro comparativo. El agente de "Riesgo" evalúa a los candidatos.
    *   **Paso 3 (Negociación)**: El sistema simula rondas de negociación, mostrando ofertas iniciales, contraofertas y el precio final acordado.
    *   **Paso 4 (Cierre)**: El agente "Legal" valida cumplimiento y el agente "ERP" genera la Orden de Compra.
4.  **Finalización**: El usuario visualiza el resumen de ahorros y descarga el PDF de la Orden de Compra.

### Flujo B: Configuración de Parámetros de Negocio
1.  **Acceso**: El usuario navega a la sección "Backoffice".
2.  **Gestión de Integraciones**: Revisa el estado de conexión de los sistemas ERP. Puede ver detalles de última sincronización.
3.  **Ajuste de Riesgos**: Accede a la pestaña "Ponderación de Riesgos". Mueve los controles deslizantes para dar más peso al "Riesgo Financiero" o "Riesgo Geopolítico" según la estrategia actual.
4.  **Guardado**: Confirma los cambios para que afecten a los futuros cálculos de los agentes.

## 5. Reglas de Negocio

1.  **Validación de Campos por Tipo de Proceso**:
    *   Para **Compra Spot**, es obligatorio definir Volumen y Categoría.
    *   Para **Licitaciones**, se requieren los Requerimientos del Servicio.
    *   Para **Contratos Marco**, son mandatorios la Duración del Contrato y el Fee Mensual.

2.  **Manejo de Moneda**:
    *   El sistema debe permitir la visualización y operación en múltiples monedas (USD, ARS).
    *   Al cambiar la moneda de un evento, los valores monetarios (precios objetivo, ofertas) deben recalcularse utilizando la tasa de cambio configurada en el contexto global.

3.  **Flujo Secuencial de Estados**:
    *   Un evento no puede pasar a "Completado" sin haber atravesado exitosamente las fases de Validación, Análisis de Riesgo y Negociación.
    *   La generación de la Orden de Compra (OC) solo se habilita una vez que se ha seleccionado un proveedor final y validado legalmente.

4.  **Criterios de Adjudicación**:
    *   El sistema sugiere automáticamente al proveedor con el mejor puntaje integral (Score), que combina precio, tiempos de entrega y evaluación de riesgo.
    *   Un proveedor con riesgo "Alto" es alertado, aunque la decisión final puede ser supervisada.

5.  **Integridad de Datos en Simulación**:
    *   Los logs del chat y las tablas generadas deben persistir durante la sesión para permitir la auditoría del proceso de pensamiento de los agentes.

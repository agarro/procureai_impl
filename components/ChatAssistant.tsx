import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, HelpCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { MOCK_CONTRACTS, MOCK_MRO_ITEMS, MOCK_INVOICES, INITIAL_SPEND_DATA, SUPPLIER_DATA } from '../data/mockData';
import { MOCK_FORECASTS, INITIAL_EVENTS } from '../services/mockData';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export const ChatAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    // Context Awareness Logic
    const getPageContext = () => {
        const path = location.pathname;

        // Sourcing Events
        if (path.includes('/events/')) {
            const eventId = path.split('/events/')[1];
            const event = INITIAL_EVENTS[eventId];

            if (event) {
                return {
                    name: `Evento: ${event.title}`,
                    data: event,
                    uiElements: {
                        'stepper': 'La barra de progreso superior muestra las 4 etapas críticas del ciclo de vida del evento: Validación, Riesgo, Negociación y Adjudicación. Los pasos completados se marcan en verde.',
                        'log': 'El "Log de Orquestación" es el cerebro de la operación. Aquí puedes ver en tiempo real cómo los diferentes agentes de IA (Sourcing, Riesgo, Legal, ERP) colaboran para ejecutar el evento.',
                        'resumen': 'El panel de resultados (visible al finalizar) resume los logros clave: proveedor ganador, ahorro obtenido vs target y el número de Orden de Compra generada automáticamente.',
                        'moneda': 'El selector de moneda te permite visualizar y convertir todos los valores financieros del evento entre USD y moneda local (ARS) en tiempo real.'
                    },
                    suggestedQuestions: [
                        "¿Cuál es el estado actual del evento?",
                        "¿Quiénes son los proveedores invitados?",
                        "¿Cuál es el precio objetivo?",
                        "¿Qué riesgo tiene este material?"
                    ]
                };
            }
        }

        // Planning Modules
        if (path.includes('/planning/demand')) {
            return {
                name: 'Demand Planning',
                data: MOCK_FORECASTS,
                uiElements: {
                    'grafico': 'El gráfico principal es una herramienta visual crítica que contrasta la demanda histórica real con nuestras proyecciones de IA para los próximos 6 meses. Las áreas sombreadas representan los intervalos de confianza del 95%, permitiéndote visualizar la incertidumbre inherente al modelo.',
                    'kpi': 'Los indicadores clave de rendimiento (KPIs) en la parte superior resumen la salud de tu planeación. El MAPE (Error Porcentual Absoluto Medio) indica la precisión de nuestro modelo, mientras que la reducción de stock muestra el impacto financiero directo de la optimización.',
                    'stock': 'Este gráfico de barras comparativo es fundamental: muestra la diferencia entre el stock de seguridad estático calculado por el ERP tradicional y el nivel dinámico optimizado por nuestra IA, que se ajusta diariamente según la variabilidad de la demanda.',
                    'aplicar': 'Al hacer clic en "Aplicar Recomendaciones", el sistema iniciará un proceso de sincronización bidireccional con SAP S/4HANA para actualizar los parámetros de planificación de materiales en tiempo real.'
                },
                suggestedQuestions: [
                    "¿Cuál es la precisión del forecast actual?",
                    "¿Cuánto dinero puedo ahorrar en stock de seguridad?",
                    "¿Qué indica el gráfico de proyección?",
                    "¿Cómo se calcula el stock dinámico?"
                ]
            };
        }

        if (path.includes('/planning/exceptions')) {
            return {
                name: 'Excepciones MRP',
                data: null,
                uiElements: {
                    'tabla': 'Esta tabla centraliza todas las excepciones críticas generadas por la última ejecución del MRP. Cada fila representa una posible ruptura en la cadena de suministro que requiere tu atención inmediata.',
                    'severidad': 'La columna de severidad clasifica las excepciones basándose en su impacto financiero y operativo potencial, permitiéndote priorizar las acciones correctivas más urgentes.',
                    'resolver': 'La acción "Resolver" te guía a través de un flujo de trabajo asistido para mitigar la excepción, ya sea reprogramando una orden, acelerando un envío o buscando un proveedor alternativo.'
                },
                suggestedQuestions: [
                    "¿Cuáles son las excepciones más críticas?",
                    "¿Qué significa el nivel de severidad?",
                    "¿Cómo resuelvo una excepción de stockout?"
                ]
            };
        }

        if (path.includes('/planning/scenarios')) {
            return {
                name: 'Simulador de Escenarios',
                data: null,
                uiElements: {
                    'simular': 'El motor de simulación te permite crear escenarios hipotéticos ("What-If") complejos. Puedes modelar interrupciones en la cadena de suministro, cambios bruscos en la demanda o fluctuaciones de precios para evaluar la resiliencia de tu plan.',
                    'comparar': 'La vista de comparación pone frente a frente tus diferentes escenarios, resaltando las diferencias clave en costos, niveles de servicio y riesgos, facilitando la toma de decisiones estratégicas informada.',
                    'parametros': 'El panel de parámetros te da control total sobre las variables de la simulación. Puedes ajustar lead times, capacidades de proveedores y costos logísticos para estresar tu cadena de suministro virtualmente.'
                },
                suggestedQuestions: [
                    "¿Para qué sirve crear un escenario?",
                    "¿Qué variables puedo modificar en la simulación?",
                    "¿Cómo comparo dos escenarios diferentes?"
                ]
            };
        }

        // Core Modules
        if (path.includes('/contracts')) {
            return {
                name: 'Gestión de Contratos (CLM)',
                data: MOCK_CONTRACTS,
                uiElements: {
                    'tabla': 'El repositorio de contratos digitalizado te ofrece una vista unificada de todos tus acuerdos legales. Puedes ver rápidamente el estado, valor y vigencia de cada documento.',
                    'redactar': 'Nuestra funcionalidad de "Redacción Asistida por IA" utiliza modelos de lenguaje avanzados (LLMs) para generar borradores de contratos legales robustos en segundos, basándose en tus plantillas y mejores prácticas.',
                    'riesgo': 'El "Score de Riesgo IA" es una métrica propietaria que analiza el texto completo del contrato buscando cláusulas ambiguas, responsabilidades desequilibradas o términos no estándar que podrían exponer a la empresa.',
                    'editar': 'El editor de contratos integrado permite la colaboración en tiempo real y el control de cambios, asegurando que siempre estés trabajando sobre la última versión aprobada del documento.'
                },
                suggestedQuestions: [
                    "¿Cuántos contratos están por vencer?",
                    "¿Cuáles son los contratos con mayor riesgo?",
                    "¿Qué hace la función de redactar con IA?",
                    "¿Cuál es el valor total de los contratos activos?"
                ]
            };
        }

        if (path.includes('/mro-catalog')) {
            return {
                name: 'Catálogo MRO',
                data: MOCK_MRO_ITEMS,
                uiElements: {
                    'carrito': 'Tu carrito de compras actúa como una solicitud de pedido preliminar. Desde aquí puedes revisar los ítems seleccionados antes de generar la requisición formal.',
                    'filtros': 'Los filtros inteligentes te ayudan a navegar nuestro extenso catálogo de MRO. Puedes segmentar por categoría, proveedor o rango de precios para encontrar exactamente lo que necesitas.',
                    'tarjeta': 'Cada tarjeta de producto está diseñada para darte toda la información necesaria de un vistazo: imagen de alta resolución, precio actualizado, disponibilidad de stock en tiempo real y calificación del proveedor.',
                    'stock': 'El indicador de stock se conecta directamente con el sistema de gestión de almacenes (WMS) para mostrarte la disponibilidad física real en el momento de la consulta.'
                },
                suggestedQuestions: [
                    "¿Cuál es el artículo más costoso?",
                    "¿Qué productos tienen stock bajo?",
                    "¿Cómo filtro por categoría?",
                    "¿Quién es el proveedor del casco de seguridad?"
                ]
            };
        }

        if (path.includes('/ap-automation')) {
            return {
                name: 'Automatización de AP',
                data: MOCK_INVOICES,
                uiElements: {
                    'conciliar': 'El botón "Ejecutar Auto-Match" dispara nuestro algoritmo de conciliación de tres vías. Compara automáticamente la factura, la orden de compra y la recepción de mercancía para validar el pago.',
                    'score': 'El "Match Score" es un indicador de confianza (0-100%) que te dice qué tan segura está la IA de que la factura es correcta. Scores altos permiten el procesamiento "touchless" (sin intervención humana).',
                    'excepciones': 'Las facturas en estado de "Excepción" han fallado alguna regla de negocio o validación. Requieren tu experiencia para investigar discrepancias en precios o cantidades.',
                    'pendientes': 'La cola de "Pendientes" muestra todas las facturas que han sido recibidas digitalmente o escaneadas y están esperando su turno para el procesamiento automático.'
                },
                suggestedQuestions: [
                    "¿Cuántas facturas tengo pendientes?",
                    "¿Qué significa un Match Score bajo?",
                    "¿Cuántas excepciones debo revisar?",
                    "¿Cómo funciona el Auto-Match?"
                ]
            };
        }

        if (path.includes('/spend-analysis')) {
            return {
                name: 'Análisis de Gastos',
                data: { categories: INITIAL_SPEND_DATA, suppliers: SUPPLIER_DATA },
                uiElements: {
                    'grafico': 'Este gráfico de distribución es esencial para entender tu "Spend Cube". Desglosa el gasto total por categorías de compra, permitiéndote identificar áreas de oportunidad para consolidación.',
                    'clasificar': 'La herramienta de "Clasificación IA" utiliza procesamiento de lenguaje natural para limpiar y normalizar tus datos de gasto. Asigna automáticamente categorías a transacciones que venían sin clasificar o con descripciones vagas.',
                    'proveedores': 'El ranking de proveedores te muestra quiénes son tus socios estratégicos por volumen de facturación. Es vital para las negociaciones de contratos marco y descuentos por volumen.',
                    'kpi': 'Los KPIs superiores te dan la foto completa: cuánto hemos gastado en total, cuánto hemos logrado ahorrar mediante iniciativas de compras y cuál es nuestro porcentaje de gasto bajo gestión.'
                },
                suggestedQuestions: [
                    "¿En qué categoría gastamos más?",
                    "¿Quién es nuestro principal proveedor?",
                    "¿Para qué sirve el botón de clasificar?",
                    "¿Cuál es el gasto total analizado?"
                ]
            };
        }

        if (path.includes('/backoffice')) {
            const searchParams = new URLSearchParams(location.search);
            const activeTab = searchParams.get('tab') || 'erp';

            let tabName = 'Configuración General';
            let tabQuestions: string[] = [];
            let tabUiElements: Record<string, string> = {};

            switch (activeTab) {
                case 'erp':
                    tabName = 'Conexiones ERP';
                    tabUiElements = {
                        'conexiones': 'Muestra el estado de salud de las integraciones con sistemas ERP (SAP, Oracle). Un indicador verde significa que la sincronización está activa.',
                        'api': 'La sección de configuración de API permite definir los endpoints y tokens de seguridad para la comunicación con el backend del ERP.',
                        'agregar': 'El botón "Agregar Conexión" inicia el asistente para vincular un nuevo sistema externo.'
                    };
                    tabQuestions = ["¿Cómo agrego una nueva conexión ERP?", "¿Qué significa el estado desconectado?", "¿Cómo actualizo el token de API?"];
                    break;
                case 'suppliers':
                    tabName = 'Redes de Proveedores';
                    tabUiElements = {
                        'permisos': 'Define qué acciones pueden realizar los agentes autónomos en los portales de proveedores (ej. enviar RFQs automáticamente).',
                        'redes': 'Lista las redes de proveedores conectadas (Ariba, Coupa) y su estado de sincronización.'
                    };
                    tabQuestions = ["¿Qué permisos tienen los agentes?", "¿Cómo conecto Ariba?", "¿Qué redes están activas?"];
                    break;
                case 'sources':
                    tabName = 'Fuentes de Conocimiento (RAG)';
                    tabUiElements = {
                        'rag': 'Configura las fuentes de datos no estructurados (PDFs, webs, noticias) que la IA utiliza para enriquecer su contexto.',
                        'indice': 'Muestra el estado de indexación de los documentos. "Indexado" significa que la IA ya ha "leído" y entendido el contenido.'
                    };
                    tabQuestions = ["¿Qué es RAG?", "¿Cómo agrego una fuente de noticias?", "¿Qué documentos están indexados?"];
                    break;
                case 'risk-weights':
                    tabName = 'Ponderación de Riesgos';
                    tabUiElements = {
                        'sliders': 'Los deslizadores te permiten ajustar el peso relativo de cada factor de riesgo. Esto entrena al modelo de IA para priorizar lo que es más importante para tu empresa.',
                        'total': 'El indicador de "Total" asegura que la suma de los pesos sea 100%, garantizando un modelo matemático coherente.'
                    };
                    tabQuestions = ["¿Cómo ajusto la importancia del riesgo financiero?", "¿Qué pasa si cambio los pesos?", "¿Cómo se calcula el score total?"];
                    break;
                case 'exchange-rates':
                    tabName = 'Tipo de Cambio';
                    tabUiElements = {
                        'tasas': 'Muestra las cotizaciones actuales de divisas. Estas se usan para normalizar todas las ofertas a una moneda común para comparación.',
                        'referencia': 'Permite seleccionar qué tasa usar como "verdad" para los cálculos financieros del sistema.'
                    };
                    tabQuestions = ["¿De dónde vienen las tasas?", "¿Cómo configuro una tasa manual?", "¿Cada cuánto se actualizan?"];
                    break;
                case 'masterdata':
                    tabName = 'Master Data Sync';
                    tabUiElements = {
                        'sync': 'El botón de sincronización fuerza una actualización inmediata de los datos maestros (materiales, proveedores) desde el ERP.',
                        'tabla': 'Muestra el historial de cambios detectados en los datos maestros y su estado de propagación al sistema.'
                    };
                    tabQuestions = ["¿Cómo fuerzo una sincronización?", "¿Qué cambios se han detectado?", "¿Qué significa el estado Pending?"];
                    break;
            }

            return {
                name: `Configuración: ${tabName}`,
                data: null,
                uiElements: tabUiElements,
                suggestedQuestions: tabQuestions
            };
        }

        if (path === '/' || path === '') {
            return {
                name: 'Dashboard Principal',
                data: null,
                uiElements: {
                    'resumen': 'Tu Cockpit de Control. Aquí tienes una visión panorámica de la salud de tu operación de compras. Los gráficos y métricas se actualizan en tiempo real para darte visibilidad total.',
                    'alertas': 'El centro de notificaciones inteligentes prioriza lo que realmente importa. La IA filtra el ruido y te alerta solo sobre eventos críticos como riesgos de suministro o aprobaciones urgentes.',
                    'actividad': 'El feed de actividad te mantiene al pulso de la operación. Es un registro cronológico de todas las acciones importantes que ocurren en el sistema, ideal para auditoría y seguimiento.'
                },
                suggestedQuestions: [
                    "¿Qué información muestra el resumen?",
                    "¿Cómo funcionan las alertas inteligentes?",
                    "¿Qué puedo ver en el feed de actividad?"
                ]
            };
        }

        return { name: 'General', data: null, uiElements: {}, suggestedQuestions: [] };
    };

    // Initialize chat with context-aware welcome message
    useEffect(() => {
        const context = getPageContext();
        setMessages([
            {
                id: 'init',
                text: `¡Hola! Soy tu asistente inteligente ProcureAI. Veo que estás trabajando en el módulo de **${context.name}**. \n\nEstoy aquí para ayudarte a interpretar los datos, explicarte las funcionalidades de esta pantalla o asistirte en tus tareas. \n\n¿En qué puedo apoyarte hoy?`,
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
    }, [location.pathname]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const generateResponse = (query: string) => {
        const context = getPageContext();
        const lowerQuery = query.toLowerCase();

        // 1. UI Explanations
        if (lowerQuery.includes('qué es') || lowerQuery.includes('para qué sirve') || lowerQuery.includes('cómo funciona') || lowerQuery.includes('explica') || lowerQuery.includes('qué hace')) {
            for (const [key, desc] of Object.entries(context.uiElements)) {
                if (lowerQuery.includes(key)) {
                    return `**Análisis de Funcionalidad:**\n\nSobre el elemento **"${key}"**: ${desc}\n\nEsta herramienta está diseñada para optimizar tu flujo de trabajo en ${context.name}, permitiéndote tomar decisiones más rápidas y basadas en datos.`;
                }
            }
            return `Estás navegando en el módulo de **${context.name}**. \n\nPuedo explicarte detalladamente cualquier componente que veas en pantalla. Por ejemplo, pregúntame sobre los gráficos, las tablas de datos o los botones de acción específicos. También puedo analizar los datos que se están mostrando actualmente.`;
        }

        // 2. Data Queries
        if (context.data) {
            // Demand Planning Logic
            if (location.pathname.includes('/planning/demand')) {
                const forecasts = context.data as typeof MOCK_FORECASTS;
                if (lowerQuery.includes('precisión') || lowerQuery.includes('mape')) {
                    return "He analizado los datos de rendimiento del modelo predictivo.\n\nActualmente, la **precisión del forecast (MAPE)** se sitúa en un sólido **94.8%**. \n\nEste es un indicador excelente que representa una mejora significativa del **5.2%** en comparación con el mismo periodo del año anterior. Esto sugiere que el modelo de IA se ha calibrado correctamente a la estacionalidad de tu demanda.";
                }
                if (lowerQuery.includes('stock') || lowerQuery.includes('seguridad')) {
                    return "Basado en el análisis de variabilidad de la demanda reciente, la IA ha calculado una oportunidad de optimización importante.\n\nPodemos reducir el stock de seguridad en un **18.5%** sin comprometer el nivel de servicio. Esto se logra mediante la transición de un modelo estático a uno dinámico, lo que liberaría capital de trabajo valioso.";
                }
            }

            if (location.pathname.includes('/events/')) {
                const event = context.data as typeof INITIAL_EVENTS[string];
                if (lowerQuery.includes('estado') || lowerQuery.includes('status')) {
                    return `El evento **"${event.title}"** se encuentra actualmente en estado: **${event.status.toUpperCase()}**. \n\n${event.status === 'Completado' ? `El proceso ha finalizado exitosamente con la adjudicación a **${event.finalSupplier}**.` : 'Los agentes autónomos están ejecutando el flujo de trabajo definido. Puedes ver el progreso detallado en el Log de Orquestación.'}`;
                }
                if (lowerQuery.includes('proveedor') || lowerQuery.includes('invitado')) {
                    const suppliers = event.leads.map(l => l.name).join(', ');
                    return `Para este evento de sourcing, hemos invitado a los siguientes proveedores calificados:\n\n**${suppliers}**.\n\nEstos proveedores fueron seleccionados automáticamente basándose en su historial de desempeño, capacidad técnica y cumplimiento de normativas ESG.`;
                }
                if (lowerQuery.includes('precio') || lowerQuery.includes('target') || lowerQuery.includes('objetivo')) {
                    return `El precio objetivo (Target Price) establecido para este evento es de **$${event.targetPrice.toLocaleString()} ${event.currency || 'USD'}** por ${event.unit}.\n\nEste valor fue calculado utilizando datos históricos de compra y benchmarks de mercado actuales. Nuestro objetivo es lograr un ahorro mínimo del 5% sobre este valor.`;
                }
                if (lowerQuery.includes('riesgo')) {
                    const riskSuppliers = event.leads.filter(l => l.risk !== 'Bajo');
                    if (riskSuppliers.length > 0) {
                        return `He analizado el perfil de riesgo de los proveedores invitados.\n\nAtención: Hemos detectado **${riskSuppliers.length} proveedores con riesgo Medio/Alto**: ${riskSuppliers.map(l => l.name).join(', ')}. \n\nEl Agente de Riesgo monitoreará de cerca sus ofertas y verificará certificaciones adicionales antes de cualquier adjudicación.`;
                    }
                    return "El análisis preliminar indica un **Riesgo Bajo** para este evento. Todos los proveedores invitados tienen calificaciones de cumplimiento satisfactorias y estabilidad financiera verificada.";
                }
            }

            if (location.pathname.includes('/contracts')) {
                const contracts = context.data as typeof MOCK_CONTRACTS;
                if (lowerQuery.includes('cuántos') || lowerQuery.includes('total')) {
                    const totalValue = contracts.reduce((acc, c) => acc + c.value, 0).toLocaleString();
                    return `He realizado un recuento de tu base de datos de contratos.\n\nActualmente gestionamos un total de **${contracts.length} contratos activos** en el sistema. \n\nEl valor monetario total acumulado de estos acuerdos asciende a **$${totalValue}**. Esta cifra representa el compromiso financiero total bajo gestión en este momento.`;
                }
                if (lowerQuery.includes('riesgo') || lowerQuery.includes('alto')) {
                    const highRisk = contracts.filter(c => c.aiRiskScore > 50);
                    const riskNames = highRisk.map(c => c.title).join(', ');
                    return `He escaneado todos los contratos utilizando nuestro motor de análisis de riesgo.\n\nHe detectado **${highRisk.length} contratos clasificados como de ALTO RIESGO** (Score > 50%). \n\nEs crítico que revises los siguientes documentos: **${riskNames}**. Estos contratos contienen cláusulas o condiciones que podrían ser desfavorables y requieren tu revisión legal inmediata.`;
                }
                if (lowerQuery.includes('vence') || lowerQuery.includes('expira')) {
                    const expiring = contracts.filter(c => c.status === 'Expiring');
                    const expNames = expiring.map(c => c.title).join(', ');
                    return `He verificado las fechas de vigencia de tu cartera de contratos.\n\nAtención: Hay **${expiring.length} contratos próximos a vencer** en el corto plazo. \n\nLos contratos afectados son: **${expNames}**. Te recomiendo iniciar los procesos de renovación o renegociación lo antes posible para evitar interrupciones en el servicio.`;
                }
            }

            if (location.pathname.includes('/mro-catalog')) {
                const items = context.data as typeof MOCK_MRO_ITEMS;
                if (lowerQuery.includes('precio') && lowerQuery.includes('caro')) {
                    const mostExpensive = [...items].sort((a, b) => b.price - a.price)[0];
                    return `Analizando el catálogo actual de productos MRO:\n\nEl artículo con el precio unitario más alto es el **"${mostExpensive.name}"**, con un costo de **$${mostExpensive.price}**. \n\nEste ítem es suministrado por **${mostExpensive.supplier}**. Dado su alto valor, te sugiero revisar si existen acuerdos de precios especiales o descuentos por volumen disponibles para este SKU.`;
                }
                if (lowerQuery.includes('stock') || lowerQuery.includes('bajo')) {
                    const lowStock = items.filter(i => i.stock < 50);
                    const lowStockNames = lowStock.slice(0, 3).map(i => i.name).join(', ');
                    return `He revisado los niveles de inventario en tiempo real.\n\nHe encontrado **${lowStock.length} ítems con niveles de stock crítico** (menos de 50 unidades). \n\nDeberías considerar reabastecer urgentemente productos como: **${lowStockNames}**, entre otros, para evitar quiebres de stock que afecten la operación.`;
                }
            }

            if (location.pathname.includes('/ap-automation')) {
                const invoices = context.data as typeof MOCK_INVOICES;
                if (lowerQuery.includes('pendientes')) {
                    const pending = invoices.filter(i => i.status === 'Pending');
                    return `Revisando la cola de procesamiento de Cuentas por Pagar:\n\nActualmente tienes **${pending.length} facturas en estado PENDIENTE**. \n\nEstas facturas están esperando la ejecución del proceso de conciliación (3-Way Match). Te recomiendo ejecutar el "Auto-Match" para procesar este lote y agilizar los pagos a proveedores.`;
                }
                if (lowerQuery.includes('excepciones') || lowerQuery.includes('error')) {
                    const exceptions = invoices.filter(i => i.status === 'Exception');
                    return `He analizado las facturas procesadas en busca de errores.\n\nHe detectado **${exceptions.length} excepciones** que requieren intervención manual. \n\nEstas facturas no pudieron ser conciliadas automáticamente debido a discrepancias en precios, cantidades o falta de recepción. Por favor, revisa la lista de excepciones para resolver estos bloqueos.`;
                }
            }

            if (location.pathname.includes('/spend-analysis')) {
                const data = context.data as { categories: typeof INITIAL_SPEND_DATA, suppliers: typeof SUPPLIER_DATA };
                if (lowerQuery.includes('gasto') || lowerQuery.includes('mayor')) {
                    const topCategory = [...data.categories].sort((a, b) => b.value - a.value)[0];
                    return `Analizando la distribución de gastos (Spend Cube):\n\nLa categoría que representa el mayor volumen de gasto es **"${topCategory.name}"**, con un total de **$${topCategory.value.toLocaleString()}**. \n\nEsta categoría debería ser el foco principal de tus iniciativas de ahorro y negociación estratégica, ya que cualquier mejora aquí tendrá el mayor impacto en el resultado final.`;
                }
                if (lowerQuery.includes('proveedor')) {
                    const topSupplier = [...data.suppliers].sort((a, b) => b.spend - a.spend)[0];
                    return `Basado en el volumen de facturación acumulado:\n\nNuestro proveedor estratégico principal es **"${topSupplier.name}"**, con un gasto total de **$${topSupplier.spend.toLocaleString()}**. \n\nMantener una relación colaborativa y sólida con este proveedor es crucial para la continuidad del negocio y la optimización de costos.`;
                }
            }
        }

        if (location.pathname.includes('/backoffice')) {
            const searchParams = new URLSearchParams(location.search);
            const activeTab = searchParams.get('tab') || 'erp';

            if (activeTab === 'erp') {
                if (lowerQuery.includes('agregar') || lowerQuery.includes('nueva')) {
                    return "Para agregar una nueva conexión ERP, haz clic en el botón **'Agregar Conexión'** en la esquina superior derecha. Esto abrirá un asistente que te guiará para ingresar la URL del endpoint, las credenciales de autenticación y seleccionar los módulos a sincronizar.";
                }
                if (lowerQuery.includes('desconectado') || lowerQuery.includes('estado')) {
                    return "Un estado **'Desconectado'** indica que la última prueba de 'heartbeat' falló. Esto puede deberse a credenciales caducadas, firewall bloqueando la IP de ProcureAI o mantenimiento en el ERP destino. Te sugiero verificar los logs de conexión.";
                }
                if (lowerQuery.includes('token') || lowerQuery.includes('api')) {
                    return "Los tokens de API se gestionan en la sección **'Configuración API'** al final de la pantalla. Por seguridad, los tokens están enmascarados. Para rotar un token, debes generar uno nuevo en tu ERP y actualizarlo aquí.";
                }
            }
            if (activeTab === 'suppliers') {
                if (lowerQuery.includes('permiso')) {
                    return "Los agentes de sourcing operan bajo un modelo de **'Permiso Supervisado'**. Actualmente, están autorizados para enviar solicitudes de cotización (RFQs) para compras menores a $100k. Compras mayores requieren aprobación humana antes del envío.";
                }
                if (lowerQuery.includes('ariba') || lowerQuery.includes('conectar')) {
                    return "La conexión con SAP Ariba utiliza la API de Ariba Network. Debes solicitar las credenciales de integración (Client ID y Secret) en el portal de desarrolladores de Ariba e ingresarlas en la tarjeta de integración correspondiente.";
                }
            }
            if (activeTab === 'sources') {
                if (lowerQuery.includes('rag') || lowerQuery.includes('fuente')) {
                    return "**RAG (Retrieval-Augmented Generation)** es la tecnología que permite a la IA consultar tus documentos privados. Al agregar una fuente aquí (como una carpeta de SharePoint o un feed de noticias), la IA indexa ese contenido para usarlo en sus respuestas y análisis.";
                }
                if (lowerQuery.includes('indexado')) {
                    return "El estado **'Indexado'** confirma que el motor vectorial ha procesado los documentos. Si ves 'Pendiente', la IA aún está leyendo los archivos. Este proceso suele tomar unos minutos dependiendo del volumen de datos.";
                }
            }
            if (activeTab === 'risk-weights') {
                if (lowerQuery.includes('ajustar') || lowerQuery.includes('importancia') || lowerQuery.includes('peso')) {
                    return "Puedes ajustar la importancia de cada factor moviendo los deslizadores. Si aumentas el peso del **'Riesgo Financiero'**, por ejemplo, la IA será más sensible a noticias sobre quiebras o deudas al evaluar proveedores, penalizando más fuertemente a aquellos con problemas financieros.";
                }
                if (lowerQuery.includes('calcula') || lowerQuery.includes('score')) {
                    return "El Score de Riesgo Global es una media ponderada. Multiplicamos la calificación de cada factor (0-100) por el peso que has definido aquí. Esto nos da un puntaje único que refleja tus prioridades estratégicas de gestión de riesgos.";
                }
            }
            if (activeTab === 'exchange-rates') {
                if (lowerQuery.includes('vienen') || lowerQuery.includes('fuente')) {
                    return "Las tasas de mercado se obtienen en tiempo real de proveedores de datos financieros confiables (como Bloomberg o Reuters) a través de APIs seguras. Se actualizan cada 15 minutos durante el horario de mercado.";
                }
                if (lowerQuery.includes('manual') || lowerQuery.includes('personalizado')) {
                    return "Si prefieres usar una tasa corporativa fija (ej. tasa de presupuesto anual), selecciona **'Personalizado (Manual)'** en el menú desplegable y escribe el valor. El sistema usará este valor fijo para todos los cálculos hasta que lo cambies.";
                }
            }
            if (activeTab === 'masterdata') {
                if (lowerQuery.includes('forzar') || lowerQuery.includes('sincronización')) {
                    return "El botón **'Forzar Sincronización'** inicia un trabajo en segundo plano que descarga la última lista de materiales y proveedores del ERP. Úsalo si has creado un material nuevo en SAP y necesitas verlo en ProcureAI inmediatamente.";
                }
                if (lowerQuery.includes('pending') || lowerQuery.includes('pendiente')) {
                    return "El estado **'Pending'** en la tabla de cambios significa que ProcureAI ha detectado una discrepancia pero aún no ha actualizado su base de datos local. Esto suele resolverse automáticamente en el siguiente ciclo de sincronización (cada hora).";
                }
            }
        }

        // Default Fallback
        return `Entendido. Estoy analizando tu consulta sobre **${context.name}**.\n\nPuedo ofrecerte explicaciones detalladas sobre la interfaz o profundizar en los datos que ves en pantalla. \n\nPrueba con alguna de las preguntas sugeridas o sé más específico sobre qué dato o elemento te gustaría que explique.`;
    };

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI processing time
        setTimeout(() => {
            const responseText = generateResponse(text);

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputText);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-procure-600 to-procure-800 hover:from-procure-700 hover:to-procure-900 text-white p-4 rounded-full shadow-xl transition-all hover:scale-105 flex items-center justify-center group"
                >
                    <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 flex flex-col h-[600px] border border-gray-200 animate-fade-in-up flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-procure-600 to-procure-800 text-white p-4 flex justify-between items-center shadow-md">
                        <div className="flex items-center">
                            <div className="bg-white/20 p-2 rounded-lg mr-3">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base">Asistente ProcureAI</h3>
                                <div className="flex items-center text-xs text-procure-100 opacity-90">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                                    {getPageContext().name}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.sender === 'user'
                                        ? 'bg-procure-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                        }`}
                                >
                                    {msg.text.split('**').map((part, i) =>
                                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggested Questions */}
                    <div className="px-4 pb-2 bg-gray-50">
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {getPageContext().suggestedQuestions?.map((q, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSendMessage(q)}
                                    className="flex-shrink-0 bg-white border border-procure-200 text-procure-700 text-xs px-3 py-1.5 rounded-full hover:bg-procure-50 transition-colors whitespace-nowrap shadow-sm"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleFormSubmit} className="p-4 border-t border-gray-100 bg-white">
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-procure-100 transition-shadow">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Pregunta sobre la pantalla o datos..."
                                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim()}
                                className="ml-2 text-procure-600 hover:text-procure-800 disabled:opacity-50 p-1 rounded-full hover:bg-procure-50 transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-[10px] text-gray-400">Powered by Google Gemini</span>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

import { Contract, MROItem, Invoice, SpendCategory, SupplierSpend } from '../types';

export const MOCK_CONTRACTS: Contract[] = [
    {
        id: 'CTR-2024-001',
        title: 'Suministro de Cemento Anual',
        supplier: 'Cementos del Norte',
        value: 1200000,
        status: 'Active',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        aiRiskScore: 15,
        content: `CONTRATO DE SUMINISTRO DE CEMENTO PORTLAND

CONSTE POR EL PRESENTE DOCUMENTO, el Contrato de Suministro (en adelante, el "Contrato") celebrado el día 1 de enero de 2024, entre:

DE UNA PARTE: Cementos del Norte S.A., una sociedad debidamente constituida y existente bajo las leyes de la República, con domicilio legal en Av. Industrial 1234, representada por su Gerente General, Sr. Juan Pérez (en adelante, el "Proveedor").

DE OTRA PARTE: Constructora Global S.A., una sociedad debidamente constituida y existente bajo las leyes de la República, con domicilio legal en Calle Los Constructores 567, representada por su Director de Compras, Sra. María González (en adelante, el "Cliente").

AMBAS PARTES ACUERDAN LO SIGUIENTE:

CLÁUSULA PRIMERA: OBJETO DEL CONTRATO
1.1 El Proveedor se compromete a suministrar y el Cliente se compromete a adquirir Cemento Portland Tipo I (en adelante, el "Producto") de acuerdo con las especificaciones técnicas detalladas en el Anexo A de este Contrato.
1.2 El suministro se realizará en las cantidades y fechas que el Cliente solicite mediante Órdenes de Compra debidamente emitidas.

CLÁUSULA SEGUNDA: PRECIO Y CONDICIONES DE PAGO
2.1 El precio unitario del Producto se fija en $120.00 (Ciento Veinte con 00/100 Dólares Americanos) por tonelada métrica, más el Impuesto al Valor Agregado (IVA) correspondiente.
2.2 Este precio incluye el transporte hasta las instalaciones del Cliente ubicadas en la Zona Industrial Norte.
2.3 Las facturas serán emitidas mensualmente por el Proveedor y deberán ser pagadas por el Cliente dentro de los treinta (30) días calendario siguientes a su recepción y conformidad.
2.4 En caso de mora en el pago, se aplicará un interés moratorio equivalente a la tasa LIBOR + 2% anual.

CLÁUSULA TERCERA: VIGENCIA
3.1 El presente Contrato tendrá una vigencia de un (1) año, comenzando el 1 de enero de 2024 y finalizando el 31 de diciembre de 2024.
3.2 El Contrato podrá ser renovado por periodos iguales mediante acuerdo escrito entre las partes con al menos treinta (30) días de anticipación al vencimiento.

CLÁUSULA CUARTA: CALIDAD Y GARANTÍA
4.1 El Proveedor garantiza que todo el Producto suministrado cumplirá con las normas ASTM C150 y las regulaciones locales aplicables.
4.2 El Cliente tendrá derecho a inspeccionar el Producto a su recepción. Cualquier Producto que no cumpla con las especificaciones será rechazado y deberá ser reemplazado por el Proveedor a su exclusivo costo dentro de las 48 horas siguientes.

CLÁUSULA QUINTA: PENALIDADES POR INCUMPLIMIENTO
5.1 En caso de retraso en la entrega del Producto respecto a las fechas establecidas en las Órdenes de Compra, el Proveedor pagará una penalidad del 1% del valor de la entrega retrasada por cada día de demora, hasta un máximo del 10% del valor total de dicha entrega.

CLÁUSULA SEXTA: FUERZA MAYOR
6.1 Ninguna de las partes será responsable por incumplimiento o retraso en la ejecución de sus obligaciones si dicho incumplimiento o retraso se debe a causas de Fuerza Mayor debidamente acreditadas.

CLÁUSULA SÉPTIMA: LEY APLICABLE Y SOLUCIÓN DE CONTROVERSIAS
7.1 Este Contrato se regirá e interpretará de acuerdo con las leyes de la República.
7.2 Cualquier disputa que surja en relación con este Contrato será resuelta mediante arbitraje de derecho en el Centro de Arbitraje de la Cámara de Comercio local.

EN FE DE LO CUAL, las partes firman este Contrato en dos ejemplares de igual tenor y valor.`
    },
    {
        id: 'CTR-2024-002',
        title: 'Mantenimiento de Flota',
        supplier: 'Servicios Logísticos SA',
        value: 450000,
        status: 'Review',
        startDate: '2024-03-01',
        endDate: '2025-02-28',
        aiRiskScore: 65,
        content: `ACUERDO DE NIVEL DE SERVICIO (SLA) PARA MANTENIMIENTO DE FLOTA

FECHA DE INICIO: 1 de Marzo de 2024

PARTES INTERVINIENTES:
1. Servicios Logísticos S.A. ("El Prestador")
2. Constructora Global S.A. ("El Cliente")

1. ALCANCE DEL SERVICIO
El Prestador realizará el mantenimiento preventivo y correctivo de la flota de 50 camiones Volvo FMX propiedad del Cliente. El servicio incluye mano de obra, diagnóstico computarizado y gestión de repuestos.

2. MANTENIMIENTO PREVENTIVO
2.1 Se realizará un servicio completo cada 10,000 km o 250 horas de motor, lo que ocurra primero.
2.2 El checklist de mantenimiento incluye 150 puntos de inspección detallados en el Anexo I.
2.3 El tiempo máximo de inactividad por mantenimiento preventivo no excederá las 8 horas laborales.

3. MANTENIMIENTO CORRECTIVO Y EMERGENCIAS
3.1 El Prestador mantendrá una línea de emergencia 24/7.
3.2 El tiempo de respuesta en sitio para averías mecánicas dentro de un radio de 100km será de máximo 4 horas.
3.3 Para reparaciones mayores, el Prestador se compromete a proporcionar un vehículo de reemplazo si la reparación excede las 72 horas.

4. REPUESTOS
4.1 Solo se utilizarán repuestos originales (OEM) o equivalentes homologados previamente por el fabricante.
4.2 El Prestador mantendrá un stock de seguridad de repuestos de alta rotación en sus instalaciones.

5. INDICADORES DE DESEMPEÑO (KPIs)
5.1 Disponibilidad de Flota: Objetivo > 95%.
5.2 Tiempo Medio de Reparación (MTTR): Objetivo < 12 horas.
5.3 Cumplimiento de Plan de Mantenimiento: Objetivo 100%.

6. PENALIZACIONES
El incumplimiento de los niveles de servicio acordados resultará en créditos a favor del Cliente equivalentes al 5% de la facturación mensual por cada punto porcentual de desviación en la Disponibilidad de Flota.

7. CONFIDENCIALIDAD
Ambas partes acuerdan mantener la confidencialidad de toda la información técnica y comercial compartida durante la vigencia de este acuerdo.`
    },
    {
        id: 'CTR-2024-003',
        title: 'Licencias de Software ERP',
        supplier: 'TechSolutions Inc',
        value: 85000,
        status: 'Expiring',
        startDate: '2023-06-01',
        endDate: '2024-06-01',
        aiRiskScore: 5,
        content: `CONTRATO DE LICENCIA DE USO DE SOFTWARE Y SOPORTE (EULA)

IMPORTANTE: ESTE ES UN ACUERDO LEGAL VINCULANTE.

1. CONCESIÓN DE LICENCIA
TechSolutions Inc. ("Licenciante") otorga a Constructora Global S.A. ("Licenciatario") una licencia no exclusiva, intransferible y limitada para el uso del software Enterprise Resource Planning v5.0 ("Software").

2. ALCANCE DE USO
2.1 Usuarios Permitidos: Hasta 50 usuarios concurrentes nombrados.
2.2 Instalación: Servidores locales del Licenciatario y acceso vía web seguro.
2.3 Módulos Incluidos: Finanzas, Compras, Inventario, Recursos Humanos y CRM.

3. SERVICIOS DE SOPORTE Y MANTENIMIENTO
3.1 El Licenciante proporcionará soporte técnico Nivel 1, 2 y 3 durante días hábiles de 9:00 a 18:00 horas.
3.2 Se garantiza un tiempo de actividad (Uptime) del 99.9% para los servicios alojados en la nube.
3.3 Todas las actualizaciones de seguridad y nuevas versiones menores (updates) están incluidas sin costo adicional.

4. PROPIEDAD INTELECTUAL
El Software y toda la documentación relacionada son propiedad exclusiva del Licenciante y están protegidos por las leyes de derechos de autor y tratados internacionales.

5. LIMITACIÓN DE RESPONSABILIDAD
En ningún caso el Licenciante será responsable por daños indirectos, incidentales o consecuentes, incluyendo pérdida de datos o lucro cesante, que surjan del uso o imposibilidad de uso del Software.

6. AUDITORÍA
El Licenciante se reserva el derecho de auditar el uso del Software por parte del Licenciatario una vez al año para verificar el cumplimiento de los términos de la licencia.

7. TERMINACIÓN
Este contrato terminará automáticamente si el Licenciatario incumple cualquiera de sus términos. A la terminación, el Licenciatario deberá destruir todas las copias del Software.`
    },
    {
        id: 'CTR-2024-004',
        title: 'Servicios de Limpieza Industrial',
        supplier: 'CleanCorp S.A.',
        value: 120000,
        status: 'Active',
        startDate: '2024-01-15',
        endDate: '2025-01-14',
        aiRiskScore: 10,
        content: `CONTRATO DE PRESTACIÓN DE SERVICIOS DE LIMPIEZA Y SANEAMIENTO

REUNIDOS:
De una parte, CleanCorp S.A. (el "Contratista") y de otra, Constructora Global S.A. (el "Contratante").

EXPONEN:
Que el Contratante requiere servicios profesionales de limpieza para sus instalaciones industriales y oficinas administrativas, y que el Contratista cuenta con la experiencia y personal calificado para prestarlos.

ACUERDAN:

PRIMERA: DESCRIPCIÓN DEL SERVICIO
El Contratista realizará las siguientes tareas:
a) Limpieza diaria de oficinas, baños, comedores y vestuarios.
b) Limpieza industrial de pisos de planta con maquinaria especializada (fregadoras automáticas).
c) Gestión y retiro de residuos sólidos no peligrosos.
d) Limpieza de vidrios en altura (frecuencia mensual).

SEGUNDA: PERSONAL Y EQUIPAMIENTO
2.1 El Contratista asignará una dotación de 12 operarios de limpieza y 1 supervisor a tiempo completo.
2.2 Todo el personal estará debidamente uniformado e identificado, y contará con los EPPs necesarios.
2.3 El Contratista proveerá todos los insumos químicos, materiales y maquinaria necesarios para la ejecución del servicio.

TERCERA: CUMPLIMIENTO NORMATIVO
El Contratista declara cumplir con toda la normativa laboral, de seguridad social y de seguridad y salud en el trabajo respecto a su personal, manteniendo indemne al Contratante de cualquier reclamo laboral.

CUARTA: CONTRAPRESTACIÓN
El valor mensual del servicio asciende a $10,000.00 más impuestos, pagaderos a 30 días de la presentación de la factura.

QUINTA: CONFIDENCIALIDAD
El personal del Contratista no podrá divulgar información sobre las operaciones del Contratante a la que pudiera tener acceso durante la prestación del servicio.`
    },
    {
        id: 'CTR-2024-005',
        title: 'Seguridad Privada y Vigilancia',
        supplier: 'Seguridad Total',
        value: 300000,
        status: 'Draft',
        startDate: '2024-06-01',
        endDate: '2025-05-31',
        aiRiskScore: 45,
        content: `BORRADOR - CONTRATO DE SERVICIOS DE SEGURIDAD PRIVADA

OBJETO:
Prestación de servicios de vigilancia física y monitoreo electrónico en las instalaciones del Cliente.

ESPECIFICACIONES DEL SERVICIO:
1. Puestos de Vigilancia 24/7:
   - Puesto 1: Ingreso Principal (Control de accesos peatonal y vehicular).
   - Puesto 2: Almacén Central (Control de despacho y recepción).
   - Puesto 3: Perímetro Norte (Ronda móvil).

2. Personal:
   - Guardias de seguridad armados y con licencia vigente.
   - Capacitación en primeros auxilios y lucha contra incendios.

3. Tecnología:
   - Instalación de sistema de CCTV con 32 cámaras IP.
   - Centro de Control remoto con grabación en la nube por 60 días.
   - Control de rondas mediante bastón electrónico.

PROTOCOLOS:
Se establecerán protocolos específicos para:
- Ingreso de visitas y proveedores.
- Revisión de vehículos de carga.
- Actuación ante intrusiones o emergencias.

RESPONSABILIDAD CIVIL:
La empresa de seguridad contará con una póliza de responsabilidad civil extracontractual por un monto no menor a $1,000,000 para cubrir eventuales daños a terceros o propiedades del Cliente.

(Sección pendiente de revisión legal: Cláusulas de indemnidad y jurisdicción)`
    }
];

export const MOCK_MRO_ITEMS: MROItem[] = [
    { id: '1', name: 'Guantes de Seguridad Nitrilo', category: 'EPP', price: 12.50, image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=200', stock: 500, supplier: 'Seguridad Total SA', rating: 4.8 },
    { id: '2', name: 'Casco de Seguridad Industrial', category: 'EPP', price: 25.00, image: 'https://images.unsplash.com/photo-1517260739337-6799d239ce83?auto=format&fit=crop&q=80&w=200', stock: 120, supplier: 'Seguridad Total SA', rating: 4.5 },
    { id: '3', name: 'Juego de Llaves Combinadas', category: 'Herramientas', price: 85.00, image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=200', stock: 45, supplier: 'Ferretería Industrial', rating: 4.9 },
    { id: '4', name: 'Aceite Lubricante ISO 68', category: 'Lubricantes', price: 150.00, image: 'https://images.unsplash.com/photo-1627483262769-04d0a1401487?auto=format&fit=crop&q=80&w=200', stock: 30, supplier: 'LubriTech', rating: 4.7 },
    { id: '5', name: 'Rodamiento de Bolas 6204', category: 'Repuestos', price: 18.20, image: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&q=80&w=200', stock: 200, supplier: 'Rodamientos del Sur', rating: 4.6 },
    { id: '6', name: 'Cinta Adhesiva Industrial', category: 'Consumibles', price: 5.50, image: 'https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?auto=format&fit=crop&q=80&w=200', stock: 1000, supplier: 'PackMaster', rating: 4.4 },
    { id: '7', name: 'Taladro Percutor Inalámbrico', category: 'Herramientas', price: 120.00, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=200', stock: 25, supplier: 'Ferretería Industrial', rating: 4.8 },
    { id: '8', name: 'Chaleco Reflectante', category: 'EPP', price: 8.00, image: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&q=80&w=200', stock: 300, supplier: 'Seguridad Total SA', rating: 4.3 },
    { id: '9', name: 'Multímetro Digital', category: 'Electricidad', price: 45.00, image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=200', stock: 60, supplier: 'ElectroSupply', rating: 4.7 },
    { id: '10', name: 'Lámpara LED Industrial', category: 'Electricidad', price: 35.00, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=200', stock: 150, supplier: 'ElectroSupply', rating: 4.6 },
    { id: '11', name: 'Desengrasante Industrial 5L', category: 'Limpieza', price: 22.00, image: 'https://images.unsplash.com/photo-1626806787426-5910811b6325?auto=format&fit=crop&q=80&w=200', stock: 80, supplier: 'CleanPro', rating: 4.5 },
    { id: '12', name: 'Papel Higiénico Institucional', category: 'Limpieza', price: 15.00, image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611f?auto=format&fit=crop&q=80&w=200', stock: 500, supplier: 'CleanPro', rating: 4.2 },
    { id: '13', name: 'Disco de Corte 4.5"', category: 'Consumibles', price: 2.50, image: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&q=80&w=200', stock: 1000, supplier: 'Ferretería Industrial', rating: 4.6 },
    { id: '14', name: 'Electrodos de Soldadura 6013', category: 'Consumibles', price: 18.00, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=200', stock: 200, supplier: 'WeldMaster', rating: 4.7 },
    { id: '15', name: 'Válvula de Bola 1/2"', category: 'Repuestos', price: 12.00, image: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&q=80&w=200', stock: 150, supplier: 'Valvulas y Conexiones', rating: 4.4 },
    { id: '16', name: 'Correa de Transmisión A-40', category: 'Repuestos', price: 9.50, image: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&q=80&w=200', stock: 100, supplier: 'Rodamientos del Sur', rating: 4.5 },
    { id: '17', name: 'Grasa de Litio', category: 'Lubricantes', price: 8.00, image: 'https://images.unsplash.com/photo-1627483262769-04d0a1401487?auto=format&fit=crop&q=80&w=200', stock: 120, supplier: 'LubriTech', rating: 4.6 },
    { id: '18', name: 'WD-40 Multiuso 400ml', category: 'Lubricantes', price: 6.00, image: 'https://images.unsplash.com/photo-1627483262769-04d0a1401487?auto=format&fit=crop&q=80&w=200', stock: 300, supplier: 'Ferretería Industrial', rating: 4.9 },
    { id: '19', name: 'Botas de Seguridad', category: 'EPP', price: 45.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200', stock: 80, supplier: 'Seguridad Total SA', rating: 4.7 },
    { id: '20', name: 'Gafas de Protección', category: 'EPP', price: 5.00, image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=200', stock: 400, supplier: 'Seguridad Total SA', rating: 4.4 },
    { id: '21', name: 'Destornilladores Aislados', category: 'Herramientas', price: 28.00, image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=200', stock: 50, supplier: 'Ferretería Industrial', rating: 4.8 },
    { id: '22', name: 'Pinza Amperimétrica', category: 'Electricidad', price: 65.00, image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=200', stock: 30, supplier: 'ElectroSupply', rating: 4.8 },
    { id: '23', name: 'Cable Unipolar 2.5mm', category: 'Electricidad', price: 35.00, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=200', stock: 500, supplier: 'ElectroSupply', rating: 4.5 },
    { id: '24', name: 'Interruptor Termomagnético 20A', category: 'Electricidad', price: 12.00, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=200', stock: 100, supplier: 'ElectroSupply', rating: 4.6 },
    { id: '25', name: 'Manguera Hidráulica', category: 'Repuestos', price: 40.00, image: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&q=80&w=200', stock: 40, supplier: 'Hidráulica Industrial', rating: 4.7 },
    { id: '26', name: 'Filtro de Aceite', category: 'Repuestos', price: 15.00, image: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&q=80&w=200', stock: 100, supplier: 'Hidráulica Industrial', rating: 4.5 },
    { id: '27', name: 'Trapo Industrial', category: 'Limpieza', price: 2.00, image: 'https://images.unsplash.com/photo-1626806787426-5910811b6325?auto=format&fit=crop&q=80&w=200', stock: 1000, supplier: 'CleanPro', rating: 4.1 },
    { id: '28', name: 'Jabón Líquido para Manos', category: 'Limpieza', price: 8.00, image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611f?auto=format&fit=crop&q=80&w=200', stock: 200, supplier: 'CleanPro', rating: 4.3 },
    { id: '29', name: 'Candado de Seguridad', category: 'Seguridad', price: 14.00, image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=200', stock: 150, supplier: 'Seguridad Total SA', rating: 4.6 },
    { id: '30', name: 'Extintor ABC 5kg', category: 'Seguridad', price: 55.00, image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=200', stock: 20, supplier: 'Seguridad Total SA', rating: 4.9 },
];

export const MOCK_INVOICES: Invoice[] = [
    { id: 'INV-001', supplier: 'Cementos del Norte', amount: 12500, date: '2024-03-10', poNumber: 'PO-9001', status: 'Pending', matchScore: 98 },
    { id: 'INV-002', supplier: 'Servicios Logísticos', amount: 4500, date: '2024-03-11', poNumber: 'PO-9002', status: 'Exception', matchScore: 45 },
    { id: 'INV-003', supplier: 'TechSolutions', amount: 8900, date: '2024-03-12', poNumber: 'PO-9003', status: 'Matched', matchScore: 100 },
];

export const INITIAL_SPEND_DATA: SpendCategory[] = [
    { name: 'MRO', value: 450000, color: '#3b82f6' },
    { name: 'Logística', value: 320000, color: '#10b981' },
    { name: 'IT & Software', value: 210000, color: '#8b5cf6' },
    { name: 'Servicios Prof.', value: 150000, color: '#f59e0b' },
    { name: 'Sin Clasificar', value: 85000, color: '#9ca3af' },
];

export const SUPPLIER_DATA: SupplierSpend[] = [
    { name: 'Cementos del Norte', spend: 120000 },
    { name: 'Servicios Logísticos', spend: 98000 },
    { name: 'TechSolutions', spend: 85000 },
    { name: 'Consultora Global', spend: 60000 },
    { name: 'Ferretería Industrial', spend: 45000 },
];

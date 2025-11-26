import { jsPDF } from "jspdf";
import { SourcingEvent } from "../types";

export const generatePurchaseOrderPDF = (event: SourcingEvent) => {
  if (!event.finalSupplier || !event.poNumber) {
    alert("Datos del evento incompletos.");
    return;
  }

  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('es-ES');

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(3, 105, 161); // Procure blue
  doc.text("ORDEN DE COMPRA AUTOMATIZADA", 105, 20, { align: "center" });

  // Info
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text(`No. OC: ${event.poNumber}`, 20, 35);
  doc.text(`Fecha: ${date}`, 150, 35, { align: "right" });
  doc.text(`Estado ERP: LIBERADA`, 150, 40, { align: "right" });

  doc.setDrawColor(200, 200, 200);
  doc.line(20, 45, 190, 45);

  // Parties
  doc.setFont("helvetica", "bold");
  doc.text("COMPRADOR:", 20, 55);
  doc.setFont("helvetica", "normal");
  doc.text("ProcureAI Manufacturing Inc.", 20, 60);
  doc.text("Av. Innovación 123, Ciudad Industrial", 20, 65);

  doc.setFont("helvetica", "bold");
  doc.text("PROVEEDOR:", 120, 55);
  doc.setFont("helvetica", "normal");
  doc.text(event.finalSupplier, 120, 60);
  doc.text("Contacto: AI Sales Bot", 120, 65);

  // Table Header
  doc.setFillColor(240, 249, 255);
  doc.rect(20, 80, 170, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.text("Descripción", 25, 86);
  doc.text("Cant/Vol", 90, 86);
  doc.text("Precio Unit.", 130, 86);
  doc.text("Total", 175, 86, { align: "right" });

  // Table Row
  doc.setFont("helvetica", "normal");
  const finalPrice = event.finalPrice || 0;
  const total = finalPrice * 1000; // Mock total multiplier

  doc.text(event.title, 25, 96);
  doc.text(event.volume, 90, 96);
  doc.text(`$${finalPrice.toFixed(2)}`, 130, 96);
  doc.text(`$${total.toLocaleString()}`, 175, 96, { align: "right" });

  // Footer
  doc.line(20, 110, 190, 110);
  doc.setFont("helvetica", "bold");
  doc.text("Monto Total:", 140, 120);
  doc.text(`$${total.toLocaleString()}`, 190, 120, { align: "right" });

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("Generado automáticamente por el Orquestador de Agentes ProcureAI. No requiere firma.", 105, 280, { align: "center" });

  doc.save(`OC_${event.poNumber}.pdf`);
};
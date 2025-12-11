import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // แนะนำป้องกัน error บางเครื่อง
    });

    const page = await browser.newPage();

    // โหลดหน้า UI ของคุณ
    await page.goto("http://localhost:3004/print/pdf-form-insurance-ppk/opd", {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: false,

      margin: { top: "9mm", right: "12mm", bottom: "10mm", left: "2mm" },
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=form-opd.pdf",
      },
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

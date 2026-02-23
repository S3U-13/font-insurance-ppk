import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const isDocker = process.env.NODE_ENV === "production";
    const browser = await puppeteer.launch({
      headless: "new",
      executablePath: isDocker ? "/usr/bin/chromium" : undefined, // ให้ local ใช้ chrome ปกติ
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // โหลดหน้า UI ของคุณ
    await page.goto(
      "http://172.16.46.34:4006/print/pdf-form-insurance-ppk/ipd",
      {
        waitUntil: "networkidle0",
      },
    );

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: false,

      margin: { top: "9mm", right: "12mm", bottom: "10mm", left: "2mm" },
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=form-ipd.pdf",
      },
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

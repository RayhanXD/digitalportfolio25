import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import path from "path"

const filename = "RAYHAN_MOHAMMAD_RESUME.pdf"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "resume.pdf")
    const buffer = await readFile(filePath)
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(buffer.length),
      },
    })
  } catch (err) {
    console.error("Resume download error:", err)
    return new NextResponse("Not found", { status: 404 })
  }
}

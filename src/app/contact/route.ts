import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Eksik alan var.' }, { status: 400 });
    }
    const saved = await prisma.contactMessage.create({
      data: { name, email, message },
    });
    return NextResponse.json(saved, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Mesaj kaydedilemedi.' }, { status: 500 });
  }
} 